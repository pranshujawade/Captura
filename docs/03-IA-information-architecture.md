# IA: Information Architecture Document

**Document ID**: IA-v1.0
**Status**: Draft
**Author**: [Product Manager + UX Designer]
**Last Updated**: [Date]
**Audience**: Design, Engineering, AI coding agents
**Dependencies**: PRD (Doc 02)

---

## 1. Sitemap

### 1.1 Complete Sitemap (Hierarchical)

```
[Brand Name] Platform
│
├── Home (/)
│   ├── Hero section (rotating banners)
│   ├── Featured categories
│   ├── Bestsellers carousel
│   ├── New arrivals carousel
│   ├── Content hub highlights (latest 3 articles)
│   └── Trust bar (FSSAI, secure payments, free shipping threshold)
│
├── Shop (/shop)
│   ├── All Products (/shop/all)
│   │
│   ├── Supplements & Nutrition (/shop/supplements)
│   │   ├── Vitamins & Minerals (/shop/supplements/vitamins-minerals)
│   │   ├── Protein & Fitness (/shop/supplements/protein-fitness)
│   │   ├── Immunity & Wellness (/shop/supplements/immunity-wellness)
│   │   ├── Digestive Health (/shop/supplements/digestive-health)
│   │   ├── Herbal & Ayurvedic (/shop/supplements/herbal-ayurvedic)
│   │   ├── Women's Health (/shop/supplements/womens-health)
│   │   └── Men's Health (/shop/supplements/mens-health)
│   │
│   ├── Skincare & Beauty (/shop/skincare)
│   │   ├── Face Care (/shop/skincare/face-care)
│   │   ├── Body Care (/shop/skincare/body-care)
│   │   ├── Hair Care (/shop/skincare/hair-care)
│   │   ├── Sun Protection (/shop/skincare/sun-protection)
│   │   └── Lip Care (/shop/skincare/lip-care)
│   │
│   ├── Shop by Concern (/shop/concern)
│   │   ├── Immunity (/shop/concern/immunity)
│   │   ├── Energy & Stamina (/shop/concern/energy)
│   │   ├── Sleep & Relaxation (/shop/concern/sleep)
│   │   ├── Skin Glow (/shop/concern/skin-glow)
│   │   ├── Weight Management (/shop/concern/weight-management)
│   │   ├── Hair Health (/shop/concern/hair-health)
│   │   ├── Stress & Mood (/shop/concern/stress-mood)
│   │   └── Gut Health (/shop/concern/gut-health)
│   │
│   └── Shop by Brand (/shop/brands) [Phase 2]
│       ├── [Own Brand] (/shop/brands/own-brand)
│       └── [Seller Brand Slug] (/shop/brands/[seller-slug])
│
├── Product Detail Page (/shop/[category]/[product-slug])
│
├── Journal (/journal)
│   ├── All Articles (/journal) [default listing]
│   ├── Wellness Tips (/journal/wellness-tips)
│   ├── Expert Advice (/journal/expert-advice)
│   ├── Ingredient Deep Dives (/journal/ingredients)
│   ├── Brand Stories (/journal/brand-stories)
│   ├── Article Detail (/journal/[category-slug]/[article-slug])
│   └── Author Profile (/journal/authors/[author-slug])
│
├── About (/about)
│   ├── Our Story (/about/story)
│   ├── Our Standards (/about/standards)
│   │   (quality curation process, FSSAI verification, testing protocols)
│   └── Sell With Us (/sell-with-us)
│       (seller application landing page + form)
│
├── Search Results (/search?q=[query])
│
├── Account (/account) [requires login]
│   ├── Profile (/account/profile)
│   ├── Orders (/account/orders)
│   │   └── Order Detail (/account/orders/[order-id])
│   ├── Addresses (/account/addresses)
│   └── Wishlist (/account/wishlist)
│
├── Cart (/cart)
│
├── Checkout (/checkout) [requires login]
│   ├── Address step (/checkout#address)
│   ├── Shipping step (/checkout#shipping)
│   ├── Payment step (/checkout#payment)
│   └── Confirmation (/checkout/confirmation/[order-id])
│
├── Login (/login)
│   ├── OTP Login (/login#otp)
│   └── Email Login (/login#email)
│
├── Register (/register)
│
├── Static Pages
│   ├── Privacy Policy (/privacy)
│   ├── Terms & Conditions (/terms)
│   ├── Return & Refund Policy (/returns)
│   ├── Shipping Policy (/shipping-policy)
│   ├── Contact Us (/contact)
│   └── FAQ (/faq)
│
└── Seller Portal [Phase 2] (seller.domain.com OR /seller)
    ├── Seller Login (seller.domain.com/login)
    ├── Seller Dashboard (seller.domain.com/dashboard)
    ├── Products (seller.domain.com/products)
    │   ├── Product List (seller.domain.com/products)
    │   ├── Add Product (seller.domain.com/products/new)
    │   └── Edit Product (seller.domain.com/products/[id]/edit)
    ├── Orders (seller.domain.com/orders)
    │   └── Order Detail (seller.domain.com/orders/[sub-order-id])
    ├── Payouts (seller.domain.com/payouts)
    ├── Reviews (seller.domain.com/reviews)
    ├── Profile (seller.domain.com/profile)
    └── Support (seller.domain.com/support)
```

