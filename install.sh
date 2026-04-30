#!/usr/bin/env bash
set -euo pipefail

# Build the plugin and install it as a local marketplace under ~/.claude/.
#
# After this script finishes, register the marketplace inside Claude Code:
#   /plugin marketplace add ~/.claude/hs-sound-pack
#   /plugin install hearthstone-sounds@hs-sound-pack

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALL_DIR="${HOME}/.claude/hs-sound-pack"
PLUGIN_DIR="${INSTALL_DIR}/hearthstone-sounds"

cd "${REPO_DIR}"

echo "==> Building plugin from ${REPO_DIR}"
node scripts/build.mjs claude

echo "==> Installing to ${INSTALL_DIR}"
rm -rf "${INSTALL_DIR}"
mkdir -p "${INSTALL_DIR}/.claude-plugin"
cp -R "${REPO_DIR}/dist/claude" "${PLUGIN_DIR}"

cat > "${INSTALL_DIR}/.claude-plugin/marketplace.json" <<'JSON'
{
  "name": "hs-sound-pack",
  "owner": { "name": "sleonia" },
  "plugins": [
    {
      "name": "hearthstone-sounds",
      "source": "./hearthstone-sounds",
      "description": "Play memorable Hearthstone sounds when Claude Code needs your attention",
      "version": "1.0.0",
      "keywords": ["sounds", "notifications", "audio", "hearthstone"]
    }
  ]
}
JSON

cat <<EOF

Plugin installed at: ${PLUGIN_DIR}

Next steps in Claude Code:
  /plugin marketplace add ${INSTALL_DIR}
  /plugin install hearthstone-sounds@hs-sound-pack
  /reload-plugins

Then run: /hearthstone-sounds:play-sound
EOF
