import { copyFile, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const publishDir = "dist/client";

async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? filesIn(path) : path;
    }),
  );

  return files.flat();
}

async function rewriteStaticPaths(file) {
  const text = await readFile(file, "utf8");
  const next = text
    .replaceAll('"/assets/', '"./assets/')
    .replaceAll("'/assets/", "'./assets/")
    .replaceAll('\\"/assets/', '\\"./assets/')
    .replaceAll("\\'/assets/", "\\'./assets/")
    .replaceAll('href="/favicon.svg"', 'href="./favicon.svg"')
    .replaceAll('href="/file.svg"', 'href="./file.svg"')
    .replaceAll('href="/globe.svg"', 'href="./globe.svg"')
    .replaceAll('href="/window.svg"', 'href="./window.svg"')
    .replaceAll('\\"/favicon.svg', '\\"./favicon.svg')
    .replaceAll('\\"/file.svg', '\\"./file.svg')
    .replaceAll('\\"/globe.svg', '\\"./globe.svg')
    .replaceAll('\\"/window.svg', '\\"./window.svg');

  if (next !== text) {
    await writeFile(file, next);
  }
}

await stat(join(publishDir, "index.html"));
await writeFile(join(publishDir, ".nojekyll"), "");
await copyFile(join(publishDir, "index.html"), join(publishDir, "404.html"));

const files = await filesIn(publishDir);
await Promise.all(
  files
    .filter((file) => file.endsWith(".html") || file.endsWith(".rsc") || file.endsWith(".js"))
    .map(rewriteStaticPaths),
);
