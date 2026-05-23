import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import SocialLinks from "./SocialLinks";

describe("SocialLinks", () => {
  const links = [
    { icon: "facebook", href: "https://facebook.com/captura", label: "Facebook" },
    { icon: "twitter", href: "https://twitter.com/captura", label: "Twitter" },
    { icon: "instagram", href: "https://instagram.com/captura", label: "Instagram" },
  ];

  // ── Render tests ──────────────────────────────────────────────
  it("renders all social links", () => {
    renderWithTheme(<SocialLinks links={links} />);
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
  });

  it("renders correct href for each link", () => {
    renderWithTheme(<SocialLinks links={links} />);
    expect(screen.getByLabelText("Facebook").closest("a")).toHaveAttribute("href", "https://facebook.com/captura");
  });

  // ── Empty state ──────────────────────────────────────────────
  it("renders nothing when links array is empty", () => {
    const { container } = renderWithTheme(<SocialLinks links={[]} />);
    expect(container.innerHTML).toBe("");
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("each link has an accessible label", () => {
    renderWithTheme(<SocialLinks links={links} />);
    links.forEach((link) => {
      expect(screen.getByLabelText(link.label)).toBeInTheDocument();
    });
  });

  it("renders with navigation landmark", () => {
    renderWithTheme(<SocialLinks links={links} />);
    expect(screen.getByRole("navigation", { name: /social/i })).toBeInTheDocument();
  });
});
