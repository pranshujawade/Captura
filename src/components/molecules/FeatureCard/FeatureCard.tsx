"use client";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CapturaCard from "@/components/atoms/CapturaCard";
import CapturaIcon from "@/components/atoms/CapturaIcon";
import CapturaTypography from "@/components/atoms/CapturaTypography";

export interface FeatureCardProps {
  /** Material Icons ligature name for the card icon */
  icon: string;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Accessible label for the card */
  "aria-label"?: string;
}

/**
 * FeatureCard — horizontal molecule with icon on left, title + description on right.
 *
 * Used in the Community page values section (2 cards side-by-side).
 * Features a gold gradient top border via pseudo-element (borderImage breaks border-radius).
 */
export default function FeatureCard({
  icon,
  title,
  description,
  ...rest
}: FeatureCardProps) {
  return (
    <CapturaCard
      component="article"
      hoverable
      aria-label={rest["aria-label"]}
      sx={{
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
      <Stack direction="row" spacing={3} alignItems="center">
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: "2px solid var(--captura-border-color-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "var(--captura-shadow-gold-glow-sm)",
            background: "var(--captura-semantic-background-elevated)",
          }}
        >
          <CapturaIcon size="large" aria-label={title}>
            {icon}
          </CapturaIcon>
        </Box>
        <Stack spacing={0.5}>
          <CapturaTypography variant="subheading" headingLevel={4}>
            {title}
          </CapturaTypography>
          <CapturaTypography variant="body2" color="secondary">
            {description}
          </CapturaTypography>
        </Stack>
      </Stack>
    </CapturaCard>
  );
}
