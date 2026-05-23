import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import HomeValuePropositions from "./HomeValuePropositions";

const mockValues = [
  { icon: "science", title: "Science-Backed", description: "Research validated" },
  { icon: "eco", title: "Natural", description: "Pure ingredients" },
  { icon: "verified", title: "Trusted", description: "Third-party tested" },
];

describe("HomeValuePropositions", () => {
  it("renders section heading", () => {
    renderWithTheme(<HomeValuePropositions values={mockValues} />);
    expect(screen.getByText("Why Captura Exists")).toBeInTheDocument();
  });

  it("renders all value cards", () => {
    renderWithTheme(<HomeValuePropositions values={mockValues} />);
    mockValues.forEach((v) => {
      expect(screen.getByText(v.title)).toBeInTheDocument();
    });
  });

  it("renders as a section landmark", () => {
    renderWithTheme(<HomeValuePropositions values={mockValues} />);
    expect(screen.getByRole("region", { name: /value/i })).toBeInTheDocument();
  });
});
