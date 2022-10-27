import { fetcher } from "lib/utils";

import useSWR from "swr";
import { Template } from "tinacms/dist/admin/types";
import { SiGithub } from "react-icons/si";
export const ContributionsLite = () => {
  const { data } = useSWR("/api/github/contributions-current-year", fetcher);
  return (
    <>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <SiGithub className="text-3xl" />
          </div>
          <div className="stat-title">Contribuciones</div>
          <div className="stat-value text-primary">
            {data?.contributionCalendar.totalContributions ?? "Github"}
          </div>
          <div className="stat-desc">
            Durante el año {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
};

export const githubBlockSchema: Template = {
  name: "github",
  label: "Github",
  fields: [
    {
      type: "string",
      label: "Github Username",
      name: "username",
      description: "Your Github username",
    },
  ],
};
