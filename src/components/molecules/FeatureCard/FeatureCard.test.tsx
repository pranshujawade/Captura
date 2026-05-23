import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import FeatureCard from "./FeatureCard";

describe("FeatureCard", () => {
  it("renders the title", () => {
    renderWithTheme(<FeatureCard icon="spa" title="Conscious Wellness" description="Promoting mindful living." />);
    expect(screen.getByText("Conscious Wellness")).toBeInTheDocument();
  });

  it("renders the description", () => {
    renderWithTheme(<FeatureCard icon="spa" title="Conscious Wellness" description="Promoting mindful living." />);
    expect(screen.getByText("Promoting mindful living.")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    renderWithTheme(<FeatureCard icon="spa" title="Conscious Wellness" description="Promoting mindful living." />);
    expect(screen.getByText("spa")).toBeInTheDocument();
  });

  it("renders as an article", () => {
    renderWithTheme(<FeatureCard icon="spa" title="Conscious Wellness" description="Promoting mindful living." />);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("renders with custom aria-label", () => {
    renderWithTheme(<FeatureCard icon="spa" title="Conscious Wellness" description="Promoting mindful living." aria-label="Wellness feature" />);
    expect(screen.getByLabelText("Wellness feature")).toBeInTheDocument();
  });
});
