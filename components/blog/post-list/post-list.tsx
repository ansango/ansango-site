import { Container, Section } from "components/common";
import { Suspense } from "react";
import { Template } from "tinacms/dist/admin/types";
import { Posts } from "./posts";

export const PostList = ({ data = {}, parentField = "" }) => {
  return (
    <Section>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Posts data={data} />
        </Suspense>
      </Container>
    </Section>
  );
};

export const postListSchema: Template = {
  label: "Post List",
  name: "postList",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "noDataMessage",
      label: "No data message",
    },
    {
      name: "search",
      label: "Search",
      type: "object",
      fields: [
        {
          name: "placeholder",
          label: "Placeholder",
          type: "string",
        },
        {
          name: "active",
          label: "Active",
          type: "boolean",
        },
        {
          name: "maxPosts",
          label: "Max posts",
          type: "number",
        },
      ],
    },
  ],
};
