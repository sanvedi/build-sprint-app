export const task = {
  title: "Make the invitation useful",
  brief: "Write a friendly class announcement for first-year students. Give them the details they need to join a voluntary prompt practice session.",
  requirements: ["Friday at 2 PM, Room 204", "30 minutes; bring a charged phone", "Voluntary, for first-year students", "Friendly, at most 80 words; no invented facts or registration"],
  original: "Join our exciting AI event soon! Meet experts, discover powerful tools, and register online today. Everyone is welcome.",
  examplePrompt: "Write a friendly announcement for first-year students, at most 80 words. Include voluntary prompt practice on Friday at 2 PM in Room 204, lasting 30 minutes. Ask students to bring a charged phone. Do not invent facts or registration.",
  exampleAnswer: "First-year students: join optional prompt practice this Friday at 2 PM in Room 204. We will practise for 30 minutes. Bring a charged phone to try the activities. Come along if you would like to improve how you use AI."
};
export function initialState() { return {version:1,stage:"edit",prompt:"Write something about our AI session.",explanation:"",judgment:"",answer:null,previousAnswer:null,feedback:null,attempts:0,point:false,correcting:false}; }
export function generated(s, answer) { return {...s,previousAnswer:s.correcting?s.answer:null,answer,judgment:"",stage:s.correcting?"judgeCorrection":"judge"}; }
export function judged(s, judgment) { return {...s,judgment}; }
export function assessed(s, feedback) {
  if (s.point || s.attempts>=3) return s;
  const attempts=s.attempts+1;
  return {...s,feedback,attempts,point:Boolean(feedback.earned),stage:feedback.earned?"complete":attempts>=3?"example":"feedback"};
}
export function rechecked(s, feedback) {
 return {...s,feedback,point:Boolean(feedback.earned),stage:feedback.earned?"complete":s.attempts>=3?"example":"feedback"};
}
export function correction(s) {
  return {...s,previousJudgment:s.judgment,correcting:true,previousAnswer:s.feedback.route==="judgment"?null:s.previousAnswer,explanation:"",judgment:"",stage:s.feedback.route==="judgment"?"judgeCorrection":"editCorrection"};
}
export function saveResult(s, write) {
  try { write(JSON.stringify(s));return {saved:true,state:s,pending:null}; }
  catch {return {saved:false,state:s,pending:s};}
}
export function loadState(read) {
  try { const s=JSON.parse(read());return s?.version===1 && ["edit","judge","feedback","editCorrection","judgeCorrection","complete","example"].includes(s.stage) && typeof s.prompt==="string" && Number.isInteger(s.attempts) && s.attempts>=0 && s.attempts<=3?s:initialState(); }
  catch {return initialState();}
}
