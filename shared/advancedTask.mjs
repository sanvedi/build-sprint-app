export const plantedFact = "Every participant receives an official school certificate.";
export const advancedTask = {
  title: "Check the workshop announcement",
  brief: "Help younger students understand a workshop, then catch a deliberately planted false claim in the answer.",
  requirements: [
    "Goal: announce the optional prompt workshop on Saturday, 11 AM to noon, in Library Room 2; bring a notebook; attendance is free",
    "Audience: students aged 13 to 15; use friendly, plain words",
    "Format: exactly three bullet points, at most 100 words",
    "Do not invent certificates, fees or registration; no certificate has been announced",
    "In your judgment, identify one made-up fact and explain how it conflicts with the supplied facts"
  ],
  startingPrompt: "Tell students about the workshop.",
  original: "Come to our workshop soon and receive a certificate!",
  hint: "State the goal, audience, format and a no-invention rule; check the answer against the supplied facts.",
  referenceFacts: "Optional prompt workshop: Saturday, 11 AM to noon, Library Room 2. For students aged 13 to 15. Bring a notebook. Attendance is free. No certificate or registration has been announced.",
  success: "You gave AI four clear constraints and caught an unsupported claim.",
  examplePrompt: "Write an announcement for students aged 13 to 15 about an optional prompt workshop on Saturday from 11 AM to noon in Library Room 2. Ask them to bring a notebook; attendance is free. Use friendly plain words, exactly three bullet points and at most 100 words. Do not invent certificates, fees or registration; none has been announced.",
  exampleAnswer: "- Students aged 13 to 15 can join an optional prompt workshop on Saturday, 11 AM to noon.\n- Come to Library Room 2 and bring a notebook.\n- Attendance is free. Every participant receives an official school certificate.",
  exampleJudgment: "The certificate claim is made up: the supplied facts explicitly say no certificate has been announced. The timing, room, notebook and free attendance match. The answer has three bullets and is below 100 words, but the certificate promise must be removed before sharing it.",
  exampleWhy: "Four explicit constraints guide the answer; checking its facts catches the deliberate false claim."
};
export function initialAdvancedState(){return {version:1,mode:"practice",stage:"edit",prompt:advancedTask.startingPrompt,judgment:"",explanation:"",answer:null,previousAnswer:null,feedback:null,attempts:0,point:false,completed:false,correcting:false};}
