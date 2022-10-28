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
    data && data.id?.replace(".mdx", "").replace("content/posts", "/blog");
  const { theme } = useTheme();
  const hoverTheme =
    theme === "night" ? "hover:border-accent-focus" : "hover:border-primary";
  const { data: dataPosts } = useSWR("/api/files", fetcher);
  const post = dataPosts?.filter(
    (post: any) =>
      post.slug === data?.id.replace(".mdx", "").replace("content/posts/", "")
  )[0];

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
                  {post && (
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
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {post.readingTime}
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
                    )).slice(0, 1)}
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
