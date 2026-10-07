// Rewrite only the practice display. Saved assessment and scoring stay intact.
const internal=/\b(?:correction[-\s]related|fields?|flags?|booleans?|schema|empty explanation|promptMeetsRequirements|judgmentMeetsRequirements|correctionAddressesGap|explanationSound|earned\s*=|route\s*=)\b/i;
function studentText(text="") {
  return text.split(/(?<=[.!?])\s+|\n+/)
    .filter(sentence=>!internal.test(sentence))
    .map(sentence=>sentence
      .replace(/\b(?:the )?student(?:'s|’s)?\s+prompt\b/gi,"Your prompt")
      .replace(/\b(?:the )?student(?:'s|’s)?\s+judgment\b/gi,"Your judgment")
      .replace(/\bthe student\b/gi,"You")
      .replace(/\bthe prompt\b/gi,"Your prompt")
      .replace(/\bthe judgment\b/gi,"Your judgment"))
    .join(" ").trim();
}
export function studentFeedback(feedback) {
  if(!feedback)return feedback;
  const fallback=feedback.earned?"Your prompt and judgment meet the task requirements.":feedback.route==="prompt"?"Your prompt still needs a change to meet the task requirements.":"Your judgment still needs a change to check the answer against the task requirements.";
  return {...feedback,gap:studentText(feedback.gap)||(feedback.earned?"":fallback),why:studentText(feedback.why)||fallback,evidence:studentText(feedback.evidence)};
}
