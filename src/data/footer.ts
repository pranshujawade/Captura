import type { FooterContent } from "@/types/content";

export const footer: FooterContent = {
  contact: {
    email: "relation@captura.co.in",
    instagram: "@captura_incorporation",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/captura_incorporated", icon: "instagram" },
      { platform: "YouTube", url: "https://youtube.com/@captura_incorporated", icon: "youtube" },
      { platform: "LinkedIn", url: "https://linkedin.com/company/captura-incorporated", icon: "linkedin" },
    ],
  },
  newsletter: {
    heading: "Stay Connected",
    description: "Subscribe to our newsletter and be the first to receive wellness updates, exclusive offers and more.",
    placeholder: "Enter your email address",
    buttonText: "SUBSCRIBE",
  },
  copyright: "\u00A9 2026 Captura Incorporation. All rights reserved.",
};
