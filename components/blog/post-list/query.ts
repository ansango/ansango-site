import { useAllPostsQuery } from "lib/hooks/queries";
import { fetcher } from "lib/utils";
import useSWR from "swr";

export const usePostMapper = () => {
  const { posts } = useAllPostsQuery();
  const { data: dataFetcher } = useSWR("/api/page-views/by-path", fetcher);
  const analyticsBlogPaths =
    dataFetcher?.analytics &&
    dataFetcher?.analytics
      .filter((item: any) => item.path.includes("/blog/"))
      .map((item: any) => {
        return { views: item.value, path: item.path.replace("/blog/", "") };
      });

  const postMapper = posts?.map((post: any) => {
    const relativePath = post._sys.relativePath.replace(".mdx", "");
    const analytics = analyticsBlogPaths?.find(
      (item: any) => item.path === relativePath
    );
    return {
      ...post,
      views: analytics?.views || 0,
    };
  });
  return postMapper;
};
