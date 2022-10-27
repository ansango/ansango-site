import { getContributionsByCurrentYear } from "lib/github";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  contributionCalendar: any;
};

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
  } = await getContributionsByCurrentYear();
  return res.status(200).json({ contributionCalendar });
}
