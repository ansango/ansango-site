import readingTime from "reading-time";
export const kebabCase = (str: any) =>
  // remove title case
  str &&
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x: any) => x.toLowerCase())
    .join("-");

export const kebabParser = (str?: string) => {
  return (
    str &&
    str
      .replace(/[`~!@#$%^&*()_|+=?;:'",.<>{}[]\\\/]/gi, "")
      .replace(/\s+/g, "-")
      .toLowerCase()
  );
};

export const composeSlug = (slug: string[]) => {
  const lastStringSlug = slug[slug.length - 1];
  const restStringSlug = slug.slice(0, slug.length - 1).join("/");
  return restStringSlug
    ? `${restStringSlug}/${lastStringSlug}`
    : lastStringSlug;
};

export const fetcher = async (
  ...args: Parameters<typeof fetch>
): Promise<any | Error> => {
  return fetch(...args)
    .then()
    .then((response) => {
      if (response.status === 204) {
        return Promise.resolve();
      } else if (!response.ok) {
        return Promise.reject({
          message: response.statusText,
          error: response.status,
        });
      }
      return response.json();
    })
    .catch((error) => Promise.reject(error));
};

export const formatDate = (
  date = new Date(),
  locale = "es-ES",
  options?: Intl.DateTimeFormatOptions
) => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const _options = options || defaultOptions;
  const now = new Date(date).toLocaleDateString(locale, _options);

  return now;
};

export const getReadingTime = (content: any | any[]) => {
  const nodes = Array.isArray(content) ? content : content.children;
  const mapper = nodes.map((child: any) => {
    if (
      child.type === "h1" ||
      child.type === "h2" ||
      child.type === "h3" ||
      child.type === "h4" ||
      child.type === "h5" ||
      child.type === "h6" ||
      child.type === "p" ||
      child.type === "blockquote" ||
      child.type === "a" ||
      child.type === "strong" ||
      child.type === "em" ||
      child.type === "code"
    ) {
      return child.children[0].text;
    } else if (child.type === "ul" || child.type === "ol") {
      return child.children
        .flatMap((item: any) => item.children.map((item: any) => item))
        .flatMap((item: any) => item.children)
        .map((item: any) => item.text)
        .join(" ");
    } else if (child.type === "code_block") {
      return child.value;
    } else {
      return "";
    }
  });
  return readingTime(mapper.join(" ")).text.replace("read", "");
};
