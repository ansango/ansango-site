import { Container, Section } from "components/common";
import { useAllPostsQuery } from "lib/hooks/queries";
import { Suspense } from "react";
import { Template } from "tinacms/dist/admin/types";

const Posts = () => {
  const { posts } = useAllPostsQuery();
  return (
    <ul>
      {posts?.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
        </div>
      ))}
    </ul>
  );
};

export const PostList = () => {
  return (
    <Section>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Posts />
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
  ],
};
