import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import CapturaIcon from "./CapturaIcon";

describe("CapturaIcon", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders an icon element", () => {
    renderWithTheme(<CapturaIcon>star</CapturaIcon>);
    expect(screen.getByText("star")).toBeInTheDocument();
  });

  // ── Color variant tests ──────────────────────────────────────
  it("renders with default color", () => {
    renderWithTheme(<CapturaIcon>default_icon</CapturaIcon>);
    expect(screen.getByText("default_icon")).toBeInTheDocument();
  });

  it("renders with active color", () => {
    renderWithTheme(<CapturaIcon color="active">active_icon</CapturaIcon>);
    expect(screen.getByText("active_icon")).toBeInTheDocument();
  });

  it("renders with muted color", () => {
    renderWithTheme(<CapturaIcon color="muted">muted_icon</CapturaIcon>);
    expect(screen.getByText("muted_icon")).toBeInTheDocument();
  });

  // ── Size tests ───────────────────────────────────────────────
  it("renders with small size", () => {
    renderWithTheme(<CapturaIcon size="small">sm_icon</CapturaIcon>);
    expect(screen.getByText("sm_icon")).toBeInTheDocument();
  });

  it("renders with medium size by default", () => {
    renderWithTheme(<CapturaIcon>md_icon</CapturaIcon>);
    expect(screen.getByText("md_icon")).toBeInTheDocument();
  });

  it("renders with large size", () => {
    renderWithTheme(<CapturaIcon size="large">lg_icon</CapturaIcon>);
    expect(screen.getByText("lg_icon")).toBeInTheDocument();
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("has role=img when aria-label is provided", () => {
    renderWithTheme(<CapturaIcon aria-label="Star icon">star</CapturaIcon>);
    expect(screen.getByRole("img", { name: "Star icon" })).toBeInTheDocument();
  });

  it("has aria-hidden when no label is provided", () => {
    renderWithTheme(<CapturaIcon>decorative</CapturaIcon>);
    expect(screen.getByText("decorative").closest("[aria-hidden]")).toBeInTheDocument();
  });
});
