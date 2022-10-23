import { Container, Section } from "components/common";
import { type FC } from "react";
import { Template } from "tinacms/dist/admin/types";

type HeroData = {
  type?: "left" | "center" | string | any;
  tagline?: string | null;
  headline?: string | null;
  text?: string | null;
};

const renderHero = (
  { type, headline, tagline, text }: HeroData,
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
                  className={`max-w-xl mx-auto mt-8 text-base leading-relaxed text-center`}
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
                <img
                  src="https://www.anibalsantosgomez.com/avatar.jpeg"
                  //   className="rounded-full w-20 md:w-32 lg:w-36"
                />
              </div>
            </div>
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
                  className={`mb-4 text-4xl font-bold leading-none tracking-wide md:text-5xl font-serif italic text-primary`}
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
    case "blogPost": {
      return (
        <Container>
          <div className="flex flex-wrap items-center mx-auto 5xl:max-w-7xl">
            <div className="flex flex-col items-start text-left lg:flex-grow lg:w-1/2 lg:pr-24">
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
                  className={`mb-4 text-4xl font-bold leading-none tracking-wide md:text-5xl font-serif italic text-primary`}
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
