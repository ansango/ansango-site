import { Container } from "components/common";
import { Template } from "tinacms/dist/admin/types";
import useSWR from "swr";
import { fetcher } from "lib/utils";
import { IconStat } from "./icon";
import { categories } from "constants/categories";

export const Stats = () => {
  const { data } = useSWR("/api/files", fetcher);
  const files = data?.length;
  const readingTimeTotal = data
    ?.map((file: any) => parseInt(file.readingTime.split(" ")[0]) / 60)
    .reduce((a: number, b: number) => a + b, 0)
    .toString()
    .replace(".", ",");

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
          <div className="stat-title">Categorías</div>
          <div className="stat-value text-secondary">{categories.length}</div>
          <div className="stat-desc">Del contenido</div>
        </div>

        <div className="stat">
          <div className="stat-figure">
            <IconStat kind="users" />
          </div>
          <div className="stat-title">Lectura</div>
          <div className="stat-value">{readingTimeTotal}</div>
          <div className="stat-desc">Horas de lectura</div>
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
