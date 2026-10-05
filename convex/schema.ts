import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { challengeValidator, materialVersionValidator } from "./challenges";

// Retired setup-test data only; retained to avoid deleting historical rows.
// Not game progress. No active scheduling functions use this table.
export default defineSchema({
  learningAttempts: defineTable({
    token: v.string(), challengeId: challengeValidator, materialVersion: materialVersionValidator,
    attemptNumber: v.number(), previousAttemptId: v.optional(v.id("learningAttempts")),
    changeType: v.union(v.literal("initial"), v.literal("prompt"), v.literal("judgment"), v.literal("answer")),
    firstPromptText: v.string(), firstAIAnswerText: v.string(), submittedPromptText: v.string(), currentAIAnswerText: v.string(),
    studentEditedAnswerText: v.optional(v.string()), previousJudgmentText: v.optional(v.string()),
    submittedJudgmentText: v.string(), changeExplanation: v.optional(v.string()),
    generationJobId: v.id("practiceJobs"), assessmentJobId: v.id("practiceJobs"),
  }).index("by_assessment", ["assessmentJobId"]).index("by_token_challenge", ["token", "challengeId"]),
  practiceSessions: defineTable({ token: v.string(), challengeId:v.optional(challengeValidator), materialVersion:v.optional(materialVersionValidator), attempts: v.number(), completed:v.optional(v.boolean()), point: v.boolean(), latestAssessmentId:v.optional(v.id("practiceJobs")) }).index("by_token", ["token"]).index("by_token_challenge",["token","challengeId"]),
  practiceJobs: defineTable({ token: v.string(), challengeId:v.optional(challengeValidator), materialVersion:v.optional(materialVersionValidator), requestId: v.string(), kind: v.union(v.literal("generate"), v.literal("assess"), v.literal("recheck")), status: v.union(v.literal("pending"), v.literal("done"), v.literal("failed")), input: v.string(), result: v.optional(v.string()), assessmentId:v.optional(v.id("practiceJobs")), reviewedResult:v.optional(v.string()), rechecked:v.optional(v.boolean()) }).index("by_request", ["token", "requestId"]).index("by_assessment",["assessmentId"]).index("by_token_kind",["token","kind"]).index("by_token_challenge_kind",["token","challengeId","kind"]),
  finalProgress: defineTable({token:v.string(),seen:v.array(challengeValidator),currentId:challengeValidator,badge:v.boolean(),reviewId:v.optional(challengeValidator)}).index("by_token",["token"]),
  practiceUsage: defineTable({ day: v.string(), count: v.number() }).index("by_day", ["day"]),
  m0Checks: defineTable({
    checkTime: v.number(),
    state: v.union(v.literal("Waiting"), v.literal("Needs You")),
    completedAt: v.optional(v.number()),
    isTest: v.literal(true),
  }),
});
