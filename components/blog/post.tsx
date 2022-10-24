import { Hero } from "components/blocks/hero";
import { Container, Section } from "components/common";
import { Markdown } from "lib/tina";
import Link from "next/link";
import { FC } from "react";

type Pagination = {
  title: string | null | undefined;
  slug: string;
};

const Pagination: FC<{
  prev: Pagination | null;
  next: Pagination | null;
}> = ({ next, prev }) => {
  return (
    <Container className="grid grid-cols-2 gap-5">
      <div className="text-left group">
        {prev && (
          <>
            <h4 className={`tracking-wide italic`}>←</h4>
            <Link href={prev.slug} passHref>
              <a
                className={`link no-underline hover:text-primary transition-all line-clamp-1 max-w-xs mr-auto`}
              >
                {prev.title}
              </a>
            </Link>
          </>
        )}
      </div>

      <div className="text-right group">
        {next && (
          <>
            <h4 className={`tracking-wide italic`}>→</h4>

            <Link href={`${next.slug}`} passHref>
              <a
                className={`link no-underline hover:text-primary transition-all line-clamp-1 max-w-xs ml-auto`}
              >
                {next.title}
              </a>
            </Link>
          </>
        )}
      </div>
    </Container>
  );
};

export type PostProps = {
  title?: string | null;
  summary?: string | null;
  category?: string | null;
  tags?: string[] | null;
  body?: any | null;
  publishedAt?: string | null;
  prev: Pagination | null;
  next: Pagination | null;
};

export const Post: FC<PostProps> = ({ body, next, prev, title, summary }) => {
  return (
    <article>
      <Hero
        data={{
          headline: title,
          text: summary,
          type: "blogPost",
        }}
      />
      <Section>
        <Container className="prose prose-h2:text-secondary prose-code:bg-accent prose-code:text-accent-content">
          <Markdown content={body} />
        </Container>
      </Section>
      {(next || prev) && <Pagination next={next} prev={prev} />}
    </article>
  );
};
