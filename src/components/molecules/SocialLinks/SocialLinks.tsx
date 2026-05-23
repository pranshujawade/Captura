"use client";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CapturaIcon from "@/components/atoms/CapturaIcon";
import Link from "next/link";

export interface SocialLinkItem {
  /** Material Icons ligature name */
  icon: string;
  /** Link URL */
  href: string;
  /** Accessible label for the link */
  label: string;
}

export interface SocialLinksProps {
  /** Array of social link items */
  links: SocialLinkItem[];
}

/**
 * SocialLinks — molecule rendering an array of icon links.
 * Each link has a gold-outlined circular icon with accessible labels.
 */
export default function SocialLinks({ links }: SocialLinksProps) {
  if (links.length === 0) return null;

  return (
    <Stack
      component="nav"
      role="navigation"
      aria-label="Social media links"
      direction="row"
      spacing={1}
    >
      {links.map((link) => (
        <Box
          key={link.label}
          component={Link}
          href={link.href}
          aria-label={link.label}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid var(--captura-border-color-subtle)",
            color: "var(--captura-semantic-icon-active)",
            textDecoration: "none",
            transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              borderColor: "var(--captura-semantic-icon-active)",
              backgroundColor: "var(--captura-color-overlay-gold-10)",
              boxShadow: "var(--captura-shadow-gold-glow-sm)",
            },
          }}
        >
          <CapturaIcon size="medium">{link.icon}</CapturaIcon>
        </Box>
      ))}
    </Stack>
  );
}
