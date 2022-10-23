import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import styles from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";

export const CodeBlock = (props: any) => {
  return (
    <span className="code__block">
      <SyntaxHighlighter language={props.language || "jsx"} style={styles}>
        {props.children}
      </SyntaxHighlighter>
    </span>
  );
};
