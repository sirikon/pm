import { dirname, join } from "std/path/mod.ts";
import { PmFile, PmFileModel } from "./models.ts";
import { assert } from "superstruct";

// export async function getExplicitPackages() {
//   const pmFiles = await getPmFiles();
// }

export async function getPmFiles() {
  const pmFileLookups = getPmFileLookups(Deno.cwd());

  const result: (
    | { path: string; data: PmFile; error: null }
    | { path: string; data: null; error: string }
  )[] = [];

  for (const lookup of pmFileLookups) {
    let fileContent = null;
    try {
      fileContent = await Deno.readTextFile(lookup);
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) continue;
      result.push({
        path: lookup,
        data: null,
        error: (err as { message?: string })?.message || "Unknown error",
      });
      continue;
    }

    let jsonContent = null;
    try {
      jsonContent = JSON.parse(fileContent);
    } catch (err) {
      result.push({
        path: lookup,
        data: null,
        error: (err as { message?: string })?.message || "Unknown error",
      });
      continue;
    }

    try {
      assert(jsonContent, PmFileModel);
      result.push({ path: lookup, data: jsonContent, error: null });
    } catch (err) {
      result.push({
        path: lookup,
        data: null,
        error: (err as { message?: string })?.message || "Unknown error",
      });
    }
  }

  return result;
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
