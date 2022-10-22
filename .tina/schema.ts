import { tagOptions, categories } from "../constants";
import { defineSchema, defineConfig, RouteMappingPlugin } from "tinacms";
import { contentBlockSchema, postListSchema } from "../components/schemas";
import { client } from "./__generated__/client";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";
const schema = defineSchema({
  // See https://tina.io/docs/tina-cloud/connecting-site/ for more information about this config
  config: {
    token: "<Your Read Only Token>", // generated on app.tina.io,
    clientId: "<Your Client ID>", // generated on app.tina.io
    branch,
  },
  collections: [
    {
      label: "Blog Posts",
      name: "post",
      path: "content/posts",
      format: "mdx",

      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          name: "summary",
          label: "Summary",
          type: "string",
        },
        {
          type: "string",
          label: "Category",
          name: "category",
          options: categories,
        },
        {
          name: "tags",
          label: "Tags",
          type: "object",
          fields: [
            {
              type: "string",
              label: "Options",
              name: "options",
              list: true,
              options: tagOptions,
            },
          ],
        },
        {
          type: "rich-text",
          label: "Blog Post Body",
          name: "body",
          isBody: true,
          templates: [
            {
              name: "PageSection",
              label: "Page Section",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading",
                },
                {
                  type: "string",
                  name: "content",
                  label: "Content",
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },
          ],
        },
        {
          type: "boolean",
          label: "Draft",
          name: "draft",
        },
        {
          type: "datetime",
          label: "Published Date",
          name: "publishedAt",
        },
      ],
    },
    {
      label: "Pages",
      name: "page",
      path: "content/pages",
      format: "mdx",

      fields: [
        {
          type: "object",
          list: true,
          name: "blocks",
          label: "Sections",
          ui: {
            visualSelector: true,
          },
          templates: [contentBlockSchema, postListSchema],
        },
      ],
    },
  ],
});

export default schema;

// Your tina config

export const tinaConfig = defineConfig({
  client,
  schema,
  cmsCallback: (cms) => {
    /**
     * When `tina-admin` is enabled, this plugin configures contextual editing for collections
     */
    const RouteMapping = new RouteMappingPlugin((collection, document) => {
      if (["page"].includes(collection.name)) {
        if (document._sys.filename === "home") {
          return `/`;
        }
        return undefined;
      }
    });
    cms.plugins.add(RouteMapping);

    return cms;
  },
});
