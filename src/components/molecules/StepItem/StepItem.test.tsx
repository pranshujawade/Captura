import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import StepItem from "./StepItem";

describe("StepItem", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders step number, title, and description", () => {
    renderWithTheme(
      <StepItem step={1} title="Sign Up" description="Create your free account" />
    );
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Create your free account")).toBeInTheDocument();
  });

  it("renders multi-digit step numbers", () => {
    renderWithTheme(
      <StepItem step={10} title="Step Ten" description="Tenth step" />
    );
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  // ── Layout tests ──────────────────────────────────────────────
  it("renders step number in a circle", () => {
    renderWithTheme(
      <StepItem step={1} title="Title" description="Desc" />
    );
    const stepEl = screen.getByText("01");
    expect(stepEl).toBeInTheDocument();
  });

  // ── Accessibility tests ──────────────────────────────────────
  it("renders as a list item", () => {
    renderWithTheme(
      <StepItem step={1} title="Title" description="Desc" />
    );
    const title = screen.getByText("Title");
    expect(title.closest("li")).toBeInTheDocument();
  });

  it("supports aria-label", () => {
    renderWithTheme(
      <StepItem step={1} title="Title" description="Desc" aria-label="Step 1: Title" />
    );
    expect(screen.getByLabelText("Step 1: Title")).toBeInTheDocument();
  });
});
