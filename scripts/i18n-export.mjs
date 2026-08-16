#!/usr/bin/env node
/**
 * Flattens messages/en.json and messages/th.json into a single CSV that a
 * non-technical translator can edit in Google Sheets / Excel — one row per
 * key, one column per locale. No JSON syntax, no nesting, no ICU escaping
 * to worry about.
 *
 * Usage: node scripts/i18n-export.mjs [output.csv]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.resolve(fileURLToPath(import.meta.url), "../..");
const messagesDir = path.join(rootDir, "messages");
const outPath = path.resolve(process.argv[2] ?? path.join(rootDir, "i18n-translations.csv"));

const LOCALES = ["en", "th"];

function flatten(obj, prefix = "") {
  const rows = [];
  for (const [key, value] of Object.entries(obj)) {
    const flatKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object") {
      rows.push(...flatten(value, flatKey));
    } else {
      rows.push([flatKey, String(value)]);
    }
  }
  return rows;
}

function csvEscape(value) {
  const s = value ?? "";
  if (/[",\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const catalogs = Object.fromEntries(
  LOCALES.map((locale) => [
    locale,
    JSON.parse(readFileSync(path.join(messagesDir, `${locale}.json`), "utf8")),
  ])
);

const flatByLocale = Object.fromEntries(
  LOCALES.map((locale) => [locale, new Map(flatten(catalogs[locale]))])
);

// Key order follows en.json — the source of truth for structure.
const keys = [...flatByLocale.en.keys()];

const header = ["key", ...LOCALES].map(csvEscape).join(",");
const lines = keys.map((key) =>
  [key, ...LOCALES.map((locale) => flatByLocale[locale].get(key) ?? "")]
    .map(csvEscape)
    .join(",")
);

writeFileSync(outPath, ["﻿" + header, ...lines].join("\n") + "\n", "utf8");

console.log(`Exported ${keys.length} keys to ${outPath}`);
console.log(
  "Open this in Google Sheets / Excel, edit the 'en' / 'th' columns only, then re-import with:\n" +
    `  node scripts/i18n-import.mjs ${path.relative(rootDir, outPath)}`
);
