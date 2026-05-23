import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import CapturaLogo from "./CapturaLogo";

describe("CapturaLogo", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders the logo image", () => {
    renderWithTheme(<CapturaLogo />);
    const img = screen.getByRole("img", { name: /captura/i });
    expect(img).toBeInTheDocument();
  });

  it("renders as a link to home", () => {
    renderWithTheme(<CapturaLogo />);
    const link = screen.getByRole("link", { name: /captura home/i });
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders with default variant", () => {
    renderWithTheme(<CapturaLogo />);
    expect(screen.getByRole("img", { name: /captura/i })).toBeInTheDocument();
  });

  it("renders with footer variant", () => {
    renderWithTheme(<CapturaLogo variant="footer" />);
    expect(screen.getByRole("img", { name: /captura/i })).toBeInTheDocument();
  });

  // ── Accessibility ──────────────────────────────────────────────
  it("has an accessible label on the link", () => {
    renderWithTheme(<CapturaLogo />);
    expect(screen.getByRole("link")).toHaveAccessibleName();
  });
});
