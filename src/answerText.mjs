// Display conversion only. The original answer remains the assessment input.
function groupAt(text, start) {
  if (text[start] !== "{") return null;
  let depth = 1;
  for (let i = start + 1; i < text.length; i++) {
    if (text[i] === "{") depth++;
    if (text[i] === "}" && --depth === 0) return { value: text.slice(start + 1, i), end: i + 1 };
  }
  return null;
}
function mathText(text) {
  text = text.replace(/\\(?:left|right)\s*/g, "");
  for (const command of ["frac", "dfrac", "tfrac", "sqrt", "text", "mathrm", "mathbf", "operatorname"]) {
    let start = text.indexOf("\\" + command);
    while (start !== -1) {
      const offset = start + command.length + 1;
      const firstStart = offset + (text.slice(offset).match(/^\s*/)?.[0].length || 0);
      const first = groupAt(text, firstStart);
      if (!first) break;
      let end = first.end;
      let replacement = mathText(first.value);
      if (command.endsWith("frac")) {
        const nextStart = end + (text.slice(end).match(/^\s*/)?.[0].length || 0);
        const second = groupAt(text, nextStart);
        if (!second) break;
        const bracket = value => /^[\w.]+$/.test(value.trim()) ? value.trim() : `(${value.trim()})`;
        replacement = `${bracket(replacement)} divided by ${bracket(mathText(second.value))}`;
        end = second.end;
      } else if (command === "sqrt") replacement = `square root of (${replacement})`;
      text = text.slice(0, start) + replacement + text.slice(end);
      start = text.indexOf("\\" + command, start + replacement.length);
    }
  }
  return text.replace(/\\(?:div|over)\b|÷/g, " divided by ")
    .replace(/\\(?:times|cdot)\b|×/g, " times ")
    .replace(/\\(?:approx|simeq)\b/g, " approximately ")
    .replace(/\\leq?\b/g, " ≤ ").replace(/\\geq?\b/g, " ≥ ")
    .replace(/\\(?:,|;|!|quad\b|qquad\b)/g, " ")
    .replace(/\\ /g, " ").replace(/\s+/g, " ").trim();
}
export function readableAnswer(text = "") {
  return text.replace(/\$\$([\s\S]*?)\$\$|\\\[([\s\S]*?)\\\]/g, (_all, dollars, brackets) => `\n\n${mathText(dollars ?? brackets)}\n\n`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_all, value) => mathText(value))
    .replace(/(?<!\\)\$([^\n$]+)\$/g, (all, value) => /\\[a-zA-Z]|[=+*/^]|^\s*[\d.,\s-]+\s*$/.test(value) ? mathText(value) : all);
}
