import { shadow } from "./tokens";

/**
 * MUI shadow array derived from Captura design tokens.
 *
 * MUI expects exactly 25 shadow entries (indices 0-24).
 * Our mapping:
 *   0: none
 *   1: xs (neutral)
 *   2: sm (neutral)
 *   3: md (neutral)
 *   4: lg (neutral)
 *   5: xl (neutral)
 *   6: gold-glow-sm
 *   7: gold-glow-md
 *   8: gold-glow-lg
 *   9: inset-dark
 *   10-24: repeat last neutral shadow (MUI requires 25 entries)
 */
const shadows: string[] = [
  "none",                                         // 0
  shadow.xs,                                      // 1
  shadow.sm,                                      // 2
  shadow.md,                                      // 3
  shadow.lg,                                      // 4
  shadow.xl,                                      // 5
  shadow.goldGlowSm,                              // 6
  shadow.goldGlowMd,                              // 7
  shadow.goldGlowLg,                              // 8
  shadow.insetDark,                               // 9
  shadow.lg,                                      // 10
  shadow.lg,                                      // 11
  shadow.lg,                                      // 12
  shadow.lg,                                      // 13
  shadow.lg,                                      // 14
  shadow.lg,                                      // 15
  shadow.lg,                                      // 16
  shadow.lg,                                      // 17
  shadow.lg,                                      // 18
  shadow.lg,                                      // 19
  shadow.lg,                                      // 20
  shadow.lg,                                      // 21
  shadow.lg,                                      // 22
  shadow.lg,                                      // 23
  shadow.lg,                                      // 24
];

// Named shadow indices for semantic access in components
export const ShadowIndex = {
  none: 0,
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
  goldGlowSm: 6,
  goldGlowMd: 7,
  goldGlowLg: 8,
  insetDark: 9,
} as const;

export { shadows };
