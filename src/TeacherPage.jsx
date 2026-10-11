import React, { useEffect, useState } from "react";
import { api } from "../convex/_generated/api";
import "./teacher.css";
import { storyPaths } from "../shared/storyPaths.mjs";

export function completionTime(time) { return time === null ? "Not recorded (earlier completion)" : new Date(time).toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " UTC"); }
export default function TeacherPage({ client, viewToken }) {
  const [rows, setRows] = useState([]), [visits, setVisits] = useState([]), [busy, setBusy] = useState(true), [error, setError] = useState("");
  async function refresh() {
    setBusy(true); setError("");
    try {
      let cursor = null, all = [], isDone = false;
      while (!isDone) {
        const result = await client.query(api.teacher.listCompletions, { viewToken, paginationOpts: { numItems: 100, cursor } });
        all = [...all, ...result.page]; cursor = result.continueCursor; isDone = result.isDone;
      }
      setRows(all);
      cursor = null; all = []; isDone = false;
      while (!isDone) {
        const result = await client.query(api.teacher.listVisits, { viewToken, paginationOpts: { numItems: 100, cursor } });
        all = [...all, ...result.page]; cursor = result.continueCursor; isDone = result.isDone;
      }
      setVisits(all);
    } catch { setError("This teacher page is unavailable. Check the full link and try again."); }
    finally { setBusy(false); }
  }
  useEffect(() => { refresh(); }, []);
  return <main className="teacher-page"><h1>Prompt Gully · App usage</h1><p>Newest first. Times are in UTC and show when records reached the app.</p><p>Earlier completions appear as Guest; their exact completion time was not recorded. Scroll the table sideways to see every column.</p><button onClick={refresh} disabled={busy}>{busy ? "Loading app usage…" : "Refresh list"}</button>{error ? <p role="alert" className="error">{error}</p> : !busy && <><section aria-labelledby="visits-heading"><h2 id="visits-heading">Visits and practice starts</h2><p>{visits.length} {visits.length === 1 ? "visit" : "visits"} from {new Set(visits.map(row => row.browserLabel)).size} anonymous {new Set(visits.map(row => row.browserLabel)).size === 1 ? "browser" : "browsers"}</p><p>A visit is one open tab session or a change of story path; reloading keeps the same visit. Names are self-entered. One browser may be shared, and one person may use several browsers. Visits before this update were not recorded. Scroll the table sideways to see every column.</p>{visits.length ? <div className="teacher-table" tabIndex={0} role="region" aria-label="Visits and practice starts; scroll sideways for all columns"><table><thead><tr><th scope="col">First name</th><th scope="col">Browser</th><th scope="col">Visit recorded (UTC)</th><th scope="col">Practice 1 started (UTC)</th><th scope="col">Practice 2 started (UTC)</th><th scope="col">Teaching quiz (UTC)</th><th scope="col">Story path</th></tr></thead><tbody>{visits.map((row, index) => <tr key={index}><td>{row.firstName}</td><td className="browser-label">{row.browserLabel}</td><td>{completionTime(row.visitedAt)}</td><td>{row.practice1StartedAt === null ? "Not started" : completionTime(row.practice1StartedAt)}</td><td>{row.practice2StartedAt === null ? "Not started" : completionTime(row.practice2StartedAt)}</td><td>{row.teachingAnswer ? `${row.teachingAnswer.correct ? "Right" : "Wrong"} · ${completionTime(row.teachingAnswer.answeredAt)}` : ""}</td><td>{storyPaths[row.pathId] ? `Path ${row.pathId} - ${storyPaths[row.pathId].name}` : ""}</td></tr>)}</tbody></table></div> : <p>No visits recorded yet.</p>}</section><h2>Completed practices</h2><p>{rows.length} completed {rows.length === 1 ? "practice" : "practices"}</p>{rows.length ? <div className="teacher-table" tabIndex={0} role="region" aria-label="Completed practices; scroll sideways for all columns"><table><thead><tr><th scope="col">First name</th><th scope="col">Story path</th><th scope="col">Practice</th><th scope="col">Points earned</th><th scope="col">Completed (UTC)</th></tr></thead><tbody>{rows.map((row, index) => <tr key={index}><td>{row.firstName}</td><td>{storyPaths[row.pathId] ? `Path ${row.pathId} - ${storyPaths[row.pathId].name}` : ""}</td><td>{row.practiceNumber}</td><td>{row.pointsEarned}</td><td>{completionTime(row.completedAt)}</td></tr>)}</tbody></table></div> : <p>No completed practices yet.</p>}</>}</main>;
}
