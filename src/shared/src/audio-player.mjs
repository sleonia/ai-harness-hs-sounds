import { exec } from "child_process";
import fs from "fs";
import util from "util";
const execAsync = util.promisify(exec);

class AudioPlayer {
  static async play(filePath) {
    // Validate file exists before calling afplay
    if (!fs.existsSync(filePath)) {
      throw new Error(`Audio file not found: ${filePath}`);
    }
    await execAsync(`afplay "${filePath}"`);
  }
}

export default AudioPlayer;
