import { Post } from "components/blog/post";
import { Layout } from "components/layout/layout";
import { getAllPosts, postConn, postQuery, useTina } from "lib/tina";
import { composeSlug, getReadingTime } from "lib/utils";
import { Suspense } from "react";
import readingTime from "reading-time";

export default function NextPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Post
          {...{
            title: data.post?.title,
            summary: data.post?.summary,
            body: data.post?.body,
            next: props.next,
            prev: props.prev,
            readingTime: props.readingTime,
            publishedAt: data.post?.publishedAt,
          }}
        />
      </Suspense>
    </Layout>
  );
}

export const getStaticProps = async ({
  params,
}: {
  params: {
    slug: string[];
  };
}) => {
  const relativePath = composeSlug(params.slug);

  const allPosts = await getAllPosts();
  const postIndex = allPosts.findIndex(
    (post) =>
      post && post._sys.relativePath.replace(".mdx", "") === relativePath
  );

  const prevPost = allPosts[postIndex - 1] || null;
  const nextPost = allPosts[postIndex + 1] || null;
  const tinaProps = await postQuery(`${relativePath}.mdx`);
  const readingTime = getReadingTime(tinaProps.data.post.body);

  return {
    props: {
      ...tinaProps,
      readingTime,
      prev: prevPost && {
        title: prevPost.title,
        slug: `/blog/${composeSlug(prevPost._sys.breadcrumbs)}`,
      },
      next: nextPost && {
        title: nextPost.title,
        slug: `/blog/${composeSlug(nextPost._sys.breadcrumbs)}`,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const postList = await postConn();
  return {
    paths: postList.map((post) => {
      return {
        params: {
          slug: post?._sys.breadcrumbs,
        },
      };
    }),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
