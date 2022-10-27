export { useTina } from "tinacms/dist/edit-state";
export { client } from ".tina/__generated__/client";

import {
  BlockQuoteProps,
  DateTimeProps,
  BlockQuote,
  DateTime,
  img,
  TechStack,
  TechStackProps,
} from "components/blocks/content/components";
import { CodeBlock } from "components/blocks/content/components/CodeBlock";
import { ContributionsLite } from "components/blocks/github";
import {
  Components,
  TinaMarkdown,
  TinaMarkdownContent,
} from "tinacms/dist/rich-text";

const components: Components<{
  BlockQuote: BlockQuoteProps;
  DateTime: DateTimeProps;
  TechStack: TechStackProps;
  Github: any;
}> = {
  BlockQuote,
  DateTime,
  img,
  TechStack,
  Github: ContributionsLite,
  code_block: CodeBlock,
  hr: () => <span className="divider" />,
};

export const Markdown = ({
  content,
}: {
  content: TinaMarkdownContent | TinaMarkdownContent[];
}) => {
  return <TinaMarkdown content={content} components={components} />;
};
