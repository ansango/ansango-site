import { useEffect, useState } from "react";
import { client } from "../../.tina/__generated__/client";

export const useAllPostsQuery = () => {
  const [data, setPosts] = useState({
    loading: true,
    posts: null,
  });

  useEffect(() => {
    client.queries
      .postsLatestsQuery()
      .then((res: any) => {
        setPosts({
          loading: false,
          posts: res?.data?.postConnection?.edges
            .map((edge: any) => edge?.node)
            .sort((a: any, b: any) => {
              return (
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
              );
            }),
        });
      })
      .catch((err) => {
        console.error(err);
        setPosts({
          loading: false,
          posts: null,
        });
      });
    return () => {
      setPosts({
        loading: false,
        posts: null,
      });
    };
  }, []);
  return data;
};
