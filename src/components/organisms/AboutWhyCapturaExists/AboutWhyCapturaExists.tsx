"use client";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CapturaSection from "@/components/atoms/CapturaSection";
import CapturaTypography from "@/components/atoms/CapturaTypography";
import CapturaIcon from "@/components/atoms/CapturaIcon";

interface AboutWhyCapturaExistsProps {
  content: {
    narrative: string;
    pillars: Array<{ icon: string; title: string; description: string }>;
    bottomLine: string;
  };
}

export default function AboutWhyCapturaExists({ content }: AboutWhyCapturaExistsProps) {
  return (
    <CapturaSection variant="alternate" aria-label="Why Captura exists">
      <Stack spacing={4} alignItems="center">
        <CapturaTypography variant="heading" headingLevel={2}>
          Why Captura Exists
        </CapturaTypography>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <CapturaTypography variant="body" color="secondary" sx={{ lineHeight: 1.8, textAlign: { xs: "center", md: "left" } }}>
              {content.narrative}
            </CapturaTypography>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              {content.pillars.map((pillar) => (
                <Stack key={pillar.title} direction="row" spacing={2} alignItems="flex-start">
                  <CapturaIcon size="large">{pillar.icon}</CapturaIcon>
                  <Stack spacing={0.5}>
                    <CapturaTypography variant="subheading" headingLevel={5}>
                      {pillar.title}
                    </CapturaTypography>
                    <CapturaTypography variant="body2" color="secondary">
                      {pillar.description}
                    </CapturaTypography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <CapturaTypography variant="body" color="accent" sx={{ fontWeight: 600, textAlign: "center", maxWidth: 700 }}>
          {content.bottomLine}
        </CapturaTypography>
      </Stack>
    </CapturaSection>
  );
}
