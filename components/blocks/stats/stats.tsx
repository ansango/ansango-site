import { Container } from "components/common";
import { Template } from "tinacms/dist/admin/types";
import useSWR from "swr";
import { fetcher } from "lib/utils";
import { useAllPostsQuery } from "lib/hooks/queries";
import { IconStat } from "./icon";

export const Stats = () => {
  const { data } = useSWR("/api/page-views/basic", fetcher);
  const { data: dataFiles } = useSWR("/api/files", fetcher);
  const files = dataFiles?.length;
  const analytics = data?.analytics;

  const screenPageViews = analytics
    ?.filter((item: any) => item?.name === "screenPageViews")
    .map((item: any) => item?.value)[0];
  const users = analytics
    ?.filter((item: any) => item?.name === "activeUsers")
    .map((item: any) => item?.value)[0];
  return (
    <Container className="lg:pb-0">
      <div className="stats stats-vertical md:stats-horizontal shadow w-full">
        <div className="stat">
          <div className="stat-figure text-primary">
            <IconStat kind="posts" />
          </div>
          <div className="stat-title">Entradas</div>
          <div className="stat-value text-primary">{files}</div>
          <div className="stat-desc">Todo lo que he escrito</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconStat kind="views" />
          </div>
          <div className="stat-title">Visitas</div>
          <div className="stat-value text-secondary">{screenPageViews}</div>
          <div className="stat-desc">Las visitas a la página</div>
        </div>

        <div className="stat">
          <div className="stat-figure">
            <IconStat kind="users" />
          </div>
          <div className="stat-title">Usuarios</div>
          <div className="stat-value">{users}</div>
          <div className="stat-desc">Los usuarios activos</div>
        </div>
      </div>
    </Container>
  );
};

export const statsSchema: Template = {
  label: "Stats",
  name: "stats",
  fields: [
    {
      label: "Stats",
      name: "stats",
      type: "string",
    },
  ],
};
