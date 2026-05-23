"use client";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Image from "next/image";
import CapturaSection from "@/components/atoms/CapturaSection";
import CapturaTypography from "@/components/atoms/CapturaTypography";
import CapturaButton from "@/components/atoms/CapturaButton";

interface CommunityHeroProps {
  content: {
    headline: string;
    subtext: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    images: Array<{ src: string; alt: string }>;
  };
}

export default function CommunityHero({ content }: CommunityHeroProps) {
  return (
    <CapturaSection aria-label="Community hero" padding={{ xs: 3, md: 6 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <CapturaTypography variant="heading" headingLevel={1}>
              {content.headline}
            </CapturaTypography>
            <CapturaTypography variant="body" color="secondary">
              {content.subtext}
            </CapturaTypography>
            <Stack direction="row" spacing={2}>
              <CapturaButton component="a" href={content.primaryCta.href} size="large">
                {content.primaryCta.label}
              </CapturaButton>
              <CapturaButton component="a" href={content.secondaryCta.href} variant="secondary" size="large">
                {content.secondaryCta.label}
              </CapturaButton>
            </Stack>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: { xs: "none", md: "block" }, position: "relative", minHeight: 400 }}>
            {content.images.map((img, i) => (
              <Box
                key={img.src}
                sx={{
                  position: "absolute",
                  width: "55%",
                  aspectRatio: "3/4",
                  top: i === 0 ? 0 : i === 1 ? "10%" : "20%",
                  left: i === 0 ? 0 : i === 1 ? "25%" : "45%",
                  zIndex: i + 1,
                  border: "2px solid var(--captura-border-color-subtle)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "var(--captura-shadow-md)",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </CapturaSection>
  );
}
