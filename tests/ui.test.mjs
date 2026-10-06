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
function fixture(responses,seed={},manual=false){const calls=[];const dom=new JSDOM('<div id="root"></div>',{url:"http://localhost",runScripts:"dangerously",pretendToBeVisual:true});const w=dom.window;for(const [key,value] of Object.entries(seed))w.localStorage.setItem(key,JSON.stringify(value));Object.defineProperty(w.crypto,"randomUUID",{value:randomUUID});w.HTMLElement.prototype.scrollIntoView=function(){};w.fetch=async(url,options)=>{const body=JSON.parse(options.body);calls.push(body);const value=await responses.shift();if(value instanceof Error)throw value;return new Response(JSON.stringify(value?.testErrorData?{status:"error",errorMessage:"Server Error",errorData:value.testErrorData}:{status:"success",value}),{status:200,headers:{"Content-Type":"application/json"}});};// Existing rule checks walk through the new view-only steps before their submission.
// Manual fixtures below verify each screen and its navigation independently.
if(!manual){new w.MutationObserver(()=>{const next=[...w.document.querySelectorAll("button")].find(b=>["See the starting prompt","Improve this prompt","Write my judgment"].includes(b.textContent)&&!b.disabled);if(next)next.click();}).observe(w.document.getElementById("root"),{childList:true,subtree:true,attributes:true});}
w.eval(script);return {dom,w,calls};}
function button(w,text){const b=[...w.document.querySelectorAll("button")].find(x=>x.textContent===text);assert.ok(b,`Missing button ${text}`);assert.equal(b.disabled,false);b.click();}
function type(w,id,value){const el=w.document.getElementById(id);assert.ok(el,`Missing field ${id}`);Object.getOwnPropertyDescriptor(w.HTMLTextAreaElement.prototype,"value").set.call(el,value);el.dispatchEvent(new w.Event("input",{bubbles:true}));}
const notYet={id:"assessment1",earned:false,route:"prompt",gap:"Add the event facts",why:"Students need the time",evidence:"Your request omits time"};
const passed={id:"assessment2",earned:true,route:"none",gap:"",why:"All requirements checked",evidence:"Facts present"};

test("pending judgment shows a disabled checking button and nearby status without consuming an attempt",async()=>{
 let finishAssessment;
 const response=new Promise(resolve=>{finishAssessment=resolve;});
 const f=fixture([{id:"answer1",text:"Mean 6; median 4."},response]);
 try{
  await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");
  await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","The sum divided by five is six; the middle number is four.");button(f.w,"Check my judgment");
  await waitFor(()=>f.w.document.querySelector(".assessment-status"));
  const action=f.w.document.querySelector(".assessment-action");
  assert.equal(action.querySelector("button").textContent,"Checking your judgment");assert.equal(action.querySelector("button").disabled,true);
  assert.equal(action.querySelector('[role="status"]').textContent,"Your work stays here.");
  assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,0);
  finishAssessment(passed);await waitFor(()=>f.w.document.querySelector(".result"));
  assert.equal(f.w.document.querySelector(".assessment-status"),null);
 }finally{finishAssessment(passed);f.dom.window.close();}
});

test("a practice point puts the concise result and onward action before collapsed evidence",async()=>{
 const state={version:1,materialVersion:"quiz-v1",stage:"complete",point:true,attempts:1,prompt:"Explain both with an example",answer:{id:"answer",text:"Mean 6; median 4."},judgment:"Checked both calculations",explanation:"",feedback:passed};
 const f=fixture([],{[KEY]:state});
 try{
  await waitFor(()=>f.w.document.querySelector(".assessment-details"));
  const result=f.w.document.querySelector(".result"),details=result.querySelector(".assessment-details"),next=result.querySelector(".primary");
  assert.equal(next.textContent,"Next challenge");assert.equal(details.open,false);
  assert.ok(result.querySelector(".success-summary").compareDocumentPosition(next)&f.w.Node.DOCUMENT_POSITION_FOLLOWING);
  assert.ok(next.compareDocumentPosition(details)&f.w.Node.DOCUMENT_POSITION_FOLLOWING);
  assert.equal([...f.w.document.querySelectorAll("button")].filter(b=>b.textContent==="Next challenge").length,1);
  assert.match(details.textContent,/Facts present/);
 }finally{f.dom.window.close();}
});

