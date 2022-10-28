import Link from "next/link";
import { useState } from "react";
import { Pagination } from "./pagination";
import { Searcher } from "./searcher";
import { fetcher, formatDate } from "lib/utils";
import { useTheme } from "next-themes";
import { SubTitlePostList } from "../common/subtitle";
import useSWR from "swr";
export const Posts = ({
  data,
  parentField = "",
}: {
  data?: any;
  parentField?: string;
}) => {
  const { theme } = useTheme();
  const hoverTheme =
    theme === "night" ? "hover:border-accent-focus" : "hover:border-secondary";
  const hoverTextGroup =
    theme === "night"
      ? "group-hover:text-accent-focus"
      : "group-hover:text-secondary";
  const { search } = data;
  const configSearch = {
    placeholder: search?.placeholder || "Search",
    active: search?.active || false,
    maxPosts: search?.maxPosts || 3,
  };
  const { data: posts } = useSWR("/api/files", fetcher);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filteredPosts =
    posts?.filter(
      (post: any) =>
        (post &&
          post.title?.toLowerCase().includes(searchValue.toLowerCase())) ||
        post?.tags?.options?.some((tag: string) =>
          tag?.toLowerCase().includes(searchValue.toLowerCase())
        )
    ) || [];

  const onPagination = (event: any) => setCurrentPage(Number(event.target.id));

  const indexOfLastPost = currentPage * configSearch.maxPosts;
  const indexOfFirstPost = indexOfLastPost - configSearch.maxPosts;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers: number[] = [];

  for (
    let i = 1;
    i <= Math.ceil(filteredPosts.length / configSearch.maxPosts);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="space-y-10">
      {search?.active && (
        <Searcher
          onSearch={(e: any) => setSearchValue(e.target.value)}
          onReset={() => setCurrentPage(1)}
          placeholder={configSearch.placeholder}
          parentField={parentField}
        />
      )}
      <section className="space-y-10">
        <div className="relative">
          <div className="relative flex justify-start">
            <SubTitlePostList>Todas las publicaciones</SubTitlePostList>
          </div>
        </div>
        <ul className="space-y-5">
          {currentPosts.map(
            (
              {
                _sys,
                title,
                category,
                tags,
                summary,
                publishedAt,
                readingTime,
                slug,
              }: {
                _sys: any;
                title: string;
                category: string;
                tags: any;
                summary: string;
                publishedAt: string;
                readingTime: string;
                slug: string;
              },
              i: number
            ) => (
              <Link href={`/blog/${slug}`} key={`${title}-${i}`} passHref>
                <a
                  className={`h-48 md:h-40 group space-y-1 card bg-base-100 border-3 border-dashed border-primary ${hoverTheme} transition-all duration-300`}
                >
                  <li className="sm:flex lg:items-end card-body p-4 w-full h-full justify-between">
                    <div className="w-full space-y-2 h-full">
                      <div className="md:flex justify-between">
                        <p className="text-xl font-medium leading-6">
                          <h3
                            className={`line-clamp-1 card-title ${hoverTextGroup} transition-all duration-300`}
                          >
                            {title}
                          </h3>
                        </p>
                        <div className="flex items-center text-sm space-x-2">
                          <span className="prose leading-6 max-w-full">
                            {formatDate(publishedAt)}
                          </span>
                          <span>/</span>
                          <span className="prose leading-6 max-w-full flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 mr-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {readingTime}
                          </span>
                        </div>
                      </div>
                      <p
                        className={`line-clamp-2 ${hoverTextGroup} transition-all duration-300 prose leading-6 max-w-full`}
                      >
                        {summary}
                      </p>
                    </div>
                    <div className="">
                      <div className="badge badge-secondary badge-sm mr-1.5">
                        {category}
                      </div>
                      {tags?.options
                        ?.filter((tag: string, i: number) => tag !== category)
                        .map((tag: string, i: number) => (
                          <div
                            key={`tag-${i}`}
                            className="badge badge-outline badge-sm mr-1.5"
                          >
                            {tag}
                          </div>
                        ))}
                    </div>
                  </li>
                </a>
              </Link>
            )
          )}
        </ul>
      </section>

      {search?.active && (
        <Pagination
          onPagination={onPagination}
          currentPage={currentPage}
          pageNumbers={pageNumbers}
        />
      )}
    </div>
  );
};
