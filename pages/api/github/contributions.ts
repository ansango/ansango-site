import { getContributions } from "lib/github";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    data: {
      user: {
        contributionsCollection: { contributionCalendar },
      },
    },
  } = await getContributions();

  return res.status(200).json(contributionCalendar);
}
