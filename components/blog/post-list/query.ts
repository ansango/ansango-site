import { useAllPostsQuery } from "lib/hooks/queries";
import { fetcher } from "lib/utils";
import useSWR from "swr";
import { Post } from "../common/post-lists";

export const usePostMapper = () => {
  const { posts } = useAllPostsQuery();
  const { data: dataFetcher } = useSWR("/api/page-views/by-path", fetcher);

  const postMapper = posts?.map((post: any) => {
    const relativePath = post._sys.relativePath.replace(".mdx", "");
    const analytics = dataFetcher?.analytics?.find(
      (item: any) => item.path === relativePath
    );
    return {
      ...post,
      views: analytics?.views || 0,
    };
  }) as Post[];
  return postMapper;
};
