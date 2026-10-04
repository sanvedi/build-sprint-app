// Prepared, synthetic learning material. Teacher review is still required before release.
export const practiceTasks = {
  "beginner-01": {
    title: "Make the invitation useful",
    brief: "Write a friendly class announcement for first-year students. Give them the details they need to join a voluntary prompt practice session.",
    requirements: ["Friday at 2 PM, Room 204", "30 minutes; bring a charged phone", "Voluntary, for first-year students", "Friendly, at most 80 words; no invented facts or registration"],
    startingPrompt: "Write something about our AI session.",
    original: "Join our exciting AI event soon! Meet experts, discover powerful tools, and register online today. Everyone is welcome.",
    examplePrompt: "Write a friendly announcement for first-year students, at most 80 words. Include voluntary prompt practice on Friday at 2 PM in Room 204, lasting 30 minutes. Ask students to bring a charged phone. Do not invent facts or registration.",
    exampleAnswer: "First-year students: join optional prompt practice this Friday at 2 PM in Room 204. We will practise for 30 minutes. Bring a charged phone to try the activities. Come along if you would like to improve how you use AI."
  },
  "beginner-02": {
    title: "Make the instructions easy to follow",
    brief: "Turn the supplied submission details into instructions a student can follow without guessing.",
    requirements: ["Submit one PDF through the course portal by Tuesday at 5 PM", "Name the file student-ID_report.pdf", "Use exactly three numbered steps, at most 70 words", "Use plain words; do not invent a link, fee or extra requirement"],
    startingPrompt: "Tell students how to submit their work.",
    original: "Finish your work and send it to your teacher soon. Visit the submission website and pay the processing fee if needed.",
    examplePrompt: "Write submission instructions in plain words, exactly three numbered steps and at most 70 words. Students must submit one PDF through the course portal by Tuesday at 5 PM. The filename must be student-ID_report.pdf. Do not invent a link, fee or extra requirement.",
    exampleAnswer: "1. Save your work as one PDF.\n2. Name the file student-ID_report.pdf, using your student ID.\n3. Submit the PDF through the course portal by Tuesday at 5 PM."
  }
};
export function practiceFinished(state) { return Boolean(state && (state.point || state.attempts >= 3)); }
