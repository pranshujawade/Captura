"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import type { SxProps } from "@mui/material/styles";

export interface CapturaNavLinkProps {
  /** Whether this link represents the current/active page */
  active?: boolean;
  /** Additional styles */
  sx?: SxProps;
  /** Link href */
  href: string;
  /** Accessible label */
  "aria-label"?: string;
  /** Click handler */
  onClick?: React.MouseEventHandler;
  /** Child content */
  children?: React.ReactNode;
}

/**
 * CapturaNavLink — branded navigation link atom with pill-shaped container.
 *
 * States:
 * - `default`: Cream text in dark-brown pill with subtle gold border
 * - `active`: Gold text in dark-brown pill with brighter gold border
 *
 * Hover transitions to gold text + gold border.
 */
export default function CapturaNavLink({
  active = false,
  sx,
  href,
  ...rest
}: CapturaNavLinkProps) {
  const theme = useTheme();

  return (
    <Box
      component={Link}
      href={href}
      aria-current={active ? "page" : undefined}
      aria-label={rest["aria-label"]}
      onClick={rest.onClick}
      sx={[
        {
          color: active
            ? theme.palette.text.accent
            : theme.palette.text.secondary,
          fontWeight: active ? 600 : 400,
          fontSize: "0.875rem",
          letterSpacing: "0.05em",
          px: 2,
          py: 0.5,
          borderRadius: "9999px",
          backgroundColor: "var(--captura-semantic-background-elevated)",
          border: `1px solid ${active ? theme.palette.gold[300] : "var(--captura-border-color-subtle)"}`,
          transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          "&:hover": {
            color: theme.palette.gold[300],
            borderColor: theme.palette.gold[300],
            backgroundColor: "var(--captura-color-overlay-gold-10)",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {rest.children}
    </Box>
  );
}
