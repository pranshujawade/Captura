"use client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import CapturaSection from "@/components/atoms/CapturaSection";
import CapturaTypography from "@/components/atoms/CapturaTypography";
import CapturaButton from "@/components/atoms/CapturaButton";
import IconBullet from "@/components/molecules/IconBullet";
import type { FounderStoryContent } from "@/types/content";

export interface HomeFounderStoryProps {
  content: FounderStoryContent;
}

/**
 * HomeFounderStory — 2-column: image left, quote + bullets + CTA right.
 */
export default function HomeFounderStory({ content }: HomeFounderStoryProps) {
  return (
    <CapturaSection aria-label="Founder story">
      <Grid container spacing={6} alignItems="center">
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "3/4",
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
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={3}>
            <CapturaTypography variant="heading" headingLevel={2} color="accent">
              {content.heading}
            </CapturaTypography>
            <CapturaTypography
              variant="subheading"
              headingLevel={4}
              color="accent"
              component="blockquote"
              sx={{ fontStyle: "italic", borderLeft: 3, borderColor: "var(--captura-semantic-icon-active)", pl: 2 }}
            >
              {content.quote}
            </CapturaTypography>
            <Stack spacing={0.5}>
              <CapturaTypography variant="subheading" headingLevel={5} color="accent">
                {content.founderName}
              </CapturaTypography>
              <CapturaTypography variant="body2" color="secondary">
                {content.founderTitle}
              </CapturaTypography>
            </Stack>
            <Stack spacing={1.5}>
              {content.bulletPoints.map((bp) => (
                <IconBullet key={bp.text} icon={bp.icon} text={bp.text} iconColor="active" />
              ))}
            </Stack>
            <Box>
              <CapturaButton
                component="a"
                href={content.cta.href}
                variant="secondary"
              >
                {content.cta.label}
              </CapturaButton>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </CapturaSection>
  );
}
