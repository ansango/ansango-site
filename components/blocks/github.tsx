import { fetcher } from "lib/utils";

import useSWR from "swr";
import { Template } from "tinacms/dist/admin/types";
import { SiGithub } from "react-icons/si";
export const ContributionsLite = () => {
  const { data } = useSWR("/api/github/contributions-current-year", fetcher);
  return (
    <>
      {/* <div className="flex flex-col items-center w-full max-w-screen-md p-6 pb-6 rounded-lg sm:p-8">
        <h2 className="text-xl font-bold">Monthly Revenue</h2>
        <span className="text-sm font-semibold text-gray-500">2020</span>
        <div className="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
          <div className="relative flex flex-col items-center flex-grow pb-5 group">
            <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
              $37,500
            </span>
            <div className="relative flex justify-center w-full h-8 bg-primary-focus"></div>
            <div className="relative flex justify-center w-full h-6 bg-primary"></div>
            <div className="relative flex justify-center w-full h-16 bg-indigo-400"></div>
            <span className="absolute bottom-0 text-xs font-bold">Jan</span>
          </div>
          <div className="relative flex flex-col items-center flex-grow pb-5 group">
            <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
              $45,000
            </span>
            <div className="relative flex justify-center w-full h-10 bg-indigo-200"></div>
            <div className="relative flex justify-center w-full h-6 bg-indigo-300"></div>
            <div className="relative flex justify-center w-full h-20 bg-indigo-400"></div>
            <span className="absolute bottom-0 text-xs font-bold">Feb</span>
          </div>
          <div className="relative flex flex-col items-center flex-grow pb-5 group">
            <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
              $47,500
            </span>
            <div className="relative flex justify-center w-full h-10 bg-indigo-200"></div>
            <div className="relative flex justify-center w-full h-8 bg-indigo-300"></div>
            <div className="relative flex justify-center w-full h-20 bg-indigo-400"></div>
            <span className="absolute bottom-0 text-xs font-bold">Mar</span>
          </div>
          <div className="relative flex flex-col items-center flex-grow pb-5 group">
            <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
              $50,000
            </span>
            <div className="relative flex justify-center w-full h-10 bg-indigo-200"></div>
            <div className="relative flex justify-center w-full h-6 bg-indigo-300"></div>
            <div className="relative flex justify-center w-full h-24 bg-indigo-400"></div>
            <span className="absolute bottom-0 text-xs font-bold">Apr</span>
          </div>
          <div className="relative flex flex-col items-center flex-grow pb-5 group">
            <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
              $47,500
            </span>
            <div className="relative flex justify-center w-full h-10 bg-indigo-200"></div>
            <div className="relative flex justify-center w-full h-8 bg-indigo-300"></div>
            <div className="relative flex justify-center w-full h-20 bg-indigo-400"></div>
            <span className="absolute bottom-0 text-xs font-bold">May</span>
          </div>
          <div className="relative flex flex-col items-center flex-grow pb-5 group">
            <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
              $55,000
            </span>
            <div className="relative flex justify-center w-full h-12 bg-indigo-200"></div>
            <div className="relative flex justify-center w-full h-8 bg-indigo-300"></div>
            <div className="relative flex justify-center w-full h-24 bg-indigo-400"></div>
            <span className="absolute bottom-0 text-xs font-bold">Jun</span>
          </div>
          <div className="relative flex flex-col items-center flex-grow pb-5 group">
            <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
              $60,000
            </span>
            <div className="relative flex justify-center w-full h-12 bg-indigo-200"></div>
            <div className="relative flex justify-center w-full h-16 bg-indigo-300"></div>
            <div className="relative flex justify-center w-full h-20 bg-indigo-400"></div>
            <span className="absolute bottom-0 text-xs font-bold">Jul</span>
          </div>
          <div className="relative flex flex-col items-center flex-grow pb-5 group">
            <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
              $57,500
            </span>
            <div className="relative flex justify-center w-full h-12 bg-indigo-200"></div>
            <div className="relative flex justify-center w-full h-10 bg-indigo-300"></div>
            <div className="relative flex justify-center w-full h-24 bg-indigo-400"></div>
            <span className="absolute bottom-0 text-xs font-bold">Aug</span>
          </div>
          <div className="relative flex flex-col items-center flex-grow pb-5 group">
            <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
              $67,500
            </span>
            <div className="relative flex justify-center w-full h-12 bg-indigo-200"></div>
            <div className="relative flex justify-center w-full h-10 bg-indigo-300"></div>
            <div className="relative flex justify-center w-full h-32 bg-indigo-400"></div>
            <span className="absolute bottom-0 text-xs font-bold">Sep</span>
          </div>
          <div className="relative flex flex-col items-center flex-grow pb-5 group">
            <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
              $65,000
            </span>
            <div className="relative flex justify-center w-full h-12 bg-indigo-200"></div>
            <div className="relative flex justify-center w-full h-12 bg-indigo-300"></div>
            <div className="relative flex justify-center w-full bg-indigo-400 h-28"></div>
            <span className="absolute bottom-0 text-xs font-bold">Oct</span>
          </div>
          <div className="relative flex flex-col items-center flex-grow pb-5 group">
            <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
              $70,000
            </span>
            <div className="relative flex justify-center w-full h-8 bg-indigo-200"></div>
            <div className="relative flex justify-center w-full h-8 bg-indigo-300"></div>
            <div className="relative flex justify-center w-full h-40 bg-indigo-400"></div>
            <span className="absolute bottom-0 text-xs font-bold">Nov</span>
          </div>
          <div className="relative flex flex-col items-center flex-grow pb-5 group">
            <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
              $75,000
            </span>
            <div className="relative flex justify-center w-full h-12 bg-indigo-200"></div>
            <div className="relative flex justify-center w-full h-8 bg-indigo-300"></div>
            <div className="relative flex justify-center w-full h-40 bg-indigo-400"></div>
            <span className="absolute bottom-0 text-xs font-bold">Dec</span>
          </div>
        </div>
        <div className="flex w-full mt-3">
          <div className="flex items-center ml-auto">
            <span className="block w-4 h-4 bg-indigo-400"></span>
            <span className="ml-1 text-xs font-medium">Existing</span>
          </div>
          <div className="flex items-center ml-4">
            <span className="block w-4 h-4 bg-indigo-300"></span>
            <span className="ml-1 text-xs font-medium">Upgrades</span>
          </div>
          <div className="flex items-center ml-4">
            <span className="block w-4 h-4 bg-indigo-200"></span>
            <span className="ml-1 text-xs font-medium">New</span>
          </div>
        </div>
      </div> */}

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
