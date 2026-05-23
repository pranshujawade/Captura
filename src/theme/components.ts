import { semanticAction, semanticFocusRing, semanticText, semanticBackground, semanticNav, color } from "./tokens";
import type { ThemeOptions } from "@mui/material/styles";

/**
 * MUI component-level theme overrides.
 *
 * These overrides transform MUI's default Material Design appearance
 * into the Captura dark/gold premium aesthetic.
 */
export const components: ThemeOptions["components"] = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: semanticBackground.page,
        color: semanticText.primary,
        "& *:focus-visible": {
          outline: `${semanticFocusRing.width} solid ${semanticFocusRing.color}`,
          outlineOffset: semanticFocusRing.offset,
        },
      },
      a: {
        color: semanticText.accent,
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: "24px",
        textTransform: "none",
        fontWeight: 600,
        padding: "8px 20px",
        fontSize: "0.875rem",
        transition: `all 200ms cubic-bezier(0.4, 0, 0.2, 1)`,
      },
      containedPrimary: {
        backgroundColor: semanticAction.primaryBg,
        color: semanticAction.primaryText,
        "&:hover": {
          backgroundColor: semanticAction.primaryBgHover,
          boxShadow: "0 0 12px rgba(200,149,42,0.4)",
        },
        "&:active": {
          backgroundColor: semanticAction.primaryBgActive,
        },
        "&:focus-visible": {
          outline: `${semanticFocusRing.width} solid ${semanticFocusRing.color}`,
          outlineOffset: semanticFocusRing.offset,
          boxShadow: "0 0 12px rgba(200,149,42,0.4)",
        },
      },
      outlinedPrimary: {
        borderColor: semanticAction.secondaryBorder,
        color: semanticAction.secondaryText,
        "&:hover": {
          backgroundColor: semanticAction.secondaryHoverBg,
          borderColor: semanticAction.secondaryBorder,
        },
        "&:focus-visible": {
          outline: `${semanticFocusRing.width} solid ${semanticFocusRing.color}`,
          outlineOffset: semanticFocusRing.offset,
        },
      },
      outlined: {
        borderColor: color.gold["400"],
        color: color.cream["100"],
        backgroundColor: "transparent",
        "&:hover": {
          borderColor: color.gold["300"],
          backgroundColor: "rgba(200,149,42,0.1)",
          color: color.gold["100"],
        },
        "&:focus-visible": {
          outline: `${semanticFocusRing.width} solid ${semanticFocusRing.color}`,
          outlineOffset: semanticFocusRing.offset,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: semanticBackground.surface,
        borderRadius: "8px",
        border: `1px solid ${color.gold["400"]}33`,
        transition: `all 200ms cubic-bezier(0.4, 0, 0.2, 1)`,
        "&:hover": {
          boxShadow: "0 0 24px rgba(200,149,42,0.5), 0 4px 16px rgba(0,0,0,0.8)",
          borderColor: color.gold["400"],
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          backgroundColor: semanticBackground.surface,
          color: semanticText.primary,
          "& fieldset": {
            borderColor: color.gold.gradientDark,
          },
          "&:hover fieldset": {
            borderColor: color.gold["300"],
          },
          "&.Mui-focused fieldset": {
            borderColor: semanticFocusRing.color,
            borderWidth: "2px",
          },
        },
        "& .MuiInputLabel-root": {
          color: semanticText.secondary,
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: semanticFocusRing.color,
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: semanticNav.bg,
        boxShadow: "none",
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        color: semanticText.accent,
        textDecoration: "none",
        "&:hover": {
          color: color.gold["300"],
          textDecoration: "underline",
        },
        "&:focus-visible": {
          outline: `${semanticFocusRing.width} solid ${semanticFocusRing.color}`,
          outlineOffset: semanticFocusRing.offset,
          borderRadius: "2px",
        },
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: semanticNav.dropdownBorder,
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        color: semanticText.secondary,
        "&:hover": {
          color: color.gold["300"],
          backgroundColor: "rgba(200,149,42,0.1)",
        },
        "&:focus-visible": {
          outline: `${semanticFocusRing.width} solid ${semanticFocusRing.color}`,
          outlineOffset: semanticFocusRing.offset,
        },
      },
    },
  },
};
