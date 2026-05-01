import SoundSelector from "../../shared/src/sound-selector.mjs";
import AudioPlayer from "../../shared/src/audio-player.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.join(__dirname, "..");

const LOG_FILE = "/tmp/hs-sounds.log";

const selector = new SoundSelector(repoRoot);

function logPlayed({ relativePath, title }) {
  const timestamp = new Date().toISOString();
  const label = title ? `${title}  (${relativePath})` : relativePath;
  const entry = `${timestamp}  ${label}\n`;
  fs.appendFileSync(LOG_FILE, entry, "utf8");
}

async function handler() {
  const sound = selector.getRandomSound();
  if (!sound) {
    throw new Error("No sounds available");
  }

  await AudioPlayer.play(sound.absolutePath);
  logPlayed(sound);
}

void handler();
