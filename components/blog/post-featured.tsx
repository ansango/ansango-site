import { Container, Section } from "components/common";
import { useFeaturedPostsQuery } from "lib/hooks/queries";
import { Suspense } from "react";
import { Template } from "tinacms/dist/admin/types";
import { PostList } from "./common/post-lists";
import { SubTitlePostList } from "./common/subtitle";
import { usePostMapper } from "./post-list/query";

export const PostFeaturedList = ({ data }: { data: any }) => {
  const posts = usePostMapper()
    .filter((post: any) => post.featured)
    .slice(data?.init || 0, data?.limit || 3);

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
