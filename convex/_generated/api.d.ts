/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as advanced from "../advanced.js";
import type * as advancedActions from "../advancedActions.js";
import type * as advancedValidators from "../advancedValidators.js";
import type * as aiUsage from "../aiUsage.js";
import type * as allowance from "../allowance.js";
import type * as assessmentRules from "../assessmentRules.js";
import type * as challenges from "../challenges.js";
import type * as firstFix from "../firstFix.js";
import type * as http from "../http.js";
import type * as learningAttempts from "../learningAttempts.js";
import type * as practice from "../practice.js";
import type * as practiceAI from "../practiceAI.js";
import type * as practiceData from "../practiceData.js";
import type * as teacher from "../teacher.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  advanced: typeof advanced;
  advancedActions: typeof advancedActions;
  advancedValidators: typeof advancedValidators;
  aiUsage: typeof aiUsage;
  allowance: typeof allowance;
  assessmentRules: typeof assessmentRules;
  challenges: typeof challenges;
  firstFix: typeof firstFix;
  http: typeof http;
  learningAttempts: typeof learningAttempts;
  practice: typeof practice;
  practiceAI: typeof practiceAI;
  practiceData: typeof practiceData;
  teacher: typeof teacher;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  agent: import("@convex-dev/agent/_generated/component.js").ComponentApi<"agent">;
  staticHosting: import("@convex-dev/static-hosting/_generated/component.js").ComponentApi<"staticHosting">;
};
