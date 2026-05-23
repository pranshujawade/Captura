"use client";

import Card, { type CardProps } from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import type { SxProps } from "@mui/material/styles";

export interface CapturaCardProps extends Omit<CardProps, "variant"> {
  /** Visual variant — controls background and border treatment */
  variant?: "surface" | "alternate" | "outlined";
  /** Whether the card shows hover effects (gold glow, border highlight) */
  hoverable?: boolean;
  /** Internal padding in theme spacing units (default: 5 = 40px) */
  padding?: number;
}

/**
 * CapturaCard — branded card atom with dark surface styling.
 *
 * Variants:
 * - `surface`: Dark surface background (#18170F) with subtle gold border (default)
 * - `alternate`: Slightly lighter alternate section background (#111108)
 * - `outlined`: No background fill, gold border only
 */
export default function CapturaCard({
  variant = "surface",
  hoverable = false,
  padding = 5,
  sx,
  ...rest
}: CapturaCardProps) {
  const theme = useTheme();

  const variantStyles: SxProps<typeof theme> = {
    surface: {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.gold[400]}33`,
    },
    alternate: {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.gold[400]}22`,
    },
    outlined: {
      backgroundColor: "transparent",
      border: `1px solid ${theme.palette.gold[400]}`,
    },
  };

  const hoverStyles: SxProps<typeof theme> = hoverable
    ? {
        transition: `all 200ms cubic-bezier(0.4, 0, 0.2, 1)`,
        "&:hover": {
          boxShadow: "0 0 24px rgba(200,149,42,0.5), 0 4px 16px rgba(0,0,0,0.8)",
          borderColor: theme.palette.gold[400],
        },
      }
    : {};

  return (
    <Card
      elevation={0}
      sx={[
        {
          borderRadius: "8px",
          p: padding,
        },
        variantStyles[variant],
        hoverStyles,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    />
  );
}
