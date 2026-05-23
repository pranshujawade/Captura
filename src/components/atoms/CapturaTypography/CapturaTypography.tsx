"use client";

import Typography, { type TypographyProps } from "@mui/material/Typography";
import { useTheme, type Theme } from "@mui/material/styles";
import type { SxProps } from "@mui/material/styles";

export interface CapturaTypographyProps extends Omit<TypographyProps, "variant" | "color"> {
  /** Visual variant — maps to MUI typography variants with Captura font families */
  variant?:
    | "heading"
    | "subheading"
    | "body"
    | "body2"
    | "caption"
    | "overline"
    | "display";
  /** Heading level (1-6). Only applies when variant is "heading" or "subheading". */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Color — uses Captura semantic text colors */
  color?: "primary" | "secondary" | "accent" | "muted" | "onGold";
}

const variantToMui: Record<string, TypographyProps["variant"]> = {
  heading: "h3",
  subheading: "h5",
  body: "body1",
  body2: "body2",
  caption: "caption",
  overline: "overline",
  display: "display",
};

const headingLevelToMui: Record<number, TypographyProps["variant"]> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

/** Colors that MUI Typography's color prop handles natively */
const muiColorMap: Partial<Record<string, TypographyProps["color"]>> = {
  primary: "textPrimary",
  secondary: "textSecondary",
  muted: "textDisabled",
};

/** Colors that need sx-based overrides (not in standard MUI palette channels) */
const sxColorMap: Record<string, (theme: Theme) => string> = {
  accent: (theme) => theme.palette.text.accent,
  onGold: (theme) => theme.palette.gold.contrastText,
};

/**
 * CapturaTypography — branded typography atom using Captura font families.
 *
 * Variants:
 * - `heading`: Cormorant Garamond serif (h1–h3)
 * - `subheading`: Playfair Display serif (h4–h6)
 * - `body`/`body2`: Inter sans-serif
 * - `caption`: Small Inter text
 * - `overline`: Cinzel uppercase display (e.g. "CAPTURA")
 * - `display`: Cinzel large display wordmark
 */
export default function CapturaTypography({
  variant = "body",
  headingLevel,
  color = "primary",
  sx,
  ...rest
}: CapturaTypographyProps) {
  const theme = useTheme();

  let muiVariant = variantToMui[variant] ?? "body1";
  if ((variant === "heading" || variant === "subheading") && headingLevel) {
    muiVariant = headingLevelToMui[headingLevel] ?? muiVariant;
  }

  const defaultComponent =
    variant === "heading" || variant === "subheading"
      ? `h${headingLevel ?? (variant === "heading" ? 3 : 5)}`
      : undefined;

  const muiColor = muiColorMap[color];
  const sxColorFn = sxColorMap[color];

  const mergedSx: SxProps<typeof theme> = [
    ...(Array.isArray(sx) ? sx : [sx]),
    ...(sxColorFn ? [{ color: sxColorFn(theme) }] : []),
  ];

  return (
    <Typography
      variant={muiVariant}
      component={rest.component ?? defaultComponent}
      color={muiColor}
      sx={mergedSx}
      {...rest}
    />
  );
}
