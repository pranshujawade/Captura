"use client";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CapturaTypography from "@/components/atoms/CapturaTypography";

export interface StepItemProps {
  /** Step number displayed in the gold circle */
  step: number;
  /** Step title */
  title: string;
  /** Step description */
  description: string;
  /** Accessible label */
  "aria-label"?: string;
}

/**
 * StepItem — molecule composing a numbered gold circle + title + description.
 *
 * Used in onboarding steps, "how it works" sections.
 */
export default function StepItem({
  step,
  title,
  description,
  ...rest
}: StepItemProps) {
  return (
    <Stack
      component="li"
      spacing={2}
      alignItems="center"
      aria-label={rest["aria-label"]}
      sx={{ flex: "1 1 0", minWidth: 0, textAlign: "center" }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundImage: "var(--captura-gradient-gold-shine)",
          color: "var(--captura-semantic-text-on-gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: "1.25rem",
          fontFamily: "var(--captura-typography-font-family-body)",
          boxShadow: "var(--captura-shadow-gold-glow-sm)",
        }}
      >
        {String(step).padStart(2, "0")}
      </Box>
      <CapturaTypography variant="subheading" headingLevel={5}>
        {title}
      </CapturaTypography>
      <CapturaTypography variant="body" color="secondary">
        {description}
      </CapturaTypography>
    </Stack>
  );
}
