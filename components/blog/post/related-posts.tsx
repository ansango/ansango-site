import { Container, Section } from "components/common";
import { fetcher } from "lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import useSWR from "swr";
import { SubTitlePostList } from "../common/subtitle";
export type RelatedPost = {
  title: "PostRelatedPosts";
  category: string;
  publishedAt: string;
  summary: string;
  tags: {
    options: string[];
  };
  id: string;
} | null;

export type RelatedPosts = {
  __typename: string;
  postOne: RelatedPost;
  postTwo: RelatedPost;
  postThree: RelatedPost;
};

const RelatedPost = ({ data }: { data: RelatedPost }) => {
  const slug =
    data && data.id.replace(".mdx", "").replace("content/posts", "/blog");
  const { theme } = useTheme();
  const hoverTheme =
    theme === "night" ? "hover:border-accent-focus" : "hover:border-primary";
  const { data: dataR } = useSWR(
    `/api/page-views/by-path/${slug?.replace("/blog", "")}`,
    fetcher
  );

  return (
    <>
      {slug ? (
        <Link href={slug} passHref>
          <a
            className={`h-40 card bg-base-100 border border-secondary border-dashed ${hoverTheme} transition-colors duration-300`}
          >
            <div className="card-body p-4 w-full h-full justify-between">
              <div>
                <h3 className="card-title line-clamp-1">{data.title}</h3>
                <p className="line-clamp-2 prose leading-6">{data.summary}</p>
              </div>

              <div className="card-actions items-center w-full justify-between">
                <div>
                  {dataR?.views && (
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
                      {dataR?.views}
                    </span>
                  )}
                </div>
                <div className="card-actions justify-end">
                  <div className="badge badge-primary badge-sm">
                    {data.category}
                  </div>
                  {data.tags?.options
                    ?.filter((tag, i) => tag !== data.category)
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
            </div>
          </a>
        </Link>
      ) : null}
    </>
  );
};

export const RelatedPosts = ({ postOne, postTwo, postThree }: RelatedPosts) => {
  const posts = [postOne, postTwo, postThree];
  return (
    <Section>
      <Container className="space-y-10">
        <SubTitlePostList>Entradas relacionadas</SubTitlePostList>

        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <RelatedPost data={post} key={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
