// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GADAO, queryReport } from "lib/google/client";
import { composeSlug } from "lib/utils";

type Data = any;

const configQuery: GADAO = {
  dateRanges: [
    {
      startDate: "2020-03-31",
      endDate: "today",
    },
  ],
  dimensions: [
    {
      name: "pagePath",
    },
  ],
  metrics: [
    {
      name: "screenPageViews",
    },
  ],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const slug = composeSlug(req.query.path as string[]);

    try {
      const response = await queryReport(configQuery);

      const analytics = response.rows
        ?.map((row) => {
          return {
            path: row.dimensionValues && row.dimensionValues[0].value,
            value:
              row.metricValues &&
              row.metricValues.map((metric, i) => metric.value)[0],
          };
        })
        .filter((item: any) => item.path.includes("/blog/"))
        .map((item: any) => {
          return { views: item.value, path: item.path.replace("/blog/", "") };
        })
        .filter((item) => item.path === slug)[0];

      res.status(200).json(analytics);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
