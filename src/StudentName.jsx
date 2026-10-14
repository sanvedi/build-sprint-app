import React, { useState } from "react";
import "./teacher.css";
import ScreenProgress from "./ScreenProgress.jsx";

export const NAME_KEY = "prompt-game:first-name:v1";
export default function StudentName({ saveName, onContinue }) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(skip = false) {
    const firstName = skip ? "Guest" : name.trim() || "Guest";
    if (!/^[\p{L}][\p{L}\p{M}'’\-]{0,39}$/u.test(firstName)) { setError("Type your first name. Or tap Skip."); return; }
    setBusy(true); setError("");
    try {
      const savedName = await saveName(firstName) || firstName;
      try { localStorage.setItem(NAME_KEY, JSON.stringify({ firstName: savedName })); } catch {}
      onContinue();
    } catch { setError("Your name did not save. Tap Start Practice 1 again. Your practice has not started."); }
    finally { setBusy(false); }
  }
  return <main className="name-step"><a className="wordmark" href="/">Prompt Gully</a><ScreenProgress label="Welcome" detail="Your journey starts here" step={0} /><h1 className="welcome-headline">Write clearer prompts. Spot mistakes in AI answers.</h1><p className="first-action">Help Tara choose an invitation for her picnic.</p><h2>What’s your first name?</h2><p>Your teacher sees your name and visits. They see which practices you start and finish. Tap Skip to use Guest instead.</p><form onSubmit={e => { e.preventDefault(); submit(); }}><label htmlFor="first-name">First name</label><input id="first-name" name="given-name" autoComplete="given-name" maxLength={40} value={name} onChange={e => setName(e.target.value)} disabled={busy}/>{error && <p className="error" role="alert">{error}</p>}<button className="primary" disabled={busy}>{busy ? "Saving your name…" : "Start Practice 1"}</button><button type="button" disabled={busy} onClick={() => submit(true)}>Skip — use Guest</button></form></main>;
}
