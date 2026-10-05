import React from "react";
import Markdown from "react-markdown";
import { readableAnswer } from "./answerText.mjs";

const heading = ({children}) => <h4>{children}</h4>;
export default function Answer({text}) {
  return <div className="answer-content"><Markdown skipHtml components={{h1:heading,h2:heading,h3:heading,h4:heading,h5:heading,h6:heading,img:()=>null}}>{readableAnswer(text)}</Markdown></div>;
}
