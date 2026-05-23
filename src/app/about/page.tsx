import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AboutNarrativeHero from "@/components/organisms/AboutNarrativeHero";
import AboutReality from "@/components/organisms/AboutReality";
import AboutSigns from "@/components/organisms/AboutSigns";
import AboutPivotalQuestion from "@/components/organisms/AboutPivotalQuestion";
import AboutWhyCapturaExists from "@/components/organisms/AboutWhyCapturaExists";
import AboutOurApproach from "@/components/organisms/AboutOurApproach";
import AboutOurVision from "@/components/organisms/AboutOurVision";
import JoinUsSection from "@/components/organisms/JoinUsSection";
import CapturaSection from "@/components/atoms/CapturaSection";
import ScrollReveal from "@/components/atoms/ScrollReveal";
import { aboutContent } from "@/data/about";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Captura",
  description: "A vision rooted in reality. The story behind Captura: why we exist, our approach to wellness, and our vision for accessible health.",
  openGraph: {
    title: "About Us — Captura",
    description: "A vision rooted in reality. The story behind Captura: why we exist, our approach to wellness, and our vision for accessible health.",
  },
};

export default function AboutPage() {
  return (
    <Box component="main" id="main-content">
      <AboutNarrativeHero content={aboutContent.hero} />

      {/* Reality + Signs — 2-column layout */}
      <ScrollReveal direction="fade-up" duration={500}>
        <CapturaSection variant="alternate" aria-label="The reality and signs">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <AboutReality content={aboutContent.reality} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AboutSigns content={{ signs: aboutContent.signs }} />
            </Grid>
          </Grid>
        </CapturaSection>
      </ScrollReveal>

      <ScrollReveal direction="fade-up" duration={500} delay={100}>
        <AboutPivotalQuestion content={aboutContent.pivotalQuestion} />
      </ScrollReveal>
      <ScrollReveal direction="fade-up" duration={500} delay={200}>
        <AboutWhyCapturaExists content={aboutContent.whyCapturaExists} />
      </ScrollReveal>
      <ScrollReveal direction="fade-up" duration={500} delay={300}>
        <AboutOurApproach content={aboutContent.ourApproach} />
      </ScrollReveal>
      <ScrollReveal direction="fade-up" duration={500} delay={400}>
        <AboutOurVision content={aboutContent.ourVision} />
      </ScrollReveal>
      <ScrollReveal direction="fade-up" duration={500} delay={500}>
        <JoinUsSection content={aboutContent.joinUs} />
      </ScrollReveal>
    </Box>
  );
}