### 1.2 Admin Panel Sitemap (Internal)

```
Admin Panel (admin.domain.com)
│
├── Dashboard (/dashboard)
├── Products (/products)
│   ├── All Products (/products)
│   ├── Add Product (/products/new)
│   ├── Edit Product (/products/[id]/edit)
│   ├── Categories (/products/categories)
│   ├── Moderation Queue (/products/moderation) [Phase 2]
│   └── Bulk Import (/products/import)
├── Orders (/orders)
│   ├── All Orders (/orders)
│   ├── Order Detail (/orders/[id])
│   └── Disputes (/orders/disputes) [Phase 2]
├── Sellers (/sellers) [Phase 2]
│   ├── Applications (/sellers/applications)
│   ├── Active Sellers (/sellers/active)
│   ├── Seller Detail (/sellers/[id])
│   └── Payouts (/sellers/payouts)
├── Customers (/customers)
│   ├── Customer List (/customers)
│   └── Customer Detail (/customers/[id])
├── Content (/content)
│   └── [Link to Headless CMS Dashboard]
├── Promos (/promos)
│   ├── Coupon List (/promos)
│   └── Create Coupon (/promos/new)
├── Reports (/reports)
│   ├── Sales Report (/reports/sales)
│   ├── Customer Report (/reports/customers)
│   ├── Product Report (/reports/products)
│   ├── Payment Report (/reports/payments)
│   ├── Shipping Report (/reports/shipping)
│   └── Seller Report (/reports/sellers) [Phase 2]
└── Settings (/settings)
    ├── General (site name, logo, contact info)
    ├── Shipping (rates, zones, carrier config)
    ├── Payments (gateway config)
    ├── Tax/GST (HSN mapping, rates)
    ├── Notifications (email/SMS templates)
    └── Admin Users (roles, permissions)
```

---

## 2. Navigation Design

### 2.1 Desktop Navigation

**Primary Navigation Bar** (sticky header):

```
[Logo]  |  Shop ▼  |  Journal  |  About ▼  |  [Search Icon] [Wishlist Icon] [Cart Icon (badge)] [Account Icon]
```

