import { internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// CLI-only feasibility checks, not user commitments or usage evidence.
export const start = internalMutation({
  args: { delayMs: v.number() },
  returns: v.id("m0Checks"),
  handler: async (ctx, { delayMs }) => {
    if (!Number.isFinite(delayMs) || delayMs < 0 || delayMs > 600000) {
      throw new Error("Test delay must be between zero and ten minutes.");
    }
    const checkTime = Date.now() + delayMs;
    const id = await ctx.db.insert("m0Checks", {
      checkTime,
      state: "Waiting",
      isTest: true,
    });
    await ctx.scheduler.runAt(checkTime, internal.m0Checks.complete, { id });
    return id;
  },
});

export const complete = internalMutation({
  args: { id: v.id("m0Checks") },
  returns: v.null(),
  handler: async (ctx, { id }) => {
    const check = await ctx.db.get(id);
    if (!check || check.state !== "Waiting") return null;
    if (Date.now() < check.checkTime) throw new Error("Check ran before its time.");
    await ctx.db.patch(id, { state: "Needs You", completedAt: Date.now() });
    return null;
  },
});

export const read = internalQuery({
  args: { id: v.id("m0Checks") },
  returns: v.union(v.null(), v.object({
    checkTime: v.number(),
    state: v.union(v.literal("Waiting"), v.literal("Needs You")),
    completedAt: v.union(v.number(), v.null()),
    isTest: v.literal(true),
  })),
  handler: async (ctx, { id }) => {
    const check = await ctx.db.get(id);
    return check ? {
      checkTime: check.checkTime,
      state: check.state,
      completedAt: check.completedAt ?? null,
      isTest: check.isTest,
    } : null;
  },
});
