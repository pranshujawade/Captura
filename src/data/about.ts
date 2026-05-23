import type { AboutContent } from "@/types/content";

export const aboutContent: AboutContent = {
  hero: {
    eyebrow: "CAPTURA — About Us",
    title: "Captura: A Vision Rooted in Reality",
    quote: "Captura didn't begin as a business. It began as a moment of truth.",
  },
  reality: {
    narrative:
      "I once sensed a quiet, unshakable voice—but buried it deep. I was disciplined, driven, doing everything right. Yet something was off. Sleep was irregular. Energy was low. Stress was constant. And my body wasn't keeping up with my efforts. The truth was hard to accept: despite all the discipline, something fundamental was missing.",
  },
  signs: [
    { icon: "bedtime", label: "Irregular Sleep" },
    { icon: "battery_alert", label: "Low Energy" },
    { icon: "psychology", label: "Chronic Stress" },
    { icon: "nutrition", label: "Incomplete Nourishment" },
  ],
  pivotalQuestion: {
    headline:
      "The answers led to a fundamental question: How are we chasing everything right—and still not feeling well?",
    steps: [
      { stepNumber: "01", title: "Food quality & true nourishment", description: "What we eat isn't always what our body truly receives." },
      { stepNumber: "02", title: "Stress levels never measured", description: "The invisible toll that silently erodes our well-being." },
      { stepNumber: "03", title: "Awareness has remained fragmented", description: "Knowing pieces isn't the same as understanding the whole." },
    ],
    subtext:
      "The gap between what we consume and what our body truly needs has been growing silently for decades.",
  },
  whyCapturaExists: {
    narrative:
      "Captura exists to bridge that gap—a platform for holistic well-being, sustainability, and systemic shift. Not just another supplement brand, but a movement toward genuine health awareness.",
    pillars: [
      { icon: "healing", title: "From reactive correction to preventive living", description: "Shifting from fixing problems to preventing them before they start." },
      { icon: "visibility", title: "From assumptions to awareness", description: "Replacing guesswork with understanding of what the body truly needs." },
      { icon: "forest", title: "From short-term fixes to long-term resilience", description: "Building lasting health rather than temporary relief." },
    ],
    bottomLine:
      "Because true health is not defined by habits alone—it is defined by whether the body is genuinely nourished.",
  },
  ourApproach: {
    narrative:
      "Our team of doctors, engineers, nutritionists, and wellness practitioners came together with one commitment: accountability and impact. Every product, every piece of content, every community interaction is measured against that standard.",
    subheading: "Beyond Products—A Movement",
    steps: [
      { stepNumber: "01", title: "Captura is more than what we offer", description: "It's a philosophy of conscious, preventive health." },
      { stepNumber: "02", title: "It's what we stand for", description: "Integrity, transparency, and genuine care for well-being." },
      { stepNumber: "03", title: "A shift in awareness", description: "From passive consumption to informed, intentional choices." },
      { stepNumber: "04", title: "A culture of conscious health", description: "Building a community that values awareness over convenience." },
      { stepNumber: "05", title: "A community driven by intention", description: "Every member committed to meaningful, long-term well-being." },
    ],
    closingStatement:
      "This is not just about supplements. This is about a fundamental shift in how we approach our health.",
  },
  ourVision: {
    statement:
      "To empower individuals across India to take control of their health through science and science-backed nutrition—enabling energy, strength, and a resilient life.",
    closingLine: "Because while aging is inevitable, the quality of how we age is a choice.",
    image: {
      src: "/images/about/about-vision.png",
      alt: "Silhouettes representing wellness activities — walking, cycling, and meditation",
    },
  },
  joinUs: {
    heading: "Join us",
    subtext:
      "Whether you are someone seeking clarity in your own health journey, or someone who believes in building meaningful, long-term change—Captura is an invitation.",
    ctaColumns: [
      { icon: "eco", text: "To care with clarity." },
      { icon: "favorite", text: "To invest in well-being." },
      { icon: "person", text: "To be part of a movement that prioritizes real, just living longer—not just living more." },
    ],
    cta: {
      label: "Join Our Community",
      href: "/community",
    },
    backgroundImage: {
      src: "/images/about-join-bg.jpg",
      alt: "Captura community members",
    },
  },
};
