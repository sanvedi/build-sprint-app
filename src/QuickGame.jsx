import React, {useEffect, useRef, useState} from "react";
import {quickRounds, checkQuickChoice} from "../shared/quickGame.mjs";
import {missionPaths} from "../shared/pathMissions.mjs";
import "./quickGame.css";

export default function QuickGame({path="A",onBack,onMission}) {
 const rounds=quickRounds(path),[index,setIndex]=useState(0),[selected,setSelected]=useState([]),[solved,setSolved]=useState(false),[feedback,setFeedback]=useState(""),[misses,setMisses]=useState(0),[firstTry,setFirstTry]=useState(0);
 const heading=useRef(null),round=rounds[index];
 useEffect(()=>{heading.current?.focus();window.scrollTo(0,0);},[index]);
 function check(values){const right=checkQuickChoice(round,values);setSolved(right);if(right){if(!misses)setFirstTry(n=>n+1);setFeedback(round.multi?round.success:round.reasons[values[0]]);}else{setMisses(n=>n+1);setFeedback(round.multi?"Choose the readers and the format. Leave out promises.":round.reasons[values[0]]);}}
 function choose(i){if(solved)return;if(round.multi){setSelected(old=>old.includes(i)?old.filter(n=>n!==i):old.length<2?[...old,i]:old);setFeedback("");}else{setSelected([i]);check([i]);}}
 function next(){setIndex(n=>n+1);setSelected([]);setSolved(false);setFeedback("");setMisses(0);}
 return <div className="practice-world quick-world"><header className="game-header"><a className="wordmark" href="/">Prompt <span className="gully-tag">Gully</span></a><button onClick={onBack}>Exit round</button></header><main className="quick-game">
 <div className="quick-route" aria-label="Round progress">{["Find","Build","Check"].map((label,i)=><span key={label} className={i<index||i===index&&solved?"is-done":i===index?"is-current":""} aria-current={i===index?"step":undefined}><b>{i<index||i===index&&solved?<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>:i+1}</b>{label}</span>)}</div>
 {round?<section className="quick-board"><h1 ref={heading} tabIndex={-1}>{round.title}</h1><p className="quick-path">{missionPaths[path].name} · {index+1} of 3</p><p>{round.instruction}</p><div className="quick-evidence"><p>{round.scene}</p>{round.text&&<blockquote>{round.text}</blockquote>}{round.facts&&<ul>{round.facts.map(f=><li key={f}>{f}</li>)}</ul>}</div>
 <div className="quick-options">{round.options.map((option,i)=><button key={option} aria-pressed={selected.includes(i)} disabled={solved} className={selected.includes(i)?"selected":""} onClick={()=>choose(i)}><span className="quick-letter" aria-hidden="true">{String.fromCharCode(65+i)}</span>{option}</button>)}</div>
 {round.multi&&<><p className="quick-selection" role="status">{selected.length} of 2 details picked</p>{selected.length>0&&<p className="quick-built">{round.text} {selected.map(i=>round.options[i]).join(" ")}</p>}{!solved&&<button className="primary" disabled={selected.length!==2} onClick={()=>check(selected)}>Check my prompt</button>}</>}
 {feedback&&<div className={`quick-reaction ${solved?"is-solved":""}`} role="status"><strong>{solved?"Nice thinking!":"Try another idea."}</strong><p>{feedback}</p>{solved&&<button className="primary" onClick={next}>{index===2?"See my round":"Next puzzle"}</button>}</div>}
 </section>:<section className="quick-board quick-finish"><div className="quick-medal" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="m24 5 5.8 11.8L43 19l-9.5 9.3 2.2 13.2L24 35.3l-11.7 6.2 2.2-13.2L5 19l13.2-2.2Z"/></svg></div><h1 ref={heading} tabIndex={-1}>Three skills. One good round.</h1><p>You found a gap, built a prompt, and checked facts.</p><p className="quick-result">{firstTry} of 3 solved on your first try</p><p>Now use those skills with a real AI answer.</p><button className="primary" onClick={()=>onMission(path)}>Play the story mission</button><button onClick={()=>{setIndex(0);setFirstTry(0);setSolved(false);setSelected([]);setFeedback("");setMisses(0);}}>Play this round again</button><button onClick={onBack}>Choose another story</button><p className="quick-note">Warm-up only. Your practice points stay the same.</p></section>}
 </main></div>;
}
