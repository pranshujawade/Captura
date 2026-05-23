"use client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import CapturaTypography from "@/components/atoms/CapturaTypography";
import CapturaButton from "@/components/atoms/CapturaButton";
import type { HeroContent } from "@/types/content";

export interface HomeHeroSectionProps {
  content: HeroContent;
}

/**
 * HomeHeroSection — 2-column hero: text+CTA on left, image on right.
 * Stacks vertically on mobile.
 */
export default function HomeHeroSection({ content }: HomeHeroSectionProps) {
  return (
    <Box
      component="section"
      role="region"
      aria-label="Hero section"
      sx={{
        py: { xs: 6, md: 10 },
        minHeight: { md: "85vh" },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid container spacing={6} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <CapturaTypography variant="heading" headingLevel={1}>
              {content.headline}
            </CapturaTypography>
            <CapturaTypography variant="body" color="secondary" sx={{ maxWidth: 480 }}>
              {content.subtext}
            </CapturaTypography>
            <Box sx={{ pt: 1 }}>
              <CapturaButton
                component="a"
                href={content.cta.href}
                size="large"
              >
                {content.cta.label}
              </CapturaButton>
            </Box>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "4/3",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid var(--captura-border-color-subtle)",
              boxShadow: "var(--captura-shadow-gold-glow-md)",
            }}
          >
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
