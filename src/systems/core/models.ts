export type Package = {
  name: string;
  version: PackageVersion;
};
export type PackageVersion = [number, number, number, number];
