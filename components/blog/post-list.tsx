import { Container, Section } from "components/common";
import { useAllPostsQuery } from "lib/hooks/queries";
import Link from "next/link";
import { Suspense, useState } from "react";
import { Template } from "tinacms/dist/admin/types";

const Searcher = ({
  onSearch,
  placeholder,
  parentField = "",
}: {
  onSearch: (e: any) => void;
  placeholder: string;
  parentField: string;
}) => {
  return (
    <div className="relative max-w-lg" data-tinafield={`${parentField}.search`}>
      <input
        aria-label="Search"
        type="text"
        onChange={onSearch}
        placeholder={placeholder}
        className="input w-full input-primary border-2"
      />

      <span className="absolute top-0 right-0 translate-y-2/4 -translate-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </span>
    </div>
  );
};

const Pagination = ({
  pageNumbers = [],
  onPagination,
  currentPage = 0,
}: {
  pageNumbers: number[];
  onPagination: (page: any) => void;
  currentPage: number;
}) => {
  return (
    <div className="flex justify-center py-5 space-x-5 btn-group">
      {pageNumbers.length !== 1 &&
        pageNumbers.map((number) => {
          const cn = currentPage === number ? `btn btn-active` : `btn`;

          return (
            <button
              className={cn}
              key={number}
              onClick={onPagination}
              id={number.toString()}
            >
              {number}
            </button>
          );
        })}
    </div>
  );
};

const Posts = ({
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
            <a className="card bg-base-100 border-3 border-primary">
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

export const PostList = ({ data = {}, parentField = "" }) => {
  return (
    <Section>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Posts data={data} />
        </Suspense>
      </Container>
    </Section>
  );
};

export const postListSchema: Template = {
  label: "Post List",
  name: "postList",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "noDataMessage",
      label: "No data message",
    },
    {
      name: "search",
      label: "Search",
      type: "object",
      fields: [
        {
          name: "placeholder",
          label: "Placeholder",
          type: "string",
        },
        {
          name: "active",
          label: "Active",
          type: "boolean",
        },
        {
          name: "maxPosts",
          label: "Max posts",
          type: "number",
        },
      ],
    },
  ],
};
