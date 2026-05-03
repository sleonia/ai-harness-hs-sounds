#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const siteRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(siteRoot, "..");

const src = path.join(repoRoot, "soundpack");
const dest = path.join(siteRoot, "dist", "soundpack");

if (!fs.existsSync(src)) {
  throw new Error(`soundpack source not found: ${src}`);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.cpSync(src, dest, { recursive: true });

console.log(`Copied soundpack to static output: ${dest}`);
