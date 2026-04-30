# Sounds Inlining Optimization Design

**Date:** 2026-05-01
**Status:** Approved

## Goal

Eliminate `meta.json` file I/O and parsing from runtime by inlining the sounds array directly into `index.mjs` at build time.

## Problem

Each `/hs-sounds:test-sounds` command invocation spawns a fresh Node process that:

1. Reads `meta.json` from disk
2. Parses the JSON
3. Transforms the nested structure into a flat array
4. Plays a random sound

This is unnecessary overhead—the file never changes at runtime.

## Solution

Generate `index.mjs` at build time with the sounds array inlined. Runtime has zero disk I/O and zero parsing.

## Architecture

### Components

1. **Generator Script** (`scripts/generate-index.mjs`)
   - Reads `meta.json`
   - Flattens to `sounds[]`
   - Generates `dist/claude/src/index.mjs`

2. **Build Integration**
   - `npm run generate:index` runs the generator
   - Integrated into `build` and `dev` scripts

3. **Generated Output** (`dist/claude/src/index.mjs`)
   - Contains inlined `sounds` array
   - Handler uses array directly
   - No `SoundSelector` needed

### Generated File Structure

```javascript
import AudioPlayer from "./shared/audio-player.mjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.join(__dirname, "..");

const sounds = [
  "soundpack/1 БОБ/VO_DALA_BOSS_99h_Male_Human_AfterTriple_01.wav",
  // ... all sounds
];

async function handler() {
  const index = Math.floor(Math.random() * sounds.length);
  const soundPath = path.join(repoRoot, sounds[index]);
  await AudioPlayer.play(soundPath);
}

void handler();
```

## Implementation Plan

1. Create `scripts/generate-index.mjs`
2. Update `package.json` scripts
3. Update `.gitignore` if needed
4. Remove `src/shared/sound-selector.mjs`
5. Test generation, rebuild, runtime

## Trade-offs

**Benefit:** Fastest possible runtime—zero file I/O, zero parsing

**Cost:** `index.mjs` becomes generated; manual edits overwritten on build. Acceptable for this simple handler.
