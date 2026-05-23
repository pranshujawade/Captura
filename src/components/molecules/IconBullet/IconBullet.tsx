"use client";

import Box from "@mui/material/Box";
import CapturaIcon from "@/components/atoms/CapturaIcon";
import CapturaTypography from "@/components/atoms/CapturaTypography";

export interface IconBulletProps {
  /** Material Icons ligature name */
  icon: string;
  /** Bullet text content */
  text: string;
  /** Icon color variant */
  iconColor?: "default" | "active" | "muted";
  /** Accessible label */
  "aria-label"?: string;
}

/**
 * IconBullet — molecule composing an icon in a gold circle + text inline.
 * Used for feature lists, benefit bullets, and callout items.
 */
export default function IconBullet({
  icon,
  text,
  iconColor = "default",
  ...rest
}: IconBulletProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
      aria-label={rest["aria-label"]}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid var(--captura-border-color-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "var(--captura-shadow-gold-glow-sm)",
        }}
      >
        <CapturaIcon size="small" color={iconColor}>{icon}</CapturaIcon>
      </Box>
      <CapturaTypography variant="body" color="secondary">
        {text}
      </CapturaTypography>
    </Box>
  );
}
