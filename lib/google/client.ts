import { BetaAnalyticsDataClient } from "@google-analytics/data";

interface IDateRange {
  /** DateRange startDate */
  startDate?: string | null;

  /** DateRange endDate */
  endDate?: string | null;

  /** DateRange name */
  name?: string | null;
}

interface IDimension {
  /** Dimension name */
  name?: string | null;
}

interface IMetric {
  /** Metric name */
  name?: string | null;

  /** Metric expression */
  expression?: string | null;

  /** Metric invisible */
  invisible?: boolean | null;
}

const propertyId = "279951213";
export const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
});

export type GADAO = {
  dateRanges?: IDateRange[] | null;
  dimensions?: IDimension[] | null;
  metrics?: IMetric[] | null;
};

export const queryReport = async ({
  dateRanges,
  dimensions,
  metrics,
}: GADAO) => {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GOOGLE_ANALYTICS_ID}`,
    dateRanges,
    dimensions,
    metrics,
  });
  return response;
};
