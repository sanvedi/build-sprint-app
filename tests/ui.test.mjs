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
function fixture(responses){const calls=[];const dom=new JSDOM('<div id="root"></div>',{url:"http://localhost",runScripts:"dangerously",pretendToBeVisual:true});const w=dom.window;Object.defineProperty(w.crypto,"randomUUID",{value:randomUUID});w.HTMLElement.prototype.scrollIntoView=function(){};w.fetch=async(url,options)=>{const body=JSON.parse(options.body);calls.push(body);const value=responses.shift();if(value instanceof Error)throw value;return new Response(JSON.stringify({status:"success",value}),{status:200,headers:{"Content-Type":"application/json"}});};w.eval(script);return {dom,w,calls};}
function button(w,text){const b=[...w.document.querySelectorAll("button")].find(x=>x.textContent===text);assert.ok(b,`Missing button ${text}`);assert.equal(b.disabled,false);b.click();}
function type(w,id,value){const el=w.document.getElementById(id);assert.ok(el,`Missing field ${id}`);Object.getOwnPropertyDescriptor(w.HTMLTextAreaElement.prototype,"value").set.call(el,value);el.dispatchEvent(new w.Event("input",{bubbles:true}));}
const notYet={id:"assessment1",earned:false,route:"prompt",gap:"Add the event facts",why:"Students need the time",evidence:"Your request omits time"};
const passed={id:"assessment2",earned:true,route:"none",gap:"",why:"All requirements checked",evidence:"Facts present"};

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
