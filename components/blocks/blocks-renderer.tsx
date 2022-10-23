import React from "react";

import { Content } from "components/blocks/content";
import { Hero } from "components/blocks/hero";
import { PostList } from "components/blog/post-list";
import { Page } from ".tina/__generated__/types";

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
              default:
                return null;
            }
          })
        : null}
    </>
  );
};
