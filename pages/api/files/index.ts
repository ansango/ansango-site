// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllFilesFrontMatter } from "lib/utils/mdx";
import { client } from "lib/tina";
import { getReadingTime } from "lib/utils";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const posts = await getAllFilesFrontMatter("/posts");
    const mappedPosts = await Promise.all(
      posts.map(async (post: any) => {
        const { data } = await client.queries.post({
          relativePath: `${post.slug}.mdx`,
        });
        const readingTime = getReadingTime(data.post.body);
        return {
          ...post,
          readingTime,
        };
      })
    );
    res.status(200).json(mappedPosts);
  } else {
    res.status(404).json({ message: "Not found" });
  }
}
