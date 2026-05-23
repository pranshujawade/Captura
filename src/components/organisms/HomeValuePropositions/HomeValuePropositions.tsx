"use client";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CapturaSection from "@/components/atoms/CapturaSection";
import CapturaTypography from "@/components/atoms/CapturaTypography";
import ValueCard from "@/components/molecules/ValueCard";
import type { ValuePropContent } from "@/types/content";

export interface HomeValuePropositionsProps {
  values: ValuePropContent[];
}

/**
 * HomeValuePropositions — 3 ValueCards in a responsive grid.
 * Section with alternate background and centered heading.
 */
export default function HomeValuePropositions({ values }: HomeValuePropositionsProps) {
  return (
    <CapturaSection variant="alternate" aria-label="Value propositions">
      <Stack spacing={5} alignItems="center">
        <Stack spacing={2} alignItems="center">
          <CapturaTypography variant="heading" headingLevel={2} color="accent">
            Why Captura Exists
          </CapturaTypography>
          <Box
            aria-hidden="true"
            sx={{
              width: 60,
              height: 2,
              background: "var(--captura-gradient-gold-shine)",
              borderRadius: 1,
            }}
          />
          <CapturaTypography variant="body" color="secondary" sx={{ maxWidth: 600, textAlign: "center" }}>
            Because even a conscious lifestyle can fall short of what the body truly needs.
          </CapturaTypography>
        </Stack>
        <Grid container spacing={3} justifyContent="center">
          {values.map((value) => (
            <Grid key={value.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <ValueCard
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </CapturaSection>
  );
}
