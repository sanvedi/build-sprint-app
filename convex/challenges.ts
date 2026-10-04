import { v } from "convex/values";
export const challengeValidator=v.union(v.literal("beginner-01"),v.literal("beginner-02"),v.literal("beginner-review-01"),v.literal("beginner-review-02"),v.literal("beginner-final-01"),v.literal("beginner-final-02"));
export type Challenge="beginner-01"|"beginner-02"|"beginner-review-01"|"beginner-review-02"|"beginner-final-01"|"beginner-final-02";
