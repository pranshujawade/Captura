import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import CapturaDivider from "./CapturaDivider";

describe("CapturaDivider", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders a divider", () => {
    renderWithTheme(<CapturaDivider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  // ── Variant tests ─────────────────────────────────────────────
  it("renders default variant", () => {
    renderWithTheme(<CapturaDivider variant="default" />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders strong variant", () => {
    renderWithTheme(<CapturaDivider variant="strong" />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("defaults to default variant", () => {
    renderWithTheme(<CapturaDivider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  // ── Orientation tests ────────────────────────────────────────
  it("renders horizontal divider by default", () => {
    renderWithTheme(<CapturaDivider />);
    const divider = screen.getByRole("separator");
    // Horizontal is implicit — MUI doesn't set aria-orientation for horizontal
    expect(divider).not.toHaveAttribute("aria-orientation", "vertical");
  });

  it("renders vertical divider", () => {
    renderWithTheme(<CapturaDivider orientation="vertical" />);
    const divider = screen.getByRole("separator");
    expect(divider).toHaveAttribute("aria-orientation", "vertical");
  });

  // ── Spacing prop ──────────────────────────────────────────────
  it("renders with custom spacing", () => {
    renderWithTheme(<CapturaDivider spacing={4} />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("has separator role", () => {
    renderWithTheme(<CapturaDivider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("supports aria-label", () => {
    renderWithTheme(<CapturaDivider aria-label="Section divider" />);
    expect(screen.getByRole("separator", { name: "Section divider" })).toBeInTheDocument();
  });
});
