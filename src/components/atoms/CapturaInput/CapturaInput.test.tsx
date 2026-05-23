import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import CapturaInput from "./CapturaInput";

describe("CapturaInput", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders an input field", () => {
    renderWithTheme(<CapturaInput label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  // ── Label and placeholder tests ──────────────────────────────
  it("renders with placeholder", () => {
    renderWithTheme(<CapturaInput label="Email" placeholder="Enter your email" />);
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });

  // ── Error state tests ────────────────────────────────────────
  it("renders with error state", () => {
    renderWithTheme(<CapturaInput label="Email" error helperText="Invalid email" />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("renders without error by default", () => {
    renderWithTheme(<CapturaInput label="Email" />);
    const input = screen.getByLabelText("Email");
    // MUI sets aria-invalid="false" when not in error
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  // ── Size tests ───────────────────────────────────────────────
  it("renders small size", () => {
    renderWithTheme(<CapturaInput label="Small" size="small" />);
    expect(screen.getByLabelText("Small")).toBeInTheDocument();
  });

  it("renders medium size by default", () => {
    renderWithTheme(<CapturaInput label="Medium" />);
    expect(screen.getByLabelText("Medium")).toBeInTheDocument();
  });

  // ── Full width test ──────────────────────────────────────────
  it("renders full width", () => {
    renderWithTheme(<CapturaInput label="Full" fullWidth />);
    expect(screen.getByLabelText("Full")).toBeInTheDocument();
  });

  // ── Interaction tests ────────────────────────────────────────
  it("calls onChange when typed into", () => {
    const onChange = vi.fn();
    renderWithTheme(<CapturaInput label="Type" onChange={onChange} />);
    const input = screen.getByLabelText("Type");
    fireEvent.change(input, { target: { value: "hello" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  // ── Disabled state ───────────────────────────────────────────
  it("renders disabled input", () => {
    renderWithTheme(<CapturaInput label="Disabled" disabled />);
    expect(screen.getByLabelText("Disabled")).toBeDisabled();
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("input is associated with label", () => {
    renderWithTheme(<CapturaInput label="Username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("marks input as invalid when error", () => {
    renderWithTheme(<CapturaInput label="Email" error />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("supports aria-label without visible label", () => {
    renderWithTheme(<CapturaInput aria-label="Search" />);
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });
});
