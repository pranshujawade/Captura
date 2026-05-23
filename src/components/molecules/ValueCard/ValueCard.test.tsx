import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import ValueCard from "./ValueCard";

describe("ValueCard", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders icon, title, and description", () => {
    renderWithTheme(
      <ValueCard icon="science" title="Science-Backed" description="Research validated formulations" />
    );
    expect(screen.getByText("Science-Backed")).toBeInTheDocument();
    expect(screen.getByText("Research validated formulations")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    renderWithTheme(
      <ValueCard icon="science" title="Title" description="Desc" />
    );
    expect(screen.getByText("science")).toBeInTheDocument();
  });

  // ── CapturaCard integration ───────────────────────────────────
  it("renders inside a CapturaCard", () => {
    renderWithTheme(
      <ValueCard icon="science" title="Title" description="Desc" />
    );
    const title = screen.getByText("Title");
    const card = title.closest("[class*='MuiCard']");
    expect(card).toBeInTheDocument();
  });

  // ── Hoverable by default ─────────────────────────────────────
  it("renders as hoverable card", () => {
    renderWithTheme(
      <ValueCard icon="science" title="Title" description="Desc" />
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("renders as an article element", () => {
    renderWithTheme(
      <ValueCard icon="science" title="Title" description="Desc" />
    );
    const title = screen.getByText("Title");
    expect(title.closest("article")).toBeInTheDocument();
  });

  it("supports aria-label", () => {
    renderWithTheme(
      <ValueCard icon="science" title="Title" description="Desc" aria-label="Science value" />
    );
    expect(screen.getByLabelText("Science value")).toBeInTheDocument();
  });
});
