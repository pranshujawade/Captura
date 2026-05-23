import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import AboutSigns from "./AboutSigns";

const content = {
  signs: [
    { icon: "bedtime", label: "Irregular Sleep" },
    { icon: "battery_alert", label: "Low Energy" },
    { icon: "psychology", label: "Chronic Stress" },
    { icon: "nutrition", label: "Incomplete Nourishment" },
  ],
};

describe("AboutSigns", () => {
  it("renders the section heading", () => {
    renderWithTheme(<AboutSigns content={content} />);
    expect(screen.getByText("The Signs We Couldn't Ignore")).toBeInTheDocument();
  });

  it("renders all sign labels", () => {
    renderWithTheme(<AboutSigns content={content} />);
    content.signs.forEach((sign) => {
      expect(screen.getByText(sign.label)).toBeInTheDocument();
    });
  });

  it("renders all sign icons", () => {
    renderWithTheme(<AboutSigns content={content} />);
    content.signs.forEach((sign) => {
      expect(screen.getByText(sign.icon)).toBeInTheDocument();
    });
  });

  it("renders the heading text", () => {
    renderWithTheme(<AboutSigns content={content} />);
    expect(screen.getByRole("heading", { level: 2, name: /signs we couldn't ignore/i })).toBeInTheDocument();
  });
});
