import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {convexTest} from 'convex-test';
import {makeFunctionReference as ref} from 'convex/server';
async function moduleFor(path,mock=false){
 const output=await build({entryPoints:[path],bundle:true,write:false,format:'esm',platform:'node',plugins:[{name:'dependencies',setup(b){
  b.onResolve({filter:/^convex\//},a=>({path:import.meta.resolve(a.path),external:true}));
  if(mock){b.onResolve({filter:/^@convex-dev\/agent$/},()=>({path:'agent',namespace:'fixture'}));b.onLoad({filter:/.*/,namespace:'fixture'},()=>({contents:`export class Agent {constructor(){} async generateText(_ctx,_owner,options){globalThis.__policy.calls.push({kind:'generate',options});return globalThis.__policy.answer;} async generateObject(_ctx,_owner,options){globalThis.__policy.calls.push({kind:'assess',options});return globalThis.__policy.feedback;}}`,loader:'js'}));}
 }}]});return import('data:text/javascript;base64,'+Buffer.from(output.outputFiles[0].text).toString('base64'));
}
const schema=(await moduleFor('convex/schema.ts')).default,data=await moduleFor('convex/practiceData.ts'),practice=await moduleFor('convex/practice.ts',true);
const modules={'./_generated/server.ts':async()=>({}),'./practiceData.ts':async()=>data,'./practice.ts':async()=>practice};
const token='a'.repeat(64),other='b'.repeat(64),day=()=>new Date().toISOString().slice(0,10),input=JSON.stringify({prompt:'Exact practice request'});
const reserve=ref('practiceData:reserve'),finish=ref('practiceData:finish'),generate=ref('practice:generate'),reuse=ref('practiceData:reusableGeneration');
const usage={inputTokens:500,outputTokens:150,inputTokenDetails:{cacheReadTokens:0}};
async function configured(fn){const prior={...process.env};process.env.PROMPT_GAME_MODEL='test-model';process.env.OPENAI_API_KEY='synthetic-test-key';process.env.PROMPT_GAME_AI_ENABLED='true';process.env.PROMPT_GAME_DAILY_CALL_LIMIT='20';globalThis.__policy={calls:[],answer:{text:'Complete answer',finishReason:'stop',totalUsage:usage},feedback:{object:{promptMeetsRequirements:true,judgmentMeetsRequirements:true,correctionAddressesGap:true,explanationSound:true,route:'none',gap:'',why:'The task is met.',evidence:'The supplied details are accurate.'},usage}};try{await fn(convexTest(schema,modules),globalThis.__policy);}finally{for(const key of ['PROMPT_GAME_MODEL','OPENAI_API_KEY','PROMPT_GAME_AI_ENABLED','PROMPT_GAME_DAILY_CALL_LIMIT']){if(prior[key]===undefined)delete process.env[key];else process.env[key]=prior[key];}delete globalThis.__policy;}}
const args={token,requestId:'first',prompt:'Exact practice request',materialVersion:'quiz-v1'};
test('an exact owned practice answer is reused even at the daily cap; changed prompts and other browsers call AI',async()=>configured(async(t,m)=>{
 const first=await t.action(generate,args);
 await t.run(async ctx=>{const row=await ctx.db.query('playerUsage').first();await ctx.db.patch(row._id,{count:20});});
 assert.deepEqual(await t.action(generate,{...args,requestId:'same-again'}),first);assert.equal(m.calls.length,1);
 await assert.rejects(t.action(generate,{...args,requestId:'changed',prompt:'Changed prompt'}),/DAILY_ALLOWANCE_REACHED/);
 const second=await t.action(generate,{...args,token:other,requestId:'other'});assert.notEqual(second.id,first.id);assert.equal(m.calls.length,2);
 assert.equal(m.calls[0].options.maxOutputTokens,600);assert.equal(m.calls[0].options.maxRetries,0);
 assert.equal((await t.run(ctx=>ctx.db.get(first.id))).aiUsage.outputTokens,150);
 assert.equal((await t.run(ctx=>ctx.db.query('practiceUsage').first())).count,2);
}));
test('simultaneous identical reservations serialize and a just-completed answer is reused without charging',async()=>{
 const t=convexTest(schema,modules),a={token,kind:'generate',input,materialVersion:'quiz-v1'};
 const results=await Promise.allSettled([t.mutation(reserve,{...a,requestId:'one'}),t.mutation(reserve,{...a,requestId:'two'})]);
 assert.equal(results.filter(r=>r.status==='fulfilled').length,1);assert.match(results.find(r=>r.status==='rejected').reason.message,/REQUEST_PENDING/);
 const id=results.find(r=>r.status==='fulfilled').value;await t.mutation(finish,{id,result:'Saved exact answer'});
 assert.equal(await t.mutation(reserve,{...a,requestId:'three'}),id);
 assert.equal((await t.run(ctx=>ctx.db.query('playerUsage').first())).count,1);
});
test('the quota is shared across that browser practices, resets on UTC day, and old aggregate totals never lock it out',async()=>{
 const t=convexTest(schema,modules);await t.run(async ctx=>{await ctx.db.insert('practiceUsage',{day:day(),count:1000});await ctx.db.insert('playerUsage',{token,day:'2000-01-01',count:20});await ctx.db.insert('practiceSessions',{token,challengeId:'beginner-01',materialVersion:'legacy-v1',attempts:1,point:true});});
 await t.mutation(reserve,{token,challengeId:'beginner-02',requestId:'second',kind:'generate',input:'{}'});
 await t.mutation(reserve,{token,requestId:'first',kind:'generate',input:'{}'});
 assert.equal((await t.run(ctx=>ctx.db.query('playerUsage').withIndex('by_token_day',q=>q.eq('token',token).eq('day',day())).unique())).count,2);
 assert.equal((await t.run(ctx=>ctx.db.query('practiceUsage').first())).count,1002);
});
test('generation reuse excludes another task, material, owner, finals and unfinished answers',async()=>{
 const t=convexTest(schema,modules),id=await t.mutation(reserve,{token,requestId:'source',kind:'generate',input,materialVersion:'quiz-v1'});
 assert.equal(await t.query(reuse,{token,challengeId:'beginner-01',materialVersion:'quiz-v1',input}),null);
 await t.mutation(finish,{id,result:'Original answer'});
 assert.equal(await t.query(reuse,{token:other,challengeId:'beginner-01',materialVersion:'quiz-v1',input}),null);
 assert.equal(await t.query(reuse,{token,challengeId:'beginner-02',materialVersion:'legacy-v1',input}),null);
 assert.equal(await t.query(reuse,{token,challengeId:'beginner-final-01',materialVersion:'legacy-v1',input}),null);
 await assert.rejects(t.query(reuse,{token,challengeId:'beginner-01',materialVersion:'legacy-v1',input}),/TASK_VERSION_CHANGED/);
});
test('a truncated answer fails safely, retains measured usage and consumes no learning attempt',async()=>configured(async(t,m)=>{
 m.answer.finishReason='length';m.answer.totalUsage={...usage,outputTokens:600};
 await assert.rejects(t.action(generate,args),/ANSWER_TOO_LONG/);
 const job=await t.run(ctx=>ctx.db.query('practiceJobs').first());assert.equal(job.status,'failed');assert.equal(job.result,undefined);assert.equal(job.aiUsage.outputTokens,600);
 assert.equal((await t.run(ctx=>ctx.db.query('playerUsage').first())).count,1);assert.equal((await t.run(ctx=>ctx.db.query('practiceSessions').first())).attempts,0);
}));
test('feedback and recheck use bounded replies, save usage, and retain attempts and replay protection',async()=>configured(async(t,m)=>{
 const answer=await t.action(generate,args),a={token,requestId:'assessment',answerId:answer.id,judgment:'Accurate answer checked',explanation:''};
 const feedback=await t.action(ref('practice:assess'),a);assert.equal(feedback.earned,true);
 assert.deepEqual(await t.action(ref('practice:assess'),a),feedback);assert.equal(m.calls.length,2);
 const reviewed=await t.action(ref('practice:recheck'),{token,requestId:'review',assessmentId:feedback.id});assert.equal(reviewed.earned,true);
 for(const call of m.calls.slice(1)){assert.equal(call.options.maxOutputTokens,900);assert.equal(call.options.maxRetries,0);}
 assert.equal((await t.run(ctx=>ctx.db.query('practiceSessions').first())).attempts,1);
 assert.equal((await t.run(ctx=>ctx.db.query('playerUsage').first())).count,3);
 assert.equal((await t.run(ctx=>ctx.db.get(feedback.id))).aiUsage.inputTokens,500);
}));
