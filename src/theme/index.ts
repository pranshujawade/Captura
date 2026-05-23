import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";
import { shadows } from "./shadows";
import { components } from "./components";
import { breakpoint } from "./tokens";

/**
 * Captura MUI Theme
 *
 * Single source of truth for the application theme.
 * All visual values are derived from design tokens (docs/tokens.json).
 * Never hardcode colors, spacing, or typography values here.
 */
const theme = createTheme({
  palette,
  typography,
  shadows: shadows as unknown as ThemeOptions["shadows"],
  components,
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: parseInt(breakpoint.sm, 10),
      md: parseInt(breakpoint.md, 10),
      lg: parseInt(breakpoint.lg, 10),
      xl: parseInt(breakpoint.xl, 10),
    },
  },
  shape: {
    borderRadius: 6,
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    duration: {
      shortest: 120,
      shorter: 200,
      short: 300,
      standard: 500,
    },
  },
});

export default theme;
