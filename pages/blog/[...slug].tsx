import { Post } from "components/blog/post";
import { getAllPosts, postConn, postQuery, useTina } from "lib/tina";
import { composeSlug } from "lib/utils";
import { Suspense } from "react";

export default function NextPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Post
        {...{
          body: data.post?.body,
          next: props.next,
          prev: props.prev,
        }}
      />
    </Suspense>
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

  return {
    props: {
      ...tinaProps,
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
