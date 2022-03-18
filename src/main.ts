import {} from "superstruct";
import { getExplicitPackageRanges } from "./systems/discovery/mod.ts";

console.log(JSON.stringify(await getExplicitPackageRanges(), null, 2));
