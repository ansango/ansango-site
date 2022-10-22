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
            <h4 className={`text-xs tracking-wide italic`}>Anterior</h4>
            <Link href={prev.slug} passHref>
              <a className={`line-clamp-1 max-w-xs mr-auto`}>{prev.title}</a>
            </Link>
          </>
        )}
      </div>

      <div className="text-right group">
        {next && (
          <>
            <h4 className={`text-xs tracking-wide italic`}>Siguiente</h4>

            <Link href={`${next.slug}`} passHref>
              <a className={`line-clamp-1 max-w-xs ml-auto`}>{next.title}</a>
            </Link>
          </>
        )}
      </div>
    </Container>
  );
};

export type PostProps = {
  title?: string;
  summary?: string;
  category?: string;
  tags?: string[];
  body?: any;
  publishedAt?: string;
  prev: Pagination | null;
  next: Pagination | null;
};

export const Post: FC<PostProps> = ({ body, next, prev }) => {
  return (
    <article>
      <Section>
        <Container>
          <Markdown content={body} />
        </Container>
      </Section>
      {(next || prev) && <Pagination next={next} prev={prev} />}
    </article>
  );
};
