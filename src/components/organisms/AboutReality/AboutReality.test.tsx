import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import AboutReality from "./AboutReality";

const content = {
  narrative:
    "I once sensed a quiet, unshakable voice—but buried it deep. I was disciplined, driven, doing everything right. Yet something was off.",
};

describe("AboutReality", () => {
  it("renders the narrative text", () => {
    renderWithTheme(<AboutReality content={content} />);
    expect(screen.getByText(/I once sensed/)).toBeInTheDocument();
  });

  it("renders the section heading", () => {
    renderWithTheme(<AboutReality content={content} />);
    expect(screen.getByText("The Reality We Faced")).toBeInTheDocument();
  });

  it("renders the heading text", () => {
    renderWithTheme(<AboutReality content={content} />);
    expect(screen.getByRole("heading", { level: 2, name: /reality we faced/i })).toBeInTheDocument();
  });
});
