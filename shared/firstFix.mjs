export const firstFixTasks = {
  A: { context: "Kabir’s match", weak: "Announce our match.", vague: "Join us soon!", place: "Gully Park", options: ["Place", "Emoji", "Rhyme"], correct: 0 },
  B: { context: "Meera’s clean-up", weak: "Announce our clean-up.", vague: "Come help soon!", place: "Gully Park", options: ["Rhyme", "Place", "Emoji"], correct: 1 },
  C: { context: "Tara’s detective meeting", weak: "Announce our meeting.", vague: "Join us soon!", place: "Gully Lane", options: ["Emoji", "Rhyme", "Place"], correct: 2 },
};
export const firstFixKey = path => `prompt-game:first-fix:${path}:v1`;
export function firstFixReason(path, index) {
  const t = firstFixTasks[path];
  return index === t.correct ? "Yes, people need a place." : "Style does not give a place.";
}
export function detailCheck(path, answer) {
  const place = firstFixTasks[path].place;
  const words = answer.toLowerCase().replace(/[^a-z0-9]+/g, " ");
  return (` ${words} `).includes(` ${place.toLowerCase()} `)
    ? `The answer names ${place}.`
    : `${place} is still missing.`;
}
