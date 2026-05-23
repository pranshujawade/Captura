# Captura — Project Rules

## Project Identity

- **Project**: Captura Inc. — Premium health supplements brand website
- **Stack**: Next.js 16+ (App Router), TypeScript 5.x strict, MUI v7+, React 19+
- **Design tokens**: `docs/tokens.json` (W3C DTCG compliant)
- **Target**: Static v1, API-first for Flutter compatibility
- **Pages**: Home (`/`), About Us (`/about`), Community (`/community`)

## Architecture Constraints

- App Router only — no Pages Router
- All components are Server Components by default; add `"use client"` only when interactivity requires it (event handlers, hooks, browser APIs)
- MUI theming via `@mui/material` + `AppRouterCacheProvider`; no inline styles, no `sx` prop for values that exist in the theme
- Design tokens from `docs/tokens.json` are the single source of truth. The MUI theme object is derived from tokens, never the reverse
- API routes live under `src/app/api/` and return JSON. They are the contract surface for the future Flutter app
- Static content for v1: no database, no CMS. Content lives in `src/data/` as TypeScript constants
- Images go in `public/images/` with Next.js `<Image>` component (optimized, lazy-loaded, with blur placeholders)

## File Organization

```
src/
├── app/                    # Next.js App Router pages and API routes
├── components/
│   ├── atoms/              # Indivisible primitives (Button, Typography, Icon, Divider)
│   ├── molecules/          # Composed from atoms (ValueCard, StepItem, ProfileCard)
│   ├── organisms/          # Page sections (HeroSection, FounderStory, Navbar, Footer)
│   └── templates/          # Page layouts (HomePage, AboutPage, CommunityPage)
├── theme/                  # MUI theme system (derived from tokens)
├── data/                   # Static content (v1 CMS replacement)
├── lib/                    # Shared utilities, hooks, API client
└── types/                  # Shared TypeScript interfaces
```

## Naming Conventions

- **Files**: kebab-case (`value-card.tsx`, `hero-section.test.tsx`)
- **Components**: PascalCase exports matching filename (`ValueCard`, `HeroSection`)
- **Props interfaces**: `{ComponentName}Props` (e.g., `ValueCardProps`)
- **Hooks**: `use{Verb}{Noun}` (e.g., `useScrollPosition`)
- **Test files**: Co-located, `{filename}.test.tsx`
- **API route files**: `route.ts` inside `src/app/api/{resource}/`
- **Types**: `export interface` for objects, `export type` for unions/intersections
- **Data files**: Named exports matching the page/section (`heroContent`, `founderStory`)

## TDD Requirements (Non-Negotiable)

- **Red-Green-Refactor cycle**: Write failing test first, then implement, then refactor
- Every component MUST have a test file before the component file is considered complete
- Test file is written FIRST — this is verified by the test-guardian agent
- Minimum test categories per component:
  - **Render test**: Component renders without crashing
  - **Props test**: All variants render correctly
  - **Accessibility test**: Correct ARIA attributes, keyboard navigation
  - **State test**: Interactive states (hover, focus, disabled, loading)
- Coverage gate: 80% line coverage, 100% for atoms and theme modules
- Testing stack: Vitest + React Testing Library + jest-dom matchers

## Design Token Usage Rules

- **Never hard-code a value that exists in `docs/tokens.json`**
- Access tokens through the MUI theme: `theme.palette.primary.main`, `theme.typography.h1`, `theme.spacing(4)`
- For values not in MUI theme (gradients, overlays, motion): use CSS custom properties (`var(--captura-*)`)
- Token references use semantic names: `theme.palette.text.primary`, NOT `theme.palette.cream[100]`
- The 3-tier token architecture: Primitive (in tokens.json) -> Semantic (in tokens.json `semantic` key) -> Component (in MUI theme overrides)
- When adding a new visual value: add it to `docs/tokens.json` first, then run `npm run tokens:generate`, then derive it in theme, then use it in components

## Component Creation Pattern

Every component MUST follow this order:
1. Create the test file with failing tests for all variants and states
2. Create the TypeScript interface for props
3. Implement the component using theme tokens only
4. Verify all tests pass (green)
5. Refactor if needed, re-verify tests
6. Add the component export to the appropriate barrel file

## MUI-Specific Rules

- Use MUI v7+ API (no deprecated v5 patterns)
- Theme creation via `createTheme()` in `theme/index.ts`
- Component overrides in `theme/components.ts`
- Use `Box` for layout primitives, `Stack` for flex containers, `Grid` for grid layouts
- Use MUI's `CssBaseline` for global resets
- Font loading via `next/font/google` — never `@import` in CSS
- SSR-compatible theme: use `AppRouterCacheProvider` from `@mui/material-nextjs`
- No `!important` overrides. If you need it, the theme is wrong

## Definition of Done (Per Increment)

An increment is done when ALL of these are true:
- All tests pass (`vitest run` exits 0)
- TypeScript compiles without errors (`tsc --noEmit` exits 0)
- ESLint passes (`eslint src/` exits 0)
- Coverage gate met (80% line, 100% for atoms/theme)
- No hard-coded design values in components
- Component renders correctly in all responsive breakpoints
- Accessibility: keyboard-navigable, correct ARIA, no contrast violations
- API routes return correct JSON shape with proper status codes
- No console.log or debug artifacts remain

## Harness Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `test` | `vitest run` | Unit + integration tests |
| `test:coverage` | `vitest run --coverage` | Coverage report |
| `typecheck` | `tsc --noEmit` | TypeScript strict mode check |
| `lint` | `eslint src/` | Code quality + a11y rules |
| `build` | `next build` | Production build verification |
| `tokens:generate` | `npx tsx scripts/tokens-to-theme.ts` | Regenerate tokens from tokens.json |
| `tokens:check` | `npx tsx scripts/token-check.ts` | No hardcoded visual values in components |
| `gate` | Runs test + typecheck + lint + build | Increment quality gate |
