import React from "react";

// Screen position only. This never reads or changes learning progress.
export default function ScreenProgress({ label, detail, step = 0, total = 1 }) {
  return <div className="screen-progress">
    <div className="screen-progress-label"><span>{label}</span><span>{detail}</span></div>
    <div className="screen-progress-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={total} aria-valuenow={step} aria-valuetext={detail}>
      <span style={{ width: `${Math.max(0, Math.min(step / total, 1)) * 100}%` }} />
    </div>
  </div>;
}
