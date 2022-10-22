import { client } from "../../.tina/__generated__/client";
export const postConn = async () =>
  (await (
    await client.queries.postConnection()
  ).data.postConnection.edges?.map((edge) => edge?.node)) || [];
