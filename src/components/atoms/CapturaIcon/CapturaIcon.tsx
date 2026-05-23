"use client";

import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";

export interface CapturaIconProps {
  /** Icon content — typically a Material Icons font ligature or SVG child */
  children: React.ReactNode;
  /** Color variant using Captura semantic icon tokens */
  color?: "default" | "active" | "muted";
  /** Size of the icon container */
  size?: "small" | "medium" | "large";
  /** Accessible label for the icon. If omitted, icon is treated as decorative (aria-hidden) */
  "aria-label"?: string;
  /** Additional styles */
  sx?: SxProps;
}

const sizeMap = {
  small: 20,
  medium: 24,
  large: 32,
} as const;

const colorTokenMap: Record<string, string> = {
  default: "var(--captura-semantic-icon-default)",
  active: "var(--captura-semantic-icon-active)",
  muted: "var(--captura-semantic-icon-muted)",
};

/**
 * CapturaIcon — branded icon atom with Captura semantic icon colors.
 *
 * Colors:
 * - `default`: Mid gold (#D4A843) — standard icon fills
 * - `active`: Core brand gold (#C8952A) — selected/active icons
 * - `muted`: Dim cream (#C9BC98) — disabled/inactive icons
 *
 * Size:
 * - `small`: 20px
 * - `medium`: 24px (default)
 * - `large`: 32px
 */
export default function CapturaIcon({
  children,
  color = "default",
  size = "medium",
  "aria-label": ariaLabel,
  sx,
}: CapturaIconProps) {
  const iconSize = sizeMap[size];
  const iconColor = colorTokenMap[color] ?? colorTokenMap.default;

  return (
    <Box
      component="span"
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      sx={[
        {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: iconSize,
          height: iconSize,
          fontSize: iconSize,
          color: iconColor,
          lineHeight: 1,
          fontFamily: '"Material Icons", "Material Icons Outlined", sans-serif',
          fontStyle: "normal",
          fontFeatureSettings: '"liga"',
          WebkitFontSmoothing: "antialiased",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
