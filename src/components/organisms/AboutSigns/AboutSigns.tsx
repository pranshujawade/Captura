"use client";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CapturaTypography from "@/components/atoms/CapturaTypography";
import CapturaIcon from "@/components/atoms/CapturaIcon";

interface AboutSignsProps {
  content: {
    signs: Array<{
      icon: string;
      label: string;
    }>;
  };
}

export default function AboutSigns({ content }: AboutSignsProps) {
  return (
    <Stack spacing={3} alignItems={{ xs: "center", md: "flex-start" }}>
      <CapturaTypography variant="heading" headingLevel={2} sx={{ textAlign: { xs: "center", md: "left" } }}>
        The Signs We Couldn&apos;t Ignore
      </CapturaTypography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 2, md: 0 }}
        sx={{
          width: "100%",
          justifyContent: { xs: "center", md: "flex-start" },
          alignItems: "center",
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        {content.signs.map((sign, i) => (
          <Box
            key={sign.label}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 1, md: 0 },
            }}
          >
            <Stack spacing={1.5} alignItems="center" sx={{ px: { xs: 2, md: 2 } }}>
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  border: "2px solid var(--captura-border-color-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--captura-shadow-gold-glow-sm)",
                  background: "var(--captura-semantic-background-elevated)",
                }}
              >
                <CapturaIcon size="large">{sign.icon}</CapturaIcon>
              </Box>
              <CapturaTypography variant="body2" color="secondary" sx={{ textAlign: "center" }}>
                {sign.label}
              </CapturaTypography>
            </Stack>
            {i < content.signs.length - 1 && (
              <Box
                aria-hidden="true"
                sx={{
                  display: { xs: "none", md: "flex" },
                  width: 48,
                  height: 2,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: -3,
                    left: "50%",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "var(--captura-semantic-icon-active)",
                    transform: "translateX(-50%)",
                  },
                  background: "linear-gradient(90deg, var(--captura-semantic-icon-active), var(--captura-border-color-subtle))",
                  flexShrink: 0,
                }}
              />
            )}
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
