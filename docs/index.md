# Wellness Platform - Product Documentation

Enterprise PRD suite for a hybrid DTC + curated marketplace wellness brand platform, India-first.

---

## Document Suite

This documentation covers the full product specification for building a wellness e-commerce platform that combines three surfaces:

1. **Branded DTC Storefront** -- own supplements & skincare products sold directly to consumers
2. **Curated Marketplace** -- vetted third-party wellness sellers (invite-only)
3. **Editorial Content Hub** -- wellness articles, expert advice, ingredient deep-dives

## Documents

| # | Document | Purpose | Audience |
|---|----------|---------|----------|
| 1 | [BMRD](01-BMRD-business-market-requirements.md) | Business case, market analysis, personas, regulatory landscape, unit economics | Stakeholders, investors |
| 2 | [PRD](02-PRD-product-requirements.md) | Feature modules with user stories, acceptance criteria, edge cases | Design, Engineering, AI agents |
| 3 | [IA](03-IA-information-architecture.md) | Sitemap, navigation, URL architecture, content taxonomy, search/filter specs | Design, Engineering |
| 4 | [TAD](04-TAD-technical-architecture.md) | Platform evaluation (Shopify analysis), tech stack, integrations, data architecture | Engineering, DevOps |
| 5 | [FSD](05-FSD-functional-specifications.md) | State machines, business rules, complex flows, API contracts | Engineering, QA, AI agents |

## Key Parameters

| Parameter | Value |
|-----------|-------|
| **Business Model** | Hybrid (own brand + curated third-party sellers) |
| **Product Categories** | Supplements & Nutrition, Skincare & Beauty |
| **Community** | Editorial content hub (blog, expert advice) |
| **Purchases** | One-time only (no subscriptions) |
| **Geography** | India first |
| **Seller Model** | Curated / invite-only |
| **Platform Recommendation** | Custom headless (Next.js + Medusa.js + Strapi) -- Shopify not recommended |

## Phasing

- **Phase 1 (MVP)**: Own-brand storefront + content hub + full shopping flow
- **Phase 2**: Marketplace layer (seller onboarding, multi-seller checkout, payouts)
- **Phase 3**: Personalization, loyalty, native mobile app, AI recommendations

## Document Conventions

These documents are structured for dual consumption by **human developers** and **AI coding agents**:

- Every feature has a unique ID (e.g., `F-CAT-001`, `F-MKT-003`)
- Every business rule has a unique ID (e.g., `BR-CHK-001`)
- Acceptance criteria are testable checklists
- State machines define all valid state transitions
- RFC 2119 language: **MUST** / **SHOULD** / **MAY**
- All data types and constraints are explicit
