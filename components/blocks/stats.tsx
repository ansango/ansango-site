import { Container } from "components/common";
import { Template } from "tinacms/dist/admin/types";
import useSWR from "swr";
import { fetcher } from "lib/utils";
import { useAllPostsQuery } from "lib/hooks/queries";

const IconStat = ({ kind }: { kind: "posts" | "views" | "users" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      {kind === "posts" && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      )}
      {kind === "views" && (
        <>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </>
      )}
      {kind === "users" && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      )}
    </svg>
  );
};

export const Stats = () => {
  const { data, error } = useSWR("/api/page-views/basic", fetcher);
  const analytics = data?.analytics;
  const { posts } = useAllPostsQuery();
  const postsCount = posts?.length || 0;
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
          <div className="stat-value text-primary">{postsCount}</div>
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
