import { internalMutation, internalQuery } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import type { MutationCtx } from "./_generated/server";
import { practiceFinished } from "../shared/practiceTasks.mjs";

type Challenge = "beginner-01" | "beginner-02";
async function sessionFor(ctx:MutationCtx,token:string,challengeId:Challenge){
  const current=await ctx.db.query("practiceSessions").withIndex("by_token_challenge",q=>q.eq("token",token).eq("challengeId",challengeId)).unique();
  // Existing rows belong to practice 1. Keep them and their rewards unchanged.
  return current || (challengeId==="beginner-01" ? await ctx.db.query("practiceSessions").withIndex("by_token_challenge",q=>q.eq("token",token).eq("challengeId",undefined)).unique() : null);
}
async function latestFor(ctx:MutationCtx,token:string,challengeId:Challenge){
  const latest=await ctx.db.query("practiceJobs").withIndex("by_token_challenge_kind",q=>q.eq("token",token).eq("challengeId",challengeId).eq("kind","assess")).order("desc").first();
  return latest || (challengeId==="beginner-01" ? await ctx.db.query("practiceJobs").withIndex("by_token_challenge_kind",q=>q.eq("token",token).eq("challengeId",undefined).eq("kind","assess")).order("desc").first() : null);
}

export const job = internalQuery({
  args:{token:v.string(),requestId:v.string()},returns:v.any(),
  handler:async(ctx,a)=>ctx.db.query("practiceJobs").withIndex("by_request",q=>q.eq("token",a.token).eq("requestId",a.requestId)).unique(),
});
export const owned = internalQuery({
  args:{token:v.string(),id:v.id("practiceJobs")},returns:v.any(),
  handler:async(ctx,a)=>{const job=await ctx.db.get(a.id);if(!job||job.token!==a.token||job.status!=="done")throw new ConvexError("SUBMISSION_UNAVAILABLE");return {...job,result:job.reviewedResult||job.result};},
});
export const reserve = internalMutation({
  args:{token:v.string(),requestId:v.string(),challengeId:v.optional(v.union(v.literal("beginner-01"),v.literal("beginner-02"))),kind:v.union(v.literal("generate"),v.literal("assess"),v.literal("recheck")),input:v.string(),assessmentId:v.optional(v.id("practiceJobs"))},returns:v.id("practiceJobs"),
  handler:async(ctx,a)=>{
    if(!/^[a-f0-9]{64}$/.test(a.token)||a.requestId.length>100||a.input.length>20000)throw new ConvexError("INVALID_SUBMISSION");
    const existing=await ctx.db.query("practiceJobs").withIndex("by_request",q=>q.eq("token",a.token).eq("requestId",a.requestId)).unique();
    const challengeId=a.challengeId||"beginner-01";
    if(existing){if(existing.input!==a.input||existing.kind!==a.kind||(existing.challengeId||"beginner-01")!==challengeId)throw new ConvexError("SUBMISSION_CHANGED");if(existing.status!=="failed")throw new ConvexError("REQUEST_PENDING");}
    const session=await sessionFor(ctx,a.token,challengeId);
    if(challengeId==="beginner-02"&&!practiceFinished(await sessionFor(ctx,a.token,"beginner-01")))throw new ConvexError("PRACTICE_LOCKED");
    if(a.kind==="assess"&&session&&(session.attempts>=3||session.point))throw new ConvexError("PRACTICE_FINISHED");
    if(a.kind==="assess"&&session?.attempts){
      const previous=JSON.parse(a.input).previousAssessmentId;
      const latest=session.latestAssessmentId||(await latestFor(ctx,a.token,challengeId))?._id;
      if(previous!==latest)throw new ConvexError("SUBMISSION_UNAVAILABLE");
    }
    if(a.kind==="recheck"){
      const latest=session?.latestAssessmentId||(await latestFor(ctx,a.token,challengeId))?._id;
      const assessment=a.assessmentId?await ctx.db.get(a.assessmentId):null;
      if(!assessment||assessment.token!==a.token||(assessment.challengeId||"beginner-01")!==challengeId||assessment.kind!=="assess"||assessment.status!=="done"||latest!==assessment._id)throw new ConvexError("SUBMISSION_UNAVAILABLE");
      const review=await ctx.db.query("practiceJobs").withIndex("by_assessment",q=>q.eq("assessmentId",a.assessmentId)).unique();
      if(review&&review._id!==existing?._id)throw new ConvexError("REQUEST_PENDING");
      if(assessment.rechecked)throw new ConvexError("PRACTICE_FINISHED");
    }
    const day=new Date().toISOString().slice(0,10);
    const usage=await ctx.db.query("practiceUsage").withIndex("by_day",q=>q.eq("day",day)).unique();
    const cap=Number(process.env.PROMPT_GAME_DAILY_CALL_LIMIT||"20");
    if(!Number.isInteger(cap)||cap<1||cap>100||usage&&usage.count>=cap)throw new ConvexError("DAILY_ALLOWANCE_REACHED");
    if(usage)await ctx.db.patch(usage._id,{count:usage.count+1});else await ctx.db.insert("practiceUsage",{day,count:1});
    if(!session)await ctx.db.insert("practiceSessions",{token:a.token,challengeId,attempts:0,point:false});
    if(existing){await ctx.db.patch(existing._id,{status:"pending"});return existing._id;}
    return ctx.db.insert("practiceJobs",{...a,challengeId,status:"pending"});
  },
});
export const finish = internalMutation({
  args:{id:v.id("practiceJobs"),result:v.string(),earned:v.optional(v.boolean())},returns:v.null(),
  handler:async(ctx,a)=>{
    const job=await ctx.db.get(a.id);if(!job||job.status==="done")return null;
    if(job.kind==="assess"){
      const session=await sessionFor(ctx,job.token,job.challengeId||"beginner-01");
      if(!session||session.attempts>=3||session.point)throw new ConvexError("PRACTICE_FINISHED");
      await ctx.db.patch(session._id,{attempts:session.attempts+1,point:session.point||!!a.earned,latestAssessmentId:job._id});
    }
    if(job.kind==="recheck"){
      const original=job.assessmentId?await ctx.db.get(job.assessmentId):null;
      const session=await sessionFor(ctx,job.token,job.challengeId||"beginner-01");
      if(!original||!session||session.latestAssessmentId&&session.latestAssessmentId!==original._id)throw new ConvexError("SUBMISSION_UNAVAILABLE");
      await ctx.db.patch(original._id,{reviewedResult:a.result,rechecked:true});
      await ctx.db.patch(session._id,{point:!!a.earned,latestAssessmentId:original._id});
    }
    await ctx.db.patch(job._id,{status:"done",result:a.result});return null;
  },
});
export const failed = internalMutation({args:{id:v.id("practiceJobs")},returns:v.null(),handler:async(ctx,a)=>{const job=await ctx.db.get(a.id);if(job&&job.status!=="done")await ctx.db.patch(a.id,{status:"failed"});return null;}});
