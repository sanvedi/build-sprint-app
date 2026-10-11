import { v } from "convex/values";

// These ceilings limit response size, without changing task or marking instructions.
export const answerTokenLimit = 600;
export const feedbackTokenLimit = 900;
export const aiUsageValidator = v.object({
  inputTokens: v.union(v.number(), v.null()),
  outputTokens: v.union(v.number(), v.null()),
  cachedInputTokens: v.union(v.number(), v.null()),
});
export function recordedUsage(usage: {inputTokens?: number; outputTokens?: number; inputTokenDetails?: {cacheReadTokens?: number}}) {
  return {inputTokens: usage.inputTokens ?? null, outputTokens: usage.outputTokens ?? null, cachedInputTokens: usage.inputTokenDetails?.cacheReadTokens ?? null};
}
