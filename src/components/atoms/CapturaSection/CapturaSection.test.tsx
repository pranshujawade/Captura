import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import CapturaSection from "./CapturaSection";

describe("CapturaSection", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders children content", () => {
    renderWithTheme(<CapturaSection>Section content</CapturaSection>);
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  // ── Variant tests ─────────────────────────────────────────────
  it("renders page variant by default", () => {
    renderWithTheme(<CapturaSection>Page section</CapturaSection>);
    expect(screen.getByText("Page section")).toBeInTheDocument();
  });

  it("renders alternate variant", () => {
    renderWithTheme(<CapturaSection variant="alternate">Alt section</CapturaSection>);
    expect(screen.getByText("Alt section")).toBeInTheDocument();
  });

  it("renders surface variant", () => {
    renderWithTheme(<CapturaSection variant="surface">Surface section</CapturaSection>);
    expect(screen.getByText("Surface section")).toBeInTheDocument();
  });

  // ── Padding prop ──────────────────────────────────────────────
  it("renders with default padding", () => {
    renderWithTheme(<CapturaSection>Default padding</CapturaSection>);
    expect(screen.getByText("Default padding")).toBeInTheDocument();
  });

  it("renders with custom padding", () => {
    renderWithTheme(<CapturaSection padding={{ xs: 2, md: 4 }}>Custom padding</CapturaSection>);
    expect(screen.getByText("Custom padding")).toBeInTheDocument();
  });

  // ── Max width prop ───────────────────────────────────────────
  it("renders with maxWidth", () => {
    renderWithTheme(<CapturaSection maxWidth="lg">Constrained</CapturaSection>);
    expect(screen.getByText("Constrained")).toBeInTheDocument();
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("renders as a section element", () => {
    renderWithTheme(<CapturaSection>Landmark</CapturaSection>);
    expect(screen.getByText("Landmark").closest("section")).toBeInTheDocument();
  });

  it("supports aria-label", () => {
    renderWithTheme(<CapturaSection aria-label="Hero section">Content</CapturaSection>);
    expect(screen.getByLabelText("Hero section")).toBeInTheDocument();
  });

  it("supports aria-labelledby", () => {
    renderWithTheme(
      <CapturaSection aria-labelledby="section-title">
        <h2 id="section-title">Title</h2>
      </CapturaSection>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});
