import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import CommunityHero from "./CommunityHero";

const mockContent = {
  headline: "Join the Wellness Movement",
  subtext: "Be part of something transformative",
  primaryCta: { label: "Join as Partner", href: "/community#partner" },
  secondaryCta: { label: "Become a Customer", href: "/community#customer" },
  images: [
    { src: "/images/comm1.jpg", alt: "Community 1" },
    { src: "/images/comm2.jpg", alt: "Community 2" },
    { src: "/images/comm3.jpg", alt: "Community 3" },
  ],
};

describe("CommunityHero", () => {
  it("renders headline", () => {
    renderWithTheme(<CommunityHero content={mockContent} />);
    expect(screen.getByText("Join the Wellness Movement")).toBeInTheDocument();
  });

  it("renders both CTAs", () => {
    renderWithTheme(<CommunityHero content={mockContent} />);
    expect(screen.getByRole("link", { name: /join as partner/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /become a customer/i })).toBeInTheDocument();
  });

  it("renders as a section landmark", () => {
    renderWithTheme(<CommunityHero content={mockContent} />);
    expect(screen.getByRole("region", { name: /community hero/i })).toBeInTheDocument();
  });
});
