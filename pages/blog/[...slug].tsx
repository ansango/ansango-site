import { postConn, postQuery, useTina } from "lib/tina";

export default function NextPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return <div>Hola</div>;
}

export const getStaticProps = async ({
  params,
}: {
  params: {
    slug: string[];
  };
}) => {
  const { slug } = params;
  const relativePath = slug[1] ? slug[1] : slug[0];
  const postList = (await postConn()) || [];
  const allPosts = postList.filter((post) => post?.draft !== true) as any;
  const postIndex = allPosts
    .sort((a: any, b: any) => (a?.publishedAt > b?.publishedAt ? -1 : 1))
    .findIndex((post: any) => post._sys.filename === relativePath);

  const prevPost = allPosts[postIndex - 1] || null;
  const nextPost = allPosts[postIndex + 1] || null;
  const prev =
    (prevPost && {
      title: prevPost.title,
      slug: `/blog/${prevPost.category}/${prevPost._sys.filename}`,
    }) ||
    null;
  const next =
    (nextPost && {
      title: nextPost.title,
      slug: `/blog/${nextPost.category}/${nextPost._sys.filename}`,
    }) ||
    null;
  const tinaProps = await postQuery(`${relativePath}.mdx`);
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      prev,
      next,
    },
  };
};

export const getStaticPaths = async () => {
  const postList = (await postConn()) || [];
  return {
    paths: postList.map((post) => {
      const category = post?.category;
      const filename = post?._sys.filename;
      const slug = category ? [category, filename] : [filename];
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
