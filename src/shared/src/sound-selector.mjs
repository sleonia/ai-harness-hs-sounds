import fs from "fs";
import path from "path";

class SoundSelector {
  constructor(basePath) {
    this.basePath = basePath;
    const metaPath = path.join(this.basePath, "meta.json");

    // Validate meta.json exists and is valid
    if (!fs.existsSync(metaPath)) {
      throw new Error(`meta.json not found at ${metaPath}`);
    }

    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
      this.sounds = this.loadSounds(meta);
    } catch (e) {
      throw new Error(`Invalid meta.json: ${e.message}`);
    }

    if (this.sounds.length === 0) {
      throw new Error("No sounds available in meta.json");
    }
  }

  loadSounds(meta) {
    const allSounds = [];
    this.audioToTitle = {};
    for (const pack of Object.values(meta.packs)) {
      for (const card of pack) {
        for (const audio of card.audios) {
          allSounds.push(audio);
          this.audioToTitle[audio] = card.title;
        }
      }
    }
    return allSounds;
  }

  getRandomSound() {
    if (this.sounds.length === 0) return null;
    const index = Math.floor(Math.random() * this.sounds.length);
    const relativePath = this.sounds[index];
    return {
      absolutePath: path.join(this.basePath, relativePath),
      relativePath,
      title: this.audioToTitle[relativePath] ?? null,
    };
  }
}

export default SoundSelector;
