import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";

const cli = new URL("../node_modules/convex/bin/main.js", import.meta.url);
const { fileURLToPath } = await import("node:url");
function run(name, args) {
  return JSON.parse(execFileSync(process.execPath, [fileURLToPath(cli), "run", name, JSON.stringify(args)], {
    encoding: "utf8", timeout: 60000,
  }));
}

const id = run("m0Checks:start", { delayMs: 20000 });
const initial = run("m0Checks:read", { id });
assert.equal(initial.state, "Waiting");
console.log("Confirmed Waiting. No browser or application page is open for this test.");
await new Promise(resolve => setTimeout(resolve, Math.max(0, initial.checkTime - Date.now()) + 4000));
const final = run("m0Checks:read", { id });
assert.equal(final.state, "Needs You");
assert.ok(final.completedAt >= final.checkTime);
assert.equal(final.isTest, true);
const evidence = { checkedAt: new Date().toISOString(), id, initial, final, emailTested: false };
mkdirSync("artifacts", { recursive: true });
writeFileSync("artifacts/scheduling-proof.json", JSON.stringify(evidence, null, 2));
console.log(JSON.stringify(evidence, null, 2));
