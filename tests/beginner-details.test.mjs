import test from "node:test";
import assert from "node:assert/strict";
import { beginnerKey, beginnerTasks, beginnerOptions, beginnerCheck, nextBeginner } from "../shared/beginnerDetails.mjs";

test("new beginner sequence saves separately by path and resumes existing practices",()=>{
 const values=new Map(),storage={getItem:k=>values.get(k)??null};
 assert.equal(nextBeginner("A",storage),"audience");
 values.set(beginnerKey("A","audience"),JSON.stringify({done:true}));
 assert.equal(nextBeginner("A",storage),"format");
 assert.equal(nextBeginner("B",storage),"audience");
 values.set(beginnerKey("A","format"),JSON.stringify({done:true}));
 assert.equal(nextBeginner("A",storage),null);
 values.set("prompt-game:path-B-01:v1",JSON.stringify({prompt:"Saved work",attempts:1}));
 assert.equal(nextBeginner("B",storage),null);
 assert.equal(nextBeginner(null,storage),null);
});
test("beginner checks inspect the answer and reject missing readers or prose lists",()=>{
 for(const path of ["A","B","C"]){
  const task=beginnerTasks[path];
  for(const kind of ["audience","format"]){const options=beginnerOptions(path,kind);assert.equal(new Set(options).size,3);assert.equal(options[task.correct],kind==="audience"?"Readers":"List");}
  assert.equal(beginnerCheck(path,"audience",`Hello, ${task.audience}!`),"The answer names the readers.");
  assert.equal(beginnerCheck(path,"audience","Welcome everyone!"),"The readers are not named yet.");
  assert.equal(beginnerCheck(path,"audience",task.audience+"extra"),"The readers are not named yet.");
  assert.equal(beginnerCheck(path,"format","Join us. Bring friends."),"A list is still missing.");
  assert.equal(beginnerCheck(path,"format","- Join us.\n- Bring friends."),"The answer has a list.");
 }
});
