type PackageBase = {
  name: string;
  variant: string;
};
export type Package = PackageBase & {
  version: PackageVersion;
};
export type PackageVersion = [number, number, number, number];

export type PackageRange = PackageBase & {
  versionRange: PackageVersionRange;
};
export type PackageVersionRange = {
  from: {
    version: PackageVersion;
    inclusive: boolean;
  } | null;
  to: {
    version: PackageVersion;
    inclusive: boolean;
  } | null;
};
