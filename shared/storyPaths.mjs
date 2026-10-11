export const PATH_KEY = "prompt-game:story-path:stories-v1";
export const storyPaths = {
  A: {
    name: "Matchday Rescue",
    setup: "Help Kabir sort out the numbers before the neighbourhood team meets.",
    scenes: {
      "beginner-01": "Kabir has 20 minutes before his quiz. He keeps mixing up mean and median while looking at the team’s scores. Improve his AI request so he gets an explanation with one number example, then check the explanation and calculations.",
      "beginner-02": "Kabir’s match report is ready, but the submission message leaves everyone guessing. Help him turn the supplied details into clear instructions: one PDF through the course portal by Tuesday at 5 PM, named student-ID_report.pdf. Use exactly three numbered steps, at most 70 words, and invent no link, fee or extra requirement.",
    },
    ending: "You checked the numbers and the report instructions. Matchday Rescue is complete.",
  },
  B: {
    name: "Gully Radio",
    setup: "Help Meera prepare the neighbourhood radio club’s next student segment.",
    scenes: {
      "beginner-01": "Meera has 20 minutes before her quiz. Her radio segment mentions mean and median, but she cannot explain the difference. Improve her AI request so she gets an explanation with one number example, then check the explanation and calculations.",
      "beginner-02": "Meera has written the radio club report, but her teammates do not know how to submit theirs. Help her turn the supplied details into clear instructions: one PDF through the course portal by Tuesday at 5 PM, named student-ID_report.pdf. Use exactly three numbered steps, at most 70 words, and invent no link, fee or extra requirement.",
    },
    ending: "You checked the explanation and the report instructions. Gully Radio is complete.",
  },
  C: {
    name: "The Lane Detectives",
    setup: "Help Tara’s student detective club check the clues before trusting them.",
    scenes: {
      "beginner-01": "Tara has 20 minutes before her quiz. A clue sheet mentions mean and median, but the AI explanation is too vague to check. Improve her AI request so she gets an explanation with one number example, then check the explanation and calculations.",
      "beginner-02": "Tara’s clue report is ready, but the club’s submission message is missing essential details. Help her turn the supplied details into clear instructions: one PDF through the course portal by Tuesday at 5 PM, named student-ID_report.pdf. Use exactly three numbered steps, at most 70 words, and invent no link, fee or extra requirement.",
    },
    ending: "You checked the explanation and the report instructions. The Lane Detectives path is complete.",
  },
};
export function savedPath(storage = localStorage) {
  try { const id = JSON.parse(storage.getItem(PATH_KEY)); return Object.hasOwn(storyPaths, id) ? id : null; } catch { return null; }
}
