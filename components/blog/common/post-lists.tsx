import { PostQuery } from ".tina/__generated__/types";
import { useTheme } from "next-themes";
import Link from "next/link";

export type Post = {
  views?: number;
  slug: string;
} & PostQuery["post"];

export const PostList = ({
  posts,
  type = "default",
}: {
  posts: Post[] | null;
  type?: "viewed" | "default";
}) => {
  const { theme } = useTheme();
  const hoverTheme =
    theme === "night" ? "hover:border-accent-focus" : "hover:border-primary";
  const classList =
    type === "viewed" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <ul className={`grid gap-5 ${classList}`}>
      {posts &&
        posts.map(({ title, category, tags, summary, views, slug }, i) => (
          <Link key={`${title}-${i}`} href={`/blog/${slug}`} passHref>
            <a
              className={`h-40 card bg-base-100 border border-secondary border-dashed ${hoverTheme} transition-colors duration-300`}
            >
              <div className="card-body p-4 w-full h-full justify-between">
                <div>
                  <h3 className="card-title line-clamp-1">{title}</h3>
                  <p className="line-clamp-2 prose leading-6">{summary}</p>
                </div>
                <div className="card-actions justify-end">
                  {type === "default" && (
                    <>
                      <div className="badge badge-primary badge-sm">
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
                        ))
                        .slice(0, 4)}
                    </>
                  )}
                  {type === "viewed" && (
                    <span className="flex items-center text-primary-focus">
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
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {views}
                    </span>
                  )}
                </div>
              </div>
            </a>
          </Link>
        ))}
    </ul>
  );
};
