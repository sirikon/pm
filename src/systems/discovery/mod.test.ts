import { assertEquals } from "std/testing/asserts.ts";
import { getPmFileLookups } from "./mod.ts";

Deno.test("getPmFileLookups works", () => {
  assertEquals(getPmFileLookups("/home/johndoe/code/project"), [
    "/home/johndoe/code/project/pm.json",
    "/home/johndoe/code/pm.json",
    "/home/johndoe/pm.json",
    "/home/pm.json",
    "/pm.json",
  ]);
});
