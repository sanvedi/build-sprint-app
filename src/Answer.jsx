import React from "react";
import Markdown from "react-markdown";
import { readableAnswer, readablePracticeAnswer } from "./answerText.mjs";

const heading = ({children}) => <h4>{children}</h4>;
// Keep the same line boundaries the assessor reads, while wrapping on phones.
const paragraph = ({children}) => <p style={{whiteSpace:"pre-line"}}>{children}</p>;
export default function Answer({text,practiceMath=false}) {
  return <div className="answer-content"><Markdown skipHtml components={{p:paragraph,h1:heading,h2:heading,h3:heading,h4:heading,h5:heading,h6:heading,img:()=>null}}>{practiceMath?readablePracticeAnswer(text):readableAnswer(text)}</Markdown></div>;
}
