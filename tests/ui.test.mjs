import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { build } from "esbuild";
import { JSDOM } from "jsdom";

// Real screen code with prepared API responses: interaction proof, not live AI or browser proof.
const compiled=await build({entryPoints:["src/main.jsx"],bundle:true,write:false,format:"iife",loader:{".css":"empty"},define:{__CONVEX_URL__:'"https://test.convex.cloud"'},logLevel:"silent"});
const script=compiled.outputFiles[0].text;
const KEY="prompt-game:beginner-01:v1";
async function waitFor(fn){for(let i=0;i<100;i++){if(fn())return;await new Promise(r=>setTimeout(r,10));}assert.fail("Screen did not reach expected state");}
function fixture(responses,seed={}){const calls=[];const dom=new JSDOM('<div id="root"></div>',{url:"http://localhost",runScripts:"dangerously",pretendToBeVisual:true});const w=dom.window;for(const [key,value] of Object.entries(seed))w.localStorage.setItem(key,JSON.stringify(value));Object.defineProperty(w.crypto,"randomUUID",{value:randomUUID});w.HTMLElement.prototype.scrollIntoView=function(){};w.fetch=async(url,options)=>{const body=JSON.parse(options.body);calls.push(body);const value=responses.shift();if(value instanceof Error)throw value;return new Response(JSON.stringify({status:"success",value}),{status:200,headers:{"Content-Type":"application/json"}});};w.eval(script);return {dom,w,calls};}
function button(w,text){const b=[...w.document.querySelectorAll("button")].find(x=>x.textContent===text);assert.ok(b,`Missing button ${text}`);assert.equal(b.disabled,false);b.click();}
function type(w,id,value){const el=w.document.getElementById(id);assert.ok(el,`Missing field ${id}`);Object.getOwnPropertyDescriptor(w.HTMLTextAreaElement.prototype,"value").set.call(el,value);el.dispatchEvent(new w.Event("input",{bubbles:true}));}
const notYet={id:"assessment1",earned:false,route:"prompt",gap:"Add the event facts",why:"Students need the time",evidence:"Your request omits time"};
const passed={id:"assessment2",earned:true,route:"none",gap:"",why:"All requirements checked",evidence:"Facts present"};

const completedPractice={version:1,stage:"complete",prompt:"Prepared prompt",judgment:"Prepared judgment",explanation:"",answer:{id:"practice-answer",text:"Practice answer"},feedback:passed,attempts:1,point:true,correcting:false};
const finalSeed={"prompt-game:beginner-01:v1":completedPractice,"prompt-game:beginner-02:v1":completedPractice,"prompt-game:active-practice:v1":"beginner-02"};
test("final hides all examples and awards a badge without changing practice points",async()=>{
 const f=fixture([{challengeId:"beginner-final-01",seen:["beginner-final-01"],badge:false,reviewId:null},{id:"final-answer",text:"Library notice"},{...passed,id:"final-assessment"}],finalSeed);
 try{
  await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Start final challenge"));button(f.w,"Start final challenge");
  await waitFor(()=>f.w.document.body.textContent.includes("Explain the library change"));
  assert.equal(f.w.document.querySelector(".original"),null);assert.equal(f.w.document.body.textContent.includes("Example answer"),false);
  button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));
  assert.equal(f.w.document.querySelector(".answer-tabs"),null);type(f.w,"judgment","The answer meets the two bullets and library facts");button(f.w,"Submit final");
  await waitFor(()=>f.w.document.body.textContent.includes("Beginner badge earned"));
  assert.equal(JSON.parse(f.w.localStorage.getItem("prompt-game:beginner-final-01:v1")).point,false);
  assert.match(f.w.document.querySelector(".points").textContent,/2.*6/);
 }finally{f.dom.window.close();}
});
test("failed final returns to supported practice and opens an unseen alternate after completing it",async()=>{
 const f=fixture([{challengeId:"beginner-final-01",seen:["beginner-final-01"],badge:false,reviewId:null},{id:"final-answer",text:"Library notice"},{...notYet,id:"final-assessment"},{challengeId:"beginner-review-01",attempts:0},{id:"review-answer",text:"Invitation"},passed,{challengeId:"beginner-final-02",seen:["beginner-final-01","beginner-final-02"],badge:false,reviewId:"beginner-review-01"}],finalSeed);
 try{
  await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Start final challenge"));button(f.w,"Start final challenge");
  await waitFor(()=>f.w.document.body.textContent.includes("Explain the library change"));button(f.w,"Generate answer");
  await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","It is fine");button(f.w,"Submit final");
  await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Return to practice"));button(f.w,"Return to practice");
  await waitFor(()=>f.w.document.body.textContent.includes("Make the invitation useful"));button(f.w,"Generate answer");
  await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","Invitation meets the task");button(f.w,"Check my judgment");
  await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Start fresh final"));
  assert.match(f.w.document.querySelector(".points").textContent,/2.*6/);button(f.w,"Start fresh final");
  await waitFor(()=>f.w.document.body.textContent.includes("Explain the study group"));assert.equal(f.w.document.getElementById("prompt").value,"Tell students about studying together.");
 }finally{f.dom.window.close();}
});

