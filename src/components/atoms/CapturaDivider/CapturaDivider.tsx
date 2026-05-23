"use client";

import Divider, { type DividerProps } from "@mui/material/Divider";
import type { SxProps } from "@mui/material/styles";

export interface CapturaDividerProps extends Omit<DividerProps, "variant"> {
  /** Visual variant — controls the divider's visual weight */
  variant?: "default" | "strong";
  /** Vertical spacing above and below the divider (theme spacing units, default: 3 = 24px) */
  spacing?: number;
}

/**
 * CapturaDivider — branded divider atom with gold gradient styling.
 *
 * Variants:
 * - `default`: Subtle gold gradient line (standard section separator)
 * - `strong`: Bold gold line with glow effect (feature divider)
 */
export default function CapturaDivider({
  variant = "default",
  spacing = 3,
  sx,
  ...rest
}: CapturaDividerProps) {
  const variantStyles: SxProps =
    variant === "strong"
      ? {
          height: "2px",
          backgroundImage: "var(--captura-gradient-gold-horizontal)",
          borderRadius: 1,
          boxShadow: "var(--captura-shadow-gold-glow-sm)",
        }
      : {
          height: "1px",
          backgroundImage: "var(--captura-gradient-gold-subtle)",
        };

  return (
    <Divider
      {...rest}
      sx={[
        {
          my: spacing,
          border: "none",
        },
        variantStyles,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
