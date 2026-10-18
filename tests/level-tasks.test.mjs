import test from "node:test";
import assert from "node:assert/strict";
import { levelTasks, initialLevelState } from "../shared/levelTasks.mjs";
test("each path has two practices, two distinct finals and a review per higher level",()=>{
 for(const path of ["A","B","C"])for(const level of ["amateur","pro"]){
  const tasks=Object.values(levelTasks).filter(t=>t.pathId===path&&t.level===level);
  assert.equal(tasks.length,5);
  assert.equal(tasks.filter(t=>t.kind==="practice").length,2);
  const finals=tasks.filter(t=>t.kind==="final");assert.equal(finals.length,2);
  assert.notEqual(finals[0].referenceFacts,finals[1].referenceFacts);
  for(const t of tasks){const s=initialLevelState(t.id);assert.equal(s.prompt,t.startingPrompt);assert.equal(s.attempts,0);assert.equal(s.point,false);assert.equal(s.mode,t.kind==="final"?"final":t.kind==="review"?"review":"practice");}
 }
});
test("higher-level instructions keep sentences within twelve words",()=>{
 for(const t of Object.values(levelTasks))for(const text of [t.title,t.brief,t.hint,t.success,...t.requirements])for(const sentence of text.split(/[.!?]+/)){
  assert.ok(sentence.trim().split(/\s+/).filter(Boolean).length<=12,`${t.id}: ${sentence}`);
 }
});
