import { Container } from "components/common";
import Link from "next/link";
import { FC } from "react";

type Pagination = {
  title: string | null | undefined;
  slug: string;
};

export const Pagination: FC<{
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
                className={`hover:text-primary transition-all line-clamp-1 max-w-xs mr-auto`}
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
                className={`hover:text-primary transition-all line-clamp-1 max-w-xs ml-auto`}
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
