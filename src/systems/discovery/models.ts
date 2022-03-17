import {
  array,
  Infer,
  optional,
  pattern,
  string,
  tuple,
  type,
} from "superstruct";
import { VERSION_REGEX } from "./versionParsing.ts";

export const PmFileModel = type({
  dependencies: optional(
    array(tuple([string(), pattern(string(), VERSION_REGEX)])),
  ),
});
export type PmFile = Infer<typeof PmFileModel>;
