const stories = {
  A: { person: "Kabir", event: "match", place: "Gully Park", audience: "new players", extra: "Free kits for everyone." },
  B: { person: "Meera", event: "radio workshop", place: "the radio room", audience: "new helpers", extra: "Every helper gets a prize." },
  C: { person: "Tara", event: "clue hunt", place: "the library room", audience: "new detectives", extra: "Everyone gets a detective badge." },
};
export function quickRounds(path) {
  const s=stories[path]||stories.A;
  return [
    {title:"Find the gap", instruction:"What must readers know before they can join?", scene:`${s.person} needs help with a ${s.event}.`, text:`Join our ${s.event} on Saturday at 10 AM.`, options:["The place", "A longer greeting", "More excited words"], correct:[0], reasons:["Yes! Readers need a place to go.","A greeting cannot tell readers where to go.","Excited words cannot tell readers where to go."]},
    {title:"Build the prompt", instruction:"Pick two details: who reads it and its format.", scene:`Help ${s.person} write a useful announcement.`, text:`Announce our ${s.event} at ${s.place}.`, options:[`Write for ${s.audience}.`,"Say everyone will love it.","Use two bullet points.","Promise free food."], correct:[0,2], multi:true, reasons:[], success:"You chose the readers and the answer's shape."},
    {title:"Catch the invention", instruction:"Tap the claim that has no proof.", scene:"These facts are all we know.", facts:[`${s.event} at ${s.place}.`,"Saturday, 10 AM."], options:[`Meet at ${s.place}.`,s.extra,"We start Saturday at 10 AM."], correct:[1], reasons:["The place appears in the facts. Try another claim.","Caught it! The facts never promise that reward.","The day and time appear in the facts."]},
  ];
}
export function checkQuickChoice(round, selected) {
  return selected.length===round.correct.length && round.correct.every(i=>selected.includes(i));
}
