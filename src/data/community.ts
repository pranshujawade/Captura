import type { CommunityContent } from "@/types/content";

export const communityContent: CommunityContent = {
  hero: {
    headline: "A Community Built Around People",
    subtext:
      "Fostering meaningful connections, mutual support, and shared purpose for better health and conscious living.",
    primaryCta: { label: "Join Our Community", href: "/community#join" },
    secondaryCta: { label: "Explore Our Content", href: "/community#content" },
    images: [
      { src: "/images/community/community-1.jpg", alt: "Captura brand partners at wellness event" },
      { src: "/images/community/community-2.jpg", alt: "Community wellness workshop" },
      { src: "/images/community/community-3.jpg", alt: "Captura product showcase" },
    ],
  },
  values: [
    { icon: "spa", title: "Conscious Wellness", description: "Promoting mindful living, self-care, and holistic well-being for a healthier, more balanced life." },
    { icon: "diversity_3", title: "People First", description: "Putting people at the center by building meaningful connections and supporting each other's journey." },
  ],
  contentStrategy: {
    subtitle: "We create educational and awareness content over social media to reach, support, and inspire our community.",
    items: [
      { icon: "description", title: "Wellness Decoded", description: "Wellness insights made simple and practical." },
      { icon: "play_circle", title: "Awareness Series", description: "Short-form content that sparks mindful action." },
      { icon: "forum", title: "Voices of Community", description: "Thoughtful exchanges, reflections, and shared experiences." },
    ],
  },
  onboardingSteps: [
    { stepNumber: "01", title: "Follow Us", description: "Stay connected through our social platforms." },
    { stepNumber: "02", title: "Engage", description: "Like, comment, share, and join the conversation." },
    { stepNumber: "03", title: "Grow Together", description: "Be part of a community built on support and better living." },
  ],
  spotlight: {
    heading: "Community Builders",
    builders: [
      { name: "Ananya Rao", title: "Wellness Educator", image: { src: "/images/community/ananya.jpg", alt: "Ananya Rao" } },
      { name: "Rhea Malhotra", title: "Community Voice", image: { src: "/images/community/rhea.jpg", alt: "Rhea Malhotra" } },
      { name: "Karan Mehta", title: "Story Contributor", image: { src: "/images/community/karan.jpg", alt: "Karan Mehta" } },
    ],
    cta: { label: "View Contributors", href: "/community#contributors" },
  },
};
