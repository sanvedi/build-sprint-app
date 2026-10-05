// Prepared, synthetic learning material. Teacher review is still required before release.
const practices = {
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
export const practiceTasks = {
  ...practices,
  "beginner-review-01": practices["beginner-01"],
  "beginner-review-02": practices["beginner-02"],
  "beginner-final-01": {
    title: "Explain the library change",
    brief: "Write a notice that helps students plan their library visit and return books during a closure.",
    requirements: ["The library is closed on Monday and reopens Tuesday at 9 AM", "The outside book-return box remains available during the closure", "Exactly two bullet points, at most 60 words, in plain words", "Do not invent fees, a closure reason or other arrangements"],
    startingPrompt: "Write about the library."
  },
  "beginner-final-02": {
    title: "Explain the study group",
    brief: "Write a short message that gives first-year students the details they need to join an optional study group.",
    requirements: ["Thursday at 4 PM in Room 108, lasting 45 minutes", "Optional, for first-year students; bring a notebook", "Exactly two sentences, at most 60 words, in a friendly tone", "Do not invent a fee, registration or extra materials"],
    startingPrompt: "Tell students about studying together."
  }
};
export const quizMission = {
  title: "Help a friend before a quiz",
  brief: "Your friend has 20 minutes before a quiz and is confused about mean and median. Get an explanation with one example they can check.",
  requirements: ["Ask AI to explain the difference between mean and median", "Ask for one number example your friend can check", "Check that the answer explains both ideas and calculates them correctly"],
  startingPrompt: "Explain averages.",
  original: "An average is a value that represents a group of numbers. Averages are useful for understanding data and comparing different groups.",
  originalGap: "This sounds useful, but your friend still cannot tell mean from median or check a calculation. What information is missing from the request?",
  examplePrompt: "Explain the difference between mean and median in plain words. Use one small set of numbers and show how to calculate both so my friend can check the example.",
  exampleAnswer: "Mean is the sum of the numbers divided by how many there are. Median is the middle number after putting them in order. For 2, 3, 4, 5, 16: the mean is (2 + 3 + 4 + 5 + 16) / 5 = 6. The median is 4, the middle number. The large value 16 pulls the mean up, while the median stays 4.",
  exampleWhy: "The request names the two ideas and asks for a calculation your friend can check. The example shows why mean and median can differ. Check the actual explanation and arithmetic; a clear prompt cannot guarantee a correct answer.",
  referenceFacts: "Mean is sum divided by count. Median is the middle sorted value; for an even count it is the mean of the two middle values. For 2, 3, 4, 5, 16, mean=6 and median=4. Other correct datasets are acceptable.",
  assessmentNotes: "The prompt must request mean versus median and a checkable number example. Do not require the deadline, exact words, a role, a fixed dataset, a word limit or a specific format. Judge whether the student accurately checks the actual explanation and calculations; correctly identifying a bad answer can pass. Connect feedback to what the friend would still struggle to understand, and success to the student's clear request and accurate check. Do not claim the friend has learned or is ready for the quiz."
};
// Missing versions retain the published invitation task and its historical judgments.
export function taskFor(id, materialVersion = "legacy-v1") {
  return id === "beginner-01" && materialVersion === "quiz-v1" ? quizMission : practiceTasks[id];
}
export function isFinal(id) { return id.startsWith("beginner-final-"); }
export function isReview(id) { return id.startsWith("beginner-review-"); }
export function practiceFinished(state) { return Boolean(state && (state.completed || state.point || state.attempts >= 3)); }
