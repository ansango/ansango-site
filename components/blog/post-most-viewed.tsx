import { Container, Section } from "components/common";
import { Suspense } from "react";
import { Template } from "tinacms/dist/admin/types";
import { PostList } from "./common/post-lists";
import { usePostMapper } from "./post-list/query";

export const PostMostViewedList = ({ data }: { data: any }) => {
  const posts = usePostMapper()
    ?.sort((a: any, b: any) => b.views - a.views)
    .slice(data.init || 0, data.limit || 4);
  return (
    <Section>
      <Container className="space-y-10">
        <h2 className="text-4xl font-bold font-serif">Más vistas</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <PostList posts={posts} type="viewed" />
        </Suspense>
      </Container>
    </Section>
  );
};

export const postMostViewedSchema: Template = {
  label: "Post Most Viewed List",
  name: "postMostViewedList",
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
