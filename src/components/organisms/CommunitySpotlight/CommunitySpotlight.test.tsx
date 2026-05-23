import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import CommunitySpotlight from "./CommunitySpotlight";

const mockContent = {
  heading: "Meet Our Community Builders",
  builders: [
    { name: "Aisha Patel", title: "Wellness Advocate", image: { src: "/images/aisha.jpg", alt: "Aisha Patel" } },
    { name: "Marcus Lee", title: "Health Coach", image: { src: "/images/marcus.jpg", alt: "Marcus Lee" } },
    { name: "Sofia Rivera", title: "Brand Partner", image: { src: "/images/sofia.jpg", alt: "Sofia Rivera" } },
  ],
  cta: { label: "View All Contributors", href: "/community#contributors" },
};

describe("CommunitySpotlight", () => {
  it("renders heading", () => {
    renderWithTheme(<CommunitySpotlight content={mockContent} />);
    expect(screen.getByText("Meet Our Community Builders")).toBeInTheDocument();
  });

  it("renders all profile names", () => {
    renderWithTheme(<CommunitySpotlight content={mockContent} />);
    mockContent.builders.forEach((b) => {
      expect(screen.getByText(b.name)).toBeInTheDocument();
    });
  });

  it("renders CTA link", () => {
    renderWithTheme(<CommunitySpotlight content={mockContent} />);
    expect(screen.getByRole("link", { name: /view all contributors/i })).toBeInTheDocument();
  });

  it("renders the spotlight heading", () => {
    renderWithTheme(<CommunitySpotlight content={mockContent} />);
    expect(screen.getByRole("heading", { level: 3, name: /meet our community builders/i })).toBeInTheDocument();
  });
});
