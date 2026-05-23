import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import AboutOurVision from "./AboutOurVision";

const mockContent = {
  statement: "A world where wellness is a right, not a privilege.",
  closingLine: "Join us in making it happen.",
};

describe("AboutOurVision", () => {
  it("renders vision statement", () => {
    renderWithTheme(<AboutOurVision content={mockContent} />);
    expect(screen.getByText(/A world where wellness/)).toBeInTheDocument();
  });

  it("renders closing line", () => {
    renderWithTheme(<AboutOurVision content={mockContent} />);
    expect(screen.getByText("Join us in making it happen.")).toBeInTheDocument();
  });

  it("renders as a section landmark", () => {
    renderWithTheme(<AboutOurVision content={mockContent} />);
    expect(screen.getByRole("region", { name: /vision/i })).toBeInTheDocument();
  });
});
