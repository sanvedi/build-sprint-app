export const levelPathIds = ["A", "B", "C"];
export const levelNames = ["amateur", "pro"];
export const levelLabels = { amateur: "Amateur", pro: "Pro" };
const settings = {
  A: {name:"Matchday Rescue", person:"Kabir", audience:"new players", events:["practice match","team meeting","skills session","warm-up session","friendly match"], places:["Gully Park","school court"]},
  B: {name:"Gully Radio", person:"Meera", audience:"new helpers", events:["radio workshop","clean-up briefing","interview practice","recording session","volunteer meeting"], places:["radio room","community hall"]},
  C: {name:"The Lane Detectives", person:"Tara", audience:"new detectives", events:["clue workshop","notebook search","evidence meeting","photo review","detective briefing"], places:["library room","Gully Lane"]},
};
const slots = [
  {kind:"practice", number:1, people:8, budget:160, fee:80, each:5, day:"Saturday", time:"10 AM"},
  {kind:"practice", number:2, people:10, budget:180, fee:90, each:6, day:"Sunday", time:"11 AM"},
  {kind:"final", number:1, people:12, budget:220, fee:100, each:7, day:"Tuesday", time:"4 PM"},
  {kind:"final", number:2, people:6, budget:130, fee:60, each:8, day:"Thursday", time:"3 PM"},
  {kind:"review", number:1, people:5, budget:100, fee:40, each:6, day:"Friday", time:"5 PM"},
];
function base(pathId,level,slot,i) {
 const s=settings[pathId];
 const id=`${pathId}-${level}-${slot.kind}${slot.kind==="review"?"":`-${slot.number}`}`;
 return {id,pathId,level,kind:slot.kind,number:slot.number,pathName:s.name,
   title:`${s.person}’s ${s.events[i]}`, startingPrompt:`Help with our ${s.events[i]}.`,
   original:"Choose any place. Everything should work out!",
   success:"You gave clear details and checked the answer carefully.",
   exampleWhy:"The prompt gives the facts and explains what to check."};
}
function planTask(pathId,slot,i) {
 const s=settings[pathId],total=slot.fee+slot.people*slot.each,extra=30;
 const facts=[`${s.person} is planning a ${s.events[i]} for ${s.audience}.`,
   `There are ${slot.people} people. The budget is Rs ${slot.budget}.`,
   `${s.places[0]} costs Rs ${slot.fee}, plus Rs ${slot.each} per person.`,
   `${s.places[1]} costs Rs ${slot.budget+extra} in total.`,
   `Both places have enough space. Both are available ${slot.day}.`,
   `Start at ${slot.time}. No transport or equipment is confirmed.`];
 const requirements=[...facts,
   "Choose a place within the budget. Show both total costs.",
   "Explain the choice for the readers using everyday words.",
   "Use exactly three bullet points. Write at most 90 words.",
   "Do not invent transport, equipment or extra money."];
 const exampleAnswer=`- ${s.places[0]} costs Rs ${slot.fee} + (${slot.people} × Rs ${slot.each}) = Rs ${total}.\n- ${s.places[1]} costs Rs ${slot.budget+extra}. This exceeds our Rs ${slot.budget} budget.\n- ${s.audience}, choose ${s.places[0]} on ${slot.day} at ${slot.time}. Transport and equipment are not confirmed.`;
 return {...base(pathId,"amateur",slot,i),brief:`Help ${s.person} choose a place without spending too much.`,requirements,referenceFacts:facts.join(" "),
   hint:"Give both prices. Ask AI to show the total costs.",
   examplePrompt:`${facts.join(" ")} Choose a place within budget for ${s.audience}. Calculate both total costs and explain the choice. Use exactly three bullet points and at most 90 words. Do not invent transport, equipment or extra money.`,
   exampleAnswer,
   exampleJudgment:`The totals are Rs ${total} and Rs ${slot.budget+extra}. Only ${s.places[0]} fits Rs ${slot.budget}. The answer uses three bullets and fewer than 90 words. It addresses ${s.audience}, gives the correct day and time, and does not promise transport or equipment.`,
   assessmentInstructions:"Require the student's prompt to specify the audience, both options and costs, budget, calculation/comparison goal, three-bullet/90-word format, and no invented arrangements. Judge actual arithmetic and recommendation. A good prompt may receive a flawed answer; accept a judgment that identifies and explains those flaws. A vague prompt does not pass merely because supplied reference facts produced a lucky answer."};
}
function evidenceTask(pathId,slot,i) {
 const s=settings[pathId],place=s.places[i%2],other=s.places[(i+1)%2];
 const facts=[`${s.person} is checking plans for a ${s.events[i]}.`,
   `The signed notice names ${place}, ${slot.day}, ${slot.time}.`,
   `An unsigned message names ${other} instead.`,
   "The organiser has not explained the difference.",
   "A forwarded message promises free equipment without naming a source.",
   "A private contact number appears in the forwarded message.",
   "Nobody gave permission to share that number."];
 return {...base(pathId,"pro",slot,i),brief:`Help ${s.person} check conflicting messages before sharing an update.`,
   requirements:[...facts,
    `Write for ${s.audience}. Use exactly three labelled lines.`,
    "Use these labels: Confirmed, Unclear, Next check.",
    "Write at most 100 words. Explain what each source says.",
    "Do not treat either place as confirmed for the event.",
    "Do not promise equipment or share the private number.",
    "Ask the organiser to confirm the place and equipment."],
   referenceFacts:facts.join(" "),
   original:"The event is definitely at the first place. Equipment is free!",
   hint:"A confident message can still be wrong. Check its source.",
   examplePrompt:`${facts.join(" ")} Write a cautious update for ${s.audience}. Use exactly three lines labelled Confirmed, Unclear, Next check, at most 100 words. State what each source says, without choosing a confirmed venue. Do not promise equipment or repeat the private number. Ask the organiser to confirm the place and equipment.`,
   exampleAnswer:`Confirmed: The signed notice lists ${place}, ${slot.day}, ${slot.time}.\nUnclear: An unsigned message lists ${other}; the place is unresolved. Free equipment has no named source.\nNext check: ${s.audience}, ask the organiser to confirm the place and equipment. Keep the private contact number out of the update.`,
   exampleJudgment:`The answer accurately reports the signed notice without declaring the event venue settled. It names the conflicting place and the unsupported equipment promise. It asks the organiser to check both. It keeps the private number out, addresses ${s.audience}, and uses the three labels within 100 words.`,
   assessmentInstructions:"Require the prompt to preserve contradictory sources, name the audience, require the three labels and word limit, prohibit choosing a definite venue or promising equipment, protect the private number, and request organiser verification. Require judgment to distinguish a confirmed document statement from a confirmed real-world venue, recognise the unsupported equipment claim and check privacy and format. Do not demand that a sound prompt prevent every model mistake. Never ask the learner to supply or repeat an actual private number."};
}
export const levelTasks = Object.fromEntries(levelPathIds.flatMap(path=>slots.flatMap((slot,i)=>[planTask(path,slot,i),evidenceTask(path,slot,i)] )).map(task=>[task.id,task]));
export function getLevelTask(id) { const task=levelTasks[id]; if(!task)throw new Error("Unknown level task");return task; }
export function initialLevelState(id) {
 const t=getLevelTask(id);
 return {version:1,mode:t.kind==="final"?"final":t.kind==="review"?"review":"practice",stage:"edit",prompt:t.startingPrompt,judgment:"",explanation:"",answer:null,previousAnswer:null,feedback:null,attempts:0,point:false,completed:false,correcting:false};
}
export function levelPassed(states,path,level) {
 return [1,2].some(n=>states[`${path}-${level}-final-${n}`]?.state?.passed);
}
