import { dirname, join } from "std/path/mod.ts";
import { PmFile, PmFileModel } from "./models.ts";
import { assert } from "superstruct";
import { PackageRange } from "../core/models.ts";
import { parseVersionRange } from "./versionParsing.ts";
import { parseName } from "./nameParsing.ts";

export async function getExplicitPackageRanges(): Promise<PackageRange[]> {
  const pmFiles = await getPmFiles();
  const result: PackageRange[] = [];

  for (const pmFile of pmFiles) {
    if (pmFile.error) {
      console.log(pmFile.path + ": " + pmFile.error);
      continue;
    }

    result.push.apply(
      result,
      pmFile.data?.dependencies?.map((d) => ({
        ...parseName(d[0]),
        versionRange: d[1]
          ? parseVersionRange(d[1])!
          : { from: null, to: null },
      })) || [],
    );
  }

  return result;
}

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
