import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import AboutWhyCapturaExists from "./AboutWhyCapturaExists";

const mockContent = {
  narrative: "Captura was born from necessity.",
  pillars: [
    { icon: "science", title: "Evidence-Based", description: "Rooted in science" },
    { icon: "eco", title: "Natural", description: "Clean ingredients only" },
    { icon: "verified_user", title: "Transparent", description: "Full disclosure" },
  ],
  bottomLine: "This is why we exist.",
};

describe("AboutWhyCapturaExists", () => {
  it("renders narrative", () => {
    renderWithTheme(<AboutWhyCapturaExists content={mockContent} />);
    expect(screen.getByText("Captura was born from necessity.")).toBeInTheDocument();
  });

  it("renders all pillars", () => {
    renderWithTheme(<AboutWhyCapturaExists content={mockContent} />);
    mockContent.pillars.forEach((p) => {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    });
  });

  it("renders bottom line", () => {
    renderWithTheme(<AboutWhyCapturaExists content={mockContent} />);
    expect(screen.getByText("This is why we exist.")).toBeInTheDocument();
  });

  it("renders as a section landmark", () => {
    renderWithTheme(<AboutWhyCapturaExists content={mockContent} />);
    expect(screen.getByRole("region", { name: /why/i })).toBeInTheDocument();
  });
});
