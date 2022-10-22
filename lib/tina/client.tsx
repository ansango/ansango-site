export { useTina } from "tinacms/dist/edit-state";
export { client } from ".tina/__generated__/client";
import { components } from "components/blocks/content";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export const Markdown = ({
  content,
}: {
  content: TinaMarkdownContent | TinaMarkdownContent[];
}) => {
  return <TinaMarkdown content={content} components={components} />;
};
