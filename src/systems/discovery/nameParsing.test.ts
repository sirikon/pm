import { assertEquals } from "std/testing/asserts.ts";
import { parseName } from "./nameParsing.ts";

Deno.test("parseVersionRange works", () => {
  verifyName("deno", { name: "deno", variant: "default" });
  verifyName("deno/canary", { name: "deno", variant: "canary" });
});

function verifyName(data: string, expected: ReturnType<typeof parseName>) {
  assertEquals<typeof expected>(parseName(data), expected);
}