test("practice answers render headings, lists and maths while retaining the exact generated text",async()=>{
 const raw=String.raw`## Calculating the mean

1. **Add** the values.
2. Divide: $\frac{2 + 3 + 4 + 5 + 16}{5} = 6$.

<script>window.answerRan=true</script>`;
 const f=fixture([{id:"formatted-answer",text:raw}]);
 try{
  await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");
  await waitFor(()=>f.w.document.querySelector(".phone-answer .answer-content"));
  const content=f.w.document.querySelector(".phone-answer .answer-content");
  assert.equal(content.querySelector("h4").textContent,"Calculating the mean");
  assert.equal(content.querySelectorAll("ol li").length,2);
  assert.equal(content.querySelector("strong").textContent,"Add");
  assert.match(content.textContent,/\(2 \+ 3 \+ 4 \+ 5 \+ 16\) divided by 5 = 6/);
  assert.equal(content.querySelector("script"),null);assert.equal(f.w.answerRan,undefined);
  assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).answer.text,raw);
 }finally{f.dom.window.close();}
});

test("fresh quiz mission shows the weak answer first and retains its version after completion and reopening",async()=>{
 const f=fixture([{id:"quiz-answer",text:"For 2, 3, 4, 5, 16, mean is 6 and median is 4."},passed]);let reopened;
 try{
  await waitFor(()=>f.w.document.getElementById("prompt"));
  assert.equal(f.w.document.getElementById("prompt").value,"Explain averages.");
  assert.equal(f.w.document.querySelector(".lesson-progress").getAttribute("aria-valuenow"),"3");
  type(f.w,"prompt","Explain mean versus median with one checkable number example.");button(f.w,"Generate answer");
  await waitFor(()=>f.w.document.getElementById("judgment"));
  assert.equal(f.calls[0].args[0].materialVersion,"quiz-v1");
  type(f.w,"judgment","The sum is 30, so the mean is 6; the sorted middle is 4.");button(f.w,"Check my judgment");
  await waitFor(()=>f.w.document.querySelector(".mission-outcome"));
  const seed={[KEY]:JSON.parse(f.w.localStorage.getItem(KEY))};
  reopened=fixture([],seed);await waitFor(()=>reopened.w.document.querySelector(".mission-outcome"));
  assert.equal(JSON.parse(reopened.w.localStorage.getItem(KEY)).materialVersion,"quiz-v1");
  assert.equal(JSON.parse(reopened.w.localStorage.getItem(KEY)).attempts,1);
  assert.equal(reopened.calls.length,0);
 }finally{f.dom.window.close();reopened?.dom.window.close();}
});

test("untagged saved invitation drafts and results keep their original task",async()=>{
 const state={version:1,stage:"edit",prompt:"My invitation draft",judgment:"",explanation:"",answer:null,feedback:null,attempts:0,point:false,correcting:false};
 const f=fixture([],{[KEY]:state});
 try{
  await waitFor(()=>f.w.document.getElementById("prompt"));
  assert.match(f.w.document.body.textContent,/Make the invitation useful/);
  assert.equal(f.w.document.querySelector(".lesson-progress").getAttribute("aria-valuenow"),"3");
  assert.equal(f.w.document.getElementById("prompt").value,"My invitation draft");
  assert.equal(f.calls.length,0);
 }finally{f.dom.window.close();}
});

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
  await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");
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
  await waitFor(()=>f.w.document.body.textContent.includes("You earned 1 skill point!"));button(f.w,"Next challenge");
  await waitFor(()=>f.w.document.getElementById("prompt"));
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
  await waitFor(()=>f.w.document.getElementById("prompt"));type(f.w,"prompt","My second challenge draft");
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
  await waitFor(()=>f.w.document.body.textContent.includes("You earned 1 skill point!"));
  const proto=f.w.Storage.prototype;const original=proto.setItem;
  proto.setItem=function(key,value){if(key==="prompt-game:active-practice:v1")throw Error("Storage unavailable");return original.call(this,key,value);};
  button(f.w,"Next challenge");await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Retry saving"));
  assert.match(f.w.document.body.textContent,/Make the invitation useful/);proto.setItem=original;
  button(f.w,"Retry saving");await waitFor(()=>![...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Retry saving"));button(f.w,"Next challenge");
  await waitFor(()=>f.w.document.getElementById("prompt"));assert.equal(f.calls.length,0);
 }finally{f.dom.window.close();}
});

