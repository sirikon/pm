import { PackageVersion, PackageVersionRange } from "../core/models.ts";

export const VERSION_REGEX = /^(?:[0-9]+\.?)+(?<!\.)$/;

export function parseVersionRange(data: string): PackageVersionRange | null {
  const matchedVersion = matchVersionExpression(data);
  if (matchedVersion == null) return null;
  if (matchedVersion.length < 1 || matchedVersion.length > 4) return null;

  const fromVersion = [
    ...matchedVersion,
    ...Array(4 - matchedVersion.length).fill(0),
  ] as PackageVersion;

  const toVersion = [
    ...matchedVersion.slice(0, matchedVersion.length - 1),
    matchedVersion[matchedVersion.length - 1] + 1,
    ...Array(4 - matchedVersion.length).fill(0),
  ] as PackageVersion;

  return {
    from: { version: fromVersion, inclusive: true },
    to: { version: toVersion, inclusive: false },
  };
}

function matchVersionExpression(data: string): number[] | null {
  if (!VERSION_REGEX.test(data)) return null;
  return data.split(".").map((i) => parseInt(i));
}
