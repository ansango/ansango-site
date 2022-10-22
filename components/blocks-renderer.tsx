import React from "react";
import type { Page } from "../.tina/__generated__/types";
import { Content } from "./blocks/content";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map((block, i) => {
            switch (block?.__typename) {
              case "PageBlocksContent":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Content body={block.body} />
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