test("a pending final badge reopens without an award or another assessment until save succeeds",async()=>{
 const next={...completedPractice,mode:"final",stage:"finalPass",point:false,passed:true,completed:true,feedback:{...passed,id:"final-assessment"}};
 const f=fixture([],{...finalSeed,"prompt-game:request-recovery:v1":{next,challengeId:"beginner-final-01"}});
 try{
  await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Retry saving"));assert.equal(f.w.document.querySelector(".badge"),null);
  assert.equal([...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Review my challenges"),false);
  button(f.w,"Retry saving");await waitFor(()=>f.w.document.querySelector(".badge"));
  assert.equal(f.calls.length,0);assert.equal(JSON.parse(f.w.localStorage.getItem("prompt-game:beginner-final-01:v1")).passed,true);
  assert.match(f.w.document.querySelector(".points").textContent,/2.*6/);
 }finally{f.dom.window.close();}
});

test("failed final assessment retries the exact submission without consuming the independent attempt",async()=>{
 const f=fixture([{challengeId:"beginner-final-01",seen:["beginner-final-01"],badge:false,reviewId:null},{id:"final-answer",text:"Library notice"},new Error("Response lost"),{...notYet,id:"final-assessment"}],finalSeed);
 try{
  await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Start final challenge"));button(f.w,"Start final challenge");await waitFor(()=>f.w.document.body.textContent.includes("Explain the library change"));button(f.w,"Generate answer");
  await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","My exact independent judgment");button(f.w,"Submit final");
  await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Retry assessment"));
  assert.equal(JSON.parse(f.w.localStorage.getItem("prompt-game:beginner-final-01:v1")).attempts,0);assert.equal(f.w.document.getElementById("judgment").disabled,true);
  button(f.w,"Retry assessment");await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Return to practice"));
  assert.deepEqual(f.calls[2].args,f.calls[3].args);assert.equal(JSON.parse(f.w.localStorage.getItem("prompt-game:beginner-final-01:v1")).attempts,1);
 }finally{f.dom.window.close();}
});

test("Next challenge keeps the first point and gives practice 2 its own attempts and prompt",async()=>{
 const f=fixture([{id:"answer1",text:"Invitation"},passed,{id:"answer2",text:"Three steps"},{...passed,id:"assessment3"}]);
 try{
  await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");
  await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","Meets the invitation requirements");button(f.w,"Check my judgment");
  await waitFor(()=>f.w.document.body.textContent.includes("Skill point earned"));button(f.w,"Next challenge");
  await waitFor(()=>f.w.document.body.textContent.includes("Make the instructions easy to follow"));
  assert.equal(f.w.document.getElementById("prompt").value,"Tell students how to submit their work.");
  assert.match(f.w.document.body.textContent,/0 of 3 attempts used/);
  button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","Three steps include the file and deadline");button(f.w,"Check my judgment");
  await waitFor(()=>JSON.parse(f.w.localStorage.getItem("prompt-game:beginner-02:v1"))?.point);
  assert.equal(f.calls[2].args[0].challengeId,"beginner-02");
  assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,1);
  assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).point,true);
  assert.equal(JSON.parse(f.w.localStorage.getItem("prompt-game:beginner-02:v1")).attempts,1);
  assert.match(f.w.document.querySelector(".points").textContent,/2.*6/);
  assert.equal(f.calls.length,4);
 }finally{f.dom.window.close();}
});

