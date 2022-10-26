import path from "path";
import getAllFilesRecursively from "./files";
import fs from "fs";
import matter from "gray-matter";

const root = process.cwd();

export function getFiles(type: string) {
  const prefixPaths = path.join(root, "content", type);
  const files = getAllFilesRecursively(prefixPaths);
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file: any) =>
    file.slice(prefixPaths.length + 1).replace(/\\/g, "/")
  );
}

export function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)/, "");
}

export function dateSortDesc(a: any, b: any) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export async function getAllFilesFrontMatter(folder: string) {
  const prefixPaths = path.join(root, "content", folder);

  const files = getAllFilesRecursively(prefixPaths);

  const allFrontMatter: any = [];

  files.forEach((file: any) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/");
    // Remove Unexpected File
    if (path.extname(fileName) !== ".md" && path.extname(fileName) !== ".mdx") {
      return;
    }
    const source = fs.readFileSync(file, "utf8");
    const { data } = matter(source);
    if (data.draft !== true) {
      allFrontMatter.push({ ...data, slug: formatSlug(fileName) });
    }
  });

  return allFrontMatter.sort((a: any, b: any) =>
    dateSortDesc(a.publishedAt, b.publishedAt)
  );
}
