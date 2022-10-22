import { client } from "../../.tina/__generated__/client";
export const postConn = async () =>
  (await (
    await client.queries.postConnection()
  ).data.postConnection.edges?.map((edge) => edge?.node)) || [];

export const getAllPosts = async () => {
  const posts = await postConn();
  return (
    posts &&
    posts
      .filter((post) => post && !post.draft)
      .sort((a: any, b: any) => (a?.publishedAt > b?.publishedAt ? -1 : 1))
  );
};