test("completed-with-help unlocks practice 2 without a point and reopening retains its draft",async()=>{
 const first={version:1,stage:"example",prompt:"Old prompt",judgment:"Old judgment",explanation:"",answer:{id:"answer1",text:"Answer"},feedback:notYet,attempts:3,point:false,correcting:false};
 const f=fixture([],{[KEY]:first});let reopened;
 try{
  await waitFor(()=>f.w.document.body.textContent.includes("Completed with help"));button(f.w,"Next challenge");
  await waitFor(()=>f.w.document.body.textContent.includes("Make the instructions easy to follow"));type(f.w,"prompt","My second challenge draft");
  const seed=Object.fromEntries(Object.keys(f.w.localStorage).map(k=>[k,JSON.parse(f.w.localStorage.getItem(k))]));
  reopened=fixture([],seed);await waitFor(()=>reopened.w.document.getElementById("prompt")?.value==="My second challenge draft");
  assert.match(reopened.w.document.body.textContent,/Completed with help/);
  assert.match(reopened.w.document.querySelector(".points").textContent,/0.*6/);
  assert.equal(f.calls.length+reopened.calls.length,0);
 }finally{f.dom.window.close();reopened?.dom.window.close();}
});

test("a pending first-practice save does not permit Next challenge",async()=>{
 const next={version:1,stage:"complete",prompt:"Prompt",judgment:"Judgment",explanation:"",answer:{id:"answer1",text:"Answer"},feedback:passed,attempts:1,point:true,correcting:false};
 const f=fixture([],{"prompt-game:request-recovery:v1":{next}});
 try{await waitFor(()=>f.w.document.body.textContent.includes("Save pending"));assert.equal([...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Next challenge"),false);button(f.w,"Retry saving");await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Next challenge"));assert.equal(f.calls.length,0);}finally{f.dom.window.close();}
});

test("a failed onward save stays on practice 1 and offers save-only recovery",async()=>{
 const first={version:1,stage:"complete",prompt:"Prompt",judgment:"Judgment",explanation:"",answer:{id:"answer1",text:"Answer"},feedback:passed,attempts:1,point:true,correcting:false};
 const f=fixture([],{[KEY]:first});
 try{
  await waitFor(()=>f.w.document.body.textContent.includes("Skill point earned"));
  const proto=f.w.Storage.prototype;const original=proto.setItem;
  proto.setItem=function(key,value){if(key==="prompt-game:active-practice:v1")throw Error("Storage unavailable");return original.call(this,key,value);};
  button(f.w,"Next challenge");await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Retry saving"));
  assert.match(f.w.document.body.textContent,/Make the invitation useful/);proto.setItem=original;
  button(f.w,"Retry saving");await waitFor(()=>![...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Retry saving"));button(f.w,"Next challenge");
  await waitFor(()=>f.w.document.body.textContent.includes("Make the instructions easy to follow"));assert.equal(f.calls.length,0);
 }finally{f.dom.window.close();}
});

test("reopening a pending second-practice result saves to practice 2 without overwriting practice 1",async()=>{
 const first={version:1,stage:"complete",prompt:"Invitation prompt",judgment:"Judgment",explanation:"",answer:{id:"answer1",text:"Invitation"},feedback:passed,attempts:1,point:true,correcting:false};
 const next={...first,prompt:"Submission instructions prompt",answer:{id:"answer2",text:"Three instructions"},feedback:{...passed,id:"second-assessment"}};
 const f=fixture([],{[KEY]:first,"prompt-game:request-recovery:v1":{next,challengeId:"beginner-02"}});
 try{
  await waitFor(()=>f.w.document.body.textContent.includes("Make the instructions easy to follow"));assert.match(f.w.document.querySelector(".points").textContent,/1.*6/);
  button(f.w,"Retry saving");await waitFor(()=>f.w.localStorage.getItem("prompt-game:beginner-02:v1"));
  assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).prompt,"Invitation prompt");
  assert.equal(JSON.parse(f.w.localStorage.getItem("prompt-game:beginner-02:v1")).prompt,"Submission instructions prompt");
  assert.match(f.w.document.querySelector(".points").textContent,/2.*6/);assert.equal(f.calls.length,0);
 }finally{f.dom.window.close();}
});

