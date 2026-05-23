import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import ProfileCard from "./ProfileCard";

describe("ProfileCard", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders name and title", () => {
    renderWithTheme(
      <ProfileCard name="Dr. Sarah Chen" title="Chief Scientific Officer" />
    );
    expect(screen.getByText("Dr. Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("Chief Scientific Officer")).toBeInTheDocument();
  });

  it("renders avatar with initials when no image src", () => {
    renderWithTheme(
      <ProfileCard name="Jane Doe" title="Director" />
    );
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders avatar image when src provided", () => {
    renderWithTheme(
      <ProfileCard name="Jane Doe" title="Director" avatarSrc="/images/jane.jpg" />
    );
    const img = screen.getByRole("img", { name: "Jane Doe" });
    expect(img).toBeInTheDocument();
  });

  // ── CapturaCard integration ───────────────────────────────────
  it("renders inside a CapturaCard", () => {
    renderWithTheme(
      <ProfileCard name="Jane Doe" title="Director" />
    );
    const name = screen.getByText("Jane Doe");
    expect(name.closest("[class*='MuiCard']")).toBeInTheDocument();
  });

  // ── Optional bio ─────────────────────────────────────────────
  it("renders bio when provided", () => {
    renderWithTheme(
      <ProfileCard name="Jane Doe" title="Director" bio="Expert in nutrition" />
    );
    expect(screen.getByText("Expert in nutrition")).toBeInTheDocument();
  });

  it("does not render bio section when omitted", () => {
    renderWithTheme(
      <ProfileCard name="Jane Doe" title="Director" />
    );
    expect(screen.queryByText("Expert in nutrition")).not.toBeInTheDocument();
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("renders as an article element", () => {
    renderWithTheme(
      <ProfileCard name="Jane Doe" title="Director" />
    );
    const name = screen.getByText("Jane Doe");
    expect(name.closest("article")).toBeInTheDocument();
  });

  it("supports aria-label", () => {
    renderWithTheme(
      <ProfileCard name="Jane" title="Dir" aria-label="Profile: Jane" />
    );
    expect(screen.getByLabelText("Profile: Jane")).toBeInTheDocument();
  });
});
