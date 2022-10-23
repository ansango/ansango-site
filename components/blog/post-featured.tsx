import { Container, Section } from "components/common";
import { useFeaturedPostsQuery } from "lib/hooks/queries";
import Link from "next/link";
import { Suspense } from "react";
import { Template } from "tinacms/dist/admin/types";

const Posts = ({
  data,
  parentField = "",
}: {
  data?: any;
  parentField?: string;
}) => {
  const { posts } = useFeaturedPostsQuery({
    init: data?.init || 0,
    limit: data?.limit || 3,
  });

  return (
    <ul className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
      {posts &&
        posts.map(({ _sys, title, category, tags, summary }, i) => (
          <Link
            key={`${title}-${i}`}
            href={`/blog/${_sys.relativePath.replace(".mdx", "")}`}
            passHref
          >
            <a className="card bg-base-100 border border-secondary border-dashed h-full hover:border-primary transition-all duration-300">
              <div className="card-body p-4 w-full">
                <h3 className="card-title">{title}</h3>

                <p>{summary}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-primary badge-sm">{category}</div>
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
  );
};

export const PostFeaturedList = ({ data = {}, parentField = "" }) => {
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

export const postFeaturedSchema: Template = {
  label: "Post Featured List",
  name: "postFeaturedList",
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