test("prompt correction judges the replacement answer and preserves the submitted explanation",async()=>{
 const f=fixture([{id:"answer1",text:"Old answer"},notYet,{id:"answer2",text:"Revised answer"},passed]);
 try{await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","The time is missing");button(f.w,"Check my judgment");await waitFor(()=>f.w.document.body.textContent.includes("One change to try"));button(f.w,"Try again");await waitFor(()=>f.w.document.getElementById("explanation"));type(f.w,"prompt","Include the complete task facts and limits");type(f.w,"explanation","The time tells students when to attend");button(f.w,"Generate revised answer");await waitFor(()=>f.w.document.getElementById("judgment"));assert.equal(f.w.document.getElementById("judgment").value,"");type(f.w,"judgment","All facts now meet the task");button(f.w,"Check my correction");await waitFor(()=>f.w.document.body.textContent.includes("Skill point earned"));assert.equal(f.calls[3].args[0].answerId,"answer2");assert.equal(f.calls[3].args[0].explanation,"The time tells students when to attend");}finally{f.dom.window.close();}
});
test("judgment-only path submits against the same answer without generating",async()=>{
 const f=fixture([{id:"answer1",text:"Wrong time in this answer"},{...notYet,route:"judgment"},passed]);
 try{await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","It is fine");button(f.w,"Check my judgment");await waitFor(()=>f.w.document.body.textContent.includes("One change to try"));button(f.w,"Try again");await waitFor(()=>f.w.document.getElementById("explanation"));assert.equal(f.w.document.getElementById("prompt"),null);type(f.w,"judgment","It has the wrong time");type(f.w,"explanation","I checked the time against the task");button(f.w,"Check my corrected judgment");await waitFor(()=>f.w.document.body.textContent.includes("Skill point earned"));assert.equal(f.calls.length,3);assert.equal(f.calls[2].args[0].answerId,"answer1");}finally{f.dom.window.close();}
});
test("failed local result save retries only storage, not AI assessment",async()=>{
 const f=fixture([{id:"answer1",text:"Useful answer"},passed]);
 try{await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","All requirements are met");const proto=f.w.Storage.prototype;const original=proto.setItem;proto.setItem=function(key,value){if(key===KEY)throw Error("Storage unavailable");return original.call(this,key,value);};button(f.w,"Check my judgment");await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Retry saving"));assert.equal(f.calls.length,2);proto.setItem=original;button(f.w,"Retry saving");await waitFor(()=>!f.w.document.body.textContent.includes("save pending"));assert.equal(f.calls.length,2);assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).point,true);}finally{f.dom.window.close();}
});
test("switching long answers retains the draft judgment and its answer target",async()=>{
 const f=fixture([{id:"answer1",text:"Long answer. ".repeat(200)}]);
 try{await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","My draft judgment stays");button(f.w,"Original answer");await new Promise(r=>setTimeout(r,30));assert.equal(f.w.document.getElementById("judgment").value,"My draft judgment stays");assert.match(f.w.document.querySelector('label[for="judgment"]').textContent,/your answer/);button(f.w,"Your answer");await new Promise(r=>setTimeout(r,30));assert.equal(f.w.document.getElementById("judgment").value,"My draft judgment stays");}finally{f.dom.window.close();}
});

test("generation failure preserves the prompt and consumes no attempt",async()=>{
 const f=fixture([new Error("Connection failed")]);
 try{await waitFor(()=>f.w.document.getElementById("prompt"));type(f.w,"prompt","My edited prompt");button(f.w,"Generate answer");await waitFor(()=>f.w.document.querySelector('[role="alert"]'));assert.equal(f.w.document.getElementById("prompt").value,"My edited prompt");assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,0);}finally{f.dom.window.close();}
});


