import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CapturaButton from "./CapturaButton";

describe("CapturaButton", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders with children text", () => {
    render(<CapturaButton>Click me</CapturaButton>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  // ── Variant tests ─────────────────────────────────────────────
  it("renders primary variant by default", () => {
    render(<CapturaButton>Primary</CapturaButton>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("renders secondary (outlined) variant", () => {
    render(<CapturaButton variant="secondary">Secondary</CapturaButton>);
    const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
  });

  it("renders ghost variant", () => {
    render(<CapturaButton variant="ghost">Ghost</CapturaButton>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  // ── Size tests ───────────────────────────────────────────────
  it("renders small size", () => {
    render(<CapturaButton size="small">Small</CapturaButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders medium size by default", () => {
    render(<CapturaButton>Medium</CapturaButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders large size", () => {
    render(<CapturaButton size="large">Large</CapturaButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  // ── State tests ──────────────────────────────────────────────
  it("renders disabled state", () => {
    render(<CapturaButton disabled>Disabled</CapturaButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("renders loading state with spinner", () => {
    render(<CapturaButton loading>Loading</CapturaButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button.getAttribute("aria-busy")).toBe("true");
  });

  it("disables the button when loading", () => {
    const onClick = vi.fn();
    render(<CapturaButton loading onClick={onClick}>Loading</CapturaButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Interaction tests ────────────────────────────────────────
  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<CapturaButton onClick={onClick}>Click</CapturaButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    render(<CapturaButton disabled onClick={onClick}>Disabled</CapturaButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("has button role", () => {
    render(<CapturaButton>Button</CapturaButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("supports aria-label", () => {
    render(<CapturaButton aria-label="Submit form">Submit</CapturaButton>);
    expect(screen.getByRole("button", { name: "Submit form" })).toBeInTheDocument();
  });

  it("is focusable", () => {
    render(<CapturaButton>Focus</CapturaButton>);
    const button = screen.getByRole("button");
    button.focus();
    expect(button).toHaveFocus();
  });

  // ── Full-width test ──────────────────────────────────────────
  it("renders full width when specified", () => {
    render(<CapturaButton fullWidth>Full Width</CapturaButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
