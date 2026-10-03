import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  m0Checks: defineTable({
    checkTime: v.number(),
    state: v.union(v.literal("Waiting"), v.literal("Needs You")),
    completedAt: v.optional(v.number()),
    isTest: v.literal(true),
  }),
});
