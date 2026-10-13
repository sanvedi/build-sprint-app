import React, { useState } from "react";
import { api } from "../convex/_generated/api";
import { firstFixTasks, firstFixKey, firstFixReason, detailCheck } from "../shared/firstFix.mjs";
import ScreenProgress from "./ScreenProgress.jsx";
import Answer from "./Answer.jsx";
import "./firstFix.css";

export function needsFirstFix(path) {
  if (!firstFixTasks[path]) return false;
  try {
    // Existing practice work always resumes without inserting a new prerequisite.
    return !JSON.parse(localStorage.getItem(firstFixKey(path)))?.done && !localStorage.getItem(`prompt-game:path-${path}-01:v1`);
  } catch { return true; }
}
export default function FirstFix({ path, client, token, onContinue }) {
  const task=firstFixTasks[path];
  const [s,setS]=useState(()=>{try{return JSON.parse(localStorage.getItem(firstFixKey(path)))||{step:1,choice:null,prompt:task.weak};}catch{return {step:1,choice:null,prompt:task.weak};}});
  const [busy,setBusy]=useState(false),[error,setError]=useState(""),[saveError,setSaveError]=useState(false);
  function save(next){setS(next);try{localStorage.setItem(firstFixKey(path),JSON.stringify(next));setSaveError(false);return true;}catch{setSaveError(true);return false;}}
  async function generate(){
    const requestId=s.requestId||crypto.randomUUID();
    if(!save({...s,requestId}))return;
    setBusy(true);setError("");
    try{const answer=await client.action(api.firstFix.generate,{token,path,requestId,prompt:s.prompt});save({...s,requestId,answer});}
    catch(e){const text=String(e?.data||e?.message||e);setError(text.includes("DAILY_ALLOWANCE")?"Today's AI allowance is used up. Try after 5:30 AM India time; your prompt is saved.":text.includes("REQUEST_PENDING")?"Your answer is still processing. Wait a moment, then retry.":"Your answer could not load. Your prompt is here; try again.");}
    finally{setBusy(false);}
  }
  function next(){if(save({...s,done:true}))onContinue();}
  return <div className="practice-world first-fix"><header className="game-header"><a className="wordmark" href="/" aria-label="Prompt Gully"><span>Prompt</span><span className="gully-tag">Gully</span></a></header><main className="practice-game">
    <ScreenProgress label="Practice 0 · First fix" detail={`${s.step}/2`} step={s.step} total={2}/>
    <section className="lesson-workspace">
      <h1>{task.context}</h1>
      {s.step===1?<>
        <p><strong>Prompt:</strong> {task.weak}</p>
        <p><strong>Answer:</strong> {task.vague}</p>
        <h2>What’s missing?</h2>
        <div className="teaching-options">{task.options.map((option,i)=><button key={option} aria-pressed={s.choice===i} onClick={()=>save({...s,choice:i})}>{option}</button>)}</div>
        {s.choice!==null&&<p className="teaching-reason" role="status">{firstFixReason(path,s.choice)}</p>}
        {s.choice===task.correct&&<button className="primary" onClick={()=>{save({...s,step:2});window.scrollTo(0,0);}}>Improve the prompt</button>}
      </>:<>
        <p>Add the place: <strong>{task.place}</strong>.</p>
        <label htmlFor="first-fix-prompt">Improve this prompt</label>
        <textarea id="first-fix-prompt" rows={3} maxLength={6000} value={s.prompt} disabled={busy} onChange={e=>{setError("");save({...s,prompt:e.target.value,answer:null,requestId:null});}}/>
        <button className="primary" onClick={generate} disabled={busy||!s.prompt.trim()||!!s.answer||saveError}>{busy?"Generating answer…":"Generate answer"}</button>
        {s.answer&&<><h2>Your AI answer</h2><Answer text={s.answer.text}/><p className="teaching-reason" role="status">{detailCheck(path,s.answer.text)}</p><button className="primary" disabled={saveError} onClick={next}>Start Practice 1</button></>}
      </>}
      {error&&<p className="error" role="alert">{error}</p>}
      {saveError&&<div role="alert"><p>Your work could not save on this device. Keep this page open.</p><button onClick={()=>save(s)}>Retry saving</button></div>}
    </section>
  </main></div>;
}
