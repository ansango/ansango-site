// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllFilesFrontMatter } from "lib/utils/mdx";
type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const posts = await getAllFilesFrontMatter("/posts");
    res.status(200).json(posts);
  } else {
    res.status(404).json({ message: "Not found" });
  }
}
