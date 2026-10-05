import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { convexTest } from "convex-test";
import { makeFunctionReference } from "convex/server";

// Execute the actual registered mutations and indexes in Convex's local test database.
// No Google requests, deployed records or real usage allowance are touched.
async function moduleFor(path){
 const output=await build({entryPoints:[path],bundle:true,write:false,format:"esm",platform:"node",plugins:[{name:"resolve-convex",setup(builder){builder.onResolve({filter:/^convex\//},args=>({path:import.meta.resolve(args.path),external:true}));}}]});
 return import("data:text/javascript;base64,"+Buffer.from(output.outputFiles[0].text).toString("base64"));
}
const schema=(await moduleFor("convex/schema.ts")).default;
const data=await moduleFor("convex/practiceData.ts");
const modules={"./_generated/server.ts":async()=>({}),"./practiceData.ts":async()=>data};
const reserve=makeFunctionReference("practiceData:reserve");
const finish=makeFunctionReference("practiceData:finish");
const openFinal=makeFunctionReference("practiceData:openFinal");
const returnToPractice=makeFunctionReference("practiceData:returnToPractice");
const token="f".repeat(64);

test("quiz material is pinned to new sessions and cannot replace legacy saved work",async()=>{
 const t=convexTest(schema,modules);
 const legacy=await t.run(ctx=>ctx.db.insert("practiceSessions",{token,attempts:1,point:true}));
 await assert.rejects(t.mutation(reserve,{token,requestId:"switch-material",kind:"generate",input:"{}",materialVersion:"quiz-v1"}),/TASK_VERSION_CHANGED/);
 assert.equal(await t.run(ctx=>ctx.db.query("practiceUsage").first()),null);
 assert.equal((await t.run(ctx=>ctx.db.get(legacy))).point,true);
 const freshToken="e".repeat(64);
 const answer=await t.mutation(reserve,{token:freshToken,requestId:"quiz-answer",kind:"generate",input:'{"prompt":"Explain mean and median with an example"}',materialVersion:"quiz-v1"});
 assert.equal((await t.run(ctx=>ctx.db.get(answer))).materialVersion,"quiz-v1");
 const session=await t.run(ctx=>ctx.db.query("practiceSessions").withIndex("by_token",q=>q.eq("token",freshToken)).first());
 assert.equal(session.materialVersion,"quiz-v1");
 await assert.rejects(t.mutation(reserve,{token:freshToken,requestId:"switch-back",kind:"generate",input:"{}"}),/TASK_VERSION_CHANGED/);
 assert.equal((await t.run(ctx=>ctx.db.query("practiceUsage").first())).count,1);
});

test("quiz corrections and recheck retain their material version and award one point",async()=>{
 const t=convexTest(schema,modules);
 const first=await t.mutation(reserve,{token,requestId:"quiz-first",kind:"assess",input:input(),materialVersion:"quiz-v1"});
 await t.mutation(finish,{id:first,result:JSON.stringify({earned:false}),earned:false});
 const corrected=await t.mutation(reserve,{token,requestId:"quiz-correction",kind:"assess",input:input(first),materialVersion:"quiz-v1"});
 await t.mutation(finish,{id:corrected,result:JSON.stringify({earned:true}),earned:true});
 const review=await t.mutation(reserve,{token,requestId:"quiz-recheck",kind:"recheck",assessmentId:corrected,input:"{}",materialVersion:"quiz-v1"});
 await t.mutation(finish,{id:review,result:JSON.stringify({earned:true}),earned:true});
 const session=await t.run(ctx=>ctx.db.query("practiceSessions").withIndex("by_token",q=>q.eq("token",token)).first());
 assert.equal(session.attempts,2);assert.equal(session.point,true);assert.equal(session.materialVersion,"quiz-v1");
 await assert.rejects(t.mutation(reserve,{token,requestId:"extra-point",kind:"assess",input:input(corrected),materialVersion:"quiz-v1"}),/PRACTICE_FINISHED/);
});
const input=previous=>JSON.stringify({answerId:"synthetic-answer",previousAssessmentId:previous||null});
async function attempt(t,challengeId,requestId,earned,previous){
 const id=await t.mutation(reserve,{token,challengeId,requestId,kind:"assess",input:input(previous)});
 await t.mutation(finish,{id,result:JSON.stringify({earned}),earned});return id;
}
test("backend blocks practice 2 before completion without reserving AI usage",async()=>{
 const t=convexTest(schema,modules);
 await assert.rejects(t.mutation(reserve,{token,challengeId:"beginner-02",requestId:"skip",kind:"generate",input:"{}"}),/PRACTICE_LOCKED/);
 assert.equal(await t.run(ctx=>ctx.db.query("practiceUsage").first()),null);
});
test("legacy first-practice point unlocks practice 2 and its point remains separate",async()=>{
 const t=convexTest(schema,modules);
 const legacy=await t.run(ctx=>ctx.db.insert("practiceSessions",{token,attempts:1,point:true}));
 const second=await attempt(t,"beginner-02","second",true);
 await t.mutation(finish,{id:second,result:"{}",earned:true});
 const rows=await t.run(ctx=>ctx.db.query("practiceSessions").withIndex("by_token",q=>q.eq("token",token)).take(3));
 assert.equal(rows.length,2);assert.equal(rows.find(r=>r._id===legacy).attempts,1);
 assert.equal(rows.find(r=>r.challengeId==="beginner-02").attempts,1);
 assert.equal(rows.filter(r=>r.point).length,2);
 await assert.rejects(attempt(t,"beginner-02","duplicate",true),/PRACTICE_FINISHED/);
});
test("three unsuccessful assessments unlock practice 2 without borrowing attempts or a point",async()=>{
 const t=convexTest(schema,modules);let previous;
 for(let i=0;i<3;i++)previous=await attempt(t,"beginner-01",`first-${i}`,false,previous);
 await attempt(t,"beginner-02","second",false);
 const rows=await t.run(ctx=>ctx.db.query("practiceSessions").withIndex("by_token",q=>q.eq("token",token)).take(3));
 assert.equal(rows.find(r=>r.challengeId==="beginner-01").attempts,3);
 assert.equal(rows.find(r=>r.challengeId==="beginner-02").attempts,1);
 assert.equal(rows.some(r=>r.point),false);
 await assert.rejects(attempt(t,"beginner-02","wrong-previous",true,previous),/SUBMISSION_UNAVAILABLE/);
});
test("rechecking practice 1 cannot change practice 2's attempt or point",async()=>{
 const t=convexTest(schema,modules);
 const first=await attempt(t,"beginner-01","first",true);
 await attempt(t,"beginner-02","second",true);
 const review=await t.mutation(reserve,{token,challengeId:"beginner-01",requestId:"review",kind:"recheck",assessmentId:first,input:JSON.stringify({assessmentId:first})});
 await t.mutation(finish,{id:review,result:JSON.stringify({earned:true}),earned:true});
 const second=await t.run(ctx=>ctx.db.query("practiceSessions").withIndex("by_token_challenge",q=>q.eq("token",token).eq("challengeId","beginner-02")).unique());
 assert.equal(second.attempts,1);assert.equal(second.point,true);
 await assert.rejects(t.mutation(reserve,{token,challengeId:"beginner-02",requestId:"cross-review",kind:"recheck",assessmentId:first,input:"{}"}),/SUBMISSION_UNAVAILABLE/);
});

async function completedPractices(t){
 await t.run(async ctx=>{for(const challengeId of ["beginner-01","beginner-02"])await ctx.db.insert("practiceSessions",{token,challengeId,attempts:3,point:false});});
}
test("final access requires both practices and the release gate, with no AI reservation",async()=>{
 const t=convexTest(schema,modules);process.env.PROMPT_GAME_FINALS_ENABLED="true";
 await assert.rejects(t.mutation(openFinal,{token}),/PRACTICE_LOCKED/);
 await completedPractices(t);process.env.PROMPT_GAME_FINALS_ENABLED="false";
 await assert.rejects(t.mutation(openFinal,{token}),/FINAL_UNAVAILABLE/);
 assert.equal(await t.run(ctx=>ctx.db.query("practiceUsage").first()),null);
 process.env.PROMPT_GAME_FINALS_ENABLED="true";
});
test("opening a final marks it seen, reopening resumes it and passing awards no practice point",async()=>{
 const t=convexTest(schema,modules);await completedPractices(t);
 const first=await t.mutation(openFinal,{token});const resumed=await t.mutation(openFinal,{token});
 assert.equal(first.challengeId,"beginner-final-01");assert.deepEqual(resumed.seen,["beginner-final-01"]);
 await attempt(t,first.challengeId,"final",true);
 const progress=await t.run(ctx=>ctx.db.query("finalProgress").withIndex("by_token",q=>q.eq("token",token)).unique());
 assert.equal(progress.badge,true);
 const sessions=await t.run(ctx=>ctx.db.query("practiceSessions").withIndex("by_token",q=>q.eq("token",token)).take(8));
 assert.equal(sessions.some(r=>r.point),false);
 await assert.rejects(attempt(t,first.challengeId,"duplicate-final",true),/PRACTICE_FINISHED/);
});
test("a failed final requires supported practice before the unseen alternate and exhausted variants stay locked",async()=>{
 const t=convexTest(schema,modules);await completedPractices(t);
 const first=await t.mutation(openFinal,{token});await attempt(t,first.challengeId,"final-fail",false);
 await assert.rejects(t.mutation(openFinal,{token}),/FINAL_PRACTICE_REQUIRED/);
 await attempt(t,"beginner-review-01","review",true);
 const alternate=await t.mutation(openFinal,{token});assert.equal(alternate.challengeId,"beginner-final-02");
 assert.deepEqual(alternate.seen,["beginner-final-01","beginner-final-02"]);
 await attempt(t,alternate.challengeId,"alternate-fail",false);
 await assert.rejects(t.mutation(openFinal,{token}),/FINAL_VARIANTS_EXHAUSTED/);
 const progress=await t.run(ctx=>ctx.db.query("finalProgress").withIndex("by_token",q=>q.eq("token",token)).unique());
 assert.equal(progress.badge,false);
 const returned=await t.mutation(returnToPractice,{token});assert.equal(returned.attempts,0);
 await attempt(t,returned.challengeId,"supported-again",true);
 await assert.rejects(t.mutation(openFinal,{token}),/FINAL_VARIANTS_EXHAUSTED/);
});

test("a final recheck can revoke a badge without adding an attempt or practice point",async()=>{
 const t=convexTest(schema,modules);await completedPractices(t);const opened=await t.mutation(openFinal,{token});
 const first=await attempt(t,opened.challengeId,"final-pass",true);
 const id=await t.mutation(reserve,{token,challengeId:opened.challengeId,requestId:"final-review",kind:"recheck",assessmentId:first,input:JSON.stringify({assessmentId:first})});
 await t.mutation(finish,{id,result:JSON.stringify({earned:false,route:"judgment"}),earned:false});
 const progress=await t.run(ctx=>ctx.db.query("finalProgress").withIndex("by_token",q=>q.eq("token",token)).unique());
 assert.equal(progress.badge,false);assert.equal(progress.reviewId,"beginner-review-02");
 const session=await t.run(ctx=>ctx.db.query("practiceSessions").withIndex("by_token_challenge",q=>q.eq("token",token).eq("challengeId",opened.challengeId)).unique());
 assert.equal(session.attempts,1);assert.equal(session.point,false);
});

test("an old supported-practice recheck cannot complete a new practice replay",async()=>{
 const t=convexTest(schema,modules);await completedPractices(t);await t.mutation(openFinal,{token});
 await attempt(t,"beginner-final-01","first-fail",false);
 const old=await attempt(t,"beginner-review-01","first-review",true);
 await t.mutation(openFinal,{token});await attempt(t,"beginner-final-02","second-fail",false);
 await t.mutation(returnToPractice,{token});
 await assert.rejects(t.mutation(reserve,{token,challengeId:"beginner-review-01",requestId:"old-review",kind:"recheck",assessmentId:old,input:"{}"}),/SUBMISSION_UNAVAILABLE/);
});
