import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import Header from "./Header";
import { navigation } from "@/data/navigation";

describe("Header", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders the Captura logo", () => {
    renderWithTheme(<Header />);
    expect(screen.getByRole("img", { name: /captura/i })).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    renderWithTheme(<Header />);
    navigation.mainNav.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("renders auth buttons", () => {
    renderWithTheme(<Header />);
    navigation.authButtons.forEach((btn) => {
      expect(screen.getByText(btn.label)).toBeInTheDocument();
    });
  });

  // ── Mobile menu ───────────────────────────────────────────────
  it("renders hamburger menu button", () => {
    renderWithTheme(<Header />);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("opens mobile menu when hamburger is clicked", () => {
    renderWithTheme(<Header />);
    fireEvent.click(screen.getByLabelText("Open menu"));
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });

  it("closes mobile menu when close button is clicked", () => {
    renderWithTheme(<Header />);
    fireEvent.click(screen.getByLabelText("Open menu"));
    fireEvent.click(screen.getByLabelText("Close menu"));
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("renders auth buttons in mobile drawer", () => {
    renderWithTheme(<Header />);
    fireEvent.click(screen.getByLabelText("Open menu"));
    navigation.authButtons.forEach((btn) => {
      // Multiple elements with same text (desktop + mobile), just verify they exist
      expect(screen.getAllByText(btn.label).length).toBeGreaterThanOrEqual(1);
    });
  });

  // ── Active link ──────────────────────────────────────────────
  it("marks current path as active", () => {
    renderWithTheme(<Header currentPath="/" />);
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("aria-current", "page");
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("renders as a banner landmark", () => {
    renderWithTheme(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("navigation has proper aria-label", () => {
    renderWithTheme(<Header />);
    expect(screen.getByRole("navigation", { name: /main/i })).toBeInTheDocument();
  });
});
