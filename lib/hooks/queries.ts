import { PostQuery } from ".tina/__generated__/types";
import { useEffect, useState } from "react";
import { client } from ".tina/__generated__/client";

export const useAllPostsQuery = (init?: number, limit?: number) => {
  const [data, setPosts] = useState<{
    loading: boolean;
    posts: PostQuery["post"][] | null;
  }>({
    loading: true,
    posts: null,
  });

  useEffect(() => {
    client.queries
      .postsLatestsQuery()
      .then((res: any) => {
        setPosts({
          loading: false,
          posts:
            (init &&
              limit &&
              res?.data?.postConnection?.edges
                .map((edge: any) => edge?.node)
                .sort((a: any, b: any) => {
                  return (
                    new Date(b.publishedAt).getTime() -
                    new Date(a.publishedAt).getTime()
                  );
                })
                .slice(init, limit)) ||
            res?.data?.postConnection?.edges
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
  }, [init, limit]);
  return data;
};

export const useFeaturedPostsQuery = ({ init = 0, limit = 6 }) => {
  const [data, setPosts] = useState<{
    loading: boolean;
    posts: PostQuery["post"][] | null;
  }>({
    loading: true,
    posts: null,
  });

  useEffect(() => {
    client.queries
      .postsFeaturedQuery()
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
            })
            .slice(init, limit),
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
  }, [init, limit]);
  return data;
};

export const useLatestsPostsQuery = ({ init = 0, limit = 6 }) => {
  const [data, setPosts] = useState<{
    loading: boolean;
    posts: PostQuery["post"][] | null;
  }>({
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
            })
            .slice(init, limit),
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
  }, [init, limit]);
  return data;
};