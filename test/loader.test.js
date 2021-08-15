/**
 * @jest-environment node
 */

import compiler from "./compiler.js";
import fs from "fs";
import crypto from "crypto"

function evalSource(source) {
  const path = `${crypto.randomUUID()}.js`;
  fs.writeFileSync(`./test/${path}`, source);
  const result = require(`./${path}`);
  fs.rmSync(`./test/${path}`);
  return result;
}

async function loadIndex(path, options = {}) {
  const stats = await compiler(path, options);
  const source = stats.toJson({ source: true }).modules[0].source.trim();
  return evalSource(source).default;
};

test("empty index", async () => {
  const index = await loadIndex("./fixtures/empty/.index");
  expect(index.length).toBe(0);
});

test("articles index", async () => {
  const index = await loadIndex("./fixtures/articles/.index");
  console.log(index[0])
  expect(index.length).toBe(1);
});