test("challenging a decision rechecks the same assessment once and continues without an extra attempt",async()=>{
 const f=fixture([{id:"answer1",text:"Answer"},notYet,{...notYet,rechecked:true}]);
 try{await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","The time is missing");button(f.w,"Check my judgment");await waitFor(()=>f.w.document.body.textContent.includes("One change to try"));button(f.w,"Challenge");await waitFor(()=>JSON.parse(f.w.localStorage.getItem(KEY)).feedback.rechecked);await waitFor(()=>![...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Challenge"));assert.equal(f.calls[2].path,"practice:recheck");assert.equal(f.calls[2].args[0].assessmentId,"assessment1");assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,1);assert.equal([...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Challenge"),false);button(f.w,"Try again");await waitFor(()=>f.w.document.getElementById("explanation"));assert.equal(f.calls.length,3);}finally{f.dom.window.close();}
});
test("failed recheck keeps the original result and retries the same request",async()=>{
 const f=fixture([{id:"answer1",text:"Answer"},notYet,new Error("Network failed"),{...passed,id:"assessment1",rechecked:true}]);
 try{await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","Checked answer");button(f.w,"Check my judgment");await waitFor(()=>f.w.document.body.textContent.includes("One change to try"));button(f.w,"Challenge");await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Retry assessment"));assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,1);button(f.w,"Retry assessment");await waitFor(()=>f.w.document.body.textContent.includes("Skill point earned"));assert.equal(f.calls[2].args[0].requestId,f.calls[3].args[0].requestId);assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,1);}finally{f.dom.window.close();}
});
test("reopening an interrupted assessment resumes its request only once",async()=>{
 const before={version:1,stage:"judge",prompt:"Prompt",judgment:"Judgment",explanation:"",answer:{id:"answer1",text:"Answer"},previousAnswer:null,feedback:null,attempts:0,point:false,correcting:false};
 const token="a".repeat(64);const payload={token,answerId:"answer1",judgment:"Judgment",explanation:""};
 const f=fixture([notYet],{[KEY]:before,"prompt-game:session:v1":token,"prompt-game:request-recovery:v1":{action:"assess",before,request:{fingerprint:JSON.stringify(payload),id:"original-request"}}});
 // session token is a raw string in actual storage.
 f.w.localStorage.setItem("prompt-game:session:v1",token);
 try{await waitFor(()=>f.w.document.body.textContent.includes("One change to try"));assert.equal(f.calls.length,1);assert.equal(f.calls[0].args[0].requestId,"original-request");assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,1);}finally{f.dom.window.close();}
});
test("reopening a pending save restores the checked result without another AI request",async()=>{
 const next={version:1,stage:"complete",prompt:"Prompt",judgment:"Judgment",explanation:"",answer:{id:"answer1",text:"Answer"},previousAnswer:null,feedback:passed,attempts:1,point:true,correcting:false};
 const f=fixture([],{"prompt-game:request-recovery:v1":{next}});
 try{await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Retry saving"));button(f.w,"Retry saving");await waitFor(()=>!f.w.document.body.textContent.includes("Save pending"));assert.equal(f.calls.length,0);assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,1);}finally{f.dom.window.close();}
});


test("assessment failure holds the exact judgment read-only until its same-request retry completes",async()=>{
 const f=fixture([{id:"answer1",text:"Answer"},new Error("Response lost"),passed]);
 try{await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","My exact judgment");button(f.w,"Check my judgment");await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Retry assessment"));assert.equal(f.w.document.getElementById("judgment").disabled,true);button(f.w,"Retry assessment");await waitFor(()=>f.w.document.body.textContent.includes("Skill point earned"));assert.deepEqual(f.calls[1].args,f.calls[2].args);assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,1);}finally{f.dom.window.close();}
});
