import { Infer, optional, record, string, type } from "superstruct";

export const PmFileModel = type({
  dependencies: optional(record(string(), string())),
});
export type PmFile = Infer<typeof PmFileModel>;
