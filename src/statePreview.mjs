import {initialState,task,practiceTasks} from "./practice.mjs";
const answer={id:"preview-answer",text:task.exampleAnswer};
const feedback={id:"preview-assessment",earned:false,route:"prompt",gap:"The request omits the time.",why:"Students need the time to attend.",evidence:"Compare the request with Friday at 2 PM in the requirements."};
const base={...initialState(),answer,feedback,judgment:"The answer meets the task requirements.",attempts:1};
export const previewNames=["first","returning","empty","loading","error","answer","wrong-answer","empty-judgment","assessment-error","feedback","prompt-correction","judgment-correction","revised-answer","recheck-loading","recheck-error","recheck-done","done","with-help","save-pending","device-error","second-first","second-done","second-help","second-save-pending"];
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
 if(name?.startsWith("second-")){
  const second=practiceTasks["beginner-02"];
  const complete={...base,stage:"complete",point:true,feedback:{...feedback,earned:true,gap:""}};
  const state=name==="second-first"?initialState("beginner-02"):{...initialState("beginner-02"),stage:name==="second-help"?"example":"complete",attempts:name==="second-help"?3:1,point:name!=="second-help",answer:{id:"preview-second-answer",text:second.exampleAnswer},prompt:second.examplePrompt,judgment:"Three numbered steps include the PDF, filename, portal and deadline.",feedback:{...feedback,id:"preview-second-assessment",earned:name!=="second-help",why:"The request specifies the format and supplied submission details.",evidence:"The answer contains the PDF, filename, portal and deadline.",gap:name==="second-help"?"Ask for three numbered steps.":""}};
  return {name,challengeId:"beginner-02",records:{"beginner-01":complete},state,pending:name==="second-save-pending"};
 }
 const selected=states[name];return selected?{...selected,name}:null;
}
export async function previewAction(kind,challengeId="beginner-01"){
 await new Promise(r=>setTimeout(r,700));
 if(challengeId==="beginner-02"){
  if(kind==="generate")return {id:"preview-second-answer",text:practiceTasks[challengeId].exampleAnswer};
  return {...feedback,id:"preview-second-assessment",gap:"Ask for three numbered steps.",why:"Students need a clear sequence to follow.",evidence:"The request does not specify three numbered steps.",...(kind==="recheck"?{rechecked:true}:{})};
 }
 if(kind==="generate")return answer;
 return {...feedback,...(kind==="recheck"?{rechecked:true}:{})};
}
