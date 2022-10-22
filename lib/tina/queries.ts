import client from "../../.tina/__generated__/client";

export const postQuery = async (relativePath: string) =>
  await client.queries.postQuery({
    relativePath,
  });
