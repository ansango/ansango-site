import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import { type FC } from "react";

import {
  type BlockQuoteProps,
  BlockQuote,
  type DateTimeProps,
  DateTime,
  img,
} from "./components";

import { CodeBlock } from "./components/CodeBlock";
import { Template } from "tinacms/dist/admin/types";
import { Container, Section } from "components/common";
import { Markdown } from "lib/tina";

export const components: Components<{
  BlockQuote: BlockQuoteProps;
  DateTime: DateTimeProps;
}> = {
  BlockQuote,
  DateTime,
  img,
  code_block: CodeBlock,
  hr: () => <span className="divider" />,
};

export const Content: FC<{
  body: any;
  parentField?: string;
}> = ({ body }) => {
  return (
    <Section>
      <Container className="prose prose-h2:text-secondary prose-code:bg-accent prose-code:text-accent-content">
        <Markdown content={body} />
      </Container>
    </Section>
  );
};

export const contentBlockSchema: Template = {
  name: "content",
  label: "Content",
  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      templates: [
        {
          name: "DateTime",
          label: "Date & Time",
          inline: true,
          fields: [
            {
              name: "format",
              label: "Format",
              type: "string",
              options: ["utc", "iso", "local"],
            },
          ],
        },
        {
          name: "BlockQuote",
          label: "Block Quote",
          fields: [
            {
              name: "children",
              label: "Quote",
              type: "rich-text",
            },
            {
              name: "authorName",
              label: "Author",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
