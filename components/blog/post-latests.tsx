import { Container, Section } from "components/common";
import { useLatestsPostsQuery } from "lib/hooks/queries";
import { Suspense } from "react";
import { Template } from "tinacms/dist/admin/types";
import { PostList } from "./common/post-lists";
import { SubTitlePostList } from "./common/subtitle";

export const PostLatestsList = ({ data }: { data: any }) => {
  const { posts } = useLatestsPostsQuery({
    init: data?.init || 0,
    limit: data?.limit || 3,
  });
  return (
    <Section>
      <Container className="space-y-10">
        <SubTitlePostList>{data.title}</SubTitlePostList>
        <Suspense fallback={<div>Loading...</div>}>
          <PostList posts={posts} />
        </Suspense>
      </Container>
    </Section>
  );
};

export const postLatestsSchema: Template = {
  label: "Post Latests List",
  name: "postLatestsList",
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
