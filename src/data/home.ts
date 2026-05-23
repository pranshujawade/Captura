import type { HomeContent } from "@/types/content";

export const homeContent: HomeContent = {
  hero: {
    headline: "Elevate Your Health with Premium Supplements",
    subtext:
      "Science-backed formulation for optimal wellness.",
    cta: {
      label: "Explore Captura Signatures →",
      href: "/signatures",
    },
    image: {
      src: "/images/hero/hero-supplements.jpg",
      alt: "Captura premium health supplements collection",
    },
  },
  valuePropositions: [
    {
      icon: "bar_chart",
      title: "Modern Nutrition Gap",
      description: "Busy lives, skipped meals and stress create nutrient gaps.",
    },
    {
      icon: "grass",
      title: "Depleting Soil Nutrient Profiles",
      description: "Decades of soil depletion mean fewer nutrients in our food.",
    },
    {
      icon: "spa",
      title: "Everyday Preventive Wellness",
      description: "Small, consistent choices today for a healthier tomorrow.",
    },
  ],
  founderStory: {
    heading: "Born from Truth",
    quote:
      "Captura began as a personal search for better health, charity, and lasting well-being.",
    founderName: "Mrs. Shafali",
    founderTitle: "Founding Member, Captura Incorporation",
    bulletPoints: [
      { text: "Personal experience that sparked a mission", icon: "favorite" },
      { text: "Years of research and learning", icon: "menu_book" },
      { text: "A promise to create what I truly believe in", icon: "eco" },
    ],
    cta: {
      label: "Our Story",
      href: "/about",
    },
    image: {
      src: "/images/founder/founder.jpg",
      alt: "Mrs. Shafali, Founding Member of Captura",
    },
  },
  joinUs: {
    heading: "Join us",
    subtext:
      "Whether you're seeking clarity in your health journey or believe in building meaningful, long-term impact—Captura is an invitation.",
    secondParagraph:
      "To 'rethink health.' To invest in well-being. To be part of a movement that prioritizes not just living longer—but living better.",
    cta: {
      label: "Explore our Community →",
      href: "/community",
    },
    backgroundImage: {
      src: "/images/community-bg.jpg",
      alt: "Captura community wellness gathering",
    },
  },
};
