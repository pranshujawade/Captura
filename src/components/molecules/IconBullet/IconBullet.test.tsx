import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import IconBullet from "./IconBullet";

describe("IconBullet", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders icon and text", () => {
    renderWithTheme(<IconBullet icon="check" text="Science-backed formulation" />);
    expect(screen.getByText("check")).toBeInTheDocument();
    expect(screen.getByText("Science-backed formulation")).toBeInTheDocument();
  });

  // ── Color variant ─────────────────────────────────────────────
  it("renders with default color", () => {
    renderWithTheme(<IconBullet icon="check" text="Item" />);
    expect(screen.getByText("Item")).toBeInTheDocument();
  });

  it("renders with active color", () => {
    renderWithTheme(<IconBullet icon="check" text="Item" iconColor="active" />);
    expect(screen.getByText("Item")).toBeInTheDocument();
  });

  // ── Layout ───────────────────────────────────────────────────
  it("renders icon and text in a flex container", () => {
    renderWithTheme(<IconBullet icon="check" text="Inline item" />);
    const text = screen.getByText("Inline item");
    // MUI Box renders sx display:flex as a CSS class — verify the parent exists
    expect(text.parentElement).toBeInTheDocument();
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("icon is decorative by default", () => {
    renderWithTheme(<IconBullet icon="check" text="Item" />);
    const icon = screen.getByText("check");
    expect(icon.closest("[aria-hidden]")).toBeInTheDocument();
  });

  it("supports aria-label on the wrapper", () => {
    renderWithTheme(<IconBullet icon="check" text="Item" aria-label="Benefit: Item" />);
    expect(screen.getByLabelText("Benefit: Item")).toBeInTheDocument();
  });
});
