import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import Footer from "./Footer";
import { footer } from "@/data/footer";

describe("Footer", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders copyright text", () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText(/2026 Captura/i)).toBeInTheDocument();
  });

  it("renders contact email", () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText(footer.contact.email)).toBeInTheDocument();
  });

  it("renders newsletter heading", () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText(footer.newsletter.heading)).toBeInTheDocument();
  });

  it("renders social links", () => {
    renderWithTheme(<Footer />);
    footer.contact.socialLinks.forEach((link) => {
      expect(screen.getByLabelText(link.platform)).toBeInTheDocument();
    });
  });

  // ── Content integration ──────────────────────────────────────
  it("renders newsletter form", () => {
    renderWithTheme(<Footer />);
    expect(screen.getByRole("form", { name: /newsletter/i })).toBeInTheDocument();
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("renders as a contentinfo landmark", () => {
    renderWithTheme(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("navigation has proper aria-label", () => {
    renderWithTheme(<Footer />);
    expect(screen.getByRole("navigation", { name: /social/i })).toBeInTheDocument();
  });
});