test("reopening a pending second-practice result saves to practice 2 without overwriting practice 1",async()=>{
 const first={version:1,stage:"complete",prompt:"Invitation prompt",judgment:"Judgment",explanation:"",answer:{id:"answer1",text:"Invitation"},feedback:passed,attempts:1,point:true,correcting:false};
 const next={...first,prompt:"Submission instructions prompt",answer:{id:"answer2",text:"Three instructions"},feedback:{...passed,id:"second-assessment"}};
 const f=fixture([],{[KEY]:first,"prompt-game:request-recovery:v1":{next,challengeId:"beginner-02"}});
 try{
  await waitFor(()=>f.w.document.querySelector(".mission-title"));assert.match(f.w.document.querySelector(".points").textContent,/1.*6/);
  button(f.w,"Retry saving");await waitFor(()=>f.w.localStorage.getItem("prompt-game:beginner-02:v1"));
  assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).prompt,"Invitation prompt");
  assert.equal(JSON.parse(f.w.localStorage.getItem("prompt-game:beginner-02:v1")).prompt,"Submission instructions prompt");
  assert.match(f.w.document.querySelector(".points").textContent,/2.*6/);assert.equal(f.calls.length,0);
 }finally{f.dom.window.close();}
});

test("prompt correction judges the replacement answer and preserves the submitted explanation",async()=>{
 const f=fixture([{id:"answer1",text:"Old answer"},notYet,{id:"answer2",text:"Revised answer"},passed]);
 try{await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","The time is missing");button(f.w,"Check my judgment");await waitFor(()=>f.w.document.body.textContent.includes("One more useful change"));button(f.w,"Try again");await waitFor(()=>f.w.document.getElementById("explanation"));type(f.w,"prompt","Include the complete task facts and limits");type(f.w,"explanation","The time tells students when to attend");button(f.w,"Generate revised answer");await waitFor(()=>f.w.document.getElementById("judgment"));assert.equal(f.w.document.getElementById("judgment").value,"");type(f.w,"judgment","All facts now meet the task");button(f.w,"Check my correction");await waitFor(()=>f.w.document.body.textContent.includes("You earned 1 skill point!"));assert.equal(f.calls[3].args[0].answerId,"answer2");assert.equal(f.calls[3].args[0].explanation,"The time tells students when to attend");}finally{f.dom.window.close();}
});
test("judgment-only path submits against the same answer without generating",async()=>{
 const f=fixture([{id:"answer1",text:"Wrong time in this answer"},{...notYet,route:"judgment"},passed]);
 try{await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","It is fine");button(f.w,"Check my judgment");await waitFor(()=>f.w.document.body.textContent.includes("One more useful change"));button(f.w,"Try again");await waitFor(()=>f.w.document.getElementById("explanation"));assert.equal(f.w.document.getElementById("prompt"),null);type(f.w,"judgment","It has the wrong time");type(f.w,"explanation","I checked the time against the task");button(f.w,"Check my corrected judgment");await waitFor(()=>f.w.document.body.textContent.includes("You earned 1 skill point!"));assert.equal(f.calls.length,3);assert.equal(f.calls[2].args[0].answerId,"answer1");}finally{f.dom.window.close();}
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
 try{await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","The time is missing");button(f.w,"Check my judgment");await waitFor(()=>f.w.document.body.textContent.includes("One more useful change"));button(f.w,"Challenge this assessment");await waitFor(()=>JSON.parse(f.w.localStorage.getItem(KEY)).feedback.rechecked);await waitFor(()=>![...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Challenge this assessment"));assert.equal(f.calls[2].path,"practice:recheck");assert.equal(f.calls[2].args[0].assessmentId,"assessment1");assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,1);assert.equal([...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Challenge this assessment"),false);button(f.w,"Try again");await waitFor(()=>f.w.document.getElementById("explanation"));assert.equal(f.calls.length,3);}finally{f.dom.window.close();}
});
test("failed recheck keeps the original result and retries the same request",async()=>{
 const f=fixture([{id:"answer1",text:"Answer"},notYet,new Error("Network failed"),{...passed,id:"assessment1",rechecked:true}]);
 try{await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","Checked answer");button(f.w,"Check my judgment");await waitFor(()=>f.w.document.body.textContent.includes("One more useful change"));button(f.w,"Challenge this assessment");await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Retry assessment"));assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,1);button(f.w,"Retry assessment");await waitFor(()=>f.w.document.body.textContent.includes("You earned 1 skill point!"));assert.equal(f.calls[2].args[0].requestId,f.calls[3].args[0].requestId);assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,1);}finally{f.dom.window.close();}
});
test("reopening an interrupted assessment resumes its request only once",async()=>{
 const before={version:1,stage:"judge",prompt:"Prompt",judgment:"Judgment",explanation:"",answer:{id:"answer1",text:"Answer"},previousAnswer:null,feedback:null,attempts:0,point:false,correcting:false};
 const token="a".repeat(64);const payload={token,answerId:"answer1",judgment:"Judgment",explanation:""};
 const f=fixture([notYet],{[KEY]:before,"prompt-game:session:v1":token,"prompt-game:request-recovery:v1":{action:"assess",before,request:{fingerprint:JSON.stringify(payload),id:"original-request"}}});
 // session token is a raw string in actual storage.
 f.w.localStorage.setItem("prompt-game:session:v1",token);
 try{await waitFor(()=>f.w.document.body.textContent.includes("One more useful change"));assert.equal(f.calls.length,1);assert.equal(f.calls[0].args[0].requestId,"original-request");assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,1);}finally{f.dom.window.close();}
});
test("reopening a pending save restores the checked result without another AI request",async()=>{
 const next={version:1,stage:"complete",prompt:"Prompt",judgment:"Judgment",explanation:"",answer:{id:"answer1",text:"Answer"},previousAnswer:null,feedback:passed,attempts:1,point:true,correcting:false};
 const f=fixture([],{"prompt-game:request-recovery:v1":{next}});
 try{await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Retry saving"));button(f.w,"Retry saving");await waitFor(()=>!f.w.document.body.textContent.includes("Save pending"));assert.equal(f.calls.length,0);assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,1);}finally{f.dom.window.close();}
});


test("assessment failure holds the exact judgment read-only until its same-request retry completes",async()=>{
 const f=fixture([{id:"answer1",text:"Answer"},new Error("Response lost"),passed]);
 try{await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","My exact judgment");button(f.w,"Check my judgment");await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Retry assessment"));assert.equal(f.w.document.getElementById("judgment").disabled,true);button(f.w,"Retry assessment");await waitFor(()=>f.w.document.body.textContent.includes("You earned 1 skill point!"));assert.deepEqual(f.calls[1].args,f.calls[2].args);assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,1);}finally{f.dom.window.close();}
});

