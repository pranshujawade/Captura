import Box from "@mui/material/Box";
import HomeHeroSection from "@/components/organisms/HomeHeroSection";
import HomeValuePropositions from "@/components/organisms/HomeValuePropositions";
import HomeFounderStory from "@/components/organisms/HomeFounderStory";
import JoinUsSection from "@/components/organisms/JoinUsSection";
import ScrollReveal from "@/components/atoms/ScrollReveal";
import { homeContent } from "@/data/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Captura — Elevate Your Health with Premium Supplements",
  description:
    "Science-backed formulation for optimal wellness. Captura offers premium health supplements crafted with high-quality ingredients and research validation.",
  openGraph: {
    title: "Captura — Elevate Your Health with Premium Supplements",
    description:
      "Science-backed formulation for optimal wellness. Premium health supplements crafted with high-quality ingredients.",
    type: "website",
  },
};

export default function Home() {
  return (
    <Box component="main" id="main-content">
      <HomeHeroSection content={homeContent.hero} />
      <ScrollReveal direction="fade-up" duration={500}>
        <HomeValuePropositions values={homeContent.valuePropositions} />
      </ScrollReveal>
      <ScrollReveal direction="fade-up" duration={500} delay={100}>
        <HomeFounderStory content={homeContent.founderStory} />
      </ScrollReveal>
      <ScrollReveal direction="fade-up" duration={500} delay={200}>
        <JoinUsSection content={homeContent.joinUs} />
      </ScrollReveal>
    </Box>
  );
}
