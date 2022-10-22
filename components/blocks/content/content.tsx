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

export const components: Components<{
  BlockQuote: BlockQuoteProps;
  DateTime: DateTimeProps;
}> = {
  BlockQuote,
  DateTime,
  img,
  code_block: CodeBlock,
  hr: () => <span className="divider"/>,
};

export const Content: FC<{
  body: any;
  parentField?: string;
}> = ({ body }) => {
  return <TinaMarkdown content={body} components={components} />;
};

export const contentBlockSchema: Template = {
  name: "content",
  label: "Content",
  fields: [
    {
      label: "Highlight",
      type: "boolean",
      name: "highlight",
    },
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
