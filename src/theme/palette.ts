import {
  color,
  semanticBackground,
  semanticText,
  semanticAction,
  semanticDivider,
} from "./tokens";
import type { ThemeOptions } from "@mui/material/styles";

/**
 * MUI palette derived from Captura design tokens.
 *
 * Mapping strategy:
 *   - semantic.background.page   → palette.background.default
 *   - semantic.background.sectionAlt → palette.background.paper
 *   - semantic.background.surface → palette.background.surface (augmented)
 *   - semantic.text.*            → palette.text.*
 *   - color.gold.*               → palette.gold (via augmentColor)
 *   - semantic.action.*          → mapped to primary/secondary action colors
 */
export const palette: ThemeOptions["palette"] = {
  mode: "dark",
  primary: {
    main: semanticAction.primaryBg,
    light: color.gold["300"],
    dark: semanticAction.primaryBgActive,
    contrastText: semanticAction.primaryText,
  },
  secondary: {
    main: semanticAction.secondaryBorder,
    light: color.gold["200"],
    dark: color.gold["500"],
    contrastText: semanticAction.secondaryText,
  },
  background: {
    default: semanticBackground.page,
    paper: semanticBackground.sectionAlt,
  },
  text: {
    primary: semanticText.primary,
    secondary: semanticText.secondary,
    disabled: semanticText.muted,
    accent: semanticText.accent,
  },
  error: {
    main: "#D32F2F",
    light: "#EF5350",
    dark: "#C62828",
    contrastText: "#FFFFFF",
  },
  divider: semanticDivider.default,
  gold: {
    main: color.gold["400"],
    light: color.gold["300"],
    dark: color.gold["600"],
    contrastText: semanticBackground.page,
    100: color.gold["100"],
    200: color.gold["200"],
    300: color.gold["300"],
    400: color.gold["400"],
    500: color.gold["500"],
    600: color.gold["600"],
  },
};

// Augment MUI palette types to include `gold` and `text.accent`
declare module "@mui/material/styles" {
  interface TypeText {
    accent: string;
  }
  interface Palette {
    gold: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
    };
  }
  interface PaletteOptions {
    gold?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
    };
  }
}
