import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const caseIds = ['B1', 'B2', 'B3', 'B4', 'A1', 'A2', 'A3', 'A4', 'P1', 'P2', 'P3', 'P4'];
const validDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const decision = value => typeof value?.finalPass === 'boolean' && typeof value?.pointEligible === 'boolean';

// This checks recorded evidence. It does not create teacher labels or call AI.
export function checkFeedbackGate(packet) {
  const missing = [];
  const failures = [];
  const review = packet?.teacherReview;
  if (!nonempty(review?.reviewer) || !validDate(review?.reviewedAt) || review?.tasksApproved !== true) {
    missing.push('Dated teacher review and approval of all three tasks');
  }
  const labels = packet?.labels;
  if (!labels || Object.keys(labels).length !== 12 || !caseIds.every(id => decision(labels[id]) && nonempty(labels[id].reason))) {
    missing.push('Exactly 12 teacher labels with both decisions and a reason');
  }
  const runs = packet?.runs;
  if (!Array.isArray(runs) || runs.length !== 2) missing.push('Exactly two recorded AI assessment runs');
  const summaries = [];
  for (const [index, run] of (Array.isArray(runs) ? runs : []).entries()) {
    const name = `Run ${index + 1}`;
    if (!validDate(run?.startedAt) || !nonempty(run?.model) || !nonempty(run?.instructionsHash) || !nonempty(run?.inputsHash)) {
      missing.push(`${name}: date, model and fingerprints of exact instructions/inputs`);
    }
    if (validDate(review?.reviewedAt) && validDate(run?.startedAt) && Date.parse(review.reviewedAt) >= Date.parse(run.startedAt)) {
      failures.push(`${name}: teacher labels were not recorded before AI assessment`);
    }
    const results = run?.results;
    if (!results || Object.keys(results).length !== 12 || !caseIds.every(id => decision(results[id]) && nonempty(results[id].rawResponse) && nonempty(results[id].evidence))) {
      missing.push(`${name}: exactly 12 decisions, original AI responses and supporting evidence`);
    }
    let finalMatches = 0;
    let pointMatches = 0;
    for (const id of caseIds) {
      const result = results?.[id];
      if (decision(labels?.[id]) && decision(result)) {
        if (result.finalPass === labels[id].finalPass) finalMatches++;
        if (result.pointEligible === labels[id].pointEligible) pointMatches++;
      }
      if (!Array.isArray(result?.criticalErrors) || !nonempty(result?.criticalReview?.reviewer) || !validDate(result?.criticalReview?.reviewedAt)) {
        missing.push(`${name} ${id}: dated human review for critical errors`);
      } else {
        if (validDate(run?.startedAt) && Date.parse(result.criticalReview.reviewedAt) < Date.parse(run.startedAt)) {
          failures.push(`${name} ${id}: critical-error review predates AI assessment`);
        }
        if (result.criticalErrors.length > 0) failures.push(`${name} ${id}: critical error recorded`);
      }
    }
    summaries.push({ run: index + 1, finalMatches, pointMatches, total: 12 });
    if (caseIds.every(id => decision(labels?.[id]) && decision(results?.[id]))) {
      if (finalMatches < 10) failures.push(`${name}: final decisions agree on fewer than 10 of 12 cases`);
      if (pointMatches < 10) failures.push(`${name}: point decisions agree on fewer than 10 of 12 cases`);
    }
  }
  if (runs?.length === 2) {
    if (runs[0]?.model !== runs[1]?.model || runs[0]?.instructionsHash !== runs[1]?.instructionsHash || runs[0]?.inputsHash !== runs[1]?.inputsHash) {
      failures.push('Both runs must use the same model, instructions and assessment inputs');
    }
    for (const id of caseIds) {
      const first = runs[0]?.results?.[id];
      const second = runs[1]?.results?.[id];
      if (decision(first) && decision(second) && (first.finalPass !== second.finalPass || first.pointEligible !== second.pointEligible)) {
        failures.push(`${id}: decisions differ between runs`);
      }
    }
  }
  for (const kind of ['luckyAnswer', 'poorAnswer']) {
    const check = packet?.repeatedGeneration?.[kind];
    if (!nonempty(check?.prompt) || !Array.isArray(check?.answers) || check.answers.length < 2 || !check.answers.every(nonempty) ||
        !Array.isArray(check?.feedback) || check.feedback.length !== check.answers.length || !check.feedback.every(nonempty) ||
        !nonempty(check?.reviewer) || !validDate(check?.reviewedAt) || typeof check?.noCausalClaim !== 'boolean') {
      missing.push(`${kind}: multiple real answers, corresponding feedback and dated human review`);
    } else if (!check.noCausalClaim) {
      failures.push(`${kind}: feedback wrongly treats an answer as proof of causation`);
    }
  }
  return { status: missing.length ? 'incomplete' : failures.length ? 'failed' : 'passed', summaries, missing, failures };
}

export function blankPacket() {
  return {
    teacherReview: { reviewer: '', reviewedAt: '', tasksApproved: false },
    labels: Object.fromEntries(caseIds.map(id => [id, { finalPass: null, pointEligible: null, reason: '' }])),
    runs: [1, 2].map(() => ({ startedAt: '', model: '', instructionsHash: '', inputsHash: '', results: Object.fromEntries(caseIds.map(id => [id, {
      finalPass: null, pointEligible: null, rawResponse: '', evidence: '', criticalErrors: null,
      criticalReview: { reviewer: '', reviewedAt: '' },
    }])) })),
    repeatedGeneration: Object.fromEntries(['luckyAnswer', 'poorAnswer'].map(kind => [kind, {
      prompt: '', answers: [], feedback: [], reviewer: '', reviewedAt: '', noCausalClaim: null,
    }])),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [file, option] = process.argv.slice(2);
  if (!file) {
    console.error('Use: node scripts/feedback-gate.mjs <evidence.json> [--init]');
    process.exitCode = 2;
  } else {
    try {
      if (option === '--init') {
        writeFileSync(file, JSON.stringify(blankPacket(), null, 2) + '\n', { flag: 'wx' });
        console.log('Blank review packet created. No teacher labels or AI results supplied.');
      } else {
        const report = checkFeedbackGate(JSON.parse(readFileSync(file, 'utf8')));
        console.log(JSON.stringify(report, null, 2));
        process.exitCode = report.status === 'passed' ? 0 : 1;
      }
    } catch (error) {
      console.error(`Could not process review packet: ${error.message}`);
      process.exitCode = 2;
    }
  }
}
