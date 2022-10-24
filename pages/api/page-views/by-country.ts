// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GADAO, queryReport } from "lib/google/client";
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
      name: "country",
    },
  ],
  metrics: [
    {
      name: "screenPageViews",
    },
    {
      name: "activeUsers",
    },
  ],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const response = await queryReport(configQuery);

      const data = response?.rows?.map((row) => {
        return {
          country: row.dimensionValues && row.dimensionValues[0].value,
          value:
            row.metricValues &&
            row.metricValues.map((metric, i) => {
              const name =
                response &&
                response.metricHeaders &&
                response.metricHeaders[i].name;
              const value = metric.value;
              return {
                name,
                value,
              };
            }),
        };
      });

      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
