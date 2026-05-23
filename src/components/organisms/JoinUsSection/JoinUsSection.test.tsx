import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import JoinUsSection from "./JoinUsSection";

const mockContent = {
  heading: "Join the Captura Community",
  subtext: "Be part of something bigger",
  bulletPoints: ["Exclusive offers", "Wellness tips", "Community access"],
  cta: { label: "Join Now", href: "/community" },
  backgroundImage: { src: "/images/join-bg.jpg", alt: "Community" },
};

describe("JoinUsSection", () => {
  it("renders heading", () => {
    renderWithTheme(<JoinUsSection content={mockContent} />);
    expect(screen.getByText("Join the Captura Community")).toBeInTheDocument();
  });

  it("renders subtext", () => {
    renderWithTheme(<JoinUsSection content={mockContent} />);
    expect(screen.getByText("Be part of something bigger")).toBeInTheDocument();
  });

  it("renders bullet points", () => {
    renderWithTheme(<JoinUsSection content={mockContent} />);
    expect(screen.getByText("Exclusive offers")).toBeInTheDocument();
  });

  it("renders CTA button", () => {
    renderWithTheme(<JoinUsSection content={mockContent} />);
    expect(screen.getByRole("link", { name: /join now/i })).toBeInTheDocument();
  });

  it("renders as a section landmark", () => {
    renderWithTheme(<JoinUsSection content={mockContent} />);
    expect(screen.getByRole("region", { name: /join/i })).toBeInTheDocument();
  });
});
