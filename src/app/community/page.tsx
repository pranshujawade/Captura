import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CommunityHero from "@/components/organisms/CommunityHero";
import CommunitySpotlight from "@/components/organisms/CommunitySpotlight";
import CapturaSection from "@/components/atoms/CapturaSection";
import CapturaTypography from "@/components/atoms/CapturaTypography";
import ScrollReveal from "@/components/atoms/ScrollReveal";
import FeatureCard from "@/components/molecules/FeatureCard";
import ValueCard from "@/components/molecules/ValueCard";
import StepItem from "@/components/molecules/StepItem";
import { communityContent } from "@/data/community";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community — Captura",
  description: "Join the Captura wellness community. Fostering meaningful connections, mutual support, and shared purpose for better health.",
  openGraph: {
    title: "Community — Captura",
    description: "Join the Captura wellness community. Fostering meaningful connections, mutual support, and shared purpose for better health.",
  },
};

export default function CommunityPage() {
  return (
    <Box component="main" id="main-content">
      <CommunityHero content={communityContent.hero} />

      {/* Values section */}
      <ScrollReveal direction="fade-up" duration={500}>
        <CapturaSection variant="alternate" aria-label="Community values">
          <Stack spacing={4} alignItems="center">
            <CapturaTypography variant="heading" headingLevel={2}>
              What Our Community Is About
            </CapturaTypography>
            <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 900, mx: "auto" }}>
              {communityContent.values.map((v) => (
                <Grid key={v.title} size={{ xs: 12, md: 6 }}>
                  <FeatureCard icon={v.icon} title={v.title} description={v.description} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </CapturaSection>
      </ScrollReveal>

      {/* Content Strategy section */}
      <ScrollReveal direction="fade-up" duration={500} delay={100}>
        <CapturaSection aria-label="Content strategy">
          <Stack spacing={4} alignItems="center">
            <CapturaTypography variant="heading" headingLevel={2}>
              How We Build This Community
            </CapturaTypography>
            <CapturaTypography variant="body" color="secondary" sx={{ maxWidth: 800, textAlign: "center" }}>
              {communityContent.contentStrategy.subtitle}
            </CapturaTypography>
            <Grid container spacing={3} justifyContent="center">
              {communityContent.contentStrategy.items.map((cs) => (
                <Grid key={cs.title} size={{ xs: 12, sm: 6, md: 4 }}>
                  <ValueCard icon={cs.icon} title={cs.title} description={cs.description} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </CapturaSection>
      </ScrollReveal>

      {/* Onboarding Steps + Community Spotlight side by side */}
      <ScrollReveal direction="fade-up" duration={500} delay={200}>
        <CapturaSection variant="alternate" aria-label="How to join and community builders">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={4} alignItems={{ xs: "center", md: "flex-start" }}>
                <CapturaTypography variant="heading" headingLevel={2}>
                  How to Join
                </CapturaTypography>
                <Stack direction="row" spacing={4} sx={{ width: "100%", justifyContent: { xs: "center", md: "flex-start" }, flexWrap: "wrap" }}>
                  {communityContent.onboardingSteps.map((step) => (
                    <StepItem
                      key={step.stepNumber}
                      step={parseInt(step.stepNumber, 10)}
                      title={step.title}
                      description={step.description}
                    />
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <CommunitySpotlight content={communityContent.spotlight} />
            </Grid>
          </Grid>
        </CapturaSection>
      </ScrollReveal>
    </Box>
  );
}
