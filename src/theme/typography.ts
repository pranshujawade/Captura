import { typographyFontSize, typographyFontWeight, typographyLineHeight, typographyLetterSpacing } from "./tokens";
import type { ThemeOptions } from "@mui/material/styles";

/**
 * MUI typography system derived from Captura design tokens.
 *
 * Font family strategy:
 *   - h1–h3 use Cormorant Garamond (heading)
 *   - h4–h6 use Playfair Display (subheading)
 *   - body1, body2, button, caption use Inter (body)
 *   - Custom "display" variant uses Cinzel (display/logo)
 *
 * Font sizes are responsive — larger sizes use clamp() for fluid scaling.
 */

// CSS custom property references for next/font loaded fonts
// These are set in globals.css by the token generation script
const fontHeading = "var(--captura-typography-font-family-heading)";
const fontSubheading = "var(--captura-typography-font-family-subheading)";
const fontBody = "var(--captura-typography-font-family-body)";
const fontDisplay = "var(--captura-typography-font-family-display)";

export const typography: ThemeOptions["typography"] = {
  fontFamily: fontBody,
  fontSize: 16,
  fontWeightLight: typographyFontWeight.light,
  fontWeightRegular: typographyFontWeight.regular,
  fontWeightMedium: typographyFontWeight.medium,
  fontWeightBold: typographyFontWeight.bold,
  h1: {
    fontFamily: fontHeading,
    fontSize: typographyFontSize["5xl"],
    fontWeight: typographyFontWeight.bold,
    lineHeight: typographyLineHeight.tight,
    letterSpacing: typographyLetterSpacing.tight,
  },
  h2: {
    fontFamily: fontHeading,
    fontSize: typographyFontSize["4xl"],
    fontWeight: typographyFontWeight.bold,
    lineHeight: typographyLineHeight.snug,
    letterSpacing: typographyLetterSpacing.tight,
  },
  h3: {
    fontFamily: fontHeading,
    fontSize: typographyFontSize["3xl"],
    fontWeight: typographyFontWeight.semibold,
    lineHeight: typographyLineHeight.snug,
    letterSpacing: typographyLetterSpacing.normal,
  },
  h4: {
    fontFamily: fontSubheading,
    fontSize: typographyFontSize["2xl"],
    fontWeight: typographyFontWeight.semibold,
    lineHeight: typographyLineHeight.snug,
    letterSpacing: typographyLetterSpacing.normal,
  },
  h5: {
    fontFamily: fontSubheading,
    fontSize: typographyFontSize.xl,
    fontWeight: typographyFontWeight.medium,
    lineHeight: typographyLineHeight.normal,
    letterSpacing: typographyLetterSpacing.normal,
  },
  h6: {
    fontFamily: fontSubheading,
    fontSize: typographyFontSize.lg,
    fontWeight: typographyFontWeight.medium,
    lineHeight: typographyLineHeight.normal,
    letterSpacing: typographyLetterSpacing.wide,
  },
  subtitle1: {
    fontFamily: fontSubheading,
    fontSize: typographyFontSize.md,
    fontWeight: typographyFontWeight.medium,
    lineHeight: typographyLineHeight.normal,
    letterSpacing: typographyLetterSpacing.normal,
  },
  subtitle2: {
    fontFamily: fontSubheading,
    fontSize: typographyFontSize.sm,
    fontWeight: typographyFontWeight.medium,
    lineHeight: typographyLineHeight.normal,
    letterSpacing: typographyLetterSpacing.wide,
  },
  body1: {
    fontFamily: fontBody,
    fontSize: typographyFontSize.base,
    fontWeight: typographyFontWeight.regular,
    lineHeight: typographyLineHeight.normal,
    letterSpacing: typographyLetterSpacing.normal,
  },
  body2: {
    fontFamily: fontBody,
    fontSize: typographyFontSize.sm,
    fontWeight: typographyFontWeight.regular,
    lineHeight: typographyLineHeight.normal,
    letterSpacing: typographyLetterSpacing.normal,
  },
  button: {
    fontFamily: fontBody,
    fontSize: typographyFontSize.sm,
    fontWeight: typographyFontWeight.semibold,
    lineHeight: typographyLineHeight.normal,
    letterSpacing: typographyLetterSpacing.wide,
    textTransform: "none" as const,
  },
  caption: {
    fontFamily: fontBody,
    fontSize: typographyFontSize.xs,
    fontWeight: typographyFontWeight.regular,
    lineHeight: typographyLineHeight.loose,
    letterSpacing: typographyLetterSpacing.wide,
  },
  overline: {
    fontFamily: fontDisplay,
    fontSize: typographyFontSize.xs,
    fontWeight: typographyFontWeight.medium,
    lineHeight: typographyLineHeight.loose,
    letterSpacing: typographyLetterSpacing.widest,
    textTransform: "uppercase" as const,
  },
  // Custom display variant for the CAPTURA wordmark
  display: {
    fontFamily: fontDisplay,
    fontSize: typographyFontSize["2xl"],
    fontWeight: typographyFontWeight.medium,
    lineHeight: typographyLineHeight.tight,
    letterSpacing: typographyLetterSpacing.widest,
    textTransform: "uppercase" as const,
  },
};

// Augment MUI typography variant type
declare module "@mui/material/styles" {
  interface TypographyVariants {
    display: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    display?: React.CSSProperties;
  }
}
