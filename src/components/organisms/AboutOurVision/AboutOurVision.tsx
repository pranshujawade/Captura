"use client";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Image from "next/image";
import CapturaSection from "@/components/atoms/CapturaSection";
import CapturaTypography from "@/components/atoms/CapturaTypography";

interface AboutOurVisionProps {
  content: {
    statement: string;
    closingLine: string;
    image?: {
      src: string;
      alt: string;
    };
  };
}

export default function AboutOurVision({ content }: AboutOurVisionProps) {
  return (
    <CapturaSection variant="alternate" aria-label="Our vision" padding={{ xs: 3, md: 6 }}>
      <Stack spacing={4} alignItems="center" sx={{ textAlign: "center", maxWidth: 800, mx: "auto" }}>
        <CapturaTypography variant="heading" headingLevel={2}>
          Our Vision
        </CapturaTypography>
        <CapturaTypography variant="subheading" headingLevel={3} color="accent" sx={{ fontStyle: "italic" }}>
          {content.statement}
        </CapturaTypography>
        {content.image && (
          <Box sx={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "8px", overflow: "hidden" }}>
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(max-width: 900px) 100vw, 800px"
              style={{ objectFit: "cover" }}
            />
          </Box>
        )}
        <CapturaTypography variant="body" color="secondary">
          {content.closingLine}
        </CapturaTypography>
      </Stack>
    </CapturaSection>
  );
}
