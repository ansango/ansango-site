import { useAllPostsQuery } from "lib/hooks/queries";
import { fetcher } from "lib/utils";
import useSWR from "swr";
import { Post } from "../common/post-lists";

export const usePostMapper = () => {
  const { data: dataFiles } = useSWR("/api/files", fetcher);
  const { data: dataFetcher } = useSWR("/api/page-views/by-path", fetcher);

  const postMapper =
    dataFiles?.map((post: any) => {
      const relativePath = post.slug;
      const analytics = dataFetcher?.analytics?.find(
        (item: any) => item.path === relativePath
      );
      return {
        ...post,
        views: analytics?.views || 0,
      };
    }) || ([] as Post[]);
  return postMapper;
};
