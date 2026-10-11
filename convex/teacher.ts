import { mutation, query, internalMutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { v, ConvexError } from "convex/values";

export const saveFirstName = mutation({
  args: { token: v.string(), firstName: v.string() }, returns: v.null(),
  handler: async (ctx, args) => {
    const firstName = args.firstName.trim() || "Guest";
    if (!/^[a-f0-9]{64}$/.test(args.token) || !/^[\p{L}][\p{L}\p{M}'’\-]{0,39}$/u.test(firstName)) throw new ConvexError("FIRST_NAME_ONLY");
    const profile = await ctx.db.query("studentProfiles").withIndex("by_token", q => q.eq("token", args.token)).unique();
    // A retry keeps the original choice. This is a device label, not an identity.
    if (!profile) await ctx.db.insert("studentProfiles", { token: args.token, firstName });
    return null;
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
