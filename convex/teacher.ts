import { mutation, query, internalMutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { v, ConvexError } from "convex/values";

export const saveFirstName = mutation({
  args: { token: v.string(), firstName: v.string(), visitId: v.optional(v.string()) }, returns: v.string(),
  handler: async (ctx, args) => {
    const firstName = args.firstName.trim() || "Guest";
    if (!/^[a-f0-9]{64}$/.test(args.token) || !/^[\p{L}][\p{L}\p{M}'’\-]{0,39}$/u.test(firstName)) throw new ConvexError("FIRST_NAME_ONLY");
    const profile = await ctx.db.query("studentProfiles").withIndex("by_token", q => q.eq("token", args.token)).unique();
    // A retry keeps the original choice. This is a device label, not an identity.
    if (!profile) await ctx.db.insert("studentProfiles", { token: args.token, firstName, nameChosen: true });
    else if (profile.nameChosen === false) await ctx.db.patch(profile._id, { firstName, nameChosen: true });
    const chosen = profile && profile.nameChosen !== false ? profile.firstName : firstName;
    if (args.visitId) {
      validateVisit(args.token, args.visitId);
      const visit = await ctx.db.query("usageVisits").withIndex("by_visit", q => q.eq("visitId", args.visitId!)).unique();
      if (visit && visit.token !== args.token) throw new ConvexError("VISIT_UNAVAILABLE");
      if (visit) await ctx.db.patch(visit._id, { firstName: chosen });
    }
    return chosen;
  },
});

function validateVisit(token: string, visitId: string) {
  if (!/^[a-f0-9]{64}$/.test(token) || !/^[a-f0-9]{64}$/.test(visitId)) throw new ConvexError("VISIT_UNAVAILABLE");
}
async function ensureVisit(ctx: MutationCtx, token: string, visitId: string, pathVersion?: "stories-v1") {
  validateVisit(token, visitId);
  const existing = await ctx.db.query("usageVisits").withIndex("by_visit", q => q.eq("visitId", visitId)).unique();
  if (existing) {
    if (existing.token !== token) throw new ConvexError("VISIT_UNAVAILABLE");
    return existing;
  }
  let profile = await ctx.db.query("studentProfiles").withIndex("by_token", q => q.eq("token", token)).unique();
  if (!profile) {
    const id = await ctx.db.insert("studentProfiles", { token, firstName: "Guest", nameChosen: false });
    profile = await ctx.db.get(id);
  }
  const id = await ctx.db.insert("usageVisits", { token, visitId, firstName: profile!.firstName, browserLabel: `Browser ${profile!._id}`, visitedAt: Date.now(), teachingVersion: "picnic-v1", ...(pathVersion ? { pathVersion } : {}) });
  return (await ctx.db.get(id))!;
}
export const recordVisit = mutation({
  args: { token: v.string(), visitId: v.string(), pathVersion: v.optional(v.literal("stories-v1")), pathId: v.optional(v.union(v.literal("A"), v.literal("B"), v.literal("C"))) }, returns: v.null(),
  handler: async (ctx, args) => {
    const visit = await ensureVisit(ctx, args.token, args.visitId, args.pathVersion);
    // Only new story-release visits may receive a choice. No backfill of historical rows.
    if (args.pathId && visit.pathVersion === "stories-v1") {
      if (visit.pathId && visit.pathId !== args.pathId) throw new ConvexError("VISIT_PATH_ALREADY_CHOSEN");
      if (!visit.pathId) await ctx.db.patch(visit._id, { pathId: args.pathId });
    }
    return null;
  },
});
export const recordPracticeStart = mutation({
  args: { token: v.string(), visitId: v.string(), challengeId: v.union(v.literal("beginner-01"), v.literal("beginner-02")) }, returns: v.null(),
  handler: async (ctx, args) => {
    const visit = await ensureVisit(ctx, args.token, args.visitId);
    const field = args.challengeId === "beginner-01" ? "practice1StartedAt" : "practice2StartedAt";
    if (visit[field] === undefined) await ctx.db.patch(visit._id, { [field]: Date.now() });
    return null;
  },
});
const teachingResult = v.object({ optionIndex: v.union(v.literal(0), v.literal(1), v.literal(2)), correct: v.boolean(), answeredAt: v.number() });
export const saveTeachingAnswer = mutation({
  args: { token: v.string(), visitId: v.string(), optionIndex: v.union(v.literal(0), v.literal(1), v.literal(2)) }, returns: teachingResult,
  handler: async (ctx, args) => {
    await ensureVisit(ctx, args.token, args.visitId);
    const existing = await ctx.db.query("teachingAnswers").withIndex("by_token", q => q.eq("token", args.token)).unique();
    // The first choice is immutable; a lost response can be retried safely.
    if (existing) return { optionIndex: existing.optionIndex, correct: existing.correct, answeredAt: existing.answeredAt };
    const answer = { optionIndex: args.optionIndex, correct: args.optionIndex === 0, answeredAt: Date.now() };
    await ctx.db.insert("teachingAnswers", { token: args.token, ...answer });
    return answer;
  },
});
export const getTeachingAnswer = query({
  args: { token: v.string() }, returns: v.union(teachingResult, v.null()),
  handler: async (ctx, args) => {
    if (!/^[a-f0-9]{64}$/.test(args.token)) throw new ConvexError("VISIT_UNAVAILABLE");
    const result = await ctx.db.query("teachingAnswers").withIndex("by_token", q => q.eq("token", args.token)).unique();
    return result ? { optionIndex: result.optionIndex, correct: result.correct, answeredAt: result.answeredAt } : null;
  },
});
export const listVisits = query({
  args: { viewToken: v.string(), paginationOpts: paginationOptsValidator },
  returns: v.object({ page: v.array(v.object({ firstName: v.string(), browserLabel: v.string(), visitedAt: v.number(), practice1StartedAt: v.union(v.number(), v.null()), practice2StartedAt: v.union(v.number(), v.null()), teachingAnswer: v.union(teachingResult, v.null()), pathId: v.union(v.literal("A"), v.literal("B"), v.literal("C"), v.null()) })), isDone: v.boolean(), continueCursor: v.string() }),
  handler: async (ctx, args) => {
    if (!process.env.PROMPT_GAME_TEACHER_VIEW_TOKEN || args.viewToken !== process.env.PROMPT_GAME_TEACHER_VIEW_TOKEN) throw new ConvexError("TEACHER_PAGE_UNAVAILABLE");
    const result = await ctx.db.query("usageVisits").withIndex("by_time").order("desc").paginate(args.paginationOpts);
    const page = await Promise.all(result.page.map(async visit => {
      const answer = visit.teachingVersion === "picnic-v1" ? await ctx.db.query("teachingAnswers").withIndex("by_token", q => q.eq("token", visit.token)).unique() : null;
      return { firstName: visit.firstName, browserLabel: visit.browserLabel, visitedAt: visit.visitedAt, practice1StartedAt: visit.practice1StartedAt ?? null, practice2StartedAt: visit.practice2StartedAt ?? null, teachingAnswer: answer ? { optionIndex: answer.optionIndex, correct: answer.correct, answeredAt: answer.answeredAt } : null, pathId: visit.pathId ?? null };
    }));
    return { page, isDone: result.isDone, continueCursor: result.continueCursor };
  },
});

export async function recordPracticeCompletion(ctx: MutationCtx, token: string, challengeId: string, completed: boolean, point: boolean, historicalTime?: number) {
  if (challengeId !== "beginner-01" && challengeId !== "beginner-02") return;
  const existing = await ctx.db.query("practiceCompletions").withIndex("by_token_challenge", q => q.eq("token", token).eq("challengeId", challengeId)).unique();
  if (!completed && !existing) return;
  const profile = await ctx.db.query("studentProfiles").withIndex("by_token", q => q.eq("token", token)).unique();
  const newlyCompleted = completed && !existing?.completed;
  const now = Date.now();
  const data = {
    token, challengeId: challengeId as "beginner-01" | "beginner-02", firstName: existing?.firstName || profile?.firstName || "Guest",
    practiceNumber: challengeId === "beginner-01" ? 1 : 2,
    pointsEarned: point ? 1 : 0, completed,
    completedAt: newlyCompleted ? (historicalTime === undefined ? now : null) : existing?.completedAt ?? null,
    sortTime: newlyCompleted ? historicalTime ?? now : existing?.sortTime ?? now,
  };
  if (existing) await ctx.db.patch(existing._id, data);
  else await ctx.db.insert("practiceCompletions", data);
}

const row = v.object({ firstName: v.string(), practiceNumber: v.number(), pointsEarned: v.number(), completedAt: v.union(v.number(), v.null()) });
export const listCompletions = query({
  args: { viewToken: v.string(), paginationOpts: paginationOptsValidator },
  returns: v.object({ page: v.array(row), isDone: v.boolean(), continueCursor: v.string() }),
  handler: async (ctx, args) => {
    if (!process.env.PROMPT_GAME_TEACHER_VIEW_TOKEN || args.viewToken !== process.env.PROMPT_GAME_TEACHER_VIEW_TOKEN) throw new ConvexError("TEACHER_PAGE_UNAVAILABLE");
    const result = await ctx.db.query("practiceCompletions").withIndex("by_completed_time", q => q.eq("completed", true)).order("desc").paginate(args.paginationOpts);
    return { page: result.page.map(({ firstName, practiceNumber, pointsEarned, completedAt }) => ({ firstName, practiceNumber, pointsEarned, completedAt })), isDone: result.isDone, continueCursor: result.continueCursor };
  },
});

// Preserve earlier completions as Guest. Their exact completion time was never
// recorded; use assessment creation time only for ordering, never as displayed time.
export const importEarlierCompletions = internalMutation({
  args: { paginationOpts: paginationOptsValidator },
  returns: v.object({ isDone: v.boolean(), continueCursor: v.string() }),
  handler: async (ctx, args) => {
    const result = await ctx.db.query("practiceSessions").order("asc").paginate(args.paginationOpts);
    for (const session of result.page) {
      const challengeId = session.challengeId || "beginner-01";
      if (!["beginner-01", "beginner-02"].includes(challengeId) || !(session.point || session.completed || session.attempts >= 3)) continue;
      const existing = await ctx.db.query("practiceCompletions").withIndex("by_token_challenge", q => q.eq("token", session.token).eq("challengeId", challengeId as "beginner-01" | "beginner-02")).unique();
      if (existing) continue;
      const assessment = session.latestAssessmentId ? await ctx.db.get(session.latestAssessmentId) : null;
      await recordPracticeCompletion(ctx, session.token, challengeId, true, session.point, assessment?._creationTime ?? session._creationTime);
    }
    return { isDone: result.isDone, continueCursor: result.continueCursor };
  },
});
