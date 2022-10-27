import React from "react";

import { Content } from "components/blocks/content";
import { Hero } from "components/blocks/hero";
import { PostList } from "components/blog/post-list";
import { Page } from ".tina/__generated__/types";
import { PostFeaturedList } from "components/blog/post-featured";
import { Stats } from "./stats";
import { PostLatestsList } from "components/blog/post-latests";
import { PostMostViewedList } from "components/blog/post-most-viewed";
import { ContributionsLite } from "./github";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map((block, i) => {
            switch (block?.__typename) {
              case "PageBlocksHero":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Hero key={i} data={block} />
                  </div>
                );

              case "PageBlocksContent":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Content body={block.body} />
                  </div>
                );
              case "PageBlocksPostList":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <PostList data={block} />
                  </div>
                );
              case "PageBlocksPostFeaturedList":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <PostFeaturedList data={block} />
                  </div>
                );
              case "PageBlocksPostLatestsList":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <PostLatestsList data={block} />
                  </div>
                );
              case "PageBlocksPostMostViewedList":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <PostMostViewedList data={block} />
                  </div>
                );
              case "PageBlocksStats":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Stats />
                  </div>
                );
              case "PageBlocksGithub":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <ContributionsLite />
                  </div>
                );
              default:
                return null;
            }
          })
        : null}
    </>
  );
};
