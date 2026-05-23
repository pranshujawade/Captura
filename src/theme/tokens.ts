/**
 * Auto-generated from docs/tokens.json by scripts/tokens-to-theme.ts
 * DO NOT EDIT MANUALLY — changes will be overwritten on next build.
 */

// ── Color Primitives ──────────────────────────────────────────────
export const color = {
  black: {
    "0": "#000000", // Pure black — deepest background
    "50": "#0A0A08", // Near-black with warm undertone — primary page background
    "100": "#111108", // Section background — subtle lift from base
    "150": "#18170F", // Card / surface background
    "200": "#1F1E14", // Elevated surface — modal, drawer
  },
  gold: {
    "100": "#F5E6A3", // Light gold — highlight text, thin dividers
    "200": "#E8CC6A", // Pale gold — muted label text
    "300": "#D4A843", // Mid gold — secondary action tint
    "400": "#C8952A", // Core brand gold — primary CTA background, icon fills
    "500": "#B8820F", // Rich gold — hover state for primary CTA
    "600": "#9A6B0A", // Deep gold — pressed / active state
    gradientLight: "#F0D060", // Gradient start — logo shine, hero text shimmer
    gradientDark: "#8A5E05", // Gradient end — logo depth, button gradient terminus
  },
  cream: {
    "50": "#FEFCF5", // Off-white — primary body text on dark backgrounds
    "100": "#F7F1DC", // Warm cream — headings, pull quotes
    "200": "#E8DCBB", // Muted cream — secondary body copy, captions
    "300": "#C9BC98", // Dim cream — placeholder text, disabled labels
  },
  overlay: {
    black40: "#00000066", // 40% black overlay — image scrim
    black60: "#00000099", // 60% black overlay — hero image scrim
    black80: "#000000CC", // 80% black overlay — modal backdrop
    gold10: "#C8952A1A", // 10% gold tint — card hover background
    gold20: "#C8952A33", // 20% gold tint — active chip, tag background
  },
} as const;

// ── Gradients ────────────────────────────────────────────────────
export const gradient = {
  goldShine: "linear-gradient(135deg, #F0D060 0%, #C8952A 50%, #8A5E05 100%)", // Primary brand gradient — logo, hero headings, premium CTAs
  goldHorizontal: "linear-gradient(90deg, #8A5E05 0%, #C8952A 40%, #F0D060 60%, #C8952A 80%, #8A5E05 100%)", // Horizontal shimmer — decorative dividers, section separators
  surfaceDepth: "linear-gradient(180deg, #18170F 0%, #0A0A08 100%)", // Dark surface depth — section backgrounds, cards
  heroScrim: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)", // Bottom-weighted scrim over hero photography
  radialGlow: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,149,42,0.18) 0%, rgba(0,0,0,0) 100%)", // Subtle gold ambient glow — centered behind key icons / logo
} as const;

// ── Typography ────────────────────────────────────────────────────
export const typographyFontFamily = {
  heading: "'Cormorant Garamond', 'Garamond', 'Times New Roman', serif", // High-contrast didone-style serif — section headings, pull quotes, brand statements
  subheading: "'Playfair Display', 'Georgia', serif", // Transitional serif — subheadings, card titles
  body: "'Inter', 'Helvetica Neue', 'Arial', sans-serif", // Neutral geometric sans — body copy, UI labels, navigation
  display: "'Cinzel', 'Trajan Pro', serif", // All-caps spaced display — logo wordmark, section eyebrows (e.g. 'CAPTURA')
} as const;

export const typographyFontSize = {
  xs: "12px", // Legal text, footnotes
  sm: "14px", // Captions, labels, nav items
  base: "16px", // Body copy default
  md: "18px", // Lead paragraph, card body
  lg: "20px", // Section subheadings
  xl: "24px", // Card headings, sidebar titles
  "2xl": "30px", // Section headings (h3/h4)
  "3xl": "36px", // Page-level subheadings (h2)
  "4xl": "48px", // Hero subheading (h1 secondary)
  "5xl": "60px", // Hero headline primary
  "6xl": "72px", // Large editorial display text
} as const;

