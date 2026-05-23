/**
 * token-check.ts
 *
 * Scans component files for hardcoded visual values that should come from
 * design tokens. Reports violations and exits with code 1 if any found.
 *
 * Checks:
 *   - Hardcoded hex colors (#xxx, #xxxxxx, #xxxxxxxx) outside theme/
 *   - Hardcoded pixel values for spacing outside theme/
 *   - Hardcoded font-family strings outside theme/
 *
 * Usage: npx tsx scripts/token-check.ts
 */

import * as fs from "fs";
import * as path from "path";

const PROJECT_ROOT = path.resolve(__dirname, "..");
const SCAN_DIR = path.join(PROJECT_ROOT, "src", "components");
const THEME_DIR = path.join(PROJECT_ROOT, "src", "theme");

interface Violation {
  file: string;
  line: number;
  column: number;
  value: string;
  rule: string;
}

const HEX_COLOR_RE = /#[0-9a-fA-F]{3,8}\b/g;
const PIXEL_SPACING_RE = /(?:padding|margin|gap|top|bottom|left|right|width|height):\s*\d+px/g;
const FONT_FAMILY_RE = /font-family\s*:\s*['"][^'"]+['"]/g;

function scanFile(filePath: string): Violation[] {
  const violations: Violation[] = [];
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;

    // Skip comments and Next.js Image sizes prop (performance hint, not a style)
    if (line.trim().startsWith("//") || line.trim().startsWith("*") || line.trim().startsWith("/*") || /sizes=/.test(line)) {
      continue;
    }

    // Check hex colors
    const hexMatches = line.matchAll(HEX_COLOR_RE);
    for (const match of hexMatches) {
      violations.push({
        file: filePath,
        line: i + 1,
        column: (match.index ?? 0) + 1,
        value: match[0],
        rule: "hardcoded-hex-color",
      });
    }

    // Check pixel spacing in inline styles
    const pxMatches = line.matchAll(PIXEL_SPACING_RE);
    for (const match of pxMatches) {
      violations.push({
        file: filePath,
        line: i + 1,
        column: (match.index ?? 0) + 1,
        value: match[0],
        rule: "hardcoded-pixel-spacing",
      });
    }

    // Check font-family
    const fontMatches = line.matchAll(FONT_FAMILY_RE);
    for (const match of fontMatches) {
      violations.push({
        file: filePath,
        line: i + 1,
        column: (match.index ?? 0) + 1,
        value: match[0],
        rule: "hardcoded-font-family",
      });
    }
  }

  return violations;
}

function walkDir(dir: string): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function main() {
  console.log("Scanning for hardcoded visual values in components...");

  const files = walkDir(SCAN_DIR);
  const allViolations: Violation[] = [];

  for (const file of files) {
    // Skip files in the theme directory — they are the token derivation layer
    if (file.startsWith(THEME_DIR)) continue;

    const violations = scanFile(file);
    allViolations.push(...violations);
  }

  if (allViolations.length === 0) {
    console.log("No violations found. All visual values use design tokens.");
    process.exit(0);
  }

  console.error(`\nFound ${allViolations.length} token compliance violation(s):\n`);

  for (const v of allViolations) {
    const relPath = path.relative(PROJECT_ROOT, v.file);
    console.error(`  ${relPath}:${v.line}:${v.column} — ${v.rule}: ${v.value}`);
  }

  console.error("\nUse theme tokens instead of hardcoded values.");
  process.exit(1);
}

main();
