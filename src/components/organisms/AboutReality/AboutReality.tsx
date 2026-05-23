"use client";

import Stack from "@mui/material/Stack";
import CapturaTypography from "@/components/atoms/CapturaTypography";

interface AboutRealityProps {
  content: {
    narrative: string;
  };
}

export default function AboutReality({ content }: AboutRealityProps) {
  return (
    <Stack spacing={2} sx={{ textAlign: { xs: "center", md: "left" } }}>
      <CapturaTypography variant="heading" headingLevel={2}>
        The Reality We Faced
      </CapturaTypography>
      <CapturaTypography
        variant="body"
        color="secondary"
        sx={{ fontStyle: "italic", lineHeight: 1.8 }}
      >
        {content.narrative}
      </CapturaTypography>
    </Stack>
  );
}
