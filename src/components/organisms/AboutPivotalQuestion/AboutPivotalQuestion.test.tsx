import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import AboutPivotalQuestion from "./AboutPivotalQuestion";

const content = {
  headline: "The answers led to a fundamental question: How are we chasing everything right?",
  steps: [
    { stepNumber: "01", title: "Food quality", description: "What we eat isn't always what our body truly receives." },
    { stepNumber: "02", title: "Stress levels", description: "The invisible toll that silently erodes our well-being." },
    { stepNumber: "03", title: "Awareness fragmented", description: "Knowing pieces isn't the same as understanding the whole." },
  ],
  subtext: "The gap between what we consume and what our body truly needs has been growing.",
};

describe("AboutPivotalQuestion", () => {
  it("renders the headline", () => {
    renderWithTheme(<AboutPivotalQuestion content={content} />);
    expect(screen.getByText(/The answers led/)).toBeInTheDocument();
  });

  it("renders all steps", () => {
    renderWithTheme(<AboutPivotalQuestion content={content} />);
    content.steps.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
    });
  });

  it("renders the subtext", () => {
    renderWithTheme(<AboutPivotalQuestion content={content} />);
    expect(screen.getByText(/The gap between/)).toBeInTheDocument();
  });

  it("renders as a section landmark", () => {
    renderWithTheme(<AboutPivotalQuestion content={content} />);
    expect(screen.getByText(/The answers led/).closest("section")).toBeInTheDocument();
  });
});
