"use client";

import Stack from "@mui/material/Stack";
import CapturaSection from "@/components/atoms/CapturaSection";
import CapturaTypography from "@/components/atoms/CapturaTypography";

interface AboutNarrativeHeroProps {
  content: {
    eyebrow?: string;
    title: string;
    quote: string;
  };
}

export default function AboutNarrativeHero({ content }: AboutNarrativeHeroProps) {
  return (
    <CapturaSection aria-label="About narrative hero" padding={{ xs: 3, md: 6 }}>
      <Stack spacing={4} alignItems="center" sx={{ textAlign: "center", maxWidth: 800, mx: "auto" }}>
        {content.eyebrow && (
          <CapturaTypography variant="overline" color="accent">
            {content.eyebrow}
          </CapturaTypography>
        )}
        <CapturaTypography variant="heading" headingLevel={1}>
          {content.title}
        </CapturaTypography>
        <CapturaTypography
          variant="subheading"
          headingLevel={3}
          color="accent"
          component="blockquote"
          sx={{ fontStyle: "italic" }}
        >
          {content.quote}
        </CapturaTypography>
      </Stack>
    </CapturaSection>
  );
}
