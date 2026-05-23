import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import CapturaNavLink from "./CapturaNavLink";

describe("CapturaNavLink", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders link text", () => {
    renderWithTheme(<CapturaNavLink href="/about">About Us</CapturaNavLink>);
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  // ── Variant tests ─────────────────────────────────────────────
  it("renders default variant", () => {
    renderWithTheme(<CapturaNavLink href="/home">Home</CapturaNavLink>);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders active variant", () => {
    renderWithTheme(<CapturaNavLink href="/home" active>Home</CapturaNavLink>);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  // ── Href tests ───────────────────────────────────────────────
  it("renders with correct href", () => {
    renderWithTheme(<CapturaNavLink href="/about">About</CapturaNavLink>);
    const link = screen.getByText("About").closest("a");
    expect(link).toHaveAttribute("href", "/about");
  });

  // ── Interaction tests ────────────────────────────────────────
  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    renderWithTheme(<CapturaNavLink href="/test" onClick={onClick}>Test</CapturaNavLink>);
    fireEvent.click(screen.getByText("Test"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("renders as a link element", () => {
    renderWithTheme(<CapturaNavLink href="/about">About</CapturaNavLink>);
    const link = screen.getByText("About").closest("a");
    expect(link).toBeInTheDocument();
  });

  it("supports aria-current for active link", () => {
    renderWithTheme(<CapturaNavLink href="/home" active>Home</CapturaNavLink>);
    const link = screen.getByText("Home").closest("a");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("supports aria-label", () => {
    renderWithTheme(<CapturaNavLink href="/about" aria-label="Learn more about us">About</CapturaNavLink>);
    expect(screen.getByLabelText("Learn more about us")).toBeInTheDocument();
  });
});
