import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import "@fontsource/nunito-sans/latin-400.css";
import "@fontsource/nunito-sans/latin-600.css";
import "@fontsource/nunito-sans/latin-800.css";
import "./style.css";
import Answer from "./Answer.jsx";
import { practiceTasks, taskFor, practiceFinished, isFinal, isReview, initialState, generated, judged, assessed, rechecked, correction, saveResult, loadState } from "./practice.mjs";

import { statePreview, previewAction } from "./statePreview.mjs";
const preview=import.meta.env?.DEV?statePreview(new URLSearchParams(location.search).get("preview")):null;
const RECOVERY="prompt-game:request-recovery:v1";
function storedRecovery(){try{return JSON.parse(localStorage.getItem(RECOVERY)||sessionStorage.getItem(RECOVERY));}catch{return null;}}
function remember(value){const text=JSON.stringify(value);try{localStorage.setItem(RECOVERY,text);}catch{sessionStorage.setItem(RECOVERY,text);}}
function forget(){try{localStorage.removeItem(RECOVERY);}catch{}try{sessionStorage.removeItem(RECOVERY);}catch{}}
function newRequestId(){return crypto.randomUUID?crypto.randomUUID():Array.from(crypto.getRandomValues(new Uint8Array(16)),n=>n.toString(16).padStart(2,"0")).join("");}
const ACTIVE="prompt-game:active-practice:v1";
const allowanceMessage="Today's practice limit is used up. It resets at midnight UTC (5:30 AM India time). Your work is still here.";
function savedAllowanceReset(){const reset=storedRecovery()?.allowanceResetAt;return typeof reset==="number"&&reset>Date.now()?reset:null;}
const practiceKey=id=>`prompt-game:${id}:v1`;
function savedPractice(id){return loadState(()=>localStorage.getItem(practiceKey(id)),id);}
function startingPractice(){
 if(preview)return preview.challengeId||"beginner-01";
 const recovery=storedRecovery();if(recovery)return recovery.challengeId||"beginner-01";
 try{const id=JSON.parse(localStorage.getItem(ACTIVE));return id in practiceTasks&&(id==="beginner-01"||practiceFinished(savedPractice("beginner-01")))?id:"beginner-01";}catch{return "beginner-01";}
}
const TOKEN="prompt-game:session:v1";
const client=__CONVEX_URL__?new ConvexHttpClient(__CONVEX_URL__):null;
function sessionToken(){let token=localStorage.getItem(TOKEN);if(!token){token=Array.from(crypto.getRandomValues(new Uint8Array(32)),n=>n.toString(16).padStart(2,"0")).join("");localStorage.setItem(TOKEN,token);}return token;}
function errorText(error){return typeof error?.data==="string"?error.data:String(error?.message||error);}
function message(error){const text=errorText(error);if(text.includes("TASK_VERSION_CHANGED"))return "Your saved practice uses the earlier invitation task. Keep this edit and reopen the browser where you started that practice to continue it.";if(text.includes("FINAL_PRACTICE_REQUIRED"))return "Not yet. Review the feedback and return to practice.";if(text.includes("FINAL_VARIANTS_EXHAUSTED"))return "Keep practising. Another fresh final challenge is needed to unlock the next level.";if(text.includes("FINAL_UNAVAILABLE"))return "Answers and feedback are unavailable right now. Your work is still here.";if(text.includes("AI_UNAVAILABLE"))return "Answers and feedback are unavailable right now. Your work is still here.";if(text.includes("DAILY_ALLOWANCE"))return allowanceMessage;if(text.includes("REQUEST_PENDING"))return "This request is still processing. Wait a moment, then retry.";if(text.includes("PRACTICE_FINISHED"))return "This practice has already been assessed. Keep your confirmed result.";return "This request could not be completed. Your work is still here. Try again.";}
function requestError(error,kind){
 const text=errorText(error);
 if(["DAILY_ALLOWANCE","REQUEST_PENDING","PRACTICE_FINISHED","AI_UNAVAILABLE","TASK_VERSION_CHANGED"].some(x=>text.includes(x)))return message(error);
 return kind==="generate"?"The answer could not be generated. Your edit is still here. Try again.":"Assessment is unavailable. Your answer and judgment are still here.";
}
function Progress({state,pending,challengeId,records,onOpen,disabled}){
  const all={...records,[challengeId]:state};
  const firstFinished=practiceFinished(pending&&challengeId==="beginner-01"?records["beginner-01"]:all["beginner-01"]);
  const badge=Object.entries(all).some(([id,value])=>isFinal(id)&&value.passed&&!(pending&&id===challengeId));
  const points=Object.entries(all).reduce((sum,[id,value])=>sum+(["beginner-01","beginner-02"].includes(id)&&value.point&&!(id===challengeId&&pending)?1:0),0);
  function words(id){
    const value=all[id];const number=id==="beginner-01"?1:2;
    if(id===challengeId&&pending)return `Practice ${number} - Save pending`;
    if(value?.point)return `Practice ${number} - 1 skill point earned`;
    if(practiceFinished(value))return `Practice ${number} - Completed with help - No skill point`;
    if(id===challengeId)return `Practice ${number} of 2 - Current`;
    return `Practice ${number} - ${firstFinished?"Ready":"Locked"}`;
  }
  return <nav className="progress" aria-label="Learning progress"><div className="level current"><span className="level-symbol" aria-hidden="true">1</span><div><strong>Beginner</strong>{["beginner-01","beginner-02"].map(id=>id!==challengeId&&(practiceFinished(all[id])||id==="beginner-02"&&firstFinished)?<button key={id} onClick={()=>onOpen(id)} disabled={disabled}>{words(id)}</button>:<span key={id} aria-current={id===challengeId?"step":undefined}>{words(id)}</span>)}<span>{pending&&isFinal(challengeId)?"Final challenge - Save pending":badge?"Beginner badge earned":isFinal(challengeId)?"Final challenge - Current":practiceFinished(all["beginner-01"])&&practiceFinished(all["beginner-02"])?"Final challenge - Ready":"Final challenge - Locked"}</span></div></div><div className="level locked"><span className="level-symbol" aria-hidden="true">2</span><div><strong>Amateur</strong><span className="lock-short">{badge?"Ready":"Locked"}</span><span className="lock-detail">{badge?"Ready - More challenges will follow.":"Locked - Pass Beginner's final"}</span></div></div><div className="level locked"><span className="level-symbol" aria-hidden="true">3</span><div><strong>Pro</strong><span className="lock-short">Locked</span><span className="lock-detail">Locked - Pass Amateur's final</span></div></div><div className="points"><strong>{points}<span> / 6</span></strong><span>Skill points</span></div></nav>;
}
function Requirements({task,open=false}){return <details className="requirements" open={open||undefined}><summary>Task requirements</summary><ul>{task.requirements.map(r=><li key={r}>{r}</li>)}</ul></details>;}
function Answers({state,task}){
  const [tab,setTab]=useState("new");const positions=useRef({});const body=useRef(null);
  useEffect(()=>{setTab("new");if(body.current)body.current.scrollTop=0;},[state.answer?.id]);
  const old=state.previousAnswer?.text||task.original;
  function switchTab(next){if(body.current)positions.current[tab]=body.current.scrollTop;setTab(next);requestAnimationFrame(()=>{if(body.current)body.current.scrollTop=positions.current[next]||0;});}
  return <section aria-label="Answer comparison" className="answer-section" id="answer-view"><div className="comparison-tools"><div className="answer-tabs" role="tablist" aria-label="Compare answers"><button type="button" role="tab" aria-selected={tab==="old"} onClick={()=>switchTab("old")} aria-controls="phone-answer" id="tab-old">{state.previousAnswer?"Previous answer":"Original answer"}</button><button type="button" role="tab" aria-selected={tab==="new"} onClick={()=>switchTab("new")} aria-controls="phone-answer" id="tab-new">{state.previousAnswer?"Revised answer":"Your answer"}</button></div><a href="#judgment" onClick={()=>requestAnimationFrame(()=>document.getElementById("judgment")?.focus())}>Write my judgment</a></div><div className="answer-grid"><article className="desktop-answer"><h3>{state.previousAnswer?"Previous answer":"Original example"}</h3><Answer text={old}/></article><article className="desktop-answer"><h3>{state.previousAnswer?"Revised answer":"Your answer"}</h3><Answer text={state.answer.text}/></article></div><article className="phone-answer" id="phone-answer" role="tabpanel" aria-labelledby={tab==="old"?"tab-old":"tab-new"} ref={body}><h3>{tab==="old"?(state.previousAnswer?"Previous answer":"Original example"):(state.previousAnswer?"Revised answer":"Your answer")}</h3><Answer text={tab==="old"?old:state.answer.text}/></article></section>;
}
function App(){
  const [challengeId,setChallengeId]=useState(startingPractice);
  const final=isFinal(challengeId);const review=isReview(challengeId);
  const [records,setRecords]=useState(()=>preview?preview.records||{}:Object.fromEntries(Object.keys(practiceTasks).map(id=>[id,savedPractice(id)])));
  const [s,setS]=useState(()=>preview?.state||storedRecovery()?.next||storedRecovery()?.before||savedPractice(startingPractice()));
  const task=taskFor(challengeId,s.materialVersion);const mission=challengeId==="beginner-01"&&s.materialVersion==="quiz-v1";
  const [allowanceResetAt,setAllowanceResetAt]=useState(()=>preview?null:savedAllowanceReset());
  const allowanceReached=allowanceResetAt!==null;
  const [pending,setPending]=useState(()=>preview?.pending?preview.state:preview?null:storedRecovery()?.next||null);const [saveError,setSaveError]=useState(Boolean(preview?.saveError||preview?.pending||!preview&&storedRecovery()?.next));const [error,setError]=useState(preview?.error||(allowanceReached?allowanceMessage:""));const [errorAction,setErrorAction]=useState(preview?.errorAction||(allowanceReached?storedRecovery()?.action||"":""));const [busy,setBusy]=useState(preview?.busy||"");const recovered=useRef(preview?null:storedRecovery());const request=useRef(recovered.current?.request||null);const announcement=useRef(null);
  useEffect(()=>{if(preview)return;try{if(!localStorage.getItem(practiceKey(challengeId))&&!storedRecovery())persist(s);}catch{setSaveError(true);}const recovery=recovered.current;if(recovery?.request&&!recovery.next&&!allowanceReached){if(recovery.action==="generate")generate();else if(recovery.action==="assess")assess();else if(recovery.action==="recheck")challenge();}},[]);
  useEffect(()=>{if(["feedback","complete","example","finalPass","finalFail"].includes(s.stage))announcement.current?.focus();},[s.stage]);
  useEffect(()=>{if(!allowanceResetAt)return;const timer=setTimeout(()=>{setAllowanceResetAt(null);setError("");},Math.max(0,allowanceResetAt-Date.now()));return()=>clearTimeout(timer);},[allowanceResetAt]);
  function blockAllowance(error){
    if(!errorText(error).includes("DAILY_ALLOWANCE"))return;
    const reset=new Date();reset.setUTCHours(24,0,0,0);setAllowanceResetAt(reset.getTime());
    try{if(!preview)remember({...storedRecovery(),allowanceResetAt:reset.getTime()});}catch{}
  }
  function persist(next,{confirmed=false}={}){const result=saveResult(next,value=>{if(!preview)localStorage.setItem(practiceKey(challengeId),value);});setS(next);setSaveError(!result.saved);if(result.saved)setRecords(old=>({...old,[challengeId]:next}));if(confirmed){setPending(result.pending);if(!preview){if(result.saved)forget();else try{remember({next,challengeId});}catch{}}}return result.saved;}
  function openPractice(id,provided){
    if(pending||busy||saveError||errorAction)return;
    if(id==="beginner-02"&&!practiceFinished(challengeId==="beginner-01"?s:records["beginner-01"]))return;
    const next=provided||(preview?(records[id]||initialState(id)):savedPractice(id));
    try{if(!preview)localStorage.setItem(ACTIVE,JSON.stringify(id));}catch{setSaveError(true);setPending(s);try{remember({next:s,challengeId});}catch{}return;}
    setRecords(old=>({...old,[challengeId]:s}));setChallengeId(id);setS(next);request.current=null;setError("");setErrorAction("");if(!preview)forget();
  }
  async function startFinal(){
    if(pending||busy||saveError||errorAction)return;
    setBusy("Final challenge");setError("");
    try{
      const opened=preview?{challengeId:review?"beginner-final-02":"beginner-final-01"}:await client.mutation(api.practiceData.openFinal,{token:sessionToken()});
      const id=opened.challengeId;const next=preview?(records[id]||initialState(id)):savedPractice(id);
      // The server records seen variants before any final task is displayed.
      if(!preview){localStorage.setItem(practiceKey(id),JSON.stringify(next));localStorage.setItem(ACTIVE,JSON.stringify(id));}
      setRecords(old=>({...old,[challengeId]:s,[id]:next}));setChallengeId(id);setS(next);request.current=null;
    }catch(e){setError(message(e));}finally{setBusy("");}
  }
  async function returnToPractice(){
    if(pending||busy||saveError||errorAction)return;
    setBusy("Return to practice");setError("");
    try{
      const opened=preview?{challengeId:s.feedback.route==="judgment"?"beginner-review-02":"beginner-review-01",attempts:0}:await client.mutation(api.practiceData.returnToPractice,{token:sessionToken()});
      const next=opened.attempts===0?initialState(opened.challengeId):savedPractice(opened.challengeId);
      if(!preview){localStorage.setItem(practiceKey(opened.challengeId),JSON.stringify(next));localStorage.setItem(ACTIVE,JSON.stringify(opened.challengeId));}
      setRecords(old=>({...old,[challengeId]:s,[opened.challengeId]:next}));setChallengeId(opened.challengeId);setS(next);request.current=null;
    }catch(e){setError(message(e));}finally{setBusy("");}
  }
  function edit(field,value){setError(allowanceReached?allowanceMessage:"");setErrorAction("");request.current=null;const next={...s,[field]:value};if(!preview){if(allowanceReached){try{remember({before:next,challengeId,allowanceResetAt});}catch{}}else forget();}persist(next);}
  async function generate(){
    if(!s.prompt.trim()){setError("Add a prompt before generating an answer.");return;}if(s.correcting&&!s.explanation.trim()){setError("Explain what you changed and why before generating.");return;}
    if(!client&&!preview){setError("Answers are unavailable right now. Your edit is still here.");return;}
    setBusy(s.correcting?"Generating an answer to your revised prompt.":"Generating your answer");setError("");setErrorAction("");
    try {const token=preview?"a".repeat(64):sessionToken();const payload={token,prompt:s.prompt,...(s.materialVersion?{materialVersion:s.materialVersion}:{}),...(challengeId!=="beginner-01"?{challengeId}:{})};const fingerprint=JSON.stringify(payload);if(request.current?.fingerprint!==fingerprint)request.current={fingerprint,id:newRequestId()};if(!preview)remember({action:"generate",before:s,challengeId,request:request.current});const answer=preview?await previewAction("generate",challengeId):await client.action(api.practice.generate,{...payload,requestId:request.current.id});persist(generated(s,answer),{confirmed:true});request.current=null;}
    catch(e){blockAllowance(e);setError(requestError(e,"generate"));setErrorAction("generate");}finally{setBusy("");}
  }
  async function assess(){
    if(!s.judgment.trim()){setError("Explain whether this answer meets the task before submitting.");return;}if(s.correcting&&!s.explanation.trim()){setError("Explain your correction before submitting.");return;}if(!client&&!preview){setError("Feedback is unavailable right now. Your judgment is still here.");return;}
    setBusy(final?"Checking your final challenge.":"Checking your prompt and judgment.");setError("");setErrorAction("");
    try {const payload={token:preview?"a".repeat(64):sessionToken(),answerId:s.answer.id,judgment:s.judgment,explanation:s.explanation,...(s.correcting?{previousAssessmentId:s.feedback.id}:{})};const fingerprint=JSON.stringify(payload);if(request.current?.fingerprint!==fingerprint)request.current={fingerprint,id:newRequestId()};if(!preview)remember({action:"assess",before:s,challengeId,request:request.current});const f=preview?await previewAction("assess",challengeId):await client.action(api.practice.assess,{...payload,requestId:request.current.id});persist(assessed(s,f),{confirmed:true});request.current=null;}
    catch(e){blockAllowance(e);setError(final&&!["DAILY_ALLOWANCE","REQUEST_PENDING","PRACTICE_FINISHED","AI_UNAVAILABLE"].some(code=>errorText(e).includes(code))?"Your final could not be assessed. Your submission is still here. Retry assessment.":requestError(e,"assess"));setErrorAction("assess");}finally{setBusy("");}
  }
  async function challenge(){
    if(!s.feedback||s.feedback.rechecked||pending||busy)return;
    setBusy(final?"Checking your final challenge.":"Checking your prompt and judgment.");setError("");setErrorAction("");
    try{
      const payload={token:preview?"a".repeat(64):sessionToken(),assessmentId:s.feedback.id};
      const fingerprint=JSON.stringify(payload);
      if(request.current?.fingerprint!==fingerprint)request.current={fingerprint,id:newRequestId()};
      if(!preview)remember({action:"recheck",before:s,challengeId,request:request.current});
      const f=preview?await previewAction("recheck",challengeId):await client.action(api.practice.recheck,{...payload,requestId:request.current.id});
      persist(rechecked(s,f),{confirmed:true});request.current=null;
    }catch(e){blockAllowance(e);setError(requestError(e,"recheck"));setErrorAction("recheck");}finally{setBusy("");}
  }
  const isEdit=s.stage==="edit"||s.stage==="editCorrection";
  const isJudge=s.stage==="judge"||s.stage==="judgeCorrection";
  const checkingJudgment=!final&&!review&&isJudge&&busy==="Checking your prompt and judgment.";
  const hasFeedback=!!s.feedback;
  const practiceResult=s.stage==="complete"&&!final&&!review;
  const learningCue=mission?"Name the difference. Ask for an example.":challengeId==="beginner-02"?"Clear steps leave nothing to guess.":"Include the facts your reader needs.";
  const notice=task.originalGap||(challengeId==="beginner-02"?"This answer leaves the file, deadline and destination unclear, and invents a fee. What details would make the steps followable?":"This answer leaves out the session details and invents experts and registration. What does your reader actually need to know?");
  const successSummary=mission?"You asked for a checkable example and checked both calculations.":challengeId==="beginner-02"?"You made the submission steps clear and checked the required details.":"You included the invitation details and checked the answer against them.";
  const variantsExhausted=records["beginner-final-02"]?.stage==="finalFail"||challengeId==="beginner-final-02"&&s.stage==="finalFail";
  return <><header className="site-header"><a href="/" className="wordmark">Prompting Game<span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H10l-5 4v-4H4z"/><path d="m9 10 2 2 4-4"/></svg></span></a><span className="device-save">{saveError?"Device save failed":"Progress on this device"}</span></header><main className={final||review?undefined:"practice-page"}><Progress state={s} pending={pending} challengeId={challengeId} records={records} onOpen={openPractice} disabled={!!busy||!!pending||saveError||!!errorAction}/><div className="workspace">{final||review?<div className="intro">{preview&&<p role="note">This is a prepared example, not a new AI answer.</p>}<h1>{mission?"Turn a vague answer into useful help.":"Get answers that fit what you need."}</h1><p>{mission?"Spot what is missing. Make one useful edit. Check what changed.":"Practise improving a prompt, compare AI answers, and learn what to trust."}</p></div>:preview&&<p className="evidence" role="note">This is a prepared example, not a new AI answer.</p>}<div className="challenge-heading"><div>{(final||review)&&<span className="practice-label">{final?"Final challenge":review?"Return to practice":`Beginner practice ${challengeId==="beginner-01"?1:2} of 2`}</span>}{final||review?<h2>{task.title}</h2>:<h1>{task.title}</h1>}</div><span className="attempts">{final?`${s.attempts} of 1 final attempt used`:`${s.attempts} of 3 attempts used`}</span></div><p className="task-brief">{task.brief}</p>{(final||review||!isEdit)&&<Requirements task={task} open={isEdit&&!mission}/>} {!final&&!review&&isEdit&&!s.correcting&&<section className="mission-start" aria-label="The answer that missed the mark"><p className="evidence">Weak answer (prepared example)</p><blockquote>{task.original}</blockquote><p className="what-to-notice">{notice}</p><p className="learning-cue">{learningCue}</p></section>}{isEdit&&!s.correcting&&(final||review)&&<p className="evidence">{mission?"Keep the starting prompt and add what your friend needs.":"Your starting prompt is ready to edit."}</p>}{isJudge&&<p className="evidence">{mission?"Did your edit make the answer more useful? Check both ideas and the calculations.":"Your answer is ready. Check it against the task."}</p>}
    {saveError&&!pending&&<div className="error" role="alert">This edit could not be saved on this device. Keep this page open and copy your work before leaving.</div>}
    {pending&&<section className="error" role="alert"><h3>Result checked ? Save pending</h3><p>Your work is still on this page. Retry saving the same result; your answer will not be assessed again.</p><button className="primary" onClick={()=>persist(pending,{confirmed:true})}>Retry saving</button></section>}
    {error&&<p className="error" role="alert">{error}</p>}
    {busy&&!checkingJudgment&&<p className="busy" role="status">{busy} Your work remains visible.</p>}
    {hasFeedback&&!final&&s.stage!=="complete"&&s.stage!=="example"&&<section className="feedback" tabIndex={-1} ref={announcement}><h3>{s.stage==="feedback"?"One change to try":"Your feedback"}</h3><p><strong>Gap:</strong> {s.feedback.gap}</p><p><strong>Why it matters:</strong> {s.feedback.why}</p><p className="evidence">{s.feedback.evidence}</p></section>}
    {hasFeedback&&!practiceResult&&["feedback","complete","example","finalPass","finalFail"].includes(s.stage)&&s.answer&&<section className="submitted"><details><summary>Submitted prompt</summary><p>{s.prompt}</p></details><h3>{s.previousAnswer?"Revised answer":"Your answer"}</h3>{final?<p>{s.answer.text}</p>:<Answer text={s.answer.text}/>}<h3>Does your answer meet the task? Explain why.</h3><p>{s.judgment}</p>{s.explanation&&<><h3>What did you change, and why?</h3><p>{s.explanation}</p></>}</section>}
    {hasFeedback&&!practiceResult&&["feedback","complete","example","finalPass","finalFail"].includes(s.stage)&&!s.feedback.rechecked&&!pending&&<button disabled={!!busy||allowanceReached} onClick={challenge}>{final?"Challenge":"Challenge this assessment"}</button>}
    {isEdit&&<section className="editor"><label htmlFor="prompt">{s.correcting?"Edit your prompt":"Edit this prompt"}</label><p id="prompt-help">{mission?"Add the missing detail. You do not need to start over.":"Change it to meet the task before generating."}</p>{!final&&!review&&<Requirements task={task}/>}<textarea id="prompt" rows={final||review?6:4} maxLength={6000} value={s.prompt} aria-describedby="prompt-help" onChange={e=>edit("prompt",e.target.value)} disabled={!!busy||!!pending||errorAction==="assess"}/>{s.correcting&&<><label htmlFor="explanation">What did you change, and why?</label><textarea id="explanation" rows={3} maxLength={6000} value={s.explanation} onChange={e=>edit("explanation",e.target.value)} disabled={!!busy||!!pending||errorAction==="assess"}/><details className="previous-context"><summary>Review the previous answer</summary>{final?<p>{s.answer?.text}</p>:<Answer text={s.answer?.text}/>}</details></>}<button className="primary" onClick={generate} disabled={!!busy||!!pending||errorAction==="assess"||allowanceReached}>{s.correcting?"Generate revised answer":"Generate answer"}</button>{!s.correcting&&!final&&review&&<details className="original"><summary>Original example answer</summary><p>{task.original}</p><span>This is a prepared example, not a new AI answer.</span></details>}</section>}
    {isJudge&&<>{final?<section className="answer-section" id="answer-view"><h3>Your answer</h3><p className="final-answer">{s.answer.text}</p></section>:<Answers state={s} task={task}/>}<section className="judgment">{s.correcting&&!s.previousAnswer&&s.previousJudgment&&<p className="evidence">{s.previousJudgment}</p>}<details className="submitted"><summary>Submitted prompt</summary><p>{s.prompt}</p></details><label htmlFor="judgment">{s.correcting&&s.previousAnswer?"Does this revised answer meet the task? Explain why.":"Does your answer meet the task? Explain why."}</label><textarea id="judgment" rows={4} maxLength={6000} value={s.judgment} onChange={e=>edit("judgment",e.target.value)} disabled={!!busy||!!pending||errorAction==="assess"}/><a href="#answer-view">Back to answer</a>{s.correcting&&!s.previousAnswer&&<><label htmlFor="explanation">What did you change in your judgment, and why?</label><textarea id="explanation" rows={3} maxLength={6000} value={s.explanation} onChange={e=>edit("explanation",e.target.value)} disabled={!!busy||!!pending||errorAction==="assess"}/></>}{s.correcting&&s.previousAnswer&&<p className="evidence"><strong>Your explanation:</strong> {s.explanation}</p>}<div className={final||review?undefined:"assessment-action"}><button className="primary" onClick={assess} disabled={!!busy||!!pending||allowanceReached}>{checkingJudgment?"Checking your judgment":errorAction==="assess"?"Retry assessment":final?"Submit final":s.correcting?(s.previousAnswer?"Check my correction":"Check my corrected judgment"):"Check my judgment"}</button>{checkingJudgment&&<span className="assessment-status" role="status">Your work stays here.</span>}</div></section></>}
    {s.stage==="feedback"&&!pending&&errorAction!=="recheck"&&<button className="primary" disabled={!!busy} onClick={()=>{request.current=null;persist(correction(s));}}>Try again</button>}
    {errorAction==="recheck"&&!pending&&<button className="primary" disabled={!!busy||allowanceReached} onClick={challenge}>Retry assessment</button>}
    {s.stage==="complete"&&<section className="result" tabIndex={-1} ref={announcement}><div className="reward" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M24 4 41 14v20L24 44 7 34V14Z"/><path d="m15 24 6 6 13-13"/></svg></div><h2>{pending?"Result checked - Save pending":review?"Practice complete":"Skill point earned"}</h2>{practiceResult?<><p className="mission-outcome success-summary">{pending?"Your result is checked; save it to confirm the point.":successSummary}</p>{!pending&&errorAction!=="recheck"&&(challengeId==="beginner-01"?<button className="primary" disabled={!!busy||saveError} onClick={()=>openPractice("beginner-02")}>Next challenge</button>:<button className="primary" disabled={!!busy||saveError} onClick={startFinal}>Start final challenge</button>)}<details className="assessment-details" open={allowanceReached||undefined}><summary>Assessment details</summary><p>{s.feedback.why}</p><p className="evidence">{s.feedback.evidence}</p><h3>Submitted prompt</h3><p>{s.prompt}</p><h3>Your answer</h3><Answer text={s.answer?.text}/><h3>Your judgment</h3><p>{s.judgment}</p>{s.explanation&&<><h3>What you changed and why</h3><p>{s.explanation}</p></>}</details>{!s.feedback.rechecked&&!pending&&<button className="assessment-challenge" disabled={!!busy||allowanceReached} onClick={challenge}>Challenge this assessment</button>}</>:<><p>{s.feedback.why}</p><p className="evidence">{s.feedback.evidence}</p></>}</section>}
    {s.stage==="example"&&<section className="result" tabIndex={-1} ref={announcement}><h2>Completed with help</h2><p>You used your two retries. Compare your work with this example.</p><h3>One useful prompt</h3><p>{task.examplePrompt}</p><h3>Example answer</h3><Answer text={task.exampleAnswer}/><p>{task.exampleWhy||"It specifies the audience, facts and limits. You still need to check the answer; a good prompt cannot guarantee a good result."}</p><p className="completion-note">No independent skill point earned. This does not prevent taking a fresh final later.</p></section>}
    {s.stage==="example"&&challengeId==="beginner-01"&&!pending&&errorAction!=="recheck"&&<button className="primary" disabled={!!busy||saveError} onClick={()=>openPractice("beginner-02")}>Next challenge</button>}
    {s.stage==="finalPass"&&<section className="result" tabIndex={-1} ref={announcement}>{!pending&&<div className="badge"><strong>Beginner</strong><span>Badge earned</span></div>}<h2>{pending?"Result checked - Save pending":"Beginner badge earned"}</h2><p>{s.feedback.why}</p><p className="evidence">{s.feedback.evidence}</p>{!pending&&errorAction!=="recheck"&&<button className="primary" disabled={!!busy||saveError} onClick={()=>openPractice("beginner-01")}>Review my challenges</button>}</section>}
    {s.stage==="finalFail"&&<section className="result" tabIndex={-1} ref={announcement}><h2>Not yet</h2><p>{s.feedback.gap}</p><p>{s.feedback.why}</p><p className="evidence">{s.feedback.evidence}</p>{!pending&&errorAction!=="recheck"&&<button className="primary" disabled={!!busy||saveError} onClick={returnToPractice}>Return to practice</button>}</section>}
    {(s.stage==="example"||review&&s.stage==="complete")&&(challengeId==="beginner-02"||review)&&!pending&&errorAction!=="recheck"&&!variantsExhausted&&<button className="primary" disabled={!!busy||saveError} onClick={startFinal}>{review?"Start fresh final":"Start final challenge"}</button>}
    {review&&variantsExhausted&&<p className="completion-note">Keep practising. Another fresh final challenge is needed to unlock the next level.</p>}
    <footer className="save-note"><p>{saveError?"Account backup is not connected. Keep this page open if device saving failed.":"Saved on this device only. Account backup is not available yet."}</p><p>Points reward independent practice. Badges mark final passes.</p></footer></div></main></>;
}

createRoot(document.getElementById("root")).render(<App/>);
