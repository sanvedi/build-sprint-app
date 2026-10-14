import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {practiceTasks,quizMission} from '../shared/practiceTasks.mjs';
import {advancedTask} from '../shared/advancedTask.mjs';
const changes=JSON.parse(readFileSync('src/playerText.json','utf8'));
test('player instruction replacements have at most twelve words per sentence',()=>{
 for(const [before,after]of Object.entries(changes)){
  for(const sentence of after.split(/[.!?](?:\s|$)/).filter(s=>s.trim()))assert.ok(sentence.trim().split(/\s+/).length<=12,`${before}: ${sentence}`);
  assert.doesNotMatch(after,/\b(constraints|submission|assessed)\b/i);
 }
});
test('display requirements keep every numeric task fact and original task objects',()=>{
 for(const task of [...Object.values(practiceTasks),quizMission,advancedTask]){
  const before=JSON.stringify(task);
  for(const line of task.requirements){const shown=changes[line]||line;assert.deepEqual(shown.match(/\d+(?::\d+)?/g),line.match(/\d+(?::\d+)?/g));}
  assert.equal(JSON.stringify(task),before);
 }
});
