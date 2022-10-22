import { Blocks } from "components/blocks/blocks-renderer";
import { client, useTina } from "lib/tina";

export default function NextPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  return <Blocks {...data.page} />;
}

export const getStaticProps = async ({
  params,
}: {
  params: { filename: string | undefined };
}) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${params.filename}.mdx`,
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
  const pagesListData = await client.queries.pageConnection();
  return {
    paths: pagesListData.data.pageConnection.edges?.map((page) => ({
      params: { filename: page?.node?._sys.filename },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