test("a daily-cap error disables retry and keeps the answer and judgment without consuming an attempt",async()=>{const f=fixture([{id:"answer-cap",text:"Invitation"},{testErrorData:"DAILY_ALLOWANCE_REACHED"}]);try{await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","Check these event details");button(f.w,"Check my judgment");await waitFor(()=>f.w.document.querySelector('[role="alert"]'));assert.match(f.w.document.querySelector('[role="alert"]').textContent,/Today's practice limit is used up.*midnight UTC.*5:30 AM India time/);assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,0);assert.equal(f.w.document.getElementById("judgment").disabled,true);assert.equal([...f.w.document.querySelectorAll("button")].find(b=>b.textContent==="Retry assessment").disabled,true);assert.equal(f.w.document.getElementById("judgment").value,"Check these event details");assert.match(f.w.document.querySelector(".phone-answer").textContent,/Invitation/);assert.equal(f.calls.length,2);}finally{f.dom.window.close();}});

test("the final also names a structured daily-cap error without consuming its attempt",async()=>{const f=fixture([{challengeId:"beginner-final-01",seen:["beginner-final-01"],badge:false,reviewId:null},{id:"final-cap-answer",text:"Library notice"},{testErrorData:"DAILY_ALLOWANCE_REACHED"}],finalSeed);try{await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Start final challenge"));button(f.w,"Start final challenge");await waitFor(()=>f.w.document.body.textContent.includes("Explain the library change"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.getElementById("judgment"));type(f.w,"judgment","The library notice meets the task");button(f.w,"Submit final");await waitFor(()=>f.w.document.querySelector('[role="alert"]'));assert.match(f.w.document.querySelector('[role="alert"]').textContent,/Today's practice limit is used up.*midnight UTC.*5:30 AM India time/);assert.equal(JSON.parse(f.w.localStorage.getItem("prompt-game:beginner-final-01:v1")).attempts,0);}finally{f.dom.window.close();}});

test("reopening a capped assessment preserves work without sending another request, and retry unlocks after reset",async()=>{
 const before={version:1,materialVersion:"quiz-v1",stage:"judge",prompt:"Exact prompt",judgment:"Exact judgment",explanation:"",answer:{id:"answer1",text:"Exact answer"},feedback:null,attempts:0,point:false,correcting:false};
 const recovery={action:"assess",before,allowanceResetAt:Date.now()+500,request:{fingerprint:"prepared",id:"original-request"}};
 const f=fixture([],{[KEY]:before,"prompt-game:request-recovery:v1":recovery});
 try{
  await waitFor(()=>f.w.document.querySelector('[role="alert"]'));
  const retry=[...f.w.document.querySelectorAll("button")].find(b=>b.textContent==="Retry assessment");
  assert.equal(retry.disabled,true);assert.equal(f.calls.length,0);
  assert.equal(f.w.document.getElementById("judgment").value,"Exact judgment");
  assert.match(f.w.document.querySelector(".phone-answer").textContent,/Exact answer/);
  await waitFor(()=>!retry.disabled);assert.equal(f.w.document.querySelector('[role="alert"]'),null);assert.equal(f.calls.length,0);
  assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,0);
 }finally{f.dom.window.close();}
});

test("editing a prompt after a generation cap keeps the reset message and disabled control on reopening",async()=>{
 const f=fixture([{testErrorData:"DAILY_ALLOWANCE_REACHED"}]);let reopened;
 try{
  await waitFor(()=>f.w.document.getElementById("prompt"));button(f.w,"Generate answer");await waitFor(()=>f.w.document.querySelector('[role="alert"]'));
  type(f.w,"prompt","My saved edit after the limit");await waitFor(()=>JSON.parse(f.w.localStorage.getItem(KEY)).prompt==="My saved edit after the limit");
  assert.match(f.w.document.querySelector('[role="alert"]').textContent,/Today's practice limit is used up/);
  const seed=Object.fromEntries([KEY,"prompt-game:request-recovery:v1"].map(key=>[key,JSON.parse(f.w.localStorage.getItem(key))]));reopened=fixture([],seed);
  await waitFor(()=>reopened.w.document.getElementById("prompt"));assert.equal(reopened.w.document.getElementById("prompt").value,"My saved edit after the limit");
  assert.match(reopened.w.document.querySelector('[role="alert"]').textContent,/Today's practice limit is used up/);
  assert.equal([...reopened.w.document.querySelectorAll("button")].find(b=>b.textContent==="Generate answer").disabled,true);assert.equal(reopened.calls.length,0);
 }finally{f.dom.window.close();reopened?.dom.window.close();}
});


test("six manual screens preserve navigation and drafts without extra AI requests or repeated celebration",async()=>{
 const f=fixture([{id:"answer-manual",text:"Mean is 6 and median is 4 for 2, 3, 4, 5, 16."},passed],{},true);let reopened;
 const step=()=>f.w.document.querySelector('[role="progressbar"]')?.getAttribute("aria-valuenow");
 try{
  await waitFor(()=>step()==="1");assert.equal(f.w.document.getElementById("prompt"),null);assert.equal(f.calls.length,0);
  button(f.w,"See the starting prompt");await waitFor(()=>step()==="2");assert.match(f.w.document.querySelector(".mission-start").textContent,/Explain averages/);assert.equal(f.w.document.getElementById("prompt"),null);
  button(f.w,"Improve this prompt");await waitFor(()=>step()==="3");type(f.w,"prompt","Explain mean and median using 2, 3, 4, 5, 16 and show both calculations.");
  button(f.w,"Back");await waitFor(()=>step()==="2");button(f.w,"Improve this prompt");await waitFor(()=>step()==="3");assert.match(f.w.document.getElementById("prompt").value,/show both calculations/);assert.equal(f.calls.length,0);
  button(f.w,"Generate answer");await waitFor(()=>step()==="4");assert.equal(f.w.document.getElementById("judgment"),null);assert.equal(f.calls.length,1);
  button(f.w,"Write my judgment");await waitFor(()=>step()==="5");type(f.w,"judgment","The sum is 30, so mean is 6. The sorted middle value is 4. Both ideas and calculations are correct.");
  button(f.w,"Back to answer");await waitFor(()=>step()==="4");button(f.w,"Original answer");await waitFor(()=>f.w.document.getElementById("tab-old").getAttribute("aria-selected")==="true");button(f.w,"Write my judgment");await waitFor(()=>step()==="5");assert.match(f.w.document.getElementById("judgment").value,/sum is 30/);assert.match(f.w.document.querySelector('label[for="judgment"]').textContent,/your answer/);
  button(f.w,"Check my judgment");await waitFor(()=>step()==="6");await waitFor(()=>f.w.document.querySelector(".celebrating"));assert.equal(f.calls.length,2);assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,1);
  const seed=Object.fromEntries(Object.keys(f.w.localStorage).filter(key=>key!=="prompt-game:session:v1").map(key=>[key,JSON.parse(f.w.localStorage.getItem(key))]));
  reopened=fixture([],seed,true);await waitFor(()=>reopened.w.document.querySelector(".result"));assert.equal(reopened.w.document.querySelector(".celebrating"),null);assert.equal(reopened.calls.length,0);assert.equal(reopened.w.document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow"),"6");
 }finally{f.dom.window.close();reopened?.dom.window.close();}
});

test("reopening the judgment view keeps its draft, and editing the prompt requires a new answer",async()=>{
 const before={version:1,materialVersion:"quiz-v1",stage:"judge",prompt:"Original generated prompt",judgment:"A saved draft",explanation:"",answer:{id:"old-answer",text:"Old answer"},feedback:null,attempts:0,point:false,correcting:false};
 const f=fixture([{id:"new-answer",text:"A different answer"}],{[KEY]:before,"prompt-game:beginner-01:view:v1":{step:5,stage:"judge",answerId:"old-answer"}},true);
 try{
  await waitFor(()=>f.w.document.getElementById("judgment"));assert.equal(f.w.document.getElementById("judgment").value,"A saved draft");assert.equal(f.calls.length,0);
  button(f.w,"Back to answer");await waitFor(()=>[...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Edit my prompt"));button(f.w,"Edit my prompt");await waitFor(()=>f.w.document.getElementById("prompt"));type(f.w,"prompt","The newly edited prompt");assert.equal(f.w.document.getElementById("judgment"),null);assert.equal([...f.w.document.querySelectorAll("button")].some(b=>b.textContent==="Check my judgment"),false);
  button(f.w,"Generate answer");await waitFor(()=>f.w.document.querySelector('[role="progressbar"]').getAttribute("aria-valuenow")==="4");button(f.w,"Write my judgment");await waitFor(()=>f.w.document.getElementById("judgment"));assert.equal(f.w.document.getElementById("judgment").value,"");assert.equal(f.calls.length,1);assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).answer.id,"new-answer");assert.equal(JSON.parse(f.w.localStorage.getItem(KEY)).attempts,0);
 }finally{f.dom.window.close();}
});
