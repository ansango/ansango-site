export const generic = ["personal", "bookmarks", "chuletas"];

export const so = [
  "linux",
  "ubuntu",
  "terminal",
  "bash",
  "zsh",
  "nvm",
  "firefox",
  "touchpad",
];
export const db = ["mongodb"];

export const tools = ["git", "github", "vscode"];

export const react = [
  "react",
  "hooks",
  "nextjs",
  "gatsby",
  "apollo",
  "graphql",
  "hoc",
  "component",
];

export const javascript = [
  "javascript",
  "typescript",
  "es6",
  "ajax",
  "fetch",
  "jquery",
  "async-await",
  "nodejs",
  "npm",
  "yarn",
  "spread",
  "rest",
  "destructuring",
  "promises",
  "map",
  "filter",
  "reduce",
];

export const tagOptions = {
  generic,
  so,
  db,
  tools,
  react,
  javascript,
};

export const tagSchema = {
  name: "tags",
  label: "Tags",
  type: "object",
  fields: [
    {
      name: "generic",
      label: "Generic",
      type: "string",
      list: true,
      options: tagOptions.generic,
    },
    {
      name: "so",
      label: "SO",
      type: "string",
      list: true,
      options: tagOptions.so,
    },
    {
      name: "db",
      label: "DB",
      type: "string",
      list: true,
      options: tagOptions.db,
    },
    {
      name: "tools",
      label: "Tools",
      type: "string",
      list: true,
      options: tagOptions.tools,
    },
    {
      name: "react",
      label: "React",
      type: "string",
      list: true,
      options: tagOptions.react,
    },
    {
      name: "javascript",
      label: "Javascript",
      type: "string",
      list: true,
      options: tagOptions.javascript,
    },
  ],
};
