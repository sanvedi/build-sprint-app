import React, { useEffect, useRef, useState } from "react";
import { weakPrompt, strongPrompt, teachingOptions, teachingReasons } from "../shared/teaching.mjs";
import "./teaching.css";

export const TEACHING_KEY = "prompt-game:teaching:picnic-v1";
const DRAFT_KEY = `${TEACHING_KEY}:choice`;
function savedChoice() { try { const value = JSON.parse(localStorage.getItem(DRAFT_KEY)); return [0, 1, 2].includes(value) ? value : null; } catch { return null; } }

export default function Teaching({ saveAnswer, onContinue }) {
  const [choice, setChoice] = useState(savedChoice);
  const [screen, setScreen] = useState(choice === null ? 1 : 2);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  const heading = useRef(null), saving = useRef(false);
  useEffect(() => { heading.current?.focus(); }, [screen]);
  useEffect(() => { if (choice !== null) persist(choice); }, []);
  async function persist(index) {
    if (saving.current) return;
    saving.current = true; setBusy(true); setError("");
    try {
      const saved = await saveAnswer(index);
      setChoice(saved.optionIndex); setResult(saved);
    } catch { setError("Your choice could not be saved. Retry saving before continuing."); }
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
  return <div className="practice-world"><header className="game-header"><a className="wordmark" href="/" aria-label="Prompt Gully"><span>Prompt</span><span className="gully-tag">Gully</span></a></header><main className="teaching-step">
    {screen === 1 ? <>
      <h1 ref={heading} tabIndex={-1}>Tara’s invitation</h1>
      <p>The picnic is coming up. I asked AI for an invitation, but I didn’t tell it enough. Compare these two prompts.</p>
      <div className="prompt-comparison"><section><h2>Weak prompt</h2><blockquote>{weakPrompt}</blockquote></section><section className="strong-example"><h2>Strong prompt</h2><blockquote>{strongPrompt}</blockquote><dl><div><dt>Goal</dt><dd>Tell AI what you want it to do.</dd></div><div><dt>Context</dt><dd>Give it the details it needs.</dd></div><div><dt>Format</dt><dd>Say how the answer should look.</dd></div></dl></section></div>
      <button className="primary" onClick={() => setScreen(2)}>Try a quick question</button>
    </> : <>
      <h1 ref={heading} tabIndex={-1}>Which prompt is better, and why?</h1>
      <fieldset className="teaching-options"><legend>Choose one answer.</legend>{teachingOptions.map((option, index) => <label key={index} className={choice === index ? "chosen" : ""}><input type="radio" name="teaching-choice" checked={choice === index} disabled={choice !== null} onChange={() => choose(index)}/><span>{option}</span></label>)}</fieldset>
      {choice !== null && <><p className="teaching-reason" role="status">{teachingReasons[choice]}</p>{busy && <p role="status">Saving your choice…</p>}{error && <div role="alert"><p>{error}</p><button onClick={() => persist(choice)}>Retry saving</button></div>}<button className="primary" disabled={!result || busy} onClick={finish}>Continue</button></>}
    </>}
  </main></div>;
}
