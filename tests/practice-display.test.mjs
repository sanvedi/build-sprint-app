import test from "node:test";
import assert from "node:assert/strict";
import { readablePracticeAnswer, readableAnswer } from "../src/answerText.mjs";
import { studentFeedback } from "../src/feedbackText.mjs";

test("practice maths handles bare commands, code, delimiters and unfamiliar commands without changing raw answers",()=>{
 const raw=String.raw`20\div5=4
\(30\div5=6\)
1. \frac{2+3+4+5+16}{5}=6
2. \sqrt{16}=4; x\times2=8
\begin{aligned} a&=\alpha+\mystery{2}\\ b&=3\end{aligned}`;
 const shown=readablePracticeAnswer(raw);
 assert.match(shown,/20 ÷ 5 = 4/);
 assert.match(shown,/30 ÷ 5 = 6/);
 assert.match(shown,/÷ 5 = 6/);
 assert.match(shown,/square root of/);
 assert.equal(readablePracticeAnswer(String.raw`\[2,\ 3,\ \boxed{4},\ 5,\ 6\]`).trim(),"2, 3, 4, 5, 6");
 assert.equal(readablePracticeAnswer("Median=4"),"Median = 4");
 assert.doesNotMatch(shown,/\\[A-Za-z]|\\[()[\]]/);
 assert.match(raw,/\\div/);
 assert.equal(readableAnswer(String.raw`20\div5=4`),String.raw`20\div5=4`,"final answer rendering remains unchanged");
 assert.equal(readablePracticeAnswer("Pay $5 to $10.\n\n1. **Save** student-ID_report.pdf"),"Pay $5 to $10.\n\n1. **Save** student-ID_report.pdf");
});

test("student feedback retains the specific learning explanation and hides internal field commentary",()=>{
 const raw={earned:true,route:"none",gap:"",why:"The student's prompt asks for mean and median. Correction-related fields are true because no correction is required. No correction is needed, so the empty explanation does not create a gap.",evidence:"The student's judgment correctly checks 30 divided by 5 = 6. correctionAddressesGap and explanationSound are both true.",id:"saved-assessment"};
 const original=JSON.stringify(raw);const shown=studentFeedback(raw);
 assert.equal(shown.why,"Your prompt asks for mean and median.");
 assert.equal(shown.evidence,"Your judgment correctly checks 30 divided by 5 = 6.");
 assert.equal(JSON.stringify(raw),original);
 assert.equal(shown.earned,true);assert.equal(shown.id,raw.id);
 const failed=studentFeedback({earned:false,route:"prompt",gap:"Your prompt omits the filename.",why:"promptMeetsRequirements is false.",evidence:"The filename student-ID_report.pdf is missing."});
 assert.equal(failed.gap,"Your prompt omits the filename.");assert.match(failed.why,/prompt/);assert.equal(failed.evidence,"The filename student-ID_report.pdf is missing.");
});
