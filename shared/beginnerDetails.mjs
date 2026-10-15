export const beginnerTitles = {
  audience: "Beginner A · Add who it is for",
  format: "Beginner B · Add the format",
};
export const beginnerTasks = {
  A: { context: "Kabir’s match", weak: "Announce our match.", audience: "new players", options: ["Readers", "Emoji", "Rhyme"], correct: 0 },
  B: { context: "Meera’s clean-up", weak: "Announce our clean-up.", audience: "new helpers", options: ["Rhyme", "Readers", "Emoji"], correct: 1 },
  C: { context: "Tara’s detective meeting", weak: "Announce our meeting.", audience: "new detectives", options: ["Emoji", "Rhyme", "Readers"], correct: 2 },
};
export const beginnerKey = (path, kind) => `prompt-game:beginner-details:${path}:${kind}:v1`;
export function nextBeginner(path, storage) {
  if (!beginnerTasks[path] || storage.getItem(`prompt-game:path-${path}-01:v1`)) return null;
  for (const kind of ["audience", "format"]) {
    try { if (!JSON.parse(storage.getItem(beginnerKey(path,kind)))?.done) return kind; }
    catch { return kind; }
  }
  return null;
}
export function beginnerOptions(path,kind) {
  return beginnerTasks[path].options.map(option=>option==="Readers"&&kind==="format"?"List":option);
}
export function beginnerReason(path,kind,index) {
  if(index!==beginnerTasks[path].correct) return kind==="audience"?"That does not name the readers.":"That does not ask for a list.";
  return kind==="audience"?"Yes! Name the readers.":"Yes! Ask for a list.";
}
export function beginnerCheck(path,kind,answer) {
  if(kind==="format") {
    const lines=answer.split(/\r?\n/).filter(line=>/^\s*(?:[-*•]|\d+[.)])\s+\S/.test(line));
    return lines.length>=2?"The answer has a list.":"A list is still missing.";
  }
  const words=answer.toLowerCase().replace(/[^a-z0-9]+/g," ");
  return (` ${words} `).includes(` ${beginnerTasks[path].audience} `)?"The answer names the readers.":"The readers are not named yet.";
}
