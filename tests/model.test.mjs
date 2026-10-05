import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import vm from "node:vm";
import {taskFacts} from "../shared/practiceTasks.mjs";

test("quiz generation receives subject facts without the student's mission or grading instructions",()=>{
 const generation=taskFacts("beginner-01","quiz-v1",false);
 assert.equal(generation.assessmentNotes,undefined);
 assert.equal(generation.requirements,undefined);
 assert.equal(generation.brief,undefined);
 assert.match(generation.referenceFacts,/mean=6 and median=4/);
 assert.match(taskFacts("beginner-01","quiz-v1").assessmentNotes,/Do not require the deadline/);
 assert.match(taskFacts("beginner-01","legacy-v1",false).requirements.join(" "),/Friday at 2 PM/);
});
const source=await readFile("convex/practice.ts","utf8");
const factory=source.slice(source.indexOf("function configuredAgent("),source.indexOf("function logFailure("));
function configuredModels(override){const env={PROMPT_GAME_MODEL:"assessment-model",GEMINI_API_KEY:"made-up-test-key",PROMPT_GAME_AI_ENABLED:"true",...(override?{PROMPT_GAME_GENERATION_MODEL:override}:{})};const context=vm.createContext({process:{env},components:{agent:{}},Agent:class{constructor(_component,options){this.model=options.languageModel;}},createGoogle:()=>model=>model,ConvexError:Error});vm.runInContext(factory,context);return [vm.runInContext("configuredAgent(true).model",context),vm.runInContext("configuredAgent().model",context)];}
test("generation override leaves assessment and recheck on their existing model",()=>{assert.deepEqual(configuredModels("generation-model"),["generation-model","assessment-model"]);const generate=source.slice(source.indexOf("export const generate="),source.indexOf("export const assess="));assert.ok(generate.includes("configuredAgent(true)"));assert.equal(source.slice(source.indexOf("export const assess=")).split("configuredAgent()").length-1,2);});
test("without a generation override the existing model still serves both calls",()=>{assert.deepEqual(configuredModels(),["assessment-model","assessment-model"]);});
