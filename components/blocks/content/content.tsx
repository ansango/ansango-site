import { type FC } from "react";
import { Template } from "tinacms/dist/admin/types";
import { Container, Section } from "components/common";
import { Markdown } from "lib/tina";

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
        {
          name: "Github",
          label: "Github",
          fields: [
            {
              name: "username",
              label: "Username",
              type: "string",
            },
          ],
        },
        {
          type: "object",
          label: "Tech Stack",
          name: "TechStack",
          fields: [
            {
              type: "object",
              label: "Group",
              name: "group",
              list: true,
              ui: {
                itemProps: (item: any) => {
                  return { label: item?.label };
                },
                defaultItem: {
                  label: "Label",
                },
              },
              fields: [
                {
                  type: "string",
                  label: "Label",
                  name: "label",
                },
                {
                  type: "object",
                  label: "Tools",
                  name: "tools",
                  list: true,
                  ui: {
                    itemProps: (item: any) => {
                      return { label: item?.label };
                    },
                    defaultItem: {
                      label: "HTML5",
                      bgColor: "#000",
                      labelColor: "#313869",
                      logoColor: "#fff",
                    },
                  },
                  fields: [
                    {
                      type: "string",
                      label: "Label",
                      name: "label",
                    },
                    {
                      type: "string",
                      component: "color",
                      name: "bgColor",
                      label: "Background Color",
                      colorFormat: "hex",
                    },
                    {
                      type: "string",
                      component: "color",
                      name: "labelColor",
                      label: "Label Color",
                      colorFormat: "hex",
                    },
                    {
                      type: "string",
                      component: "color",
                      name: "logoColor",
                      label: "Logo Color",
                      colorFormat: "hex",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
