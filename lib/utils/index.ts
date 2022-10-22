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
