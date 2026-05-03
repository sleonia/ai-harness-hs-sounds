#!/usr/bin/env node

import fs from "node:fs";
import { execSync } from "node:child_process";

const meta = JSON.parse(fs.readFileSync("meta.json", "utf8"));
const trackedSet = new Set(
  execSync("git ls-files -z soundpack", { encoding: "utf8" })
    .split("\u0000")
    .filter(Boolean),
);

let total = 0;
let exact = 0;
const nonExact = [];

for (const entries of Object.values(meta.packs)) {
  for (const entry of entries) {
    for (const p of entry.audios ?? []) {
      total += 1;
      if (trackedSet.has(p)) {
        exact += 1;
      } else {
        nonExact.push(p);
      }
    }
  }
}

if (nonExact.length > 0) {
  console.error(
    `meta-validate-paths: ${nonExact.length}/${total} audio paths are not exact git-tracked paths.`,
  );
  for (const p of nonExact.slice(0, 30)) {
    console.error(` - ${p}`);
  }
  process.exit(1);
}

console.log(`meta-validate-paths: OK (${exact}/${total} exact paths).`);
