import test from "node:test";
import assert from "node:assert/strict";
import { readableAnswer } from "../src/answerText.mjs";

test("math display keeps arithmetic and turns LaTeX fractions into readable text",()=>{
 const source=String.raw`**Mean:** $\frac{2 + 3 + 4 + 5 + 16}{5} = 6$; median $4$.`;
 assert.equal(readableAnswer(source),"**Mean:** (2 + 3 + 4 + 5 + 16) divided by 5 = 6; median 4.");
 assert.match(source,/\\frac/);
 assert.equal(readableAnswer(String.raw`\(30 \div 5 = 6\)`),"30 divided by 5 = 6");
 assert.equal(readableAnswer(String.raw`\[\mathbf{4}\]`).trim(),"4");
});
test("display conversion handles nested fractions and preserves currency and ordinary markdown",()=>{
 assert.equal(readableAnswer(String.raw`$\frac{\frac{6}{2}}{3} = 1$`),"(6 divided by 2) divided by 3 = 1");
 assert.equal(readableAnswer("Pay $5 to $10.\n\n1. **Save** student-ID_report.pdf"),"Pay $5 to $10.\n\n1. **Save** student-ID_report.pdf");
});
