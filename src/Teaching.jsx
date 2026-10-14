import { playerText } from "./playerText.mjs";
import React, { useEffect, useRef, useState } from "react";
import { weakPrompt, strongPrompt, teachingOptions, teachingReasons } from "../shared/teaching.mjs";
import "./teaching.css";
import ScreenProgress from "./ScreenProgress.jsx";

export const TEACHING_KEY = "prompt-game:teaching:picnic-v1";
const DRAFT_KEY = `${TEACHING_KEY}:choice`;
function savedChoice() { try { const value = JSON.parse(localStorage.getItem(DRAFT_KEY)); return [0, 1, 2].includes(value) ? value : null; } catch { return null; } }

export default function Teaching({ saveAnswer, onContinue }) {
  const [choice, setChoice] = useState(savedChoice);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  const heading = useRef(null), saving = useRef(false);
  useEffect(() => { heading.current?.focus(); }, []);
  useEffect(() => { if (choice !== null) persist(choice); }, []);
  async function persist(index) {
    if (saving.current) return;
    saving.current = true; setBusy(true); setError("");
    try {
      const saved = await saveAnswer(index);
      setChoice(saved.optionIndex); setResult(saved);
    } catch { setError("Your choice did not save. Tap Save again before you continue."); }
    finally { saving.current = false; setBusy(false); }
  }
  function choose(index) {
    if (choice !== null) return;
    setChoice(index);
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(index)); } catch {}
    persist(index);
  }
  function finish() {
    if (!result || busy) return;
    try { localStorage.setItem(TEACHING_KEY, JSON.stringify(result)); localStorage.removeItem(DRAFT_KEY); } catch {}
    onContinue(result);
  }
  return <div className="practice-world"><header className="game-header"><a className="wordmark" href="/" aria-label="Prompt Gully"><span>Prompt</span><span className="gully-tag">Gully</span></a></header><main className="teaching-step invitation-lesson">
    <ScreenProgress label="Warm-up" detail="Screen 1 of 2 before typing" step={1} total={2} />
    <>
      <h1 ref={heading} tabIndex={-1}>Tara’s invitation</h1>
      <p>Tara needs a picnic invitation. Her first prompt left out details. Read both prompts below.</p>
      <div className="prompt-comparison"><section><h2>Weak prompt</h2><blockquote>{weakPrompt}</blockquote><p className="answer-excerpt">You’re invited!<br/>Join us for a wonderful get-together.<br/>We look forward to seeing you.</p></section><section className="strong-example"><h2>Strong prompt</h2><blockquote>{strongPrompt}</blockquote><p className="answer-excerpt">• Picnic at Gully Park.<br/>• Saturday at 4 PM.<br/>• Bring water.</p><dl><div><dt>Goal</dt><dd>Tell AI what you want it to do.</dd></div><div><dt>Details</dt><dd>Give it the details it needs.</dd></div><div><dt>Answer layout</dt><dd>Say how the answer should look.</dd></div></dl></section></div>
      <h2>Which prompt is better, and why?</h2>
      <fieldset className="teaching-options"><legend>Tap one answer.</legend>{teachingOptions.map((option, index) => <label key={index} className={choice === index ? "chosen" : ""}><input type="radio" name="teaching-choice" checked={choice === index} disabled={choice !== null} onChange={() => choose(index)}/><span>{playerText(option)}</span></label>)}</fieldset>
      {choice !== null && <>{result && <p className="teaching-reaction">{result.correct ? "Nice catch!" : "Keep going. Every check helps."}</p>}<p className="teaching-reason" role="status">{playerText(teachingReasons[choice])}</p>{busy && <p role="status">Saving your choice…</p>}{error && <div role="alert"><p>{error}</p><button onClick={() => persist(choice)}>Save again</button></div>}<button className="primary" disabled={!result || busy} onClick={finish}>Continue</button></>}
    </>
  </main></div>;
}
