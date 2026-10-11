import React, { useEffect, useState } from "react";
import { api } from "../convex/_generated/api";
import "./teacher.css";

export function completionTime(time) { return time === null ? "Not recorded (earlier completion)" : new Date(time).toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " UTC"); }
export default function TeacherPage({ client, viewToken }) {
  const [rows, setRows] = useState([]), [busy, setBusy] = useState(true), [error, setError] = useState("");
  async function refresh() {
    setBusy(true); setError("");
    try {
      let cursor = null, all = [], isDone = false;
      while (!isDone) {
        const result = await client.query(api.teacher.listCompletions, { viewToken, paginationOpts: { numItems: 100, cursor } });
        all = [...all, ...result.page]; cursor = result.continueCursor; isDone = result.isDone;
      }
      setRows(all);
    } catch { setError("This teacher page is unavailable. Check the full link and try again."); }
    finally { setBusy(false); }
  }
  useEffect(() => { refresh(); }, []);
  return <main className="teacher-page"><h1>Prompt Gully · Completed practices</h1><p>Newest first. Times are in UTC.</p><p>Earlier completions appear as Guest; their exact completion time was not recorded.</p><button onClick={refresh} disabled={busy}>{busy ? "Loading completed practices…" : "Refresh list"}</button>{error ? <p role="alert" className="error">{error}</p> : !busy && <><p>{rows.length} completed {rows.length === 1 ? "practice" : "practices"}</p>{rows.length ? <div className="teacher-table"><table><thead><tr><th>First name</th><th>Practice</th><th>Points earned</th><th>Completed (UTC)</th></tr></thead><tbody>{rows.map((row, index) => <tr key={index}><td>{row.firstName}</td><td>{row.practiceNumber}</td><td>{row.pointsEarned}</td><td>{completionTime(row.completedAt)}</td></tr>)}</tbody></table></div> : <p>No completed practices yet.</p>}</>}</main>;
}
