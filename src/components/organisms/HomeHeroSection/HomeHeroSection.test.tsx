import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import HomeHeroSection from "./HomeHeroSection";

const mockContent = {
  headline: "Elevate Your Health",
  subtext: "Premium supplements backed by science",
  cta: { label: "Shop Now", href: "/signatures" },
  image: { src: "/images/hero.jpg", alt: "Captura supplements" },
};

describe("HomeHeroSection", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders headline", () => {
    renderWithTheme(<HomeHeroSection content={mockContent} />);
    expect(screen.getByText("Elevate Your Health")).toBeInTheDocument();
  });

  it("renders subtext", () => {
    renderWithTheme(<HomeHeroSection content={mockContent} />);
    expect(screen.getByText("Premium supplements backed by science")).toBeInTheDocument();
  });

  it("renders CTA button", () => {
    renderWithTheme(<HomeHeroSection content={mockContent} />);
    expect(screen.getByRole("link", { name: /shop now/i })).toBeInTheDocument();
  });

  it("renders hero image", () => {
    renderWithTheme(<HomeHeroSection content={mockContent} />);
    expect(screen.getByAltText("Captura supplements")).toBeInTheDocument();
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("renders as a section", () => {
    renderWithTheme(<HomeHeroSection content={mockContent} />);
    expect(screen.getByRole("region", { name: /hero/i })).toBeInTheDocument();
  });
});
