import { advancedKind } from "./advancedValidators";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { aiUsageValidator } from "./aiUsage";
import { challengeValidator, materialVersionValidator, practiceValidator } from "./challenges";

// Retired setup-test data only; retained to avoid deleting historical rows.
// Not game progress. No active scheduling functions use this table.
export default defineSchema({
  firstFixJobs: defineTable({token:v.string(),path:v.union(v.literal("A"),v.literal("B"),v.literal("C")),requestId:v.string(),prompt:v.string(),status:v.union(v.literal("pending"),v.literal("done"),v.literal("failed")),answer:v.optional(v.string()),aiUsage:v.optional(aiUsageValidator)}).index("by_request",["token","requestId"]).index("by_pending",["token","path","status"]),
  advancedUnlocks: defineTable({code:v.string(),playerName:v.string(),createdAt:v.number(),requestId:v.string()}).index("by_code",["code"]).index("by_request",["requestId"]).index("by_created",["createdAt"]),
  advancedProgress: defineTable({unlockId:v.id("advancedUnlocks"),state:v.string(),revision:v.number(),pendingJobId:v.optional(v.id("advancedJobs")),completedAt:v.optional(v.number())}).index("by_unlock",["unlockId"]),
  advancedAccess: defineTable({token:v.string(),unlockId:v.id("advancedUnlocks")}).index("by_token",["token"]),
  advancedCodeAttempts: defineTable({token:v.string(),hour:v.string(),count:v.number()}).index("by_token_hour",["token","hour"]),
  advancedJobs: defineTable({unlockId:v.id("advancedUnlocks"),requestId:v.string(),kind:advancedKind,input:v.string(),status:v.union(v.literal("pending"),v.literal("done"),v.literal("failed")),result:v.optional(v.string()),aiUsage:v.optional(aiUsageValidator)}).index("by_unlock_request",["unlockId","requestId"]),
  studentProfiles: defineTable({ token: v.string(), firstName: v.string(), nameChosen: v.optional(v.boolean()) }).index("by_token", ["token"]),
  usageVisits: defineTable({
    token: v.string(), visitId: v.string(), firstName: v.string(), browserLabel: v.string(),
    visitedAt: v.number(), practice1StartedAt: v.optional(v.number()), practice2StartedAt: v.optional(v.number()),
    teachingVersion: v.optional(v.literal("picnic-v1")),
    pathVersion: v.optional(v.literal("stories-v1")), pathId: v.optional(v.union(v.literal("A"), v.literal("B"), v.literal("C"))),
  }).index("by_visit", ["visitId"]).index("by_time", ["visitedAt"]),
  teachingAnswers: defineTable({ token: v.string(), optionIndex: v.union(v.literal(0), v.literal(1), v.literal(2)), correct: v.boolean(), answeredAt: v.number() }).index("by_token", ["token"]),
  practiceCompletions: defineTable({
    token: v.string(), challengeId: practiceValidator, pathId: v.optional(v.union(v.literal("A"), v.literal("B"), v.literal("C"))),
    firstName: v.string(), practiceNumber: v.number(), pointsEarned: v.number(),
    completedAt: v.union(v.number(), v.null()), sortTime: v.number(), completed: v.boolean(),
  }).index("by_token_challenge", ["token", "challengeId"]).index("by_completed_time", ["completed", "sortTime"]),
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
  practiceJobs: defineTable({ token: v.string(), challengeId:v.optional(challengeValidator), materialVersion:v.optional(materialVersionValidator), requestId: v.string(), kind: v.union(v.literal("generate"), v.literal("assess"), v.literal("recheck")), status: v.union(v.literal("pending"), v.literal("done"), v.literal("failed")), input: v.string(), result: v.optional(v.string()), assessmentId:v.optional(v.id("practiceJobs")), reviewedResult:v.optional(v.string()), rechecked:v.optional(v.boolean()), aiUsage:v.optional(aiUsageValidator) }).index("by_request", ["token", "requestId"]).index("by_assessment",["assessmentId"]).index("by_token_kind",["token","kind"]).index("by_token_challenge_kind",["token","challengeId","kind"]),
  finalProgress: defineTable({token:v.string(),seen:v.array(challengeValidator),currentId:challengeValidator,badge:v.boolean(),reviewId:v.optional(challengeValidator)}).index("by_token",["token"]),
  playerUsage: defineTable({ token: v.string(), day: v.string(), count: v.number() }).index("by_token_day", ["token", "day"]),
  practiceUsage: defineTable({ day: v.string(), count: v.number() }).index("by_day", ["day"]),
  m0Checks: defineTable({
    checkTime: v.number(),
    state: v.union(v.literal("Waiting"), v.literal("Needs You")),
    completedAt: v.optional(v.number()),
    isTest: v.literal(true),
  }),
});
