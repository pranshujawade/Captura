import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import CapturaCard from "./CapturaCard";

describe("CapturaCard", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders children content", () => {
    renderWithTheme(<CapturaCard>Card content</CapturaCard>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  // ── Variant tests ─────────────────────────────────────────────
  it("renders surface variant by default", () => {
    renderWithTheme(<CapturaCard>Surface</CapturaCard>);
    expect(screen.getByText("Surface")).toBeInTheDocument();
  });

  it("renders alternate variant", () => {
    renderWithTheme(<CapturaCard variant="alternate">Alternate</CapturaCard>);
    expect(screen.getByText("Alternate")).toBeInTheDocument();
  });

  it("renders outlined variant", () => {
    renderWithTheme(<CapturaCard variant="outlined">Outlined</CapturaCard>);
    expect(screen.getByText("Outlined")).toBeInTheDocument();
  });

  // ── Hoverable prop ───────────────────────────────────────────
  it("renders hoverable card", () => {
    renderWithTheme(<CapturaCard hoverable>Hoverable</CapturaCard>);
    expect(screen.getByText("Hoverable")).toBeInTheDocument();
  });

  it("renders non-hoverable card by default", () => {
    renderWithTheme(<CapturaCard>Not hoverable</CapturaCard>);
    expect(screen.getByText("Not hoverable")).toBeInTheDocument();
  });

  // ── Padding prop ─────────────────────────────────────────────
  it("renders with custom padding", () => {
    renderWithTheme(<CapturaCard padding={4}>Padded</CapturaCard>);
    expect(screen.getByText("Padded")).toBeInTheDocument();
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("renders as a div by default", () => {
    renderWithTheme(<CapturaCard>Div card</CapturaCard>);
    expect(screen.getByText("Div card").tagName).toBe("DIV");
  });

  it("renders as an article when component is article", () => {
    renderWithTheme(<CapturaCard component="article">Article card</CapturaCard>);
    expect(screen.getByText("Article card").tagName).toBe("ARTICLE");
  });

  it("supports aria-label", () => {
    renderWithTheme(<CapturaCard aria-label="Info card">Content</CapturaCard>);
    expect(screen.getByLabelText("Info card")).toBeInTheDocument();
  });
});
