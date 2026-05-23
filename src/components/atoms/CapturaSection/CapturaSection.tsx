"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { SxProps } from "@mui/material/styles";

export interface CapturaSectionProps {
  /** Background variant using Captura semantic background tokens */
  variant?: "page" | "alternate" | "surface";
  /** Section padding — responsive object or number (theme spacing units) */
  padding?: number | { xs: number; sm?: number; md?: number; lg?: number };
  /** Max width constraint for content */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  /** Accessible label for the section landmark */
  "aria-label"?: string;
  /** Accessible label reference for the section landmark */
  "aria-labelledby"?: string;
  /** Additional styles */
  sx?: SxProps;
  /** Section content */
  children?: React.ReactNode;
  /** HTML id */
  id?: string;
}

const variantBackgrounds: Record<string, SxProps> = {
  page: {
    backgroundColor: "var(--captura-semantic-background-page)",
  },
  alternate: {
    backgroundColor: "var(--captura-semantic-background-section-alt)",
  },
  surface: {
    backgroundColor: "var(--captura-semantic-background-surface)",
  },
};

/**
 * CapturaSection — branded section container atom with semantic backgrounds.
 *
 * Variants:
 * - `page`: Darkest background (#0A0A08) — root page sections
 * - `alternate`: Slightly lighter (#111108) — alternating sections for visual rhythm
 * - `surface`: Card/surface background (#18170F) — elevated sections
 */
export default function CapturaSection({
  variant = "page",
  padding = { xs: 2, md: 4 },
  maxWidth = "lg",
  sx,
  children,
  id,
  ...rest
}: CapturaSectionProps) {
  const paddingSx: SxProps =
    typeof padding === "number"
      ? { py: padding }
      : {
          py: {
            xs: padding.xs,
            ...(padding.sm && { sm: padding.sm }),
            ...(padding.md && { md: padding.md }),
            ...(padding.lg && { lg: padding.lg }),
          },
        };

  return (
    <Box
      component="section"
      id={id}
      aria-label={rest["aria-label"]}
      aria-labelledby={rest["aria-labelledby"]}
      sx={[
        variantBackgrounds[variant],
        paddingSx,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {maxWidth ? (
        <Container maxWidth={maxWidth}>{children}</Container>
      ) : (
        children
      )}
    </Box>
  );
}
