import test from "node:test";
import assert from "node:assert/strict";
import { createUsageTracking } from "../src/usageTracking.mjs";
import { build } from "esbuild";
import { convexTest } from "convex-test";
import { makeFunctionReference } from "convex/server";

async function moduleFor(path) {
  const result = await build({entryPoints:[path],bundle:true,write:false,format:"esm",platform:"node",plugins:[{name:"convex",setup(b){b.onResolve({filter:/^convex\//},a=>({path:import.meta.resolve(a.path),external:true}));}}]});
  return import("data:text/javascript;base64,"+Buffer.from(result.outputFiles[0].text).toString("base64"));
}
const schema=(await moduleFor("convex/schema.ts")).default;
const teacher=await moduleFor("convex/teacher.ts");
const modules={"./_generated/server.ts":async()=>({}),"./teacher.ts":async()=>teacher};
const ref=name=>makeFunctionReference(`teacher:${name}`);
const token="a".repeat(64),visitId="c".repeat(64);
const storage=()=>{const values=new Map();return {get length(){return values.size;},key:i=>[...values.keys()][i],getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};};

test("visits, names and starts survive retries without duplicate records or AI usage",async()=>{
  const t=convexTest(schema,modules);
  await t.mutation(ref("recordVisit"),{token,visitId});
  let visit=await t.run(ctx=>ctx.db.query("usageVisits").first());
  assert.equal(visit.firstName,"Guest");assert.equal(visit.practice1StartedAt,undefined);
  const time=visit.visitedAt;
  assert.equal(await t.mutation(ref("saveFirstName"),{token,visitId,firstName:"Test"}),"Test");
  await t.mutation(ref("recordPracticeStart"),{token,visitId,challengeId:"beginner-01"});
  visit=await t.run(ctx=>ctx.db.query("usageVisits").first());const started=visit.practice1StartedAt;
  await t.mutation(ref("recordVisit"),{token,visitId});
  await t.mutation(ref("recordPracticeStart"),{token,visitId,challengeId:"beginner-01"});
  const rows=await t.run(ctx=>ctx.db.query("usageVisits").take(10));
  assert.equal(rows.length,1);assert.equal(rows[0].visitedAt,time);assert.equal(rows[0].firstName,"Test");assert.equal(rows[0].practice1StartedAt,started);
  for(const table of ["practiceUsage","practiceSessions","practiceJobs","practiceCompletions"])assert.equal(await t.run(ctx=>ctx.db.query(table).first()),null);
});
test("starts arriving before visits and names are saved correctly; another device cannot claim a visit",async()=>{
  const t=convexTest(schema,modules);
  await t.mutation(ref("recordPracticeStart"),{token,visitId,challengeId:"beginner-02"});
  await t.mutation(ref("saveFirstName"),{token,visitId,firstName:"Test"});
  await assert.rejects(t.mutation(ref("recordVisit"),{token:"b".repeat(64),visitId}),/VISIT_UNAVAILABLE/);
  await assert.rejects(t.mutation(ref("saveFirstName"),{token:"b".repeat(64),visitId,firstName:"Other"}),/VISIT_UNAVAILABLE/);
  const visit=await t.run(ctx=>ctx.db.query("usageVisits").first());assert.equal(visit.firstName,"Test");assert.ok(visit.practice2StartedAt);assert.equal(visit.practice1StartedAt,undefined);
});
test("separate visits share a browser label, retain earlier Guest labels and protected lists expose no owner tokens",async()=>{
  const t=convexTest(schema,modules),second="d".repeat(64);
  await t.mutation(ref("recordVisit"),{token,visitId});
  await t.mutation(ref("saveFirstName"),{token,firstName:"Test"});
  await t.mutation(ref("recordVisit"),{token,visitId:second});
  const old=process.env.PROMPT_GAME_TEACHER_VIEW_TOKEN;process.env.PROMPT_GAME_TEACHER_VIEW_TOKEN="e".repeat(64);
  try{
    await assert.rejects(t.query(ref("listVisits"),{viewToken:"wrong",paginationOpts:{cursor:null,numItems:100}}),/TEACHER_PAGE_UNAVAILABLE/);
    const result=await t.query(ref("listVisits"),{viewToken:"e".repeat(64),paginationOpts:{cursor:null,numItems:100}});
    assert.deepEqual(result.page.map(r=>r.firstName),["Test","Guest"]);assert.equal(result.page[0].browserLabel,result.page[1].browserLabel);assert.doesNotMatch(JSON.stringify(result),new RegExp(token));assert.ok(result.page.every(r=>!("token" in r)&&!("visitId" in r)));
  }finally{if(old===undefined)delete process.env.PROMPT_GAME_TEACHER_VIEW_TOKEN;else process.env.PROMPT_GAME_TEACHER_VIEW_TOKEN=old;}
});
test("offline usage stays queued across reload and replays only recording events",async()=>{
  const persistent=storage(),tab=storage(),sent=[],states=[];
  const broken=createUsageTracking({token,storage:persistent,tabStorage:tab,status:s=>states.push(s),send:async()=>{throw Error("offline");}});
  await broken.visit();await broken.start("beginner-01");assert.equal(persistent.length,2);assert.equal(states.at(-1),true);
  const recovered=createUsageTracking({token,storage:persistent,tabStorage:tab,status:s=>states.push(s),send:async event=>sent.push(event)});
  assert.equal(recovered.visitId,broken.visitId);await recovered.retry();assert.equal(persistent.length,0);assert.equal(sent.length,2);assert.deepEqual(sent.map(e=>e.challengeId||"visit"),["visit","beginner-01"]);assert.equal(states.at(-1),false);
});
test("unavailable storage still records within the open page",async()=>{
  const blocked={get length(){throw Error("blocked");},getItem(){throw Error("blocked");},setItem(){throw Error("blocked");},removeItem(){throw Error("blocked");}},sent=[];
  const tracking=createUsageTracking({token,storage:blocked,tabStorage:blocked,send:async e=>sent.push(e)});
  await tracking.visit();await tracking.start("beginner-01");assert.equal(sent.length,2);assert.equal(sent[0].visitId,sent[1].visitId);
});

test("teaching answers derive correctness on the server, preserve the first choice and consume no practice resources",async()=>{
  const t=convexTest(schema,modules);
  assert.equal(await t.query(ref("getTeachingAnswer"),{token}),null);
  const first=await t.mutation(ref("saveTeachingAnswer"),{token,visitId,optionIndex:1});
  assert.equal(first.correct,false);assert.ok(first.answeredAt>0);
  assert.deepEqual(await t.mutation(ref("saveTeachingAnswer"),{token,visitId,optionIndex:0}),first);
  assert.deepEqual(await t.query(ref("getTeachingAnswer"),{token}),first);
  assert.equal((await t.run(ctx=>ctx.db.query("teachingAnswers").take(10))).length,1);
  const right=await t.mutation(ref("saveTeachingAnswer"),{token:"e".repeat(64),visitId:"b".repeat(64),optionIndex:0});assert.equal(right.correct,true);
  for(const table of ["practiceUsage","practiceSessions","practiceJobs","practiceCompletions"])assert.equal(await t.run(ctx=>ctx.db.query(table).first()),null);
});
test("teacher quiz column uses the same browser reference and leaves earlier rows empty",async()=>{
  const t=convexTest(schema,modules);
  await t.run(ctx=>ctx.db.insert("usageVisits",{token,visitId:"d".repeat(64),firstName:"Guest",browserLabel:"Earlier browser",visitedAt:1}));
  await t.mutation(ref("saveTeachingAnswer"),{token,visitId,optionIndex:0});
  const old=process.env.PROMPT_GAME_TEACHER_VIEW_TOKEN;process.env.PROMPT_GAME_TEACHER_VIEW_TOKEN="e".repeat(64);
  try{const result=await t.query(ref("listVisits"),{viewToken:"e".repeat(64),paginationOpts:{cursor:null,numItems:100}});assert.equal(result.page[0].teachingAnswer.correct,true);assert.ok(result.page[0].teachingAnswer.answeredAt);assert.equal(result.page[1].teachingAnswer,null);assert.doesNotMatch(JSON.stringify(result),new RegExp(token));}finally{if(old===undefined)delete process.env.PROMPT_GAME_TEACHER_VIEW_TOKEN;else process.env.PROMPT_GAME_TEACHER_VIEW_TOKEN=old;}
});
