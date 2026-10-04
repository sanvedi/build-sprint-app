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
const token="f".repeat(64);
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
