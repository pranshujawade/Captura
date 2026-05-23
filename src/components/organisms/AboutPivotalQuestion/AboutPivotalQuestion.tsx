"use client";

import Stack from "@mui/material/Stack";
import CapturaSection from "@/components/atoms/CapturaSection";
import CapturaTypography from "@/components/atoms/CapturaTypography";
import StepItem from "@/components/molecules/StepItem";

interface AboutPivotalQuestionProps {
  content: {
    headline: string;
    steps: Array<{
      stepNumber: string;
      title: string;
      description: string;
    }>;
    subtext: string;
  };
}

export default function AboutPivotalQuestion({ content }: AboutPivotalQuestionProps) {
  return (
    <CapturaSection variant="alternate" aria-label="The question that changed everything">
      <Stack spacing={4} alignItems="center">
        <CapturaTypography
          variant="heading"
          headingLevel={2}
          sx={{ maxWidth: 800, textAlign: "center" }}
        >
          {content.headline}
        </CapturaTypography>
        <Stack spacing={1.5} sx={{ width: "100%", maxWidth: 600 }}>
          {content.steps.map((step) => (
            <StepItem
              key={step.stepNumber}
              step={parseInt(step.stepNumber, 10)}
              title={step.title}
              description={step.description}
            />
          ))}
        </Stack>
        <CapturaTypography variant="body" color="secondary" sx={{ maxWidth: 700, textAlign: "center" }}>
          {content.subtext}
        </CapturaTypography>
      </Stack>
    </CapturaSection>
  );
}
