import React, { useEffect, useRef } from "react";
import { missionPaths as storyPaths } from "../shared/pathMissions.mjs";
import "./storyPaths.css";
import ScreenProgress from "./ScreenProgress.jsx";

export default function ChoosePath({ onChoose }) {
  const heading = useRef(null);
  useEffect(() => { heading.current?.focus(); }, []);
  return <div className="practice-world"><header className="game-header"><a className="wordmark" href="/" aria-label="Prompt Gully"><span>Prompt</span><span className="gully-tag">Gully</span></a></header><main className="path-selection"><ScreenProgress label="Choose your path" detail="Before your first mission" step={0} /><h1 ref={heading} tabIndex={-1}>Choose your path</h1><div className="path-cards">{Object.entries(storyPaths).map(([id, path]) => <button key={id} className="path-card" onClick={() => onChoose(id)}><span className="path-card-title">Path {id} · {path.name}</span><span className="path-card-setup">{path.setup}</span></button>)}</div><p className="path-progress-note">Six missions, six possible points. Each mission keeps its own saved work and attempts.</p></main></div>;
}
