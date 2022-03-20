import { getExplicitPackageRanges } from "./systems/discovery/mod.ts";
import { join } from "std/path/mod.ts";
import { ensureDir } from "std/fs/mod.ts";
import { DB } from "sqlite/mod.ts";

const pmRoot = Deno.env.get("PM_ROOT") || "/pm";
await ensureDir(pmRoot);

const db = new DB(join(pmRoot, "db"));
db.query(`
  CREATE TABLE IF NOT EXISTS versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`);

console.log(JSON.stringify(await getExplicitPackageRanges(), null, 2));
