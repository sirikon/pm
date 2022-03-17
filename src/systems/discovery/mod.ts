import { dirname, join } from "std/path/mod.ts";
import { exists } from "std/fs/mod.ts";

export async function getPmFiles() {
  return (await Promise.all(
    getPmFileLookups(Deno.cwd()).map((p) =>
      exists(p).then((r) => ({ exists: r, path: p }))
    ),
  )).filter((o) => o.exists).map((o) => o.path);
}

export function getPmFileLookups(workdir: string): string[] {
  const recursion = (dir: string): string[] => {
    const parentDir = dirname(dir);
    if (parentDir === dir) {
      return [];
    }
    return [parentDir, ...recursion(parentDir)];
  };
  return [workdir, ...recursion(workdir)].map((d) => join(d, "pm.json"));
}
