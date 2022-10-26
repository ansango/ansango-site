import { tagOptions, categories } from "../constants";
import { defineSchema, defineConfig, RouteMappingPlugin } from "tinacms";
import {
  contentBlockSchema,
  postListSchema,
  heroBlockSchema,
  postFeaturedSchema,
  postLatestsSchema,
  postMostViewedSchema,
  statsSchema,
} from "components/schemas";
import { client } from "./__generated__/client";
import { composeSlug, kebabCase } from "lib/utils";

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
      ui: {
        filename: {
          readonly: true,
          slugify({ category, title }) {
            return `${kebabCase(category)}/${kebabCase(title)}`;
          },
        },
        router({ document }) {
          return `/blog/${composeSlug(document._sys.breadcrumbs)}`;
        },
      },
      defaultItem: {
        title: "New Post",
        tags: {
          options: "",
        },
        category: categories[0],
        body: "",
        draft: true,
        featured: false,
        publishedAt: new Date().toISOString(),
      },
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
          ui: {
            component: "textarea",
          },
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
        },
        {
          label: "Related Posts",
          name: "relatedPosts",
          type: "object",
          fields: [
            {
              type: "reference",
              label: "Post One",
              name: "postOne",
              collections: ["post"],
            },
            {
              type: "reference",
              label: "Post Two",
              name: "postTwo",
              collections: ["post"],
            },
            {
              type: "reference",
              label: "Post Three",
              name: "postThree",
              collections: ["post"],
            },
          ],
        },
        {
          type: "boolean",
          label: "Featured",
          name: "featured",
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
          templates: [
            heroBlockSchema,
            contentBlockSchema,
            postListSchema,
            postFeaturedSchema,
            postLatestsSchema,
            postMostViewedSchema,
            statsSchema,
          ],
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
