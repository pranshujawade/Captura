import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import AboutOurApproach from "./AboutOurApproach";

const mockContent = {
  narrative: "Our approach is simple.",
  bulletPoints: ["Research first", "Transparency always", "Quality without compromise"],
  closingStatement: "That is the Captura way.",
};

describe("AboutOurApproach", () => {
  it("renders narrative", () => {
    renderWithTheme(<AboutOurApproach content={mockContent} />);
    expect(screen.getByText("Our approach is simple.")).toBeInTheDocument();
  });

  it("renders bullet points", () => {
    renderWithTheme(<AboutOurApproach content={mockContent} />);
    expect(screen.getByText("Research first")).toBeInTheDocument();
  });

  it("renders closing statement", () => {
    renderWithTheme(<AboutOurApproach content={mockContent} />);
    expect(screen.getByText("That is the Captura way.")).toBeInTheDocument();
  });

  it("renders as a section landmark", () => {
    renderWithTheme(<AboutOurApproach content={mockContent} />);
    expect(screen.getByRole("region", { name: /approach/i })).toBeInTheDocument();
  });
});
