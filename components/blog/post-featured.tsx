import { Container, Section } from "components/common";
import { useFeaturedPostsQuery } from "lib/hooks/queries";
import { fetcher } from "lib/utils";
import { Suspense } from "react";
import useSWR from "swr";
import { Template } from "tinacms/dist/admin/types";
import { PostList } from "./common/post-lists";
import { SubTitlePostList } from "./common/subtitle";

export const PostFeaturedList = ({ data }: { data: any }) => {
  const { data: dataPosts } = useSWR("/api/files", fetcher);
  const posts = dataPosts
    ?.filter((post: any) => post.featured)
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
