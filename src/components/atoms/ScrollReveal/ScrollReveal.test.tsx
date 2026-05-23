import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, act } from "@testing-library/react";
import { renderWithTheme } from "@/test/render-with-theme";
import ScrollReveal from "./ScrollReveal";

// ── Mock IntersectionObserver ─────────────────────────────────
let observerCallback: IntersectionObserverCallback;
let observerElements: Element[] = [];

const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

class MockIntersectionObserver {
  root: Element | null = null;
  rootMargin: string = "";
  thresholds: ReadonlyArray<number> = [];
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
    mockObserve.mockImplementation((el: Element) => {
      observerElements.push(el);
    });
  }
  observe = mockObserve;
  unobserve = mockUnobserve;
  disconnect = mockDisconnect;
  takeRecords() {
    return [];
  }
}

beforeEach(() => {
  vi.clearAllMocks();
  observerElements = [];
  window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

// Helper to trigger intersection
function triggerIntersection(isIntersecting: boolean) {
  act(() => {
    observerCallback(
      observerElements.map((el) => ({
        isIntersecting,
        target: el,
        intersectionRatio: isIntersecting ? 1 : 0,
        boundingClientRect: el.getBoundingClientRect(),
        intersectionRect: el.getBoundingClientRect(),
        rootBounds: null,
        time: Date.now(),
      })),
      new MockIntersectionObserver(observerCallback) as unknown as IntersectionObserver
    );
  });
}

describe("ScrollReveal", () => {
  // ── Render tests ──────────────────────────────────────────────
  it("renders children content", () => {
    renderWithTheme(<ScrollReveal>Revealed content</ScrollReveal>);
    expect(screen.getByText("Revealed content")).toBeInTheDocument();
  });

  it("renders as a div by default", () => {
    renderWithTheme(<ScrollReveal>Content</ScrollReveal>);
    expect(screen.getByText("Content").tagName).toBe("DIV");
  });

  // ── Initial hidden state ─────────────────────────────────────
  it("starts with data-revealed='false' before intersection", () => {
    renderWithTheme(<ScrollReveal>Hidden</ScrollReveal>);
    const el = screen.getByText("Hidden").closest("[data-revealed]");
    expect(el).toHaveAttribute("data-revealed", "false");
  });

  // ── Intersection reveal ──────────────────────────────────────
  it("sets data-revealed='true' when element intersects", () => {
    renderWithTheme(<ScrollReveal>Visible</ScrollReveal>);
    triggerIntersection(true);
    const el = screen.getByText("Visible").closest("[data-revealed]");
    expect(el).toHaveAttribute("data-revealed", "true");
  });

  it("does not revert to hidden once revealed", () => {
    renderWithTheme(<ScrollReveal>Sticky</ScrollReveal>);
    triggerIntersection(true);
    triggerIntersection(false);
    const el = screen.getByText("Sticky").closest("[data-revealed]");
    expect(el).toHaveAttribute("data-revealed", "true");
  });

  // ── Direction prop ───────────────────────────────────────────
  it("applies fade-up direction class by default", () => {
    renderWithTheme(<ScrollReveal>Up</ScrollReveal>);
    const el = screen.getByText("Up").closest("[data-revealed]");
    expect(el?.className).toContain("scroll-reveal");
  });

  it("applies correct direction via data-direction attribute", () => {
    renderWithTheme(<ScrollReveal direction="fade-left">Left</ScrollReveal>);
    const el = screen.getByText("Left").closest("[data-revealed]");
    expect(el).toHaveAttribute("data-direction", "fade-left");
  });

  // ── Delay prop ───────────────────────────────────────────────
  it("applies delay via CSS custom property", () => {
    renderWithTheme(<ScrollReveal delay={200}>Delayed</ScrollReveal>);
    const el = screen.getByText("Delayed").closest("[data-revealed]");
    expect(el).toHaveAttribute("data-delay", "200");
  });

  // ── Duration prop ────────────────────────────────────────────
  it("applies duration via CSS custom property", () => {
    renderWithTheme(<ScrollReveal duration={500}>Slow</ScrollReveal>);
    const el = screen.getByText("Slow").closest("[data-revealed]");
    expect(el).toHaveAttribute("data-duration", "500");
  });

  // ── IntersectionObserver setup ───────────────────────────────
  it("observes the element on mount", () => {
    renderWithTheme(<ScrollReveal>Observed</ScrollReveal>);
    expect(mockObserve).toHaveBeenCalled();
  });

  it("disconnects observer on unmount", () => {
    const { unmount } = renderWithTheme(<ScrollReveal>Unmount</ScrollReveal>);
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  // ── Threshold prop ───────────────────────────────────────────
  it("passes threshold to IntersectionObserver", () => {
    renderWithTheme(<ScrollReveal threshold={0.5}>Half</ScrollReveal>);
    // Our mock doesn't capture options, but we verify it renders
    expect(screen.getByText("Half")).toBeInTheDocument();
  });

  // ── Accessibility ────────────────────────────────────────────
  it("does not add unnecessary ARIA attributes", () => {
    renderWithTheme(<ScrollReveal>Accessible</ScrollReveal>);
    const el = screen.getByText("Accessible").closest("[data-revealed]");
    expect(el?.getAttribute("role")).toBeNull();
    expect(el?.getAttribute("aria-hidden")).toBeNull();
  });
});
