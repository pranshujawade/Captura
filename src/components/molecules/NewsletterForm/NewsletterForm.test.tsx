import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import NewsletterForm from "./NewsletterForm";

describe("NewsletterForm", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders email input and subscribe button", () => {
    renderWithTheme(<NewsletterForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });

  // ── Validation tests ─────────────────────────────────────────
  it("shows error when submitting empty email", () => {
    renderWithTheme(<NewsletterForm />);
    const form = screen.getByRole("form", { name: /newsletter/i });
    fireEvent.submit(form);
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });

  it("shows error for invalid email format", () => {
    renderWithTheme(<NewsletterForm />);
    const input = screen.getByLabelText(/email/i);
    fireEvent.change(input, { target: { value: "notanemail" } });
    const form = screen.getByRole("form", { name: /newsletter/i });
    fireEvent.submit(form);
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });

  // ── Submission tests ──────────────────────────────────────────
  it("calls onSubmit with valid email", () => {
    const onSubmit = vi.fn();
    renderWithTheme(<NewsletterForm onSubmit={onSubmit} />);
    const input = screen.getByLabelText(/email/i);
    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(onSubmit).toHaveBeenCalledWith("test@example.com");
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("form has proper aria-label", () => {
    renderWithTheme(<NewsletterForm />);
    expect(screen.getByRole("form", { name: /newsletter/i })).toBeInTheDocument();
  });

  it("input is required", () => {
    renderWithTheme(<NewsletterForm />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toBeRequired();
  });
});
