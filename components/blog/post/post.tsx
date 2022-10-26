import { Hero } from "components/blocks/hero";
import { Container, Section } from "components/common";
import { Markdown } from "lib/tina";
import { formatDate } from "lib/utils";
import Link from "next/link";
import { FC } from "react";
import { ReadTimeResults } from "reading-time";



export type PostProps = {
  body?: any | null;
};

export const Post: FC<PostProps> = ({ body }) => {
  return (
    <article>
      <Section>
        <Container className="prose prose-h2:text-secondary prose-code:bg-accent prose-code:text-accent-content">
          <Markdown content={body} />
        </Container>
      </Section>
    </article>
  );
};
