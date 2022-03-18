import { assertEquals } from "std/testing/asserts.ts";
import { parseVersionRange } from "./versionParsing.ts";

Deno.test("parseVersionRange works", () => {
  verifyVersionRange("potato", null);
  verifyVersionRange("", null);
  verifyVersionRange("1.2.3.4.5", null);
  verifyVersionRange("1.2.3.4.", null);
  verifyVersionRange("1.2.3.4", {
    from: { version: [1, 2, 3, 4], inclusive: true },
    to: { version: [1, 2, 3, 5], inclusive: false },
  });
  verifyVersionRange("1.2", {
    from: { version: [1, 2, 0, 0], inclusive: true },
    to: { version: [1, 3, 0, 0], inclusive: false },
  });
  verifyVersionRange("1", {
    from: { version: [1, 0, 0, 0], inclusive: true },
    to: { version: [2, 0, 0, 0], inclusive: false },
  });
});

function verifyVersionRange(
  data: string,
  expected: ReturnType<typeof parseVersionRange>,
) {
  assertEquals<typeof expected>(parseVersionRange(data), expected);
}
