import test from "node:test";
import assert from "node:assert/strict";
import { initialState, generated, correction, judged, assessed, rechecked, saveResult } from "../src/practice.mjs";

test("prompt correction requires a judgment of its new answer", () => {
  let s = generated(initialState(), { id: "a1", text: "Old answer" });
  s = judged(s, "Old judgment");
  s = assessed(s, { earned: false, route: "prompt", gap: "Missing facts", why: "Task needs facts", evidence: "example" });
  s = correction(s);
  assert.equal(s.answer.id, "a1");
  s = generated(s, { id: "a2", text: "New answer" });
  assert.equal(s.judgment, "");
  assert.equal(s.answer.id, "a2");
  assert.equal(s.previousAnswer.id, "a1");
});
test("judgment-only correction keeps the original answer", () => {
  let s = generated(initialState(), { id: "a1", text: "Answer" });
  s = assessed(judged(s, "Wrong"), { earned: false, route: "judgment", gap: "Wrong judgment", why: "fact", evidence: "fact" });
  s = correction(s);
  assert.equal(s.stage, "judgeCorrection");
  assert.equal(s.answer.id, "a1");
  assert.equal(s.prompt, initialState().prompt);
  assert.equal(s.judgment, "");
});
test("two retries end in supported practice without a point", () => {
  let s = initialState();
  for (let i=0;i<3;i++) s = assessed(s, { earned: false, route:"prompt", gap:"gap", why:"why", evidence:"e" });
  assert.equal(s.attempts,3);
  assert.equal(s.stage,"example");
  assert.equal(s.point,false);
});
test("first success earns one point, never an extra on replay", () => {
  let s = assessed(initialState(), { earned:true, route:"none", gap:"", why:"meets", evidence:"task" });
  assert.equal(s.point,true);
  s = assessed(s, { earned:true, route:"none", gap:"", why:"meets", evidence:"task" });
  assert.equal(Number(s.point),1);
});
test("failed save retains the same assessment for save-only retry", () => {
  const result = assessed(initialState(), {earned:true,route:"none",gap:"",why:"meets",evidence:"task"});
  const failure = saveResult(result, () => { throw Error("Storage blocked"); });
  assert.equal(failure.saved,false);
  assert.deepEqual(failure.pending,result);
  let saved;
  const retry=saveResult(failure.pending, value=>{saved=JSON.parse(value);});
  assert.equal(retry.saved,true);
  assert.deepEqual(saved,result);
  assert.equal(saved.attempts,1);
});

test("judgment-only correction after a prompt revision does not reuse the prompt-correction form",()=>{
 let s=generated(initialState(),{id:"a1",text:"First"});
 s=assessed(s,{earned:false,route:"prompt",gap:"gap",why:"why",evidence:"e"});
 s=generated(correction(s),{id:"a2",text:"Revised"});
 s=assessed(s,{earned:false,route:"judgment",gap:"judgment gap",why:"why",evidence:"e"});
 s=correction(s);
 assert.equal(s.answer.id,"a2");
 assert.equal(s.previousAnswer,null);
 assert.equal(s.stage,"judgeCorrection");
});


test("rechecking changes the decision without consuming an attempt or changing the answer",()=>{
 let s=assessed(generated(initialState(),{id:"a1",text:"Same answer"}),{id:"f1",earned:false,route:"prompt",gap:"gap",why:"why",evidence:"e"});
 const before=s.attempts;
 s=rechecked(s,{id:"f1",earned:true,route:"none",gap:"",why:"Reconsidered",evidence:"e",rechecked:true});
 assert.equal(s.attempts,before);assert.equal(s.answer.id,"a1");assert.equal(s.point,true);assert.equal(s.stage,"complete");
});
test("a recheck can correct a mistaken award and a third-attempt failure remains supported completion",()=>{
 let s={...initialState(),stage:"complete",point:true,attempts:3};
 s=rechecked(s,{id:"f",earned:false,route:"judgment",gap:"gap",why:"why",evidence:"e",rechecked:true});
 assert.equal(s.attempts,3);assert.equal(s.point,false);assert.equal(s.stage,"example");
});
