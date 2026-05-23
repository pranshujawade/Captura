import { describe, it, expect } from "vitest";
import theme from "@/theme";
import { TOKEN_VERSION } from "@/theme/tokens";
import { ShadowIndex } from "@/theme/shadows";

describe("MUI Theme", () => {
  it("creates a valid MUI theme", () => {
    expect(theme).toBeDefined();
    expect(theme.palette).toBeDefined();
    expect(theme.typography).toBeDefined();
  });

  it("is in dark mode", () => {
    expect(theme.palette.mode).toBe("dark");
  });

  it("has the Captura page background color", () => {
    expect(theme.palette.background.default).toBe("#0A0A08");
  });

  it("has gold as the primary color", () => {
    expect(theme.palette.primary.main).toBe("#C8952A");
    expect(theme.palette.primary.contrastText).toBe("#0A0A08");
  });

  it("has the gold palette augmentation", () => {
    expect(theme.palette.gold).toBeDefined();
    expect(theme.palette.gold.main).toBe("#C8952A");
    expect(theme.palette.gold["400"]).toBe("#C8952A");
  });

  it("uses cream text colors", () => {
    expect(theme.palette.text.primary).toBe("#F7F1DC");
    expect(theme.palette.text.secondary).toBe("#E8DCBB");
  });

  it("has 8px spacing base", () => {
    expect(theme.spacing(1)).toBe("8px");
    expect(theme.spacing(2)).toBe("16px");
    expect(theme.spacing(0.5)).toBe("4px");
  });

  it("has correct breakpoints", () => {
    expect(theme.breakpoints.values.sm).toBe(640);
    expect(theme.breakpoints.values.md).toBe(768);
    expect(theme.breakpoints.values.lg).toBe(1024);
    expect(theme.breakpoints.values.xl).toBe(1280);
  });

  it("has 25 shadow entries", () => {
    expect(theme.shadows).toHaveLength(25);
  });

  it("maps gold-glow shadows to correct indices", () => {
    expect(theme.shadows[ShadowIndex.goldGlowSm]).toContain("rgba(200,149,42,0.4)");
    expect(theme.shadows[ShadowIndex.goldGlowMd]).toContain("rgba(200,149,42,0.5)");
    expect(theme.shadows[ShadowIndex.goldGlowLg]).toContain("rgba(200,149,42,0.6)");
  });

  it("has the display typography variant", () => {
    expect(theme.typography.display).toBeDefined();
    expect(theme.typography.display.fontFamily).toContain("--captura-typography-font-family-display");
    expect(theme.typography.display.letterSpacing).toBe("0.2em");
    expect(theme.typography.display.textTransform).toBe("uppercase");
  });

  it("heading variants use heading font CSS variable", () => {
    expect(theme.typography.h1?.fontFamily).toContain("--captura-typography-font-family-heading");
    expect(theme.typography.h2?.fontFamily).toContain("--captura-typography-font-family-heading");
    expect(theme.typography.h3?.fontFamily).toContain("--captura-typography-font-family-heading");
  });

  it("subheading variants use subheading font CSS variable", () => {
    expect(theme.typography.h4?.fontFamily).toContain("--captura-typography-font-family-subheading");
    expect(theme.typography.h5?.fontFamily).toContain("--captura-typography-font-family-subheading");
    expect(theme.typography.h6?.fontFamily).toContain("--captura-typography-font-family-subheading");
  });

  it("body variants use body font CSS variable", () => {
    expect(theme.typography.body1?.fontFamily).toContain("--captura-typography-font-family-body");
    expect(theme.typography.body2?.fontFamily).toContain("--captura-typography-font-family-body");
  });

  it("has the correct token version", () => {
    expect(TOKEN_VERSION).toBe("1.0.0");
  });

  it("has 6px border radius as default shape", () => {
    expect(theme.shape.borderRadius).toBe(6);
  });
});
