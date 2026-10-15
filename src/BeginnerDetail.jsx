import React, { useState } from "react";
import { api } from "../convex/_generated/api";
import { beginnerTasks, beginnerTitles, beginnerKey, beginnerOptions, beginnerReason, beginnerCheck } from "../shared/beginnerDetails.mjs";
import ScreenProgress from "./ScreenProgress.jsx";
import Answer from "./Answer.jsx";
import "./firstFix.css";

export default function BeginnerDetail({ path, kind, client, token, onContinue }) {
  const task=beginnerTasks[path];
  const [s,setS]=useState(()=>{try{return JSON.parse(localStorage.getItem(beginnerKey(path,kind)))||{step:1,choice:null,prompt:task.weak};}catch{return {step:1,choice:null,prompt:task.weak};}});
  const [busy,setBusy]=useState(false),[error,setError]=useState(""),[saveError,setSaveError]=useState(false);
  function save(next){setS(next);try{localStorage.setItem(beginnerKey(path,kind),JSON.stringify(next));setSaveError(false);return true;}catch{setSaveError(true);return false;}}
  async function generate(){
    const requestId=s.requestId||crypto.randomUUID();
    if(!save({...s,requestId}))return;
    setBusy(true);setError("");
    try{const answer=await client.action(api.firstFix.generate,{token,path,requestId,prompt:s.prompt});save({...s,requestId,answer});}
    catch(e){const text=String(e?.data||e?.message||e);setError(text.includes("DAILY_ALLOWANCE")?"You used today's AI call limit. Try again after 5:30 AM India time. Your prompt is saved.":text.includes("REQUEST_PENDING")?"AI is still writing. Wait a moment. Then tap Get AI answer again.":"The answer did not load. Your prompt is still here. Tap Get AI answer again.");}
    finally{setBusy(false);}
  }
  function next(){if(save({...s,done:true}))onContinue();}
  return <div className="practice-world first-fix"><header className="game-header"><a className="wordmark" href="/" aria-label="Prompt Gully"><span>Prompt</span><span className="gully-tag">Gully</span></a></header><main className="practice-game">
    <ScreenProgress label={beginnerTitles[kind]} detail={`${s.step}/2`} step={s.step} total={2}/>
    <section className="lesson-workspace">
      <h1>{task.context}</h1>
      {s.step===1?<>
        <p><strong>Prompt:</strong> {task.weak}</p>
        <h2>Tap the missing detail.</h2>
        <div className="teaching-options">{beginnerOptions(path,kind).map((option,i)=><button key={option} aria-pressed={s.choice===i} onClick={()=>save({...s,choice:i})}>{option}</button>)}</div>
        {s.choice!==null&&<p className="teaching-reason" role="status">{beginnerReason(path,kind,s.choice)}</p>}
        {s.choice===task.correct&&<button className="primary" onClick={()=>{save({...s,step:2});window.scrollTo(0,0);}}>Edit the prompt</button>}
      </>:<>
        <p>{kind==="audience"?<>Write for <strong>{task.audience}</strong>. Name them in the answer.</>:<>Ask for a list with two bullet points.</>}</p>
        <label htmlFor="beginner-detail-prompt">Add the missing details</label>
        <textarea id="beginner-detail-prompt" rows={3} maxLength={6000} value={s.prompt} disabled={busy} onChange={e=>{setError("");save({...s,prompt:e.target.value,answer:null,requestId:null});}}/>
        <button className="primary" onClick={generate} disabled={busy||!s.prompt.trim()||!!s.answer||saveError}>{busy?"AI is writing…":"Get AI answer"}</button>
        {s.answer&&<><h2>Your AI answer</h2><Answer text={s.answer.text}/><p className="teaching-reason" role="status">{beginnerCheck(path,kind,s.answer.text)}</p><button className="primary" disabled={saveError} onClick={next}>{kind==="audience"?"Start Beginner B":"Start Practice 1"}</button></>}
      </>}
      {error&&<p className="error" role="alert">{error}</p>}
      {saveError&&<div role="alert"><p>Your work did not save on this device. Keep this page open. Tap Save again.</p><button onClick={()=>save(s)}>Save again</button></div>}
    </section>
  </main></div>;
}
