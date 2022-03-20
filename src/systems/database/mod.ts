import { join } from "std/path/mod.ts";
import { DB } from "sqlite/mod.ts";
import { ensureDir } from "std/fs/ensure_dir.ts";
import { ROOT } from "../core/paths.ts";

await ensureDir(ROOT);

const db = new DB(join(ROOT, "db"));
db.query(`
  CREATE TABLE IF NOT EXISTS pmfiles (
    path TEXT UNIQUE
  )
`);

export function getPmFiles() {
  return db.query<[string]>("SELECT path FROM pmfiles")
    .map(([path]) => path);
}

export function upsertPmFiles(data: string[]) {
  for (const path of data) {
    db.query("INSERT OR REPLACE INTO pmfiles (path) VALUES (?)", [path]);
  }
}
