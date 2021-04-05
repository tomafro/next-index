/**
 * @jest-environment node
 */

import compiler from "./compiler.js";
import fs from "fs";

async function compile(path, options = {}) {
  const stats = await compiler(path, options);
  const source = stats.toJson({ source: true }).modules[0].source.trim();
  fs.writeFileSync("./test/compile.js", source);
  return require("./compile.js").default;
};

test("empty index", async () => {
  const index = await compile("./fixtures/empty/.index");
  expect(index.length).toBe(0);
});
