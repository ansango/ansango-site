import { tagsSearcher } from "constants/tags";
import { useAllPostsQuery } from "lib/hooks/queries";
import Link from "next/link";
import { useState } from "react";
import { Pagination } from "./pagination";
import { Searcher } from "./searcher";

export const Posts = ({
  data,
  parentField = "",
}: {
  data?: any;
  parentField?: string;
}) => {
  const { search } = data;
  const configSearch = {
    placeholder: search?.placeholder || "Search",
    active: search?.active || false,
    maxPosts: search?.maxPosts || 3,
  };
  const { posts } = useAllPostsQuery();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filteredPosts =
    posts?.filter(
      (post) =>
        (post &&
          post.title?.toLowerCase().includes(searchValue.toLowerCase())) ||
        post?.tags?.options?.some((tag) =>
          tag?.toLowerCase().includes(searchValue.toLowerCase())
        )
    ) || [];

  const onPagination = (event: any) => {
    setCurrentPage(Number(event.target.id));
  };

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

      <ul className="columns-1 sm:columns-2 md:columns-3 space-y-5">
        {currentPosts.map(({ _sys, title, category, tags, summary }, i) => (
          <Link
            key={`${title}-${i}`}
            href={`/blog/${_sys.relativePath.replace(".mdx", "")}`}
            passHref
          >
            <a className="card bg-base-100 border-3 border-primary hover:border-accent transition-all duration-300">
              <div className="card-body p-4 w-full">
                <h3 className="card-title">{title}</h3>

                <p>{summary}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-secondary badge-sm">
                    {category}
                  </div>
                  {tags?.options
                    ?.filter((tag, i) => tag !== category)
                    .map((tag, i) => (
                      <div
                        key={`tag-${i}`}
                        className="badge badge-outline badge-sm"
                      >
                        {tag}
                      </div>
                    ))}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </ul>
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
