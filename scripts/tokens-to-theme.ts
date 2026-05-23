/**
 * tokens-to-theme.ts
 *
 * Build script that reads W3C DTCG design tokens from docs/tokens.json
 * and generates:
 *   1. src/theme/tokens.ts — TypeScript primitive + semantic token exports
 *   2. CSS custom properties appended to src/app/globals.css
 *
 * Usage: npx tsx scripts/tokens-to-theme.ts
 *
 * This script is the ONLY way tokens.json values reach the application.
 * Never hand-edit the generated files.
 */

import * as fs from "fs";
import * as path from "path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DtcgToken {
  $value: string | number;
  $type: string;
  $description?: string;
}

interface DtcgGroup {
  [key: string]: DtcgToken | DtcgGroup | string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isDtcgToken(obj: unknown): obj is DtcgToken {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "$value" in obj &&
    "$type" in obj
  );
}

function isDtcgGroup(obj: unknown): obj is DtcgGroup {
  return typeof obj === "object" && obj !== null && !isDtcgToken(obj);
}

/** Flatten a DTCG tree into dot-path → token pairs, skipping $-prefixed keys */
function flattenTokens(
  obj: DtcgGroup,
  prefix = ""
): Array<{ path: string; token: DtcgToken }> {
  const result: Array<{ path: string; token: DtcgToken }> = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (isDtcgToken(value)) {
      result.push({ path: fullPath, token: value });
    } else if (isDtcgGroup(value)) {
      result.push(...flattenTokens(value, fullPath));
    }
  }
  return result;
}

/** Resolve {color.gold.400} references in token values */
function resolveReferences(
  tokens: Map<string, DtcgToken>,
  value: string
): string {
  return value.replace(/\{([^}]+)\}/g, (_match, ref: string) => {
    const refToken = tokens.get(ref);
    if (refToken) {
      return String(refToken.$value);
    }
    return `{${ref}}`;
  });
}

/** Convert a hyphenated string to camelCase */
function toCamelCase(str: string): string {
  return str
    .split("-")
    .map((part, i) =>
      i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join("");
}

/** Convert a full dot-path like "color.black.50" to a camelCase JS key */
function pathToJsKey(pathStr: string): string {
  return pathStr
    .split(".")
    .map((segment) => toCamelCase(segment))
    .map((segment, i) =>
      i === 0 ? segment : segment.charAt(0).toUpperCase() + segment.slice(1)
    )
    .join("");
}

/** Quote a JS object key if it's not a valid identifier */
function safeKey(key: string): string {
  if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)) {
    return key;
  }
  return `"${key}"`;
}

/** Convert a dot-path to a CSS custom property name */
function pathToCssVar(pathStr: string): string {
  return `--captura-${pathStr.replace(/\./g, "-")}`;
}

// ---------------------------------------------------------------------------
// TypeScript file generation helpers
// ---------------------------------------------------------------------------

interface TokenEntry {
  jsKey: string;
  value: string;
  description?: string;
}

function emitObject(name: string, entries: TokenEntry[]): string[] {
  const lines: string[] = [];
  lines.push(`export const ${safeKey(name)} = {`);
  for (const entry of entries) {
    const comment = entry.description ? ` // ${entry.description}` : "";
    lines.push(`  ${safeKey(entry.jsKey)}: "${entry.value}",${comment}`);
  }
  lines.push("} as const;");
  lines.push("");
  return lines;
}

function emitNumericObject(name: string, entries: TokenEntry[]): string[] {
  const lines: string[] = [];
  lines.push(`export const ${safeKey(name)} = {`);
  for (const entry of entries) {
    const comment = entry.description ? ` // ${entry.description}` : "";
    lines.push(`  ${safeKey(entry.jsKey)}: ${entry.value},${comment}`);
  }
  lines.push("} as const;");
  lines.push("");
  return lines;
}

