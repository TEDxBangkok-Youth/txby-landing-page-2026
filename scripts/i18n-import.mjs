#!/usr/bin/env node
/**
 * Reads back the CSV produced by i18n-export.mjs and rewrites
 * messages/en.json / messages/th.json from it. Validates before writing
 * anything, so a translator's typo can't silently break the site:
 *
 *   - every key from the JSON source of truth must be present in the CSV
 *     (no accidental row deletions), and vice versa (no stray new keys)
 *   - {placeholders} like {year}/{count} must match the English original
 *     exactly — translators can move them but not drop or rename them
 *   - ICU plural blocks ({count, plural, ...}) must have balanced braces
 *   - no cell may be empty
 *
 * Usage: node scripts/i18n-import.mjs [input.csv]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.resolve(fileURLToPath(import.meta.url), "../..");
const messagesDir = path.join(rootDir, "messages");
const inPath = path.resolve(process.argv[2] ?? path.join(rootDir, "i18n-translations.csv"));

const LOCALES = ["en", "th"];

function parseCsv(text) {
  const clean = text.replace(/^﻿/, "");
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < clean.length; i++) {
    const c = clean[i];
    if (inQuotes) {
      if (c === '"') {
        if (clean[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && clean[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 || r[0] !== "");
}

function unflatten(entries) {
  const root = {};
  for (const [flatKey, value] of entries) {
    const parts = flatKey.split(".");
    let node = root;
    for (let i = 0; i < parts.length - 1; i++) {
      node = node[parts[i]] ??= {};
    }
    node[parts[parts.length - 1]] = value;
  }
  return root;
}

function extractPlaceholders(value) {
  const matches = [...value.matchAll(/\{([a-zA-Z0-9_]+)/g)];
  return new Set(matches.map((m) => m[1]));
}

function bracesBalanced(value) {
  let depth = 0;
  for (const c of value) {
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth < 0) return false;
    }
  }
  return depth === 0;
}

// ── Load CSV ────────────────────────────────────────────────────────
const csvText = readFileSync(inPath, "utf8");
const rows = parseCsv(csvText);
if (rows.length === 0) {
  console.error(`No rows found in ${inPath}`);
  process.exit(1);
}

const [header, ...dataRows] = rows;
const keyCol = header.indexOf("key");
const localeCols = Object.fromEntries(LOCALES.map((l) => [l, header.indexOf(l)]));

if (keyCol === -1 || LOCALES.some((l) => localeCols[l] === -1)) {
  console.error(`CSV header must contain: key, ${LOCALES.join(", ")}. Got: ${header.join(", ")}`);
  process.exit(1);
}

const csvEntries = dataRows
  .filter((r) => r[keyCol]?.trim())
  .map((r) => ({
    key: r[keyCol].trim(),
    values: Object.fromEntries(LOCALES.map((l) => [l, r[localeCols[l]] ?? ""])),
  }));

// ── Load existing catalogs (source of truth for the key set) ──────────
const existingCatalogs = Object.fromEntries(
  LOCALES.map((locale) => [
    locale,
    JSON.parse(readFileSync(path.join(messagesDir, `${locale}.json`), "utf8")),
  ])
);

function flattenKeys(obj, prefix = "") {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const flatKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object") keys.push(...flattenKeys(value, flatKey));
    else keys.push(flatKey);
  }
  return keys;
}

const expectedKeys = new Set(flattenKeys(existingCatalogs.en));
const csvKeys = new Set(csvEntries.map((e) => e.key));

// ── Validate ───────────────────────────────────────────────────────
const errors = [];

for (const key of expectedKeys) {
  if (!csvKeys.has(key)) errors.push(`Missing row for key "${key}" (present in en.json but not in the CSV).`);
}
for (const key of csvKeys) {
  if (!expectedKeys.has(key)) errors.push(`Unknown key "${key}" in CSV (not in en.json — typo, or a row that shouldn't exist).`);
}

function flattenValues(obj, prefix = "") {
  const map = new Map();
  for (const [key, value] of Object.entries(obj)) {
    const flatKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object") {
      for (const [k, v] of flattenValues(value, flatKey)) map.set(k, v);
    } else {
      map.set(flatKey, String(value));
    }
  }
  return map;
}
const originalEn = flattenValues(existingCatalogs.en);

for (const { key, values } of csvEntries) {
  for (const locale of LOCALES) {
    const value = values[locale];
    if (!value || !value.trim()) {
      errors.push(`Empty value for "${key}" (${locale}).`);
      continue;
    }
    if (!bracesBalanced(value)) {
      errors.push(`Unbalanced { } in "${key}" (${locale}): ${value}`);
    }
  }

  const originalValue = originalEn.get(key);
  if (originalValue) {
    // Google Sheets trims leading/trailing whitespace on export, but a
    // handful of keys (e.g. a " All" suffix appended after another word)
    // depend on exactly that whitespace to render correctly.
    const originalHasLeadingSpace = /^\s/.test(originalValue);
    const originalHasTrailingSpace = /\s$/.test(originalValue);
    for (const locale of LOCALES) {
      const value = values[locale] ?? "";
      if (originalHasLeadingSpace && !/^\s/.test(value)) {
        errors.push(`"${key}" (${locale}) lost its leading space — the English original starts with whitespace on purpose (Google Sheets strips this on export; re-add it manually).`);
      }
      if (originalHasTrailingSpace && !/\s$/.test(value)) {
        errors.push(`"${key}" (${locale}) lost its trailing space — the English original ends with whitespace on purpose (Google Sheets strips this on export; re-add it manually).`);
      }
    }

    const expectedPlaceholders = extractPlaceholders(originalValue);
    for (const locale of LOCALES) {
      const gotPlaceholders = extractPlaceholders(values[locale] ?? "");
      for (const p of expectedPlaceholders) {
        if (!gotPlaceholders.has(p)) {
          errors.push(`"${key}" (${locale}) is missing placeholder {${p}} that the original English has.`);
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`Found ${errors.length} problem(s) — nothing was written:\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

// ── Write catalogs ──────────────────────────────────────────────────
for (const locale of LOCALES) {
  const entries = csvEntries.map((e) => [e.key, e.values[locale]]);
  const catalog = unflatten(entries);
  writeFileSync(
    path.join(messagesDir, `${locale}.json`),
    JSON.stringify(catalog, null, 2) + "\n",
    "utf8"
  );
}

console.log(`Imported ${csvEntries.length} keys into messages/{${LOCALES.join(",")}}.json`);
