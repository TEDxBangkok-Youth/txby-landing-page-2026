#!/usr/bin/env bash
# Downloads the translation CSV from Google Sheets and imports it into
# messages/en.json / messages/th.json.
#
# The sheet must be shared as "Anyone with the link" (Viewer is enough) —
# Google's CSV export endpoint requires that even for a read-only pull.
#
# Usage:
#   scripts/i18n-sync.sh                          # uses the default sheet below
#   scripts/i18n-sync.sh <sheet-id-or-url> [gid]   # override the source
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

DEFAULT_SHEET_ID="139mv7C-B8gPYH-NW4IHKdwem4GNIdVjZ9assjTYcdM0"
INPUT="${1:-$DEFAULT_SHEET_ID}"
GID="${2:-}"

# Accept either a bare sheet ID or a full Google Sheets URL.
if [[ "$INPUT" =~ /d/([a-zA-Z0-9_-]+) ]]; then
  SHEET_ID="${BASH_REMATCH[1]}"
else
  SHEET_ID="$INPUT"
fi

# A gid embedded in a pasted URL (#gid=123 or ?gid=123) wins if none was
# passed explicitly as $2.
if [[ -z "$GID" && "$INPUT" =~ gid=([0-9]+) ]]; then
  GID="${BASH_REMATCH[1]}"
fi

EXPORT_URL="https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv"
if [[ -n "$GID" ]]; then
  EXPORT_URL="${EXPORT_URL}&gid=${GID}"
fi

CSV_PATH="i18n-translations.csv"

echo "Downloading translations from Google Sheets..."
echo "  sheet: ${SHEET_ID}${GID:+ (gid=$GID)}"

HTTP_CODE=$(curl -sL -w '%{http_code}' -o "$CSV_PATH" "$EXPORT_URL")

if [[ "$HTTP_CODE" != "200" ]]; then
  rm -f "$CSV_PATH"
  echo "Download failed (HTTP $HTTP_CODE)." >&2
  echo "Make sure the sheet is shared as 'Anyone with the link' (Viewer)." >&2
  exit 1
fi

# Google returns a 200 with an HTML sign-in page for a private/inaccessible
# sheet instead of a real CSV — catch that before it reaches the importer.
if head -c 15 "$CSV_PATH" | grep -qi '<!DOCTYPE\|<html'; then
  rm -f "$CSV_PATH"
  echo "Download returned an HTML page instead of CSV — the sheet is probably not shared publicly." >&2
  echo "Share it as 'Anyone with the link' (Viewer) and try again." >&2
  exit 1
fi

echo "Downloaded $(wc -l < "$CSV_PATH") lines to $CSV_PATH"
echo "Importing into messages/en.json and messages/th.json..."

node scripts/i18n-import.mjs "$CSV_PATH"

echo "Done. Review the diff with: git diff messages/"
