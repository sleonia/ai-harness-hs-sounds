#!/usr/bin/env node

import fs from "node:fs";
import { execSync } from "node:child_process";

const metaPath = "meta.json";
const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));

const tracked = execSync("git ls-files -z soundpack", { encoding: "utf8" })
  .split("\u0000")
  .filter(Boolean);
const trackedSet = new Set(tracked);

const byFileName = new Map();
for (const file of tracked) {
  const name = file.slice(file.lastIndexOf("/") + 1);
  if (!byFileName.has(name)) byFileName.set(name, []);
  byFileName.get(name).push(file);
}

function pickBestPath(currentPath, candidates) {
  if (candidates.length === 1) return candidates[0];
  const currentParts = currentPath.split("/");
  let best = null;
  let bestScore = -1;

  for (const candidate of candidates) {
    const parts = candidate.split("/");
    let score = 0;
    for (let i = 0; i < Math.min(parts.length, currentParts.length); i += 1) {
      if (parts[i] === currentParts[i]) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = candidate;
    } else if (score === bestScore) {
      best = null;
    }
  }

  if (!best) {
    throw new Error(
      `Ambiguous mapping for ${currentPath}. Candidates: ${candidates.join(", ")}`,
    );
  }
  return best;
}

function resolveTrackedPath(p) {
  if (trackedSet.has(p)) return p;
  const fileName = p.slice(p.lastIndexOf("/") + 1);
  const candidates = byFileName.get(fileName) ?? [];
  if (candidates.length === 0) {
    throw new Error(`No tracked file matches ${p}`);
  }
  return pickBestPath(p, candidates);
}

let rewrites = 0;

for (const entries of Object.values(meta.packs)) {
  for (const entry of entries) {
    if (entry.audios?.length) {
      entry.audios = entry.audios.map((p) => {
        const resolved = resolveTrackedPath(p);
        if (resolved !== p) rewrites += 1;
        return resolved;
      });
    }

    if (entry.fsPath) {
      const existingAudio = entry.audios?.[0];
      if (existingAudio) {
        const resolvedFsPath = existingAudio.slice(0, existingAudio.lastIndexOf("/"));
        if (resolvedFsPath !== entry.fsPath) {
          entry.fsPath = resolvedFsPath;
          rewrites += 1;
        }
      }
    }
  }
}

fs.writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, "utf8");
console.log(`meta-sync-paths: rewrote ${rewrites} path entries.`);
