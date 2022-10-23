import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import oneLight from "react-syntax-highlighter/dist/cjs/styles/prism/one-light";

const styles = {
  dark: oneDark,
  light: oneLight,
}

export const CodeBlock = (props: any) => {
  return (
    <span className="code__block">
      <SyntaxHighlighter language={props.language || "jsx"} style={styles.dark}>
        {props.children}
      </SyntaxHighlighter>
    </span>
  );
};
