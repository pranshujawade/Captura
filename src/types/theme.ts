/**
 * Theme and token type definitions.
 */

/** Color scale keys for numeric indices */
export type ColorScaleKey = "0" | "50" | "100" | "150" | "200" | "300" | "400" | "500" | "600";

/** Captura theme extension for MUI */
declare module "@mui/material/styles" {
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
  interface TypographyVariants {
    display: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    display?: React.CSSProperties;
  }
}

// Make the custom variants available on Typography component
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    display: true;
  }
}
