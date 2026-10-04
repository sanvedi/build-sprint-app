import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Retired setup-test data only; retained to avoid deleting historical rows.
// Not game progress. No active scheduling functions use this table.
export default defineSchema({
  practiceSessions: defineTable({ token: v.string(), attempts: v.number(), point: v.boolean() }).index("by_token", ["token"]),
  practiceJobs: defineTable({ token: v.string(), requestId: v.string(), kind: v.union(v.literal("generate"), v.literal("assess")), status: v.union(v.literal("pending"), v.literal("done"), v.literal("failed")), input: v.string(), result: v.optional(v.string()) }).index("by_request", ["token", "requestId"]),
  practiceUsage: defineTable({ day: v.string(), count: v.number() }).index("by_day", ["day"]),
  m0Checks: defineTable({
    checkTime: v.number(),
    state: v.union(v.literal("Waiting"), v.literal("Needs You")),
    completedAt: v.optional(v.number()),
    isTest: v.literal(true),
  }),
});
