import {initialState,task,practiceTasks,isFinal} from "./practice.mjs";
const answer={id:"preview-answer",text:task.exampleAnswer};
const feedback={id:"preview-assessment",earned:false,route:"prompt",gap:"The request omits the time.",why:"Students need the time to attend.",evidence:"Compare the request with Friday at 2 PM in the requirements."};
const base={...initialState(),answer,feedback,judgment:"The answer meets the task requirements.",attempts:1};
export const previewNames=["first","returning","empty","loading","error","answer","wrong-answer","empty-judgment","assessment-error","feedback","prompt-correction","judgment-correction","revised-answer","recheck-loading","recheck-error","recheck-done","done","with-help","save-pending","device-error","second-first","second-done","second-help","second-save-pending","final-first","final-answer","final-loading","final-assessment-error","final-not-yet","final-pass","final-save-pending","final-alternate","final-review","final-exhausted"];
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
 if(name?.startsWith("final-")){
  const completed={...base,stage:"complete",point:true,feedback:{...feedback,earned:true,gap:""}};
  const records={"beginner-01":completed,"beginner-02":completed};
  const fail={...initialState("beginner-final-01"),stage:"finalFail",attempts:1,completed:true,passed:false,feedback:{...feedback,id:"preview-final-assessment",gap:"Specify two bullet points and the library facts.",why:"The notice needs a clear format and accurate arrangements.",evidence:"The request only asks to write about the library."},answer:{id:"preview-final-answer",text:"The library is closed on Monday."},judgment:"The answer is fine."};
  if(name==="final-review"||name==="final-exhausted"){
   records["beginner-final-01"]=fail;
   if(name==="final-exhausted")records["beginner-final-02"]={...fail,stage:"finalFail"};
   return {name,challengeId:"beginner-review-01",records,state:initialState("beginner-review-01")};
  }
  const challengeId=name==="final-alternate"?"beginner-final-02":"beginner-final-01";
  const state=name==="final-first"||name==="final-alternate"?initialState(challengeId):name==="final-not-yet"?fail:{...initialState(challengeId),stage:name==="final-pass"||name==="final-save-pending"?"finalPass":"judge",attempts:name==="final-pass"||name==="final-save-pending"?1:0,point:false,passed:name==="final-pass"||name==="final-save-pending",feedback:name==="final-pass"||name==="final-save-pending"?{...feedback,id:"preview-final-assessment",earned:true,gap:"",why:"Your request and judgment cover the requirements.",evidence:"You specified two bullets and checked the closure, reopening and return box."}:null,answer:{id:"preview-final-answer",text:"- The library is closed on Monday and reopens Tuesday at 9 AM.\n- You can use the outside book-return box during the closure."},judgment:"Both bullets include the closure, reopening time and outside return box. There are no invented fees or arrangements."};
  return {name,challengeId,records,state,pending:name==="final-save-pending",busy:name==="final-loading"?"Checking your final challenge.":"",error:name==="final-assessment-error"?"Your final could not be assessed. Your submission is still here. Retry assessment.":"",errorAction:name==="final-assessment-error"?"assess":""};
 }
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
 if(isFinal(challengeId)){
  if(kind==="generate")return {id:"preview-final-answer",text:challengeId==="beginner-final-01"?"- The library is closed on Monday and reopens Tuesday at 9 AM.\n- You can use the outside book-return box during the closure.":"First-year students can join an optional study group on Thursday at 4 PM in Room 108. We will study for 45 minutes; bring a notebook."};
  return {...feedback,id:"preview-final-assessment",earned:true,route:"none",gap:"",why:"The request and judgment meet this final's requirements.",evidence:"The required facts and answer format were specified and checked.",...(kind==="recheck"?{rechecked:true}:{})};
 }
 if(challengeId==="beginner-02"||challengeId==="beginner-review-02"){
  if(kind==="generate")return {id:"preview-second-answer",text:practiceTasks[challengeId].exampleAnswer};
  return {...feedback,id:"preview-second-assessment",gap:"Ask for three numbered steps.",why:"Students need a clear sequence to follow.",evidence:"The request does not specify three numbered steps.",...(kind==="recheck"?{rechecked:true}:{})};
 }
 if(kind==="generate")return answer;
 return {...feedback,...(kind==="recheck"?{rechecked:true}:{})};
}
