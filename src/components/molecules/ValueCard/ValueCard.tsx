"use client";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CapturaCard from "@/components/atoms/CapturaCard";
import CapturaIcon from "@/components/atoms/CapturaIcon";
import CapturaTypography from "@/components/atoms/CapturaTypography";

export interface ValueCardProps {
  /** Material Icons ligature name for the card icon */
  icon: string;
  /** Card title — displayed as a subheading */
  title: string;
  /** Card description — body text */
  description: string;
  /** Accessible label for the card */
  "aria-label"?: string;
}

/**
 * ValueCard — molecule composing CapturaIcon + CapturaTypography inside a CapturaCard.
 *
 * Used in the Home page value propositions section (3 cards in a grid).
 * Features a gold gradient top border via pseudo-element (borderImage breaks border-radius).
 */
export default function ValueCard({
  icon,
  title,
  description,
  ...rest
}: ValueCardProps) {
  return (
    <CapturaCard
      component="article"
      hoverable
      aria-label={rest["aria-label"]}
      sx={{
        textAlign: "center",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "var(--captura-gradient-gold-shine)",
        },
      }}
    >
      <Stack spacing={2.5} alignItems="center" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: "2px solid var(--captura-border-color-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--captura-shadow-gold-glow-sm)",
            background: "var(--captura-gradient-surface-depth)",
          }}
        >
          <CapturaIcon size="large" color="active" aria-label={title}>
            {icon}
          </CapturaIcon>
        </Box>
        <CapturaTypography variant="subheading" headingLevel={4}>
          {title}
        </CapturaTypography>
        <CapturaTypography variant="body" color="secondary">
          {description}
        </CapturaTypography>
      </Stack>
    </CapturaCard>
  );
}
