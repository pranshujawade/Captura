"use client";

import { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";

export interface ScrollRevealProps {
  /** Animation direction */
  direction?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade";
  /** Stagger delay in milliseconds (from motion token durations) */
  delay?: number;
  /** Transition duration in milliseconds (from motion token durations) */
  duration?: number;
  /** IntersectionObserver threshold (0-1) */
  threshold?: number;
  /** Content to reveal */
  children?: React.ReactNode;
  /** HTML id */
  id?: string;
  /** Additional styles */
  sx?: Record<string, unknown>;
}

/**
 * ScrollReveal — animates children into view when they enter the viewport.
 *
 * Uses IntersectionObserver and CSS custom properties from motion tokens.
 * Respects prefers-reduced-motion: the global CSS rule in globals.css
 * overrides transition-duration to near-zero when reduced motion is preferred.
 *
 * Motion token reference (CSS custom properties):
 * - --captura-motion-duration-slow: 500ms (default for scroll reveals)
 * - --captura-motion-duration-moderate: 300ms (for quicker reveals)
 * - --captura-motion-easing-ease-out: cubic-bezier(0, 0, 0.2, 1)
 */
export default function ScrollReveal({
  direction = "fade-up",
  delay = 0,
  duration = 500,
  threshold = 0.15,
  children,
  id,
  sx,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Box
      ref={ref}
      id={id}
      className="scroll-reveal"
      data-revealed={revealed ? "true" : "false"}
      data-direction={direction}
      data-delay={delay}
      data-duration={duration}
      sx={{
        "--scroll-reveal-delay": `${delay}ms`,
        "--scroll-reveal-duration": `${duration}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
