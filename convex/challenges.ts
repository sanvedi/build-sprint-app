import { v } from "convex/values";
export const materialVersionValidator=v.union(v.literal("legacy-v1"),v.literal("quiz-v1"),v.literal("missions-v1"));
export const practiceValidator=v.union(v.literal("beginner-01"),v.literal("beginner-02"),v.literal("path-A-01"),v.literal("path-A-02"),v.literal("path-B-01"),v.literal("path-B-02"),v.literal("path-C-01"),v.literal("path-C-02"));
export const challengeValidator=v.union(practiceValidator,v.literal("beginner-review-01"),v.literal("beginner-review-02"),v.literal("beginner-final-01"),v.literal("beginner-final-02"));
export type Practice="beginner-01"|"beginner-02"|"path-A-01"|"path-A-02"|"path-B-01"|"path-B-02"|"path-C-01"|"path-C-02";
export type Challenge=Practice|"beginner-review-01"|"beginner-review-02"|"beginner-final-01"|"beginner-final-02";
