import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import HomeFounderStory from "./HomeFounderStory";

const mockContent = {
  heading: "Our Story",
  quote: "Health is not a privilege — it's a right.",
  founderName: "Dr. Sarah Chen",
  founderTitle: "Founder & CEO",
  bulletPoints: [
    { text: "10+ years of research", icon: "timeline" },
    { text: "100% natural ingredients", icon: "eco" },
  ],
  cta: { label: "Learn More", href: "/about" },
  image: { src: "/images/founder.jpg", alt: "Dr. Sarah Chen" },
};

describe("HomeFounderStory", () => {
  it("renders heading", () => {
    renderWithTheme(<HomeFounderStory content={mockContent} />);
    expect(screen.getByText("Our Story")).toBeInTheDocument();
  });

  it("renders quote", () => {
    renderWithTheme(<HomeFounderStory content={mockContent} />);
    expect(screen.getByText(/Health is not a privilege/)).toBeInTheDocument();
  });

  it("renders founder name", () => {
    renderWithTheme(<HomeFounderStory content={mockContent} />);
    expect(screen.getByText(/Dr\. Sarah Chen/)).toBeInTheDocument();
  });

  it("renders bullet points", () => {
    renderWithTheme(<HomeFounderStory content={mockContent} />);
    expect(screen.getByText("10+ years of research")).toBeInTheDocument();
  });

  it("renders CTA link", () => {
    renderWithTheme(<HomeFounderStory content={mockContent} />);
    expect(screen.getByRole("link", { name: /learn more/i })).toBeInTheDocument();
  });

  it("renders as a section landmark", () => {
    renderWithTheme(<HomeFounderStory content={mockContent} />);
    expect(screen.getByRole("region", { name: /founder/i })).toBeInTheDocument();
  });
});
