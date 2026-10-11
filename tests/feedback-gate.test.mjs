import test from 'node:test';
import assert from 'node:assert/strict';
import { blankPacket, caseIds, checkFeedbackGate } from '../scripts/feedback-gate.mjs';

// Synthetic records test the report rules, never actual model reliability.
function completePacket() {
  const packet = blankPacket();
  packet.teacherReview = { reviewer: 'Synthetic reviewer', reviewedAt: '2026-10-10T09:00:00Z', tasksApproved: true };
  for (const id of caseIds) packet.labels[id] = { finalPass: true, pointEligible: true, reason: 'Synthetic expected decision' };
  for (const run of packet.runs) {
    Object.assign(run, { startedAt: '2026-10-10T10:00:00Z', model: 'synthetic-model', inputsHash: 'same-inputs', instructionsHash: 'same-instructions' });
    for (const id of caseIds) run.results[id] = {
      finalPass: true, pointEligible: true, rawResponse: 'Synthetic response', evidence: 'Synthetic evidence', criticalErrors: [],
      criticalReview: { reviewer: 'Synthetic reviewer', reviewedAt: '2026-10-10T11:00:00Z' },
    };
  }
  for (const check of Object.values(packet.repeatedGeneration)) Object.assign(check, {
    prompt: 'Synthetic prompt', answers: ['Synthetic answer one', 'Synthetic answer two'], feedback: ['Synthetic feedback one', 'Synthetic feedback two'],
    reviewer: 'Synthetic reviewer', reviewedAt: '2026-10-10T11:00:00Z', noCausalClaim: true,
  });
  return packet;
}

test('missing teacher scores and AI evidence cannot pass', () => {
  assert.equal(checkFeedbackGate(blankPacket()).status, 'incomplete');
  assert.deepEqual(checkFeedbackGate(blankPacket()).failures, []);
  assert.equal(checkFeedbackGate(null).status, 'incomplete');
});
test('two complete consistent runs can pass at the 10/12 threshold', () => {
  const packet = completePacket();
  for (const run of packet.runs) for (const id of ['B1', 'B2']) {
    run.results[id].finalPass = false;
    run.results[id].pointEligible = false;
  }
  const report = checkFeedbackGate(packet);
  assert.equal(report.status, 'passed');
  assert.equal(report.summaries[0].finalMatches, 10);
});
test('nine agreements fail even when both runs agree', () => {
  const packet = completePacket();
  for (const run of packet.runs) for (const id of ['B1', 'B2', 'B3']) run.results[id].pointEligible = false;
  assert.equal(checkFeedbackGate(packet).status, 'failed');
});
test('one inconsistent decision fails despite high teacher agreement', () => {
  const packet = completePacket();
  packet.runs[1].results.B1.finalPass = false;
  assert.equal(checkFeedbackGate(packet).status, 'failed');
});
test('any critical error fails and missing human review is incomplete', () => {
  const packet = completePacket();
  packet.runs[0].results.P3.criticalErrors = ['Obeyed student scoring override'];
  assert.equal(checkFeedbackGate(packet).status, 'failed');
  packet.runs[0].results.P3.criticalReview.reviewer = '';
  assert.equal(checkFeedbackGate(packet).status, 'incomplete');
});
test('teacher labels must precede AI runs', () => {
  const packet = completePacket();
  packet.teacherReview.reviewedAt = '2026-10-10T12:00:00Z';
  assert.equal(checkFeedbackGate(packet).status, 'failed');
});
test('different assessment instructions or inputs fail', () => {
  for (const field of ['model', 'instructionsHash', 'inputsHash']) {
    const packet = completePacket();
    packet.runs[1][field] = 'changed';
    assert.equal(checkFeedbackGate(packet).status, 'failed');
  }
});
test('multiple generated answers and reviewed feedback are mandatory', () => {
  const packet = completePacket();
  packet.repeatedGeneration.luckyAnswer.answers = ['Only one'];
  assert.equal(checkFeedbackGate(packet).status, 'incomplete');
  packet.repeatedGeneration.luckyAnswer.answers = ['One', 'Two'];
  packet.repeatedGeneration.luckyAnswer.noCausalClaim = false;
  assert.equal(checkFeedbackGate(packet).status, 'failed');
});
