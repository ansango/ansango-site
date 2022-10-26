import { Container, Section } from "components/common";
import { useFeaturedPostsQuery } from "lib/hooks/queries";
import { Suspense } from "react";
import { Template } from "tinacms/dist/admin/types";
import { PostList } from "./common/post-lists";

export const PostFeaturedList = ({ data }: { data: any }) => {
  const { posts } = useFeaturedPostsQuery({
    init: data?.init || 0,
    limit: data?.limit || 3,
  });
  return (
    <Section>
      <Container className="space-y-10">
        <h2 className="text-4xl font-bold font-serif">{data.title}</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <PostList posts={posts} />
        </Suspense>
      </Container>
    </Section>
  );
};

export const postFeaturedSchema: Template = {
  label: "Post Featured List",
  name: "postFeaturedList",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "number",
      name: "init",
      label: "Initial",
    },
    {
      type: "number",
      name: "limit",
      label: "Limit",
    },
  ],
};
