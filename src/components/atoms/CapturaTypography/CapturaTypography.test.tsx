import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import CapturaTypography from "./CapturaTypography";

describe("CapturaTypography", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders text content", () => {
    renderWithTheme(<CapturaTypography>Hello World</CapturaTypography>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  // ── Variant tests ─────────────────────────────────────────────
  it("renders heading variant (h1)", () => {
    renderWithTheme(<CapturaTypography variant="heading" headingLevel={1}>Heading 1</CapturaTypography>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders heading variant with h2", () => {
    renderWithTheme(<CapturaTypography variant="heading" headingLevel={2}>Heading 2</CapturaTypography>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders subheading variant", () => {
    renderWithTheme(<CapturaTypography variant="subheading" headingLevel={4}>Subheading</CapturaTypography>);
    expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
  });

  it("renders body variant as paragraph", () => {
    renderWithTheme(<CapturaTypography variant="body">Body text</CapturaTypography>);
    expect(screen.getByText("Body text").tagName).toBe("P");
  });

  it("renders body2 variant", () => {
    renderWithTheme(<CapturaTypography variant="body2">Body2 text</CapturaTypography>);
    expect(screen.getByText("Body2 text")).toBeInTheDocument();
  });

  it("renders caption variant", () => {
    renderWithTheme(<CapturaTypography variant="caption">Caption text</CapturaTypography>);
    expect(screen.getByText("Caption text")).toBeInTheDocument();
  });

  it("renders overline variant", () => {
    renderWithTheme(<CapturaTypography variant="overline">OVERLINE</CapturaTypography>);
    expect(screen.getByText("OVERLINE")).toBeInTheDocument();
  });

  it("renders display variant", () => {
    renderWithTheme(<CapturaTypography variant="display">CAPTURA</CapturaTypography>);
    expect(screen.getByText("CAPTURA")).toBeInTheDocument();
  });

  it("defaults to body variant", () => {
    renderWithTheme(<CapturaTypography>Default body</CapturaTypography>);
    expect(screen.getByText("Default body").tagName).toBe("P");
  });

  // ── Heading level mapping ─────────────────────────────────────
  it("defaults heading level to 3 for heading variant", () => {
    renderWithTheme(<CapturaTypography variant="heading">Default heading</CapturaTypography>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("defaults heading level to 5 for subheading variant", () => {
    renderWithTheme(<CapturaTypography variant="subheading">Default sub</CapturaTypography>);
    expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument();
  });

  // ── Color tests ──────────────────────────────────────────────
  it("renders with primary color by default", () => {
    renderWithTheme(<CapturaTypography>Primary color</CapturaTypography>);
    expect(screen.getByText("Primary color")).toBeInTheDocument();
  });

  it("renders with secondary color", () => {
    renderWithTheme(<CapturaTypography color="secondary">Secondary</CapturaTypography>);
    expect(screen.getByText("Secondary")).toBeInTheDocument();
  });

  it("renders with accent color", () => {
    renderWithTheme(<CapturaTypography color="accent">Accent</CapturaTypography>);
    expect(screen.getByText("Accent")).toBeInTheDocument();
  });

  it("renders with muted color", () => {
    renderWithTheme(<CapturaTypography color="muted">Muted</CapturaTypography>);
    expect(screen.getByText("Muted")).toBeInTheDocument();
  });

  it("renders with onGold color", () => {
    renderWithTheme(<CapturaTypography color="onGold">On Gold</CapturaTypography>);
    expect(screen.getByText("On Gold")).toBeInTheDocument();
  });

  // ── Gutter prop ──────────────────────────────────────────────
  it("renders with gutterBottom", () => {
    renderWithTheme(<CapturaTypography gutterBottom>Gutter</CapturaTypography>);
    const el = screen.getByText("Gutter");
    expect(el).toHaveClass("MuiTypography-gutterBottom");
  });

  // ── Custom element via component prop ─────────────────────────
  it("renders as a span when component prop is span", () => {
    renderWithTheme(<CapturaTypography component="span">Span text</CapturaTypography>);
    expect(screen.getByText("Span text").tagName).toBe("SPAN");
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("heading variant has correct aria-level", () => {
    renderWithTheme(<CapturaTypography variant="heading" headingLevel={2}>Aria heading</CapturaTypography>);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Aria heading");
  });

  it("supports aria-label", () => {
    renderWithTheme(<CapturaTypography aria-label="Custom label">Text</CapturaTypography>);
    expect(screen.getByLabelText("Custom label")).toBeInTheDocument();
  });
});
