"use client";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CapturaSection from "@/components/atoms/CapturaSection";
import CapturaTypography from "@/components/atoms/CapturaTypography";
import CapturaButton from "@/components/atoms/CapturaButton";
import CapturaIcon from "@/components/atoms/CapturaIcon";
import type { JoinUsContent } from "@/types/content";

export interface JoinUsSectionProps {
  content: JoinUsContent;
}

/**
 * JoinUsSection — dark overlay section with heading, text, and CTA.
 * Shared between Home and About pages.
 *
 * Supports:
 * - bulletPoints: traditional bullet list with check icons
 * - ctaColumns: 3-column icon + text grid (About page wireframe)
 * - secondParagraph: additional body text below subtext (Home page wireframe)
 */
export default function JoinUsSection({ content }: JoinUsSectionProps) {
  return (
    <CapturaSection
      variant="surface"
      aria-label="Join us"
      sx={{
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--captura-border-color-subtle)",
        borderBottom: "1px solid var(--captura-border-color-subtle)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "var(--captura-gradient-gold-shine)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "var(--captura-gradient-gold-shine)",
        },
      }}
    >
      {/* Radial glow background */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          background: "var(--captura-gradient-radial-glow)",
          pointerEvents: "none",
        }}
      />
      <Stack spacing={3} alignItems="center" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <CapturaTypography variant="heading" headingLevel={2} color="accent">
          {content.heading}
        </CapturaTypography>
        <Box
          aria-hidden="true"
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "var(--captura-semantic-icon-active)",
            boxShadow: "0 0 12px rgba(200,149,42,0.6), 0 0 24px rgba(200,149,42,0.3)",
          }}
        />
        <CapturaTypography variant="body" color="secondary" sx={{ maxWidth: 700 }}>
          {content.subtext}
        </CapturaTypography>
        {content.secondParagraph && (
          <CapturaTypography variant="body" color="secondary" sx={{ maxWidth: 700 }}>
            {content.secondParagraph}
          </CapturaTypography>
        )}
        {content.ctaColumns && (
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1 }}>
            {content.ctaColumns.map((col) => (
              <Grid key={col.text} size={{ xs: 12, sm: 6, md: 4 }}>
                <Stack spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      border: "1px solid var(--captura-border-color-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "var(--captura-shadow-gold-glow-sm)",
                    }}
                  >
                    <CapturaIcon size="medium" color="active">{col.icon}</CapturaIcon>
                  </Box>
                  <CapturaTypography variant="body2" color="secondary" sx={{ textAlign: "center" }}>
                    {col.text}
                  </CapturaTypography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        )}
        {content.bulletPoints && (
          <Stack spacing={1}>
            {content.bulletPoints.map((point) => (
              <Box key={point} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CapturaIcon color="active">check_circle</CapturaIcon>
                <CapturaTypography variant="body2">{point}</CapturaTypography>
              </Box>
            ))}
          </Stack>
        )}
        <CapturaButton
          component="a"
          href={content.cta.href}
          size="large"
        >
          {content.cta.label}
        </CapturaButton>
      </Stack>
    </CapturaSection>
  );
}
