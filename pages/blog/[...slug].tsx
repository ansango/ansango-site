import { Hero } from "components/blocks/hero";
import { SocialShare } from "components/blog/common/social-share";
import { Pagination, Post } from "components/blog/post";
import { RelatedPosts } from "components/blog/post/related-posts";
import { Layout } from "components/layout/layout";
import { client, useTina } from "lib/tina";
import { fetcher, formatSlug, getReadingTime } from "lib/utils";
import { getAllFilesFrontMatter, getFiles } from "lib/utils/mdx";
import { GetStaticPaths } from "next";
import FourOhFour from "pages/404";
import { Suspense } from "react";
import useSWR from "swr";

export default function NextPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const isPublished = !data.post?.draft;
  const { data: dataR } = useSWR(
    `/api/page-views/by-path/${props.path}`,
    fetcher
  );

  const relatedPosts = data?.post?.relatedPosts;

  if (data.post && isPublished) {
    return (
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Hero
            data={{
              headline: data.post?.title,
              text: data.post?.summary,
              type: "blogPost",
              readingTime: props.readingTime,
              publishedAt: data.post?.publishedAt,
              category: data.post?.category,
              // @ts-ignore
              tags: data.post?.tags?.options,
              views: dataR?.views,
            }}
          />
          <Post
            {...{
              title: data.post?.title,
              summary: data.post?.summary,
              body: data.post?.body,
              next: props.next,
              prev: props.prev,
              readingTime: props.readingTime,
              publishedAt: data.post?.publishedAt,
              category: data.post?.category,
              tags: data.post?.tags?.options,
              views: dataR?.views,
            }}
          />
          {data?.post?.title && (
            <SocialShare
              title={data.post.title}
              url={`https://ansango.com/blog/${props.path}`}
            />
          )}
          {/* @ts-ignore?*/}
          {data.post?.relatedPosts && <RelatedPosts {...relatedPosts} />}
          {(props.next || props.prev) && (
            <Pagination next={props.next} prev={props.prev} />
          )}
        </Suspense>
      </Layout>
    );
  }
  return <FourOhFour />;
}

export const getStaticProps = async ({
  params,
}: {
  params: {
    slug: string[];
  };
}) => {
  const allPosts = await getAllFilesFrontMatter("/posts");

  const postIndex = allPosts.findIndex(
    (post: any) => formatSlug(post.slug) === params.slug.join("/")
  );
  const relativePath = params.slug.join("/");
  const prevPost = allPosts[postIndex - 1] || null;
  const nextPost = allPosts[postIndex + 1] || null;
  const tinaProps = await client.queries.post({
    relativePath: `${relativePath}.mdx`,
  });

  const readingTime = getReadingTime(tinaProps.data.post.body);

  return {
    props: {
      ...tinaProps,
      readingTime,
      path: relativePath,
      prev: prevPost && {
        title: prevPost.title,
        slug: `/blog/${prevPost.slug}`,
      },
      next: nextPost && {
        title: nextPost.title,
        slug: `/blog/${nextPost.slug}`,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getFiles("/posts");
  return {
    paths: posts.map((p: string) => ({
      params: {
        slug: formatSlug(p).split("/"),
      },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
