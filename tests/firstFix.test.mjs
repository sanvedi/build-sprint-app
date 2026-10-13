import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { convexTest } from "convex-test";
import { makeFunctionReference } from "convex/server";
async function moduleFor(path){const b=await build({entryPoints:[path],bundle:true,write:false,format:"esm",platform:"node",plugins:[{name:"convex",setup(b){b.onResolve({filter:/^(convex\/|@|ai$|zod$)/},a=>({path:import.meta.resolve(a.path),external:true}));}}]});return import("data:text/javascript;base64,"+Buffer.from(b.outputFiles[0].text).toString("base64"));}

import { detailCheck, firstFixTasks } from "../shared/firstFix.mjs";
const schema=(await moduleFor("convex/schema.ts")).default, firstFix=await moduleFor("convex/firstFix.ts"),practice=await moduleFor("convex/practiceData.ts");
const modules={"./_generated/server.ts":async()=>({}),"./firstFix.ts":async()=>firstFix,"./practiceData.ts":async()=>practice};
const ref=n=>makeFunctionReference('firstFix:'+n),token='f'.repeat(64),usage={inputTokens:null,outputTokens:null,cachedInputTokens:null};
test('First fix shares the cap, blocks duplicate pending calls and recovers a saved answer without another call',async()=>{
 const t=convexTest(schema,modules),old=process.env.PROMPT_GAME_DAILY_CALL_LIMIT;process.env.PROMPT_GAME_DAILY_CALL_LIMIT='2';
 try{
 const a={token,path:'A',requestId:'one',prompt:'Announce our match at Gully Park.'};
 await assert.rejects(t.mutation(ref('reserve'),{...a,token:'invalid'}),/INVALID_SUBMISSION/);
 const r=await t.mutation(ref('reserve'),a);
 await assert.rejects(t.mutation(ref('reserve'),{...a,requestId:'duplicate'}),/REQUEST_PENDING/);
 await t.mutation(ref('finish'),{id:r.id,answer:'Join our match at Gully Park.',aiUsage:usage});
 assert.equal((await t.mutation(ref('reserve'),a)).text,'Join our match at Gully Park.');
 await assert.rejects(t.mutation(ref('reserve'),{...a,prompt:'Changed'}),/SUBMISSION_CHANGED/);
 await t.mutation(makeFunctionReference('practiceData:reserve'),{token,requestId:'free',kind:'generate',challengeId:'path-A-01',materialVersion:'missions-v1',input:'{}'});
 await assert.rejects(t.mutation(ref('reserve'),{...a,requestId:'two',path:'B'}),/DAILY_ALLOWANCE/);
 assert.equal((await t.run(ctx=>ctx.db.query('firstFixJobs').take(10))).length,1);
 assert.equal((await t.run(ctx=>ctx.db.query('practiceCompletions').take(10))).length,0);
 }finally{if(old===undefined)delete process.env.PROMPT_GAME_DAILY_CALL_LIMIT;else process.env.PROMPT_GAME_DAILY_CALL_LIMIT=old;}
});
test('failed First fix calls count but never create practice attempts; retry reuses the job',async()=>{
 const t=convexTest(schema,modules),a={token,path:'C',requestId:'one',prompt:'Announce our meeting.'};
 const r=await t.mutation(ref('reserve'),a);await t.mutation(ref('failed'),{id:r.id});
 assert.equal((await t.mutation(ref('reserve'),a)).id,r.id);
 assert.equal((await t.run(ctx=>ctx.db.query('playerUsage').take(10)))[0].count,2);
 assert.equal((await t.run(ctx=>ctx.db.query('practiceSessions').take(10))).length,0);
});
test('each First fix has exactly one correct detail and reports only the place actually named in the answer',()=>{
 for(const path of ['A','B','C']){const t=firstFixTasks[path];assert.equal(t.options.length,3);assert.equal(t.options.filter(o=>o==='Place').length,1);assert.equal(t.options[t.correct],'Place');assert.match(detailCheck(path,'Come soon!'),/still does not/);assert.match(detailCheck(path,t.place.toUpperCase()),/now mentions/);assert.match(detailCheck(path,'Gully Parkside'),/still does not/);}
});