export const typographyFontWeight = {
  light: "300", // Long-form body, spacious editorial text
  regular: "400", // Default body weight
  medium: "500", // UI labels, nav items
  semibold: "600", // Card titles, CTAs
  bold: "700", // Section headings
} as const;

export const typographyLineHeight = {
  tight: "1.1", // Large display headlines
  snug: "1.25", // Subheadings, card titles
  normal: "1.5", // Standard body copy
  relaxed: "1.65", // Long-form editorial paragraphs
  loose: "2.0", // Spaced UI labels, captions
} as const;

export const typographyLetterSpacing = {
  tight: "-0.02em", // Large serif headings
  normal: "0em", // Body text default
  wide: "0.05em", // UI labels, button text
  wider: "0.1em", // Nav items, eyebrow labels
  widest: "0.2em", // All-caps display wordmarks (CAPTURA)
} as const;

// ── Spacing ──────────────────────────────────────────────────────
export const spacing = {
  "0": "0px",
  "1": "4px", // Micro — icon gap, tight list items
  "2": "8px", // XS — inline padding, small gaps
  "3": "12px", // SM — compact input padding
  "4": "16px", // Base — standard component padding
  "5": "20px", // MD — card internal padding
  "6": "24px", // LG — section internal gap
  "8": "32px", // XL — between components
  "10": "40px", // 2XL — section top/bottom padding (mobile)
  "12": "48px", // 3XL — section vertical rhythm
  "16": "64px", // 4XL — hero vertical padding
  "20": "80px", // 5XL — large section vertical padding
  "24": "96px", // 6XL — page-top hero offset
  "32": "128px", // 7XL — full-bleed section breathing room
} as const;

// ── Border Radius ────────────────────────────────────────────────
export const borderRadius = {
  none: "0px", // Square edges — decorative dividers, hero overlays
  xs: "2px", // Subtle rounding — tags, chips
  sm: "4px", // Inputs, secondary buttons
  md: "6px", // Cards, primary buttons
  lg: "8px", // Modal, panels
  xl: "12px", // Feature cards with imagery
  "2xl": "16px", // Large rounded containers
  pill: "9999px", // Badge, stat pill, rounded CTA
  full: "50%", // Circular avatar, icon container
} as const;

// ── Border ──────────────────────────────────────────────────────
export const borderWidth = {
  thin: "1px",
  medium: "2px",
  thick: "3px",
} as const;

export const borderStyle = {
  solid: "solid",
  dashed: "dashed",
} as const;

export const borderColor = {
  default: "#C8952A", // Standard gold border — card outlines, dividers
  subtle: "#8A5E05", // Low-contrast border — input idle state
  strong: "#F0D060", // High-contrast border — focus ring, hover
  surface: "#1F1E14", // Dark border between surfaces
} as const;

// ── Shadows ─────────────────────────────────────────────────────
export const shadow = {
  xs: "0 1px 2px rgba(0,0,0,0.6)",
  sm: "0 2px 8px rgba(0,0,0,0.7)",
  md: "0 4px 16px rgba(0,0,0,0.8)",
  lg: "0 8px 32px rgba(0,0,0,0.85)",
  xl: "0 16px 48px rgba(0,0,0,0.9)",
  goldGlowSm: "0 0 12px rgba(200,149,42,0.4)", // Soft gold glow — icon hover, CTA focus
  goldGlowMd: "0 0 24px rgba(200,149,42,0.5), 0 4px 16px rgba(0,0,0,0.8)", // Medium gold glow — card hover, logo
  goldGlowLg: "0 0 48px rgba(200,149,42,0.6), 0 8px 32px rgba(0,0,0,0.9)", // Large gold aura — hero elements, primary CTA hover
  insetDark: "inset 0 1px 3px rgba(0,0,0,0.8)", // Input field inset depth
} as const;

