import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { convexTest } from "convex-test";
import { makeFunctionReference } from "convex/server";

// Execute the actual registered mutations and indexes in Convex's local test database.
// No provider requests, deployed records or real usage allowance are touched.
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

test("daily cap blocks the next request across devices and failed calls remain counted",async()=>{
 const t=convexTest(schema,modules);
 const day=new Date().toISOString().slice(0,10);
 const cap=Number(process.env.PROMPT_GAME_DAILY_CALL_LIMIT||"20");
 await t.run(ctx=>ctx.db.insert("practiceUsage",{day,count:cap-1}));
 const id=await t.mutation(reserve,{token,requestId:"last-allowed",kind:"generate",input:"{}"});
 await t.mutation(makeFunctionReference("practiceData:failed"),{id});
 await assert.rejects(t.mutation(reserve,{token:"e".repeat(64),requestId:"other-device",kind:"generate",input:"{}"}),/DAILY_ALLOWANCE_REACHED/);
 const usage=await t.run(ctx=>ctx.db.query("practiceUsage").withIndex("by_day",q=>q.eq("day",day)).unique());
 assert.equal(usage.count,cap);
 const session=await t.run(ctx=>ctx.db.query("practiceSessions").withIndex("by_token",q=>q.eq("token",token)).unique());
 assert.equal(session.attempts,0);assert.equal(session.point,false);
 assert.equal(await t.run(ctx=>ctx.db.query("practiceSessions").withIndex("by_token",q=>q.eq("token","e".repeat(64))).unique()),null);
});

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
 const answer=await seedAnswer(t,"beginner-01","quiz-v1");
 const first=await t.mutation(reserve,{token,requestId:"quiz-first",kind:"assess",input:input(null,answer),materialVersion:"quiz-v1"});
 await t.mutation(finish,{id:first,result:JSON.stringify({earned:false}),earned:false});
 const corrected=await t.mutation(reserve,{token,requestId:"quiz-correction",kind:"assess",input:input(first,answer),materialVersion:"quiz-v1"});
 await t.mutation(finish,{id:corrected,result:JSON.stringify({earned:true}),earned:true});
 const review=await t.mutation(reserve,{token,requestId:"quiz-recheck",kind:"recheck",assessmentId:corrected,input:"{}",materialVersion:"quiz-v1"});
 await t.mutation(finish,{id:review,result:JSON.stringify({earned:true}),earned:true});
 const session=await t.run(ctx=>ctx.db.query("practiceSessions").withIndex("by_token",q=>q.eq("token",token)).first());
 assert.equal(session.attempts,2);assert.equal(session.point,true);assert.equal(session.materialVersion,"quiz-v1");
 await assert.rejects(t.mutation(reserve,{token,requestId:"extra-point",kind:"assess",input:input(corrected),materialVersion:"quiz-v1"}),/PRACTICE_FINISHED/);
});
const input=(previous,answerId="synthetic-answer",judgment="Checked the answer",explanation="")=>JSON.stringify({answerId,judgment,explanation,previousAssessmentId:previous||null});
async function seedAnswer(t,challengeId="beginner-01",materialVersion="legacy-v1",prompt="Prepared request",text="Prepared AI answer",owner=token){
 return t.run(ctx=>ctx.db.insert("practiceJobs",{token:owner,challengeId,materialVersion,requestId:crypto.randomUUID(),kind:"generate",status:"done",input:JSON.stringify({prompt}),result:text}));
}
async function attempt(t,challengeId,requestId,earned,previous){
 const answer=await seedAnswer(t,challengeId);
 const id=await t.mutation(reserve,{token,challengeId,requestId,kind:"assess",input:input(previous,answer)});
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

test("attempt history keeps the first answer through prompt and judgment corrections without duplicate retries or rechecks",async()=>{
 const t=convexTest(schema,modules);
 const original=await seedAnswer(t,"beginner-01","legacy-v1","Weak prompt","## Exact first AI answer\n$30 \\div 5$");
 async function submit(requestId,answerId,previous,judgment,explanation,earned=false){
  const id=await t.mutation(reserve,{token,requestId,kind:"assess",input:input(previous,answerId,judgment,explanation)});
  await t.mutation(finish,{id,result:JSON.stringify({earned}),earned});return id;
 }
 const first=await submit("history-first",original,null,"First judgment","");
 const revised=await seedAnswer(t,"beginner-01","legacy-v1","Improved prompt","Revised AI answer");
 const second=await submit("history-second",revised,first,"Second judgment","Added needed facts");
 const third=await submit("history-third",revised,second,"Corrected judgment","Checked the missing fact",true);
 await t.mutation(finish,{id:third,result:"{}",earned:true});
 const review=await t.mutation(reserve,{token,requestId:"history-review",kind:"recheck",assessmentId:third,input:"{}"});
 await t.mutation(finish,{id:review,result:JSON.stringify({earned:true}),earned:true});
 const rows=await t.run(ctx=>ctx.db.query("learningAttempts").withIndex("by_token_challenge",q=>q.eq("token",token).eq("challengeId","beginner-01")).take(4));
 assert.equal(rows.length,3);
 assert.deepEqual(rows.map(r=>r.changeType),["initial","prompt","judgment"]);
 assert.deepEqual(rows.map(r=>r.attemptNumber),[1,2,3]);
 assert.equal(rows[0].firstAIAnswerText,"## Exact first AI answer\n$30 \\div 5$");
 assert.equal(rows[2].firstAIAnswerText,rows[0].firstAIAnswerText);
 assert.equal(rows[2].firstPromptText,"Weak prompt");assert.equal(rows[2].submittedPromptText,"Improved prompt");
 assert.equal(rows[2].currentAIAnswerText,"Revised AI answer");assert.equal(rows[2].previousJudgmentText,"Second judgment");
 assert.equal(rows[2].submittedJudgmentText,"Corrected judgment");assert.equal(rows[2].changeExplanation,"Checked the missing fact");
 assert.equal(rows[2].previousAttemptId,rows[1]._id);assert.equal(rows[1].previousAttemptId,rows[0]._id);
 assert.equal(rows[0].changeExplanation,undefined);assert.equal(rows[0].studentEditedAnswerText,undefined);
 assert.equal(rows[2].generationJobId,revised);assert.equal(rows[2].assessmentJobId,third);
 const session=await t.run(ctx=>ctx.db.query("practiceSessions").withIndex("by_token",q=>q.eq("token",token)).unique());
 assert.equal(session.attempts,3);assert.equal(session.point,true);
});

test("failed assessments write no attempt history; a successful retry writes once",async()=>{
 const t=convexTest(schema,modules);const answer=await seedAnswer(t);
 const args={token,requestId:"failed-history",kind:"assess",input:input(null,answer)};
 const id=await t.mutation(reserve,args);
 await t.mutation(makeFunctionReference("practiceData:failed"),{id});
 assert.equal(await t.run(ctx=>ctx.db.query("learningAttempts").first()),null);
 assert.equal(await t.mutation(reserve,args),id);
 await t.mutation(finish,{id,result:JSON.stringify({earned:true}),earned:true});
 await t.mutation(finish,{id,result:"{}",earned:true});
 assert.equal((await t.run(ctx=>ctx.db.query("learningAttempts").take(2))).length,1);
});

test("a correction of older saved work recovers the original answer without rewriting historical jobs",async()=>{
 const t=convexTest(schema,modules);
 const original=await seedAnswer(t,"beginner-01","legacy-v1","Original saved prompt","Original saved answer");
 const oldInput=input(null,original,"Old judgment","");
 const historical=await t.run(async ctx=>{
  const id=await ctx.db.insert("practiceJobs",{token,requestId:"historical",kind:"assess",status:"done",input:oldInput,result:JSON.stringify({earned:false})});
  await ctx.db.insert("practiceSessions",{token,attempts:1,point:false,latestAssessmentId:id});return id;
 });
 const revised=await seedAnswer(t,"beginner-01","legacy-v1","Changed saved prompt","Changed AI answer");
 const id=await t.mutation(reserve,{token,requestId:"legacy-correction",kind:"assess",input:input(historical,revised,"New judgment","Added missing facts")});
 await t.mutation(finish,{id,result:JSON.stringify({earned:true}),earned:true});
 const row=await t.run(ctx=>ctx.db.query("learningAttempts").withIndex("by_assessment",q=>q.eq("assessmentJobId",id)).unique());
 assert.equal(row.firstPromptText,"Original saved prompt");assert.equal(row.firstAIAnswerText,"Original saved answer");
 assert.equal(row.currentAIAnswerText,"Changed AI answer");assert.equal(row.previousJudgmentText,"Old judgment");
 assert.equal(row.attemptNumber,2);assert.equal(row.previousAttemptId,undefined);
 assert.equal((await t.run(ctx=>ctx.db.get(historical))).input,oldInput);
 assert.equal((await t.run(ctx=>ctx.db.query("learningAttempts").take(2))).length,1);
});

test("an answer belonging to another student cannot create history or change points and attempts",async()=>{
 const t=convexTest(schema,modules);const foreign=await seedAnswer(t,"beginner-01","legacy-v1","Other prompt","Other answer","a".repeat(64));
 const id=await t.mutation(reserve,{token,requestId:"foreign-history",kind:"assess",input:input(null,foreign)});
 await assert.rejects(t.mutation(finish,{id,result:JSON.stringify({earned:true}),earned:true}),/SUBMISSION_UNAVAILABLE/);
 assert.equal(await t.run(ctx=>ctx.db.query("learningAttempts").first()),null);
 const session=await t.run(ctx=>ctx.db.query("practiceSessions").withIndex("by_token",q=>q.eq("token",token)).unique());
 assert.equal(session.attempts,0);assert.equal(session.point,false);
 assert.equal((await t.run(ctx=>ctx.db.get(id))).status,"pending");
});
