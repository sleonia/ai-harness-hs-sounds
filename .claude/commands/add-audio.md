---
description: Add or bulk-sync audio entries in meta.json from soundpack, then enrich image/card URLs
allowed-tools: Bash
---

# /add-audio

Maintain `meta.json` from local `soundpack/**/*.wav` files.

This command supports:

- single-card upsert
- bulk sync from filesystem
- metadata enrichment (`imageUrl`, `blizzardUrl`)
- validation

## Modes

## 1) Single Card Upsert

Use this when user provides explicit fields.

Required:

- `pack`
- `title`
- `fsPath`
- `audios` (at least one `.wav`)

Optional but preferred:

- `blizzardUrl` (`https://hearthstone.blizzard.com/ru-ru/cards/<id>`)
- `imageUrl`

Example:

```text
/add-audio
pack: Большой турнир
title: Серебряный дозорный
blizzardUrl: https://hearthstone.blizzard.com/ru-ru/cards/2505/
imageUrl: https://d15f34w2p8l1cc.cloudfront.net/hearthstone/02cb33c2a6e6de6d286d966ee595bd9ae9a9c6de273a2ffb94f2be94c0fb4b10.png
fsPath: soundpack/[2015.08.24] Большой турнир/Серебряный дозорный
audios:
- soundpack/[2015.08.24] Большой турнир/Серебряный дозорный/VO_AT_109_PLAY_01.wav
- soundpack/[2015.08.24] Большой турнир/Серебряный дозорный/VO_AT_109_ATTACK_02.wav
```

Run:

```bash
node scripts/add-audio.mts \
  --pack "<pack>" \
  --title "<title>" \
  --blizzard-url "<ru-ru card url>" \
  --image-url "<image url>" \
  --fs-path "<repo-relative directory>" \
  --audio "<repo-relative wav #1>" \
  --audio "<repo-relative wav #2>"
```

Rules:

- validate every audio path exists and ends with `.wav`
- keep all paths repository-relative
- merge by `title` or `fsPath`
- dedupe `audios`

## 2) Bulk Sync From soundpack

Use this when user asks to add all files from `soundpack/`.

Workflow:

1. Read all `soundpack/**/*.wav`.
2. Group by entry path:
   - default card path: `soundpack/<topDir>/<cardDir>`
   - special case direct files under pack root: `soundpack/<topDir>/<file.wav>` -> entry `fsPath = soundpack/<topDir>`
3. Map `topDir` to display pack name:
   - if already known in `meta.json`, reuse that pack key
   - else strip date prefix from `[yyyy.mm.dd] Name` -> `Name`
4. Upsert entries:
   - preserve existing `title`, `blizzardUrl`, `imageUrl` when present
   - create missing entries with empty `blizzardUrl`/`imageUrl`
5. Ensure every local `.wav` is referenced exactly once in `meta.json` entries.

## 3) Enrich imageUrl Automatically

If `imageUrl` is missing:

1. Derive card ID from first audio filename (without `.wav`) using patterns like:
   - `VO_GVG_084_Play_01` -> `GVG_084`
   - `SFX_GVG_064_EnterPlay` -> `GVG_064`
   - `VO_NAX15_01_RESPOND...` -> `NAX15_01`
   - `VO_BG21_017_...` -> `BG21_017`
2. Build image URL:
   - `https://art.hearthstonejson.com/v1/render/latest/ruRU/512x/<CARD_ID>.png`
3. Validate URL returns HTTP `200` before saving.

## 4) Enrich blizzardUrl Automatically

If `blizzardUrl` is missing:

1. Derive `<CARD_ID>` from audio (same logic as above).
2. Fetch `https://api.hearthstonejson.com/v1/latest/ruRU/cards.json`.
3. Find card by `id === <CARD_ID>`, get `dbfId`.
4. Set:
   - `blizzardUrl = https://hearthstone.blizzard.com/ru-ru/cards/<dbfId>`
5. Validate URL is reachable (`200` or redirect to valid card page).
6. If unresolved, keep blank and report title + card ID for manual fix.

## 5) Required Validation Before Finish

Run all checks:

- coverage:
  - all `soundpack/**/*.wav` exist in `meta.json` audio refs
  - all `meta.json` audio refs exist on disk
- schema:
  - root object with top-level `packs`
  - each card has `title`, `blizzardUrl`, `imageUrl`, `fsPath`, `audios[]`
- urls:
  - all non-empty `imageUrl` and `blizzardUrl` pass HTTP check

If any check fails, do not finalize; fix and re-run.

## Constraints

- Keep all paths repository-relative.
- Do not rename files or directories.
- Do not modify `soundpack/` while syncing metadata.
- Regenerate `site/index.html` only when user asks.
- Keep `meta.json` as an object with top-level `packs`.
