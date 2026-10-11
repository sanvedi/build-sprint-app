import React, { useState } from "react";
import "./teacher.css";

export const NAME_KEY = "prompt-game:first-name:v1";
export default function StudentName({ saveName, onContinue }) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(skip = false) {
    const firstName = skip ? "Guest" : name.trim() || "Guest";
    if (!/^[\p{L}][\p{L}\p{M}'’\-]{0,39}$/u.test(firstName)) { setError("Use your first name only, or skip this step."); return; }
    setBusy(true); setError("");
    try {
      const savedName = await saveName(firstName) || firstName;
      try { localStorage.setItem(NAME_KEY, JSON.stringify({ firstName: savedName })); } catch {}
      onContinue();
    } catch { setError("Your name could not be saved. Please try again. Your practice has not started."); }
    finally { setBusy(false); }
  }
  return <main className="name-step"><a className="wordmark" href="/">Prompt Gully</a><h1 className="welcome-headline">Build clearer prompts. Spot weak AI answers.</h1><p className="first-action">First, help Tara choose a picnic invitation she can send.</p><h2>What’s your first name?</h2><p>Your teacher can see this name with your visits, practice starts and completed practices. You can skip and appear as Guest.</p><form onSubmit={e => { e.preventDefault(); submit(); }}><label htmlFor="first-name">First name</label><input id="first-name" name="given-name" autoComplete="given-name" maxLength={40} value={name} onChange={e => setName(e.target.value)} disabled={busy}/>{error && <p className="error" role="alert">{error}</p>}<button className="primary" disabled={busy}>{busy ? "Saving your name…" : "Start Practice 1"}</button><button type="button" disabled={busy} onClick={() => submit(true)}>Skip — use Guest</button></form></main>;
}