// ── Motion ──────────────────────────────────────────────────────
export const motionDuration = {
  instant: "0ms",
  fast: "120ms", // Hover state micro-interactions
  normal: "200ms", // Standard transitions
  moderate: "300ms", // Panel open/close, dropdowns
  slow: "500ms", // Page-level enter animations
  deliberate: "700ms", // Hero text reveals, shimmer sweeps
} as const;

export const motionEasing = {
  linear: "linear",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)", // Default smooth — most UI transitions
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)", // Overshoot spring — icon pop, badge appear
} as const;

// ── Opacity ─────────────────────────────────────────────────────
export const opacity = {
  disabled: 0.38, // WCAG-derived disabled state
  muted: 0.6, // Secondary text, inactive icons
  subtle: 0.8, // Slightly de-emphasised elements
  full: 1,
} as const;

// ── Z-Index ─────────────────────────────────────────────────────
export const zIndex = {
  below: -1, // Background layers, pseudo overlays
  base: 0,
  raised: 10, // Cards, section decorations
  dropdown: 100, // Navigation dropdowns, tooltips
  sticky: 200, // Sticky nav bar
  overlay: 300, // Image overlays, drawers
  modal: 400, // Modal dialogs
  toast: 500, // Notification toasts
} as const;

// ── Breakpoints ──────────────────────────────────────────────────
export const breakpoint = {
  sm: "640px", // Large mobile landscape
  md: "768px", // Tablet portrait
  lg: "1024px", // Tablet landscape / small desktop
  xl: "1280px", // Standard desktop
  "2xl": "1536px", // Wide desktop
} as const;

// ── Semantic Tokens ─────────────────────────────────────────────
export const semanticBackground = {
  page: "#0A0A08", // Root page background
  sectionAlt: "#111108", // Alternating section background
  surface: "#18170F", // Card / panel background
  elevated: "#1F1E14", // Modal / dropdown background
  overlay: "#000000CC", // Full-screen modal scrim
} as const;

export const semanticText = {
  primary: "#F7F1DC", // Main headings, body copy
  secondary: "#E8DCBB", // Supporting copy, descriptions
  muted: "#C9BC98", // Placeholders, disabled labels
  accent: "#C8952A", // Gold accent text — links, highlights
  onGold: "#0A0A08", // Text rendered on a gold surface (CTA buttons)
  inverse: "#0A0A08", // Text on light surfaces (rare)
} as const;

export const semanticAction = {
  primaryBg: "#C8952A", // Primary CTA button background
  primaryBgHover: "#B8820F", // Primary CTA hover
  primaryBgActive: "#9A6B0A", // Primary CTA pressed
  primaryText: "#0A0A08", // Text on primary CTA
  secondaryBg: "transparent", // Ghost / outline button background
  secondaryBorder: "#C8952A", // Ghost button border
  secondaryText: "#C8952A", // Ghost button text
  secondaryHoverBg: "#C8952A1A", // Ghost button hover fill
} as const;

export const semanticIcon = {
  default: "#D4A843",
  active: "#C8952A",
  muted: "#C9BC98",
} as const;

export const semanticDivider = {
  default: "#8A5E05", // Horizontal rule, section separator
  strong: "#C8952A", // Feature divider with glow
} as const;

export const semanticFocusRing = {
  color: "#D4A843",
  width: "2px",
  offset: "3px",
} as const;

export const semanticNav = {
  bg: "#0A0A08", // Navbar background — semi-transparent on scroll
  bgScrolled: "#18170F", // Navbar background after scroll
  itemText: "#E8DCBB",
  itemHover: "#D4A843",
  itemActive: "#C8952A",
  dropdownBg: "#1F1E14",
  dropdownBorder: "#8A5E05",
} as const;

export const TOKEN_VERSION = "1.0.0";
