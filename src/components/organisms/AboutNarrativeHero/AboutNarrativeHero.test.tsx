import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import AboutNarrativeHero from "./AboutNarrativeHero";

const mockContent = {
  title: "The Story Behind Every Supplement",
  quote: "We started with a question: What if wellness was accessible to everyone?",
};

describe("AboutNarrativeHero", () => {
  it("renders title", () => {
    renderWithTheme(<AboutNarrativeHero content={mockContent} />);
    expect(screen.getByText("The Story Behind Every Supplement")).toBeInTheDocument();
  });

  it("renders italic pull quote", () => {
    renderWithTheme(<AboutNarrativeHero content={mockContent} />);
    expect(screen.getByText(/What if wellness/)).toBeInTheDocument();
  });

  it("renders as a section landmark", () => {
    renderWithTheme(<AboutNarrativeHero content={mockContent} />);
    expect(screen.getByRole("region", { name: /about/i })).toBeInTheDocument();
  });
});
