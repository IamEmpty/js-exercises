// @flow
import React from 'react';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/light';
import js from 'react-syntax-highlighter/languages/hljs/javascript';
import solarizedLight from 'react-syntax-highlighter/styles/hljs/solarized-light';

registerLanguage('javascript', js);
// import styles from './Code.css';

type Props = {
  question: string,
};

function Code(props: Props) {
  return <SyntaxHighlighter language="javascript" style={solarizedLight}>{props.question}</SyntaxHighlighter>;
}

export default Code;