/** Convert dot-hyphen path tail segments to a valid camelCase JS key */
function tailKey(parts: string[]): string {
  return parts
    .map((s) => toCamelCase(s))
    .map((s, i) =>
      i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)
    )
    .join("");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const projectRoot = path.resolve(__dirname, "..");
  const tokensPath = path.join(projectRoot, "docs", "tokens.json");
  const outputTsPath = path.join(projectRoot, "src", "theme", "tokens.ts");
  const globalsCssPath = path.join(projectRoot, "src", "app", "globals.css");

  // 1. Read tokens.json
  console.log("Reading tokens from:", tokensPath);
  const raw = fs.readFileSync(tokensPath, "utf-8");
  const tokensJson: DtcgGroup = JSON.parse(raw);

  // 2. Flatten into path → token map
  const flatTokens = flattenTokens(tokensJson);
  const tokenMap = new Map<string, DtcgToken>();
  for (const { path: p, token } of flatTokens) {
    tokenMap.set(p, token);
  }

  // 3. Resolve references
  const resolvedTokens = new Map<
    string,
    { value: string; type: string; description?: string }
  >();
  const unresolved: string[] = [];

  for (const [p, token] of tokenMap) {
    const rawValue = String(token.$value);
    const resolved = resolveReferences(tokenMap, rawValue);
    if (resolved.includes("{") && resolved.includes("}")) {
      unresolved.push(`  ${p}: ${rawValue}`);
    }
    resolvedTokens.set(p, {
      value: resolved,
      type: token.$type,
      description: token.$description,
    });
  }

  if (unresolved.length > 0) {
    console.error("ERROR: Unresolved token references found:");
    unresolved.forEach((u) => console.error(u));
    process.exit(1);
  }

  console.log(`Resolved ${resolvedTokens.size} tokens successfully.`);

  // 4. Group tokens by top-level category
  const categories = new Map<
    string,
    Map<string, { value: string; type: string; description?: string }>
  >();
  for (const [p, data] of resolvedTokens) {
    const parts = p.split(".");
    const category = parts[0];
    if (!category) continue;
    if (!categories.has(category)) {
      categories.set(category, new Map());
    }
    categories.get(category)!.set(p, data);
  }

  // 5. Generate TypeScript
  const lines: string[] = [
    "/**",
    " * Auto-generated from docs/tokens.json by scripts/tokens-to-theme.ts",
    " * DO NOT EDIT MANUALLY — changes will be overwritten on next build.",
    " */",
    "",
  ];

  // -- Color primitives --
  const colorTokens = categories.get("color");
  if (colorTokens) {
    lines.push("// ── Color Primitives ──────────────────────────────────────────────");

    const colorSubs = new Map<string, TokenEntry[]>();
    for (const [p, data] of colorTokens) {
      const parts = p.split(".");
      const sub = toCamelCase(parts[1]!);
      if (!colorSubs.has(sub)) colorSubs.set(sub, []);
      const jsKey = tailKey(parts.slice(2));
      colorSubs.get(sub)!.push({
        jsKey: jsKey || "main",
        value: data.value,
        description: data.description,
      });
    }

    lines.push("export const color = {");
    for (const [sub, entries] of colorSubs) {
      lines.push(`  ${safeKey(sub)}: {`);
      for (const entry of entries) {
        const comment = entry.description ? ` // ${entry.description}` : "";
        lines.push(`    ${safeKey(entry.jsKey)}: "${entry.value}",${comment}`);
      }
      lines.push("  },");
    }
    lines.push("} as const;");
    lines.push("");
  }

  // -- Gradients --
  const gradientTokens = categories.get("gradient");
  if (gradientTokens) {
    lines.push("// ── Gradients ────────────────────────────────────────────────────");
    const entries: TokenEntry[] = [];
    for (const [p, data] of gradientTokens) {
      entries.push({
        jsKey: pathToJsKey(p.replace("gradient.", "")),
        value: data.value,
        description: data.description,
      });
    }
    lines.push(...emitObject("gradient", entries));
  }

  // -- Typography sub-groups --
  const typoTokens = categories.get("typography");
  if (typoTokens) {
    lines.push("// ── Typography ────────────────────────────────────────────────────");
    const typoSubs = new Map<string, TokenEntry[]>();
    for (const [p, data] of typoTokens) {
      const parts = p.split(".");
      const sub = toCamelCase(parts[1]!);
      if (!typoSubs.has(sub)) typoSubs.set(sub, []);
      const jsKey = tailKey(parts.slice(2));
      typoSubs.get(sub)!.push({ jsKey, value: data.value, description: data.description });
    }

    for (const [sub, entries] of typoSubs) {
      const exportName = `typography${sub.charAt(0).toUpperCase() + sub.slice(1)}`;
      lines.push(...emitObject(exportName, entries));
    }
  }

  // -- Spacing --
  const spacingTokens = categories.get("spacing");
  if (spacingTokens) {
    lines.push("// ── Spacing ──────────────────────────────────────────────────────");
    const entries: TokenEntry[] = [];
    for (const [p, data] of spacingTokens) {
      entries.push({
        jsKey: p.split(".")[1]!,
        value: data.value,
        description: data.description,
      });
    }
    lines.push(...emitObject("spacing", entries));
  }

  // -- Border Radius --
  const radiusTokens = categories.get("border-radius");
  if (radiusTokens) {
    lines.push("// ── Border Radius ────────────────────────────────────────────────");
    const entries: TokenEntry[] = [];
    for (const [p, data] of radiusTokens) {
      entries.push({
        jsKey: toCamelCase(p.split(".")[1]!),
        value: data.value,
        description: data.description,
      });
    }
    lines.push(...emitObject("borderRadius", entries));
  }

  // -- Border sub-groups --
  const borderTokens = categories.get("border");
  if (borderTokens) {
    lines.push("// ── Border ──────────────────────────────────────────────────────");
    const borderSubs = new Map<string, TokenEntry[]>();
    for (const [p, data] of borderTokens) {
      const parts = p.split(".");
      const sub = toCamelCase(parts[1]!);
      if (!borderSubs.has(sub)) borderSubs.set(sub, []);
      const jsKey = tailKey(parts.slice(2));
      borderSubs.get(sub)!.push({
        jsKey: jsKey || "default",
        value: data.value,
        description: data.description,
      });
    }
    for (const [sub, entries] of borderSubs) {
      const exportName = `border${sub.charAt(0).toUpperCase() + sub.slice(1)}`;
      lines.push(...emitObject(exportName, entries));
    }
  }

  // -- Shadows --
  const shadowTokens = categories.get("shadow");
  if (shadowTokens) {
    lines.push("// ── Shadows ─────────────────────────────────────────────────────");
    const entries: TokenEntry[] = [];
    for (const [p, data] of shadowTokens) {
      entries.push({
        jsKey: pathToJsKey(p.replace("shadow.", "")),
        value: data.value,
        description: data.description,
      });
    }
    lines.push(...emitObject("shadow", entries));
  }

  // -- Motion sub-groups --
  const motionTokens = categories.get("motion");
  if (motionTokens) {
    lines.push("// ── Motion ──────────────────────────────────────────────────────");
    const motionSubs = new Map<string, TokenEntry[]>();
    for (const [p, data] of motionTokens) {
      const parts = p.split(".");
      const sub = toCamelCase(parts[1]!);
      if (!motionSubs.has(sub)) motionSubs.set(sub, []);
      const jsKey = tailKey(parts.slice(2));
      motionSubs.get(sub)!.push({ jsKey, value: data.value, description: data.description });
    }
    for (const [sub, entries] of motionSubs) {
      const exportName = `motion${sub.charAt(0).toUpperCase() + sub.slice(1)}`;
      lines.push(...emitObject(exportName, entries));
    }
  }

  // -- Opacity (numeric values) --
  const opacityTokens = categories.get("opacity");
  if (opacityTokens) {
    lines.push("// ── Opacity ─────────────────────────────────────────────────────");
    const entries: TokenEntry[] = [];
    for (const [p, data] of opacityTokens) {
      entries.push({
        jsKey: toCamelCase(p.split(".")[1]!),
        value: data.value,
        description: data.description,
      });
    }
    lines.push(...emitNumericObject("opacity", entries));
  }

  // -- Z-Index (numeric values) --
  const zTokens = categories.get("z-index");
  if (zTokens) {
    lines.push("// ── Z-Index ─────────────────────────────────────────────────────");
    const entries: TokenEntry[] = [];
    for (const [p, data] of zTokens) {
      entries.push({
        jsKey: toCamelCase(p.split(".")[1]!),
        value: data.value,
        description: data.description,
      });
    }
    lines.push(...emitNumericObject("zIndex", entries));
  }

  // -- Breakpoints --
  const bpTokens = categories.get("breakpoint");
  if (bpTokens) {
    lines.push("// ── Breakpoints ──────────────────────────────────────────────────");
    const entries: TokenEntry[] = [];
    for (const [p, data] of bpTokens) {
      entries.push({
        jsKey: toCamelCase(p.split(".")[1]!),
        value: data.value,
        description: data.description,
      });
    }
    lines.push(...emitObject("breakpoint", entries));
  }

  // -- Semantic tokens sub-groups --
  const semanticTokens = categories.get("semantic");
  if (semanticTokens) {
    lines.push("// ── Semantic Tokens ─────────────────────────────────────────────");
    const semSubs = new Map<string, TokenEntry[]>();
    for (const [p, data] of semanticTokens) {
      const parts = p.split(".");
      const sub = toCamelCase(parts[1]!);
      if (!semSubs.has(sub)) semSubs.set(sub, []);
      const jsKey = tailKey(parts.slice(2));
      semSubs.get(sub)!.push({
        jsKey: jsKey || "default",
        value: data.value,
        description: data.description,
      });
    }
    for (const [sub, entries] of semSubs) {
      const exportName = `semantic${sub.charAt(0).toUpperCase() + sub.slice(1)}`;
      lines.push(...emitObject(exportName, entries));
    }
  }

  // Token version
  const metadata = tokensJson.$metadata as Record<string, string> | undefined;
  const version = metadata?.version ?? "0.0.0";
  lines.push(`export const TOKEN_VERSION = "${version}";`);

  // Write tokens.ts
  console.log("Writing:", outputTsPath);
  fs.writeFileSync(outputTsPath, lines.join("\n") + "\n");

  // 6. Generate CSS custom properties
  const cssLines: string[] = [
    "/*",
    " * Auto-generated CSS custom properties from docs/tokens.json",
    " * DO NOT EDIT MANUALLY — changes will be overwritten on next build.",
    " */",
    "",
    ":root {",
  ];

  for (const [p, data] of resolvedTokens) {
    const shouldEmit =
      p.startsWith("gradient.") ||
      p.startsWith("color.overlay.") ||
      p.startsWith("motion.") ||
      p.startsWith("shadow.") ||
      p.startsWith("z-index.") ||
      p.startsWith("typography.font-family.") ||
      p.startsWith("semantic.focus-ring.");

    if (!shouldEmit) continue;

    const varName = pathToCssVar(p);
    cssLines.push(`  ${varName}: ${data.value};`);
  }

  cssLines.push("}");

  // Write globals.css (replace old generated block)
  console.log("Writing CSS custom properties to:", globalsCssPath);
  let existingCss = fs.existsSync(globalsCssPath)
    ? fs.readFileSync(globalsCssPath, "utf-8")
    : "";

  const marker = "/*\n * Auto-generated CSS custom properties";
  const markerIdx = existingCss.indexOf(marker);
  if (markerIdx !== -1) {
    existingCss = existingCss.slice(0, markerIdx).trimEnd();
  }

  const finalCss = existingCss + "\n\n" + cssLines.join("\n") + "\n";
  fs.writeFileSync(globalsCssPath, finalCss);

  console.log("Token generation complete.");
}

main();
