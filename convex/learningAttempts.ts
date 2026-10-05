import { ConvexError } from "convex/values";
import type { MutationCtx } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";

// Read exact server-owned inputs, never answer snapshots supplied by the browser.
async function submission(ctx: MutationCtx, job: Doc<"practiceJobs">, owner: Doc<"practiceJobs">) {
  if (job.token !== owner.token || job.kind !== "assess" ||
      (job.challengeId || "beginner-01") !== (owner.challengeId || "beginner-01") ||
      (job.materialVersion || "legacy-v1") !== (owner.materialVersion || "legacy-v1")) {
    throw new ConvexError("SUBMISSION_UNAVAILABLE");
  }
  const input = JSON.parse(job.input);
  const answerId = typeof input.answerId === "string" ? ctx.db.normalizeId("practiceJobs", input.answerId) : null;
  const answer = answerId ? await ctx.db.get(answerId) : null;
  if (!answer || answer.token !== owner.token || answer.kind !== "generate" || answer.status !== "done" ||
      typeof answer.result !== "string" ||
      (answer.challengeId || "beginner-01") !== (owner.challengeId || "beginner-01") ||
      (answer.materialVersion || "legacy-v1") !== (owner.materialVersion || "legacy-v1")) {
    throw new ConvexError("SUBMISSION_UNAVAILABLE");
  }
  const prompt = JSON.parse(answer.input).prompt;
  if (typeof prompt !== "string" || typeof input.judgment !== "string" || typeof input.explanation !== "string") {
    throw new ConvexError("SUBMISSION_UNAVAILABLE");
  }
  const previousId = input.previousAssessmentId == null ? null : ctx.db.normalizeId("practiceJobs", input.previousAssessmentId);
  if (input.previousAssessmentId != null && !previousId) throw new ConvexError("SUBMISSION_UNAVAILABLE");
  return { answer, prompt, judgment: input.judgment as string, explanation: input.explanation as string, previousId };
}

export async function recordLearningAttempt(ctx: MutationCtx, job: Doc<"practiceJobs">, attemptNumber: number) {
  const existing = await ctx.db.query("learningAttempts").withIndex("by_assessment", q => q.eq("assessmentJobId", job._id)).unique();
  if (existing) return;
  const current = await submission(ctx, job, job);
  const previousJob = current.previousId ? await ctx.db.get(current.previousId) : null;
  if (current.previousId && (!previousJob || previousJob.status !== "done")) throw new ConvexError("SUBMISSION_UNAVAILABLE");
  const previous = previousJob ? await submission(ctx, previousJob, job) : null;
  const previousAttempt = previousJob ? await ctx.db.query("learningAttempts").withIndex("by_assessment", q => q.eq("assessmentJobId", previousJob._id)).unique() : null;
  let first = current;
  // Older assessments have no structured history yet. Recover their first answer
  // from the existing chain without inventing or rewriting historical attempts.
  if (!previousAttempt && previous) {
    first = previous;
    for (let depth = 1; first.previousId; depth++) {
      if (depth >= 3) throw new ConvexError("SUBMISSION_UNAVAILABLE");
      const earlier = await ctx.db.get(first.previousId);
      if (!earlier || earlier.status !== "done") throw new ConvexError("SUBMISSION_UNAVAILABLE");
      first = await submission(ctx, earlier, job);
    }
  }
  await ctx.db.insert("learningAttempts", {
    token: job.token, challengeId: job.challengeId || "beginner-01", materialVersion: job.materialVersion || "legacy-v1",
    attemptNumber,
    ...(previousAttempt ? { previousAttemptId: previousAttempt._id } : {}),
    changeType: !previous ? "initial" : previous.answer._id === current.answer._id ? "judgment" : "prompt",
    firstPromptText: previousAttempt?.firstPromptText ?? first.prompt,
    firstAIAnswerText: previousAttempt?.firstAIAnswerText ?? first.answer.result!,
    submittedPromptText: current.prompt, currentAIAnswerText: current.answer.result!,
    ...(previous ? { previousJudgmentText: previous.judgment } : {}),
    submittedJudgmentText: current.judgment,
    ...(current.explanation ? { changeExplanation: current.explanation } : {}),
    generationJobId: current.answer._id, assessmentJobId: job._id,
  });
}