**Shop Mega Menu** (triggered on hover/click):

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  Supplements & Nutrition    Skincare & Beauty     Shop by Concern        │
│  ─────────────────────     ─────────────────     ────────────────        │
│  Vitamins & Minerals       Face Care              Immunity               │
│  Protein & Fitness         Body Care              Energy & Stamina       │
│  Immunity & Wellness       Hair Care              Sleep & Relaxation     │
│  Digestive Health          Sun Protection          Skin Glow             │
│  Herbal & Ayurvedic        Lip Care               Weight Management     │
│  Women's Health                                    Hair Health           │
│  Men's Health                                      Stress & Mood        │
│                                                    Gut Health            │
│  [Shop All Supplements]    [Shop All Skincare]                           │
│                                                                          │
│  ┌─────────────────────────────────────────────┐                         │
│  │ [Featured Product Image]  Bestseller:        │                         │
│  │ [Product Name] - ₹XXX    [Shop Now →]       │                         │
│  └─────────────────────────────────────────────┘                         │
└──────────────────────────────────────────────────────────────────────────┘
```

**About Dropdown**:
```
Our Story
Our Standards
Sell With Us
```

### 2.2 Mobile Navigation

**Mobile Header**:
```
[☰ Hamburger]  [Logo (centered)]  [Search] [Cart (badge)]
```

**Hamburger Menu** (full-screen overlay, slide from left):
```
┌──────────────────────────────┐
│  [X Close]                   │
│                              │
│  Shop                     ▶  │ (expands to sub-menu)
│  Journal                  ▶  │
│  About                    ▶  │
│  ─────────────────────────── │
│  My Account                  │
│  My Orders                   │
│  My Wishlist                 │
│  ─────────────────────────── │
│  Contact Us                  │
│  Help / FAQ                  │
│  ─────────────────────────── │
│  [Login / Register]          │
└──────────────────────────────┘
```

**Shop Sub-Menu** (after tapping "Shop"):
```
┌──────────────────────────────┐
│  [← Back]     Shop           │
│                              │
│  All Products                │
│  ─────────────────────────── │
│  Supplements & Nutrition  ▶  │ (expands to sub-categories)
│  Skincare & Beauty        ▶  │
│  ─────────────────────────── │
│  Shop by Concern          ▶  │
│  Shop by Brand            ▶  │ [Phase 2]
└──────────────────────────────┘
```

### 2.3 Footer

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  [Brand Name]              Shop                 Journal           Company    │
│  [Tagline]                 Supplements          Wellness Tips     Our Story  │
│  [Brand description        Skincare             Expert Advice     Standards  │
│   2-3 lines]               All Products         Ingredients       Contact Us │
│                                                  Brand Stories     Sell With  │
│  [Social Icons:                                                    Us        │
│   Instagram, YouTube,     Customer Care         Legal                        │
│   Twitter, LinkedIn]      help@brand.com        Privacy Policy               │
│                           +91-XXXXXXXXXX        Terms & Conditions            │
│                           Mon-Sat, 10am-6pm     Return Policy                │
│                                                  Shipping Policy             │
│                                                                              │
│  ────────────────────────────────────────────────────────────────────────────│
│  [Payment Icons: UPI, Visa, Mastercard, RuPay, PhonePe, Paytm]             │
│  [FSSAI Logo + License Number]                                               │
│  © 2026 [Brand Name]. All rights reserved.                                  │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 2.4 Breadcrumb Logic

| Page | Breadcrumb |
|------|-----------|
| Category (PLP) | Home > Shop > [Category Name] |
| Sub-category (PLP) | Home > Shop > [Category] > [Sub-Category] |
| Concern (PLP) | Home > Shop > [Concern Name] |
| Product (PDP) | Home > Shop > [Category] > [Sub-Category] > [Product Name] |
| Article | Home > Journal > [Content Category] > [Article Title] |
| Author | Home > Journal > Authors > [Author Name] |
| Order Detail | Home > My Account > Orders > [Order ID] |
| Seller Brand (Phase 2) | Home > Shop > Brands > [Brand Name] |

Breadcrumb rules:
- Always start with "Home"
- PDP breadcrumb uses the category path through which the user navigated (tracked via referrer). If direct link, use product's primary category
- Breadcrumb is a single line, scrollable horizontally on mobile if needed
- Last item (current page) is not clickable, displayed in regular weight

---

## 3. URL Architecture

### 3.1 URL Patterns

| Page Type | URL Pattern | Example |
|-----------|------------|---------|
| Homepage | `/` | `/` |
| All products | `/shop/all` | `/shop/all` |
| Category | `/shop/[category-slug]` | `/shop/supplements` |
| Sub-category | `/shop/[category-slug]/[sub-category-slug]` | `/shop/supplements/vitamins-minerals` |
| Concern | `/shop/concern/[concern-slug]` | `/shop/concern/immunity` |
| Product detail | `/shop/[category-slug]/[product-slug]` | `/shop/supplements/vitamin-d3-2000iu` |
| Brand page (Phase 2) | `/shop/brands/[brand-slug]` | `/shop/brands/organica` |
| Search | `/search?q=[query]` | `/search?q=vitamin+c` |
| Journal listing | `/journal` | `/journal` |
| Journal category | `/journal/[content-category-slug]` | `/journal/wellness-tips` |
| Article | `/journal/[content-category-slug]/[article-slug]` | `/journal/ingredients/benefits-of-ashwagandha` |
| Author | `/journal/authors/[author-slug]` | `/journal/authors/dr-priya-sharma` |
| Cart | `/cart` | `/cart` |
| Checkout | `/checkout` | `/checkout` |
| Order confirmation | `/checkout/confirmation/[order-id]` | `/checkout/confirmation/ORD-20260503-001` |
| Account pages | `/account/[section]` | `/account/orders` |
| Static pages | `/[page-slug]` | `/privacy`, `/terms`, `/returns` |
| Seller application | `/sell-with-us` | `/sell-with-us` |
| Login | `/login` | `/login` |
| Register | `/register` | `/register` |

### 3.2 URL Rules

1. All URLs are lowercase, hyphen-separated (no underscores, no camelCase)
2. No trailing slashes (redirect `/shop/supplements/` to `/shop/supplements`)
3. No file extensions (no `.html`, `.php`)
4. Product slugs are auto-generated from product name, unique (append `-2` if duplicate)
5. Category/sub-category slugs are admin-defined, stable (changing slug creates 301 redirect from old to new)
6. Query parameters for filters: `/shop/supplements?price=500-1000&sort=price-asc&concern=immunity`
7. Pagination: `/shop/supplements?page=2` (numbered, not offset-based)

### 3.3 SEO Considerations

- **Canonical tags**: Products appearing in multiple categories have a canonical URL pointing to their primary category path
- **Noindex**: Cart, checkout, account pages, search results with no results
- **Structured data (JSON-LD)**:
  - Homepage: Organization, WebSite (with SearchAction)
  - PLP: CollectionPage
  - PDP: Product (with offers, rating, review)
  - Article: Article (with author, datePublished, image)
  - Breadcrumb: BreadcrumbList
- **Sitemap.xml**: auto-generated, includes all public product URLs, article URLs, category URLs. Excludes account, cart, checkout
- **robots.txt**: disallow `/account/`, `/checkout/`, `/cart/`, `/admin/`, `/seller/`
- **Meta tags**: unique title and description per page. Format:
  - PDP: `[Product Name] - [Category] | [Brand Name]`
  - PLP: `[Category Name] - Shop [Brand Name]`
  - Article: `[Article Title] | [Brand Name] Journal`

---

## 4. Content Taxonomy & Tagging

### 4.1 Product Taxonomy

**Primary Dimensions**:

| Dimension | Type | Values |
|-----------|------|--------|
| Category | Single-select | Supplements & Nutrition, Skincare & Beauty |
| Sub-Category | Single-select (per category) | See sitemap §1.1 for full list |
| Concern | Multi-select | Immunity, Energy, Sleep, Skin Glow, Weight Management, Hair Health, Stress & Mood, Gut Health |
| Product Type | Single-select | Capsule, Tablet, Powder, Liquid, Gummy, Cream, Serum, Oil, Cleanser, Mask, Lotion, Sunscreen, Balm |
| Certifications | Multi-select | FSSAI Certified, Vegan, Cruelty Free, Organic, Ayurvedic, Dermatologist Tested, GMP Certified |
| Seller | Single-select | [Own Brand], [Seller Name] |
| Price Range | Computed | Under ₹500, ₹500-₹1000, ₹1000-₹2000, Above ₹2000 |
| Rating | Computed | 4+ Stars, 3+ Stars |
| Dietary | Multi-select | Vegetarian, Non-Vegetarian, Vegan, Gluten Free, Sugar Free |

**Tagging Rules**:
- Every product MUST have: Category, Sub-Category, at least one Concern, Product Type, Seller
- Certifications are optional (only applied when verified)
- Price Range and Rating are computed, not manually tagged
- A product can belong to multiple Concerns (e.g., Ashwagandha: Stress & Mood + Immunity + Energy)

### 4.2 Content Taxonomy

| Dimension | Type | Values |
|-----------|------|--------|
| Content Category | Single-select | Wellness Tips, Expert Advice, Ingredient Deep Dives, Brand Stories |
| Tags | Multi-select (free-form) | e.g., "vitamin c", "sleep", "protein", "skincare routine", "ayurveda" |
| Author | Single-select | From author profiles |
| Related Products | Multi-select | Product IDs linked to this article |
| Reading Time | Computed | Based on word count (~200 words/min) |
| Featured | Boolean | Is this the featured/pinned article? |

### 4.3 Cross-Linking Rules

**Product → Content**:
- PDP shows "Related Articles" section: articles that link to this product via the product embed or related products field
- Maximum 3 related articles shown on PDP

**Content → Product**:
- Articles can embed product cards inline (via product embed block in CMS)
- Article bottom shows "Products Mentioned" grid
- Product embeds are clickable, navigating to PDP

**Concern → Product + Content**:
- Concern pages (e.g., `/shop/concern/immunity`) show products tagged with that concern
- Concern pages can optionally show related articles tagged with the same concern keyword (Phase 2)

---

## 5. Search & Filter Architecture

### 5.1 Search Scope

| Source | Indexed Fields | Weight (Relevance) |
|--------|---------------|-------------------|
| Products | name, brand, description, ingredients, category, sub-category, concerns, tags | Primary (80%) |
| Content (Articles) | title, body text, tags, author name | Secondary (20%) |

Search results page layout:
1. Product results section (primary, top)
2. Content results section (secondary, below products, collapsible)
3. Total result count per section shown

### 5.2 Filters (per Category PLP)

**Supplements & Nutrition**:

| Filter | Type | Values |
|--------|------|--------|
| Sub-Category | Multi-select checkbox | Vitamins & Minerals, Protein & Fitness, etc. |
| Concern | Multi-select checkbox | Immunity, Energy, Sleep, etc. |
| Price | Range slider | ₹0 - ₹5,000 (dynamic max) |
| Product Type | Multi-select checkbox | Capsule, Tablet, Powder, Liquid, Gummy |
| Diet | Multi-select checkbox | Vegetarian, Vegan, Gluten Free, Sugar Free |
| Rating | Single-select | 4+ Stars, 3+ Stars |
| Discount | Single-select | 10%+ Off, 20%+ Off, 30%+ Off |
| Brand / Seller | Multi-select checkbox | [Own Brand], [Seller brands] (Phase 2) |

**Skincare & Beauty**:

| Filter | Type | Values |
|--------|------|--------|
| Sub-Category | Multi-select checkbox | Face Care, Body Care, Hair Care, etc. |
| Concern | Multi-select checkbox | Skin Glow, Hair Health, etc. |
| Price | Range slider | ₹0 - ₹5,000 |
| Product Type | Multi-select checkbox | Cream, Serum, Oil, Cleanser, Mask, etc. |
| Skin Type | Multi-select checkbox | Oily, Dry, Combination, Sensitive, Normal (Phase 2) |
| Rating | Single-select | 4+ Stars, 3+ Stars |
| Discount | Single-select | 10%+ Off, 20%+ Off, 30%+ Off |
| Brand / Seller | Multi-select checkbox | [Own Brand], [Seller brands] |

### 5.3 Filter Behavior

- Filters within the same dimension: OR logic (selecting "Capsule" and "Tablet" shows products that are Capsule OR Tablet)
- Filters across different dimensions: AND logic (selecting "Capsule" type AND "Immunity" concern shows products that are Capsules AND tagged with Immunity)
- Filter counts: each filter option shows count of matching products in parentheses, e.g., "Capsule (23)"
- Filter counts update dynamically as other filters are applied
- Active filters shown as removable chips above the product grid
- "Clear All Filters" button when any filter is active
- Filters persist in URL query parameters (bookmarkable, shareable)
- Mobile: filters in a bottom sheet / slide-over panel, "Apply Filters" button

### 5.4 Sort Options

| Option | Logic |
|--------|-------|
| Relevance (default) | Search relevance score (when coming from search). Category default: bestselling score |
| Price: Low to High | Selling price ascending |
| Price: High to Low | Selling price descending |
| Rating: High to Low | Average rating descending, tie-break by review count |
| Newest First | Product creation date descending |
| Discount: High to Low | Discount percentage descending |

### 5.5 Empty & Edge States

| State | Display |
|-------|---------|
| Search: no results | "No results found for '[query]'. Try checking your spelling or using more general terms." + "Popular searches: [tags]" + "Browse categories" links |
| Filter: no results | "No products match your current filters." + "Clear Filters" button + "Try removing some filters" suggestion |
| Category: no products (should not happen if nav hides empty categories) | "Products coming soon! Check back later." |
| Search: query too short (<2 chars) | "Please enter at least 2 characters to search" |

---

*Cross-references: BMRD (Doc 01), PRD (Doc 02), TAD (Doc 04), FSD (Doc 05)*
