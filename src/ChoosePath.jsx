import React, { useEffect, useRef } from "react";
import { storyPaths } from "../shared/storyPaths.mjs";
import "./storyPaths.css";

export default function ChoosePath({ onChoose }) {
  const heading = useRef(null);
  useEffect(() => { heading.current?.focus(); }, []);
  return <div className="practice-world"><header className="game-header"><a className="wordmark" href="/" aria-label="Prompt Gully"><span>Prompt</span><span className="gully-tag">Gully</span></a></header><main className="path-selection"><h1 ref={heading} tabIndex={-1}>Choose your path</h1><div className="path-cards">{Object.entries(storyPaths).map(([id, path]) => <button key={id} className="path-card" onClick={() => onChoose(id)}><span className="path-card-title">Path {id} · {path.name}</span><span className="path-card-setup">{path.setup}</span></button>)}</div><p className="path-progress-note">Your saved work, points and used attempts carry over between paths.</p></main></div>;
}
