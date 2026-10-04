import {initialState,task} from "./practice.mjs";
const answer={id:"preview-answer",text:task.exampleAnswer};
const feedback={id:"preview-assessment",earned:false,route:"prompt",gap:"The request omits the time.",why:"Students need the time to attend.",evidence:"Compare the request with Friday at 2 PM in the requirements."};
const base={...initialState(),answer,feedback,judgment:"The answer meets the task requirements.",attempts:1};
export const previewNames=["first","returning","empty","loading","error","answer","wrong-answer","empty-judgment","assessment-error","feedback","prompt-correction","judgment-correction","revised-answer","recheck-loading","recheck-error","recheck-done","done","with-help","save-pending","device-error"];
export function statePreview(name){
 const states={
  first:{state:initialState()},
  returning:{state:{...initialState(),prompt:task.examplePrompt}},
  empty:{state:{...initialState(),prompt:""}},
  loading:{state:initialState(),busy:"Generating your answer"},
  error:{state:initialState(),error:"The answer could not be generated. Your edit is still here. Try again."},
  answer:{state:{...base,stage:"judge",feedback:null,judgment:""}},
  "wrong-answer":{state:{...base,stage:"judge",feedback:null,answer:{...answer,text:task.original},judgment:""}},
  "empty-judgment":{state:{...base,stage:"judge",feedback:null,judgment:""}},
  "assessment-error":{state:{...base,stage:"judge",feedback:null},error:"Assessment is unavailable. Your answer and judgment are still here.",errorAction:"assess"},
  feedback:{state:{...base,stage:"feedback"}},
  "prompt-correction":{state:{...base,stage:"editCorrection",correcting:true}},
  "judgment-correction":{state:{...base,stage:"judgeCorrection",correcting:true,judgment:"",previousJudgment:"It meets every requirement.",feedback:{...feedback,route:"judgment"}}},
  "revised-answer":{state:{...base,stage:"judgeCorrection",correcting:true,previousAnswer:answer,judgment:"",explanation:"Added the time so students know when to attend."}},
  "recheck-loading":{state:{...base,stage:"feedback"},busy:"Checking your prompt and judgment."},
  "recheck-error":{state:{...base,stage:"feedback"},error:"Assessment is unavailable. Your answer and judgment are still here.",errorAction:"recheck"},
  "recheck-done":{state:{...base,stage:"feedback",feedback:{...feedback,rechecked:true}}},
  done:{state:{...base,stage:"complete",point:true,prompt:task.examplePrompt,judgment:"The answer meets the audience, facts and limits in the task.",feedback:{...feedback,earned:true,gap:""}}},
  "with-help":{state:{...base,stage:"example",attempts:3}},
  "save-pending":{state:{...base,stage:"complete",point:true,prompt:task.examplePrompt,judgment:"The answer meets the audience, facts and limits in the task.",feedback:{...feedback,earned:true,gap:""}},pending:true},
  "device-error":{state:initialState(),saveError:true}
 };
 const selected=states[name];return selected?{...selected,name}:null;
}
export async function previewAction(kind){
 await new Promise(r=>setTimeout(r,700));
 if(kind==="generate")return answer;
 return {...feedback,...(kind==="recheck"?{rechecked:true}:{})};
}
