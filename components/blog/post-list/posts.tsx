import Link from "next/link";
import { useState } from "react";
import { Pagination } from "./pagination";
import { Searcher } from "./searcher";
import { usePostMapper } from "./query";
import { formatDate } from "lib/utils";
import { useTheme } from "next-themes";
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
  const posts = usePostMapper();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filteredPosts =
    posts?.filter(
      (post) =>
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
            <h2 className="text-4xl font-bold font-serif">
              Todas las publicaciones
            </h2>
          </div>
        </div>
        <ul className="space-y-5">
          {currentPosts.map(
            (
              { _sys, title, category, tags, summary, publishedAt, views },
              i
            ) => (
              <Link
                href={`/blog/${_sys.relativePath.replace(".mdx", "")}`}
                key={`${title}-${i}`}
                passHref
              >
                <a
                  className={`group space-y-1 card bg-base-100 border-3 border-dashed border-primary ${hoverTheme} transition-all duration-300`}
                >
                  <li className="sm:flex lg:items-end card-body p-4">
                    <div className="w-full space-y-2">
                      <div className="md:flex justify-between">
                        <p className="text-lg font-medium leading-6">
                          <h3
                            className={`card-title ${hoverTextGroup} transition-all duration-300`}
                          >
                            {title}
                          </h3>
                        </p>
                        <div className="flex items-center text-sm space-x-2">
                          <span className="">{formatDate(publishedAt)}</span>
                          <span>/</span>
                          <span className="flex items-center">
                            {views}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 ml-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <p
                        className={`${hoverTextGroup} transition-all duration-300`}
                      >
                        {summary}
                      </p>

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
