import { Container, Section } from "components/common";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Suspense } from "react";
import { Template } from "tinacms/dist/admin/types";
import { usePostMapper } from "./post-list/query";

const Posts = ({
  data,
  parentField = "",
}: {
  data?: any;
  parentField?: string;
}) => {
  const posts = usePostMapper()
    ?.sort((a, b) => b.views - a.views)
    .slice(data.init || 0, data.limit || 4);
  const { theme } = useTheme();
  const hoverTheme =
    theme === "night" ? "hover:border-accent-focus" : "hover:border-primary";
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {posts &&
        posts.map(({ _sys, title, category, tags, summary, views }, i) => (
          <Link
            key={`${title}-${i}`}
            href={`/blog/${_sys.relativePath.replace(".mdx", "")}`}
            passHref
          >
            <a
              className={`h-40 card bg-base-100 border border-secondary border-dashed ${hoverTheme} transition-all duration-300`}
            >
              <div className="card-body p-4 w-full h-full justify-between">
                <div>
                  <h3 className="card-title line-clamp-1">{title}</h3>
                  <p className="line-clamp-2 prose leading-6">{summary}</p>
                </div>
                <div className="card-actions justify-end">
                  <span className="flex items-center text-primary-focus">
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
            </a>
          </Link>
        ))}
    </ul>
  );
};

export const PostMostViewedList = ({ data = {}, parentField = "" }) => {
  return (
    <Section>
      <Container className="space-y-10">
        <h2 className="text-4xl font-bold font-serif">Más vistas</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <Posts data={data} />
        </Suspense>
      </Container>
    </Section>
  );
};

export const postMostViewedSchema: Template = {
  label: "Post Most Viewed List",
  name: "postMostViewedList",
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
      type: "number",
      name: "init",
      label: "Initial",
    },
    {
      type: "number",
      name: "limit",
      label: "Limit",
    },
  ],
};
