import { useTina } from "tinacms/dist/edit-state";
import { client } from "../../.tina/__generated__/client";

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
  const relativePath = slug[1] ? `${slug[1]}.mdx` : `${slug[0]}.mdx`;
  const tinaProps = await client.queries.postQuery({
    relativePath,
  });
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
    },
  };
};

export const getStaticPaths = async () => {
  const postList =
    (await (await client.queries.postConnection()).data.postConnection.edges) ||
    [];

  return {
    paths: postList.map((page) => {
      const category = page?.node?.category;
      const filename = page?.node?._sys.filename;
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
