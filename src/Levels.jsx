import React, { useEffect, useRef, useState } from "react";
import { api } from "../convex/_generated/api";
import { levelTasks, levelPathIds, levelNames, levelLabels, levelPassed } from "../shared/levelTasks.mjs";
import ScreenProgress from "./ScreenProgress.jsx";
import Answer from "./Answer.jsx";

function message(error) {
 const text=String(error?.data||error?.message||error);
 for(const [code,copy] of Object.entries({
  DAILY_ALLOWANCE:"You used today's AI call limit. Continue tomorrow. Your work is saved.",
  BEGINNER_REQUIRED:"Pass the Beginner final first. Then return with your code.",
  AMATEUR_REQUIRED:"Pass this path's Amateur final first.",
  PRACTICES_REQUIRED:"Finish both practices before the final challenge.",
  REVIEW_REQUIRED:"Finish the extra practice before trying the new final.",
  PROGRESS_CHANGED:"Your work changed on another phone. Tap Load saved work.",
  REQUEST_PENDING:"AI is still working. Wait, then tap Load saved work.",
  LEVELS_UNAVAILABLE:"These levels are awaiting the teacher's task checks.",
  GENERATION_UNAVAILABLE:"AI could not write an answer. Your prompt is saved. Try again.",
  ASSESSMENT_UNAVAILABLE:"AI could not check your work. Your answer is saved. Try again.",
 }))if(text.includes(code))return copy;
 return "That did not work. Your work is still here. Try again.";
}
export default function Levels({client,token,onBack,onBonus}) {
 const [overview,setOverview]=useState(null),[loading,setLoading]=useState(true),[code,setCode]=useState("");
 const [taskId,setTaskId]=useState(null),[data,setData]=useState(null),[busy,setBusy]=useState("");
 const [error,setError]=useState(""),[sync,setSync]=useState("Saved with your code.");
 const latest=useRef(null),dirty=useRef(false),saving=useRef(null),timer=useRef(null),alive=useRef(true);
 const activeId=useRef(null),request=useRef(null);
 function put(value){latest.current=value;if(alive.current)setData(value);}
 async function refresh(){const value=await client.query(api.levelProgress.overview,{token});if(!alive.current)return value;setOverview(value);const saved=value?.states[activeId.current];if(saved&&!dirty.current&&!saving.current&&(!latest.current||saved.revision>=latest.current.revision))put(saved);return value;}
 useEffect(()=>{alive.current=true;refresh().catch(e=>setError(message(e))).finally(()=>setLoading(false));const poll=setInterval(()=>{if(!dirty.current&&!saving.current)refresh().catch(()=>{});},3000);const prevent=e=>{if(dirty.current||saving.current){e.preventDefault();e.returnValue="";}};window.addEventListener("beforeunload",prevent);return()=>{alive.current=false;clearInterval(poll);clearTimeout(timer.current);window.removeEventListener("beforeunload",prevent);};},[]);
 async function redeem(){setBusy("Checking code…");setError("");try{const result=await client.mutation(api.advanced.redeem,{token,code});if(result.error){setError(result.error);return;}await refresh();}catch(e){setError(message(e));}finally{setBusy("");}}
 async function flush(){clearTimeout(timer.current);if(saving.current)await saving.current;while(dirty.current){const snapshot=latest.current;dirty.current=false;setSync("Saving your work…");const pending=client.mutation(api.levelProgress.saveDraft,{token,taskId:activeId.current,revision:snapshot.revision,prompt:snapshot.state.prompt,judgment:snapshot.state.judgment,explanation:snapshot.state.explanation});saving.current=pending;try{const saved=await pending;put(dirty.current?{...saved,state:latest.current.state}:saved);setSync("Saved with your code.");}catch(e){dirty.current=true;setSync("Your changes have not saved. Keep this page open.");throw e;}finally{saving.current=null;}}}
 function edit(field,value){put({...latest.current,state:{...latest.current.state,[field]:value}});dirty.current=true;request.current=null;setSync("Saving your work…");clearTimeout(timer.current);timer.current=setTimeout(()=>flush().catch(e=>setError(message(e))),500);}
 async function open(id){setBusy("Opening your practice…");setError("");try{await flush();const next=await client.mutation(api.levelProgress.open,{token,taskId:id});activeId.current=id;setTaskId(id);put(next);request.current=null;setSync("Saved with your code.");await refresh();window.scrollTo(0,0);}catch(e){setError(message(e));}finally{setBusy("");}}
 async function home(){setBusy("Saving your work…");setError("");try{await flush();activeId.current=null;setTaskId(null);put(null);await refresh();window.scrollTo(0,0);}catch(e){setError(message(e));}finally{setBusy("");}}
 async function back(){setBusy("Saving your work…");try{await flush();onBack();}catch(e){setError(message(e));setBusy("");}}
 async function act(kind){setBusy(kind==="generate"?"AI is writing…":"Checking your work…");setError("");try{await flush();const fingerprint=`${activeId.current}:${latest.current.revision}:${kind}`;if(request.current?.fingerprint!==fingerprint)request.current={fingerprint,id:crypto.randomUUID()};await client.action(api.levelActions.run,{token,taskId:activeId.current,revision:latest.current.revision,requestId:request.current.id,kind});request.current=null;await refresh();}catch(e){setError(message(e));await refresh().catch(()=>{});}finally{setBusy("");}}
 async function stage(kind){setBusy("Saving your next step…");setError("");try{await flush();put(await client.mutation(api.levelProgress.changeStage,{token,taskId,revision:latest.current.revision,kind}));request.current=null;}catch(e){setError(message(e));}finally{setBusy("");}}
 async function loadSaved(){setBusy("Loading saved work…");setError("");try{const value=await client.query(api.levelProgress.overview,{token});const saved=value?.states[taskId];if(!saved)throw Error("missing");dirty.current=false;clearTimeout(timer.current);setOverview(value);put(saved);request.current=null;setSync("Saved work loaded.");}catch(e){setError(message(e));}finally{setBusy("");}}
 const task=levelTasks[taskId],s=data?.state,locked=!!busy||!!data?.pending;
 const step=s?(s.stage.startsWith("edit")?1:s.stage.startsWith("judge")?2:3):0;
 const name=task?`${levelLabels[task.level]} · ${task.kind==="final"?"Final challenge":task.kind==="review"?"Extra practice":`Practice ${task.number}`}`:"All levels";
 const title=task?.title||"Your next level";
 return <div className="practice-world"><header className="game-header"><a className="wordmark" href="/" aria-label="Prompt Gully"><span>Prompt</span><span className="gully-tag">Gully</span></a></header><main className="practice-game">
  <ScreenProgress label={name} detail={task?`${step}/3`:"Beginner → Amateur → Pro"} step={step} total={3}/>
  <section className="lesson-workspace"><h1>{title}</h1>
   {loading&&<p role="status">Loading your levels…</p>}
   {error&&<p className="error" role="alert">{error}</p>}
   {busy&&<p role="status">{busy}</p>}
   {!loading&&!overview&&<><p>One teacher code opens Amateur and Pro.</p><p>Pass each level's final to reach the next level.</p><label htmlFor="levels-code">Your teacher's code</label><input id="levels-code" value={code} onChange={e=>setCode(e.target.value.toUpperCase())} maxLength={6} autoCapitalize="characters" autoComplete="off" spellCheck={false}/><p>Keep your code private. It opens your saved work.</p><button className="primary" disabled={locked||code.trim().length!==6} onClick={redeem}>Use my code</button></>}
   {!loading&&overview&&!task&&<><p>Saved for {overview.playerName}.</p>{!overview.beginnerPassed&&<p>Pass the Beginner final before starting Amateur.</p>}{levelPathIds.map(path=>{
    const pathName=levelTasks[`${path}-amateur-practice-1`].pathName;
    const proPassed=levelPassed(overview.states,path,"pro");
    return <section className="path-selection" key={path}><h2>{pathName}</h2>{proPassed&&<p className="teaching-reason">All three levels passed on this path!</p>}{levelNames.map(level=>{
     const prefix=`${path}-${level}`,passed=levelPassed(overview.states,path,level),unlocked=overview.beginnerPassed&&(level==="amateur"||levelPassed(overview.states,path,"amateur"));
     const done=n=>overview.states[`${prefix}-practice-${n}`]?.state.completed;
     const firstFinal=overview.states[`${prefix}-final-1`]?.state,secondFinal=overview.states[`${prefix}-final-2`]?.state;
     const reviewed=overview.states[`${prefix}-review`]?.state.completed;
     return <div key={level}><h3>{levelLabels[level]}{passed?" · Badge earned":""}</h3>{!unlocked&&<p>{level==="amateur"?"Locked: pass Beginner first.":"Locked: pass this path's Amateur final."}</p>}{[1,2].map(n=>{const id=`${prefix}-practice-${n}`,state=overview.states[id]?.state;return <button className="path-card" key={id} disabled={!unlocked||locked||n===2&&!done(1)} onClick={()=>open(id)}><span className="path-card-title">{levelLabels[level]} · Practice {n}</span><span className="path-card-setup">{state?.point?"Passed":state?.completed?"Completed with help":state?"Continue":"Start"} · {levelTasks[id].title}</span></button>;})}<button className="primary" disabled={!unlocked||locked||!done(1)||!done(2)} onClick={()=>open(`${prefix}-final-1`)}>{firstFinal?"View first final":"Start final challenge"}</button>{firstFinal?.stage==="finalFail"&&<><button disabled={locked} onClick={()=>open(`${prefix}-review`)}>Return to extra practice</button>{reviewed&&<button disabled={locked} onClick={()=>open(`${prefix}-final-2`)}>{secondFinal?"View second final":"Try a new final"}</button>}</>}{secondFinal?.stage==="finalFail"&&!passed&&<p>Both finals are used. Ask your teacher for more practice.</p>}</div>;
    })}</section>;
   })}<button onClick={onBonus} disabled={locked}>Open the earlier Advanced practice</button></>}
   {task&&s&&<><p>{task.pathName} · {s.attempts} of {task.kind==="final"?1:3} tries used.</p>
    {step===1&&<><p className="story-box">{task.brief}</p><details className="requirements" open><summary>Details to include</summary><ul>{task.requirements.map(r=><li key={r}>{r}</li>)}</ul></details>{s.correcting&&<p className="teaching-reason">{s.feedback?.gap}</p>}<label htmlFor="level-prompt">Edit the starting prompt</label><textarea id="level-prompt" rows={5} maxLength={6000} value={s.prompt} disabled={locked} onChange={e=>edit("prompt",e.target.value)}/>{task.kind!=="final"&&<details><summary>Need a hint?</summary><p>{task.hint}</p></details>}{s.correcting&&<><label htmlFor="level-explanation">Explain your changes.</label><textarea id="level-explanation" rows={3} value={s.explanation} maxLength={6000} disabled={locked} onChange={e=>edit("explanation",e.target.value)}/></>}<button className="primary" disabled={locked||!s.prompt.trim()} onClick={()=>act("generate")}>Get AI answer</button></>}
    {step===2&&<><h2>Your AI answer</h2><Answer text={s.answer?.text}/><details className="requirements"><summary>Details to include</summary><ul>{task.requirements.map(r=><li key={r}>{r}</li>)}</ul></details>{s.correcting&&<p className="teaching-reason">{s.feedback?.gap}</p>}<label htmlFor="level-judgment">Does the answer follow every detail? Explain what you checked.</label><textarea id="level-judgment" rows={5} value={s.judgment} maxLength={6000} disabled={locked} onChange={e=>edit("judgment",e.target.value)}/>{s.correcting&&<><label htmlFor="level-explanation">Explain your changes.</label><textarea id="level-explanation" rows={3} value={s.explanation} maxLength={6000} disabled={locked} onChange={e=>edit("explanation",e.target.value)}/></>}<button className="primary" disabled={locked||!s.judgment.trim()||s.correcting&&!s.explanation.trim()} onClick={()=>act("assess")}>Check my work</button><button disabled={locked} onClick={()=>stage("edit")}>Edit my prompt</button></>}
    {step===3&&<><h2>{s.stage==="finalPass"?`${levelLabels[task.level]} badge earned!`:s.stage==="finalFail"?"Not yet. Try some more practice.":s.point?"You earned one point!":s.completed?"Completed with help":"One more useful change"}</h2><p>{s.feedback?.why}</p><p>{s.feedback?.evidence}</p>{s.feedback?.gap&&<p className="teaching-reason">{s.feedback.gap}</p>}{s.stage==="feedback"&&<button className="primary" disabled={locked} onClick={()=>stage("correct")}>Try again</button>}{s.stage==="example"&&<><h3>One useful prompt</h3><p>{task.examplePrompt}</p><h3>Example answer</h3><Answer text={task.exampleAnswer}/><h3>Example answer check</h3><p>{task.exampleJudgment}</p></>}{s.stage==="finalPass"&&task.level==="pro"&&<p className="teaching-reason">You finished all three levels on this path!</p>}{s.feedback&&!s.feedback.rechecked&&<button disabled={locked} onClick={()=>act("recheck")}>Ask AI to check again</button>}<button className="primary" disabled={locked} onClick={home}>Choose the next challenge</button></>}
    <p role="status">{data.pending?"AI is still working. Your request is saved.":sync}</p>{dirty.current&&error&&<button disabled={locked} onClick={()=>flush().then(()=>setError("")).catch(e=>setError(message(e)))}>Save again</button>}<button disabled={!!busy} onClick={loadSaved}>{dirty.current?"Drop my changes and load saved work":"Load saved work"}</button><button disabled={locked} onClick={home}>Back to levels</button>
   </>}
   <button disabled={locked} onClick={back}>Back to free practices</button>
  </section></main></div>;
}
