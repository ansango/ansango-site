import { Container, Section } from "components/common";
import { useAllPostsQuery } from "lib/hooks/queries";
import Link from "next/link";
import { Suspense } from "react";
import { Template } from "tinacms/dist/admin/types";

const Posts = () => {
  const { posts } = useAllPostsQuery();

  return (
    <ul>
      {posts?.map(({ _sys, title }, i) => (
        <div key={`${title}-${i}`}>
          <Link
            href={`/blog/${_sys.relativePath.replace(".mdx", "")}`}
            passHref
          >
            <a>{title}</a>
          </Link>
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
