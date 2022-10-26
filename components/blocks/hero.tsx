import { Container, Section } from "components/common";
import { formatDate } from "lib/utils";
import { type FC } from "react";
import { ReadTimeResults } from "reading-time";
import { Template } from "tinacms/dist/admin/types";

type HeroData = {
  type?: "left" | "center" | string | any;
  tagline?: string | null;
  headline?: string | null;
  text?: string | null;
  category?: string | null;
  tags?: (string[] | null)[] | null;
  publishedAt?: string | null;
  readingTime: ReadTimeResults["text"];
  views?: number;
};

const renderHero = (
  {
    type,
    headline,
    tagline,
    text,
    readingTime,
    publishedAt,
    category,
    tags,
    views,
  }: HeroData,
  parentField: string
) => {
  switch (type) {
    case "left": {
      return (
        <Container>
          <div className="flex flex-wrap items-center mx-auto 5xl:max-w-7xl">
            <div className="flex flex-col items-start mb-16 text-left lg:flex-grow lg:w-1/2 lg:pr-24 md:mb-0">
              {tagline && (
                <span
                  className={`mb-4 text-xs font-bold tracking-widest uppercase`}
                  data-tinafield={`${parentField}.tagline`}
                >
                  {tagline}
                </span>
              )}
              {headline && (
                <h1
                  className={`mb-4 text-4xl font-bold leading-none tracking-tighter font-serif italic`}
                  data-tinafield={`${parentField}.headline`}
                >
                  {headline}
                </h1>
              )}
              {text && (
                <p
                  className={`mb-8 text-base leading-relaxed text-left max-w-4xl`}
                  data-tinafield={`${parentField}.text`}
                >
                  {text}
                </p>
              )}
            </div>
          </div>
        </Container>
      );
    }
    case "center": {
      return (
        <Container>
          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
            <div className="flex flex-col w-full mb-12 text-center">
              {headline && (
                <h1
                  className={`mb-4 text-4xl font-bold leading-none tracking-tighter`}
                  data-tinafield={`${parentField}.headline`}
                >
                  {headline}
                </h1>
              )}
              {text && (
                <p
                  className={`max-w-xl mx-auto mt-8 text-base leading-relaxed text-center prose leading-6`}
                  data-tinafield={`${parentField}.text`}
                >
                  {text}
                </p>
              )}
            </div>
          </div>
        </Container>
      );
    }
    case "avatar": {
      return (
        <Container>
          <div className="flex flex-col lg:flex-row-reverse lg:items-center mx-auto 5xl:max-w-7xl gap-10">
            <div className="avatar">
              <div className="w-24 md:w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://www.anibalsantosgomez.com/avatar.jpeg" />
              </div>
            </div>
            <div className="flex flex-col items-start mb-0 text-left lg:flex-grow lg:w-1/2 lg:pr-24">
              {tagline && (
                <span
                  className={`mb-4 text-xs font-bold tracking-widest uppercase`}
                  data-tinafield={`${parentField}.tagline`}
                >
                  {tagline}
                </span>
              )}
              {headline && (
                <h1
                  className={`mb-4 text-4xl font-bold leading-none tracking-wide md:text-8xl font-serif text-primary`}
                  data-tinafield={`${parentField}.headline`}
                >
                  {headline}
                </h1>
              )}
              {text && (
                <p
                  className={`mb-8 text-base text-left max-w-4xl prose leading-6`}
                  data-tinafield={`${parentField}.text`}
                >
                  {text}
                </p>
              )}
            </div>
          </div>
        </Container>
      );
    }
    case "blogPost": {
      return (
        <Container className="space-y-20 pb-0 md:pb-0 lg:pb-0">
          <div className="flex flex-wrap items-center mx-auto 5xl:max-w-7xl">
            <div className="flex flex-col items-start text-left lg:flex-grow">
              {tagline && (
                <span
                  className={`mb-8 text-xs font-bold tracking-widest uppercase`}
                  data-tinafield={`${parentField}.tagline`}
                >
                  {tagline}
                </span>
              )}
              {headline && (
                <h1
                  className={`mb-4 text-4xl font-bold leading-none tracking-wide md:text-6xl lg:text-7xl font-serif text-primary`}
                  data-tinafield={`${parentField}.headline`}
                >
                  {headline}
                </h1>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full md:flex-row-reverse space-y-5 md:space-y-0">
            <div className="grid flex-grow card rounded-none place-items-start">
              <div className="text-sm space-y-2">
                <p className="flex items-center space-x-2">
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      />
                    </svg>
                    {publishedAt && formatDate(publishedAt)}
                  </span>
                  <span>/</span>
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-1"
                    >
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
                    </svg>
                    {views}
                  </span>
                </p>
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {readingTime}
                </p>
                <div className="badge badge-accent badge-sm mr-1.5 mb-1.5">
                  {category}
                </div>
                {tags
                  ?.filter((tag, i) => tag !== category)
                  .map((tag, i) => (
                    <div
                      key={`tag-${i}`}
                      className="badge badge-outline badge-sm  mr-1.5 mb-1.5"
                    >
                      {tag}
                    </div>
                  ))}
              </div>
            </div>
            <div className="hidden divider md:flex md:divider-horizontal"></div>{" "}
            <div className="grid flex-grow card rounded-none place-items-start md:w-6/12">
              <p className="prose">{text}</p>
            </div>
          </div>
        </Container>
      );
    }
    default: {
      return null;
    }
  }
};

export const Hero: FC<{
  data?: HeroData;
  parentField?: string;
}> = ({ data, parentField = "" }) => {
  if (!data) {
    return null;
  }
  return <Section>{renderHero(data, parentField)}</Section>;
};

export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero",
  fields: [
    {
      name: "tagline",
      label: "Tagline",
      type: "string",
    },
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      type: "string",
      label: "Text",
      name: "text",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      label: "Type",
      name: "type",
      options: ["left", "center", "avatar"],
    },
  ],
};
