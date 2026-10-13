import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v, ConvexError } from "convex/values";
import { configuredAgent } from "./practiceAI";
import { reserveAllowance } from "./allowance";
import { answerTokenLimit, recordedUsage, aiUsageValidator } from "./aiUsage";
export const pathValidator = v.union(v.literal("A"), v.literal("B"), v.literal("C"));
const input = { token:v.string(), path:pathValidator, requestId:v.string(), prompt:v.string() };
export const reserve = internalMutation({args:input, returns:v.any(), handler:async(ctx,a)=>{
  if(!/^[a-f0-9]{64}$/.test(a.token)||!a.requestId||a.requestId.length>100||!a.prompt.trim()||a.prompt.length>6000)throw new ConvexError("INVALID_SUBMISSION");
  const old=await ctx.db.query("firstFixJobs").withIndex("by_request",q=>q.eq("token",a.token).eq("requestId",a.requestId)).unique();
  if(old&&(old.path!==a.path||old.prompt!==a.prompt))throw new ConvexError("SUBMISSION_CHANGED");
  if(old?.status==="done"&&old.answer)return {id:old._id,text:old.answer};
  if(await ctx.db.query("firstFixJobs").withIndex("by_pending",q=>q.eq("token",a.token).eq("path",a.path).eq("status","pending")).first())throw new ConvexError("REQUEST_PENDING");
  await reserveAllowance(ctx,a.token);
  if(old){await ctx.db.patch(old._id,{status:"pending"});return {id:old._id,text:null};}
  return {id:await ctx.db.insert("firstFixJobs",{...a,status:"pending"}),text:null};
}});
export const finish = internalMutation({args:{id:v.id("firstFixJobs"),answer:v.string(),aiUsage:aiUsageValidator},returns:v.null(),handler:async(ctx,a)=>{
  const job=await ctx.db.get(a.id);if(job?.status==="pending")await ctx.db.patch(a.id,{answer:a.answer,aiUsage:a.aiUsage,status:"done"});return null;
}});
export const failed = internalMutation({args:{id:v.id("firstFixJobs")},returns:v.null(),handler:async(ctx,a)=>{
  const job=await ctx.db.get(a.id);if(job?.status==="pending")await ctx.db.patch(a.id,{status:"failed"});return null;
}});
export const generate = action({args:input,returns:v.object({id:v.id("firstFixJobs"),text:v.string()}),handler:async(ctx,a):Promise<{id:any;text:string}>=>{
  const agent=configuredAgent(true),job=await ctx.runMutation(internal.firstFix.reserve,a);
  if(typeof job.text==="string")return {id:job.id,text:job.text};
  try{
    const output=await agent.generateText(ctx,{userId:a.token},{prompt:JSON.stringify({studentRequest:a.prompt,answerRules:"Produce a short announcement, at most 40 words, using only details in the student request. Do not invent a place, time, date or other arrangements. Do not provide prompt coaching."}),maxOutputTokens:answerTokenLimit,maxRetries:0,providerOptions:{openai:{reasoningEffort:"none",store:false}}});
    if(output.finishReason==="length"||!output.text.trim())throw new Error("Incomplete answer");
    await ctx.runMutation(internal.firstFix.finish,{id:job.id,answer:output.text,aiUsage:recordedUsage(output.totalUsage)});
    return {id:job.id,text:output.text};
  }catch{await ctx.runMutation(internal.firstFix.failed,{id:job.id});throw new ConvexError("GENERATION_UNAVAILABLE");}
}});
