import { practiceTasks, isFinal, isReview } from "../shared/practiceTasks.mjs";
export { practiceTasks, practiceFinished, isFinal, isReview } from "../shared/practiceTasks.mjs";
export const task = practiceTasks["beginner-01"];
export function initialState(challengeId="beginner-01") { return {version:1,mode:isFinal(challengeId)?"final":isReview(challengeId)?"review":"practice",stage:"edit",prompt:practiceTasks[challengeId].startingPrompt,explanation:"",judgment:"",answer:null,previousAnswer:null,feedback:null,attempts:0,point:false,correcting:false}; }
export function generated(s, answer) { return {...s,previousAnswer:s.correcting?s.answer:null,answer,judgment:"",stage:s.correcting?"judgeCorrection":"judge"}; }
export function judged(s, judgment) { return {...s,judgment}; }
function resultState(s, feedback, attempts){
  if(s.mode==="final")return {...s,feedback,attempts,point:false,passed:Boolean(feedback.earned),completed:true,stage:feedback.earned?"finalPass":"finalFail"};
  return {...s,feedback,attempts,point:s.mode!=="review"&&Boolean(feedback.earned),completed:Boolean(feedback.earned)||attempts>=3,stage:feedback.earned?"complete":attempts>=3?"example":"feedback"};
}
export function assessed(s, feedback) {
  if(s.point||s.completed||s.attempts>=3||s.mode==="final"&&s.attempts)return s;
  return resultState(s,feedback,s.attempts+1);
}
export function rechecked(s, feedback) { return resultState(s,feedback,s.attempts); }
export function correction(s) {
  return {...s,previousJudgment:s.judgment,correcting:true,previousAnswer:s.feedback.route==="judgment"?null:s.previousAnswer,explanation:"",judgment:"",stage:s.feedback.route==="judgment"?"judgeCorrection":"editCorrection"};
}
export function saveResult(s, write) {
  try { write(JSON.stringify(s));return {saved:true,state:s,pending:null}; }
  catch {return {saved:false,state:s,pending:s};}
}
export function loadState(read, challengeId="beginner-01") {
  try { const s=JSON.parse(read());return s?.version===1 && ["edit","judge","feedback","editCorrection","judgeCorrection","complete","example","finalPass","finalFail"].includes(s.stage) && typeof s.prompt==="string" && Number.isInteger(s.attempts) && s.attempts>=0 && s.attempts<=3?s:initialState(challengeId); }
  catch {return initialState(challengeId);}
}
