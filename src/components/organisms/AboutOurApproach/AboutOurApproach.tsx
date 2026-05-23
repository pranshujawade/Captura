"use client";

import Stack from "@mui/material/Stack";
import CapturaSection from "@/components/atoms/CapturaSection";
import CapturaTypography from "@/components/atoms/CapturaTypography";
import IconBullet from "@/components/molecules/IconBullet";
import StepItem from "@/components/molecules/StepItem";

interface AboutOurApproachProps {
  content: {
    narrative: string;
    subheading?: string;
    bulletPoints?: string[];
    steps?: Array<{
      stepNumber: string;
      title: string;
      description: string;
    }>;
    closingStatement: string;
  };
}

export default function AboutOurApproach({ content }: AboutOurApproachProps) {
  return (
    <CapturaSection aria-label="Our approach">
      <Stack spacing={4} alignItems="center">
        <CapturaTypography variant="heading" headingLevel={2}>
          Our Approach
        </CapturaTypography>
        <CapturaTypography variant="body" color="secondary" sx={{ maxWidth: 700, textAlign: "center" }}>
          {content.narrative}
        </CapturaTypography>
        {content.subheading && (
          <CapturaTypography variant="subheading" headingLevel={4} color="accent">
            {content.subheading}
          </CapturaTypography>
        )}
        {content.steps && (
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
        )}
        {!content.steps && content.bulletPoints && (
          <Stack spacing={1.5} sx={{ width: "100%", maxWidth: 600 }}>
            {content.bulletPoints.map((point) => (
              <IconBullet key={point} icon="check_circle" text={point} iconColor="active" />
            ))}
          </Stack>
        )}
        <CapturaTypography variant="subheading" headingLevel={4} color="accent">
          {content.closingStatement}
        </CapturaTypography>
      </Stack>
    </CapturaSection>
  );
}
