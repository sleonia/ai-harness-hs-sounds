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
    for (const pack of Object.values(meta.packs)) {
      for (const card of pack) {
        allSounds.push(...card.audios);
      }
    }
    return allSounds;
  }

  getRandomSound() {
    if (this.sounds.length === 0) return null;
    const index = Math.floor(Math.random() * this.sounds.length);
    return path.join(this.basePath, this.sounds[index]);
  }
}

export default SoundSelector;
