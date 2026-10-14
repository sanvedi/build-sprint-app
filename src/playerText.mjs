import changes from "./playerText.json";
// Display wording only. Never pass these replacements to AI or saved records.
export function playerText(value) { return changes[value] ?? value; }
