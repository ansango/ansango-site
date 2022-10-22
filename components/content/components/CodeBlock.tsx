import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";

export const CodeBlock = (props: any) => {
  return (
    <span className="code__block">
      <SyntaxHighlighter language={props.language || "jsx"} style={style}>
        {props.children || ""}
      </SyntaxHighlighter>
    </span>
  );
};
