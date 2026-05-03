# PRD: Product Requirements Document

**Document ID**: PRD-v1.0
**Status**: Draft
**Author**: [Product Manager]
**Last Updated**: [Date]
**Audience**: Engineering, Design, QA, AI coding agents
**Dependencies**: BMRD (Doc 01)

---

## 1. Product Vision & Scope

### 1.1 Vision Statement

Build the most trusted wellness e-commerce platform in India by combining curated product selection, transparent quality verification, and expert-driven content -- enabling health-conscious consumers to buy wellness products with confidence, not confusion.

### 1.2 Scope Boundary

| IN SCOPE (MVP - Phase 1) | OUT OF SCOPE |
|--------------------------|-------------|
| Own-brand product catalog (supplements + skincare) | Marketplace (Phase 2) |
| Product listing, detail, search, category navigation | Subscription/auto-replenish |
| Cart, checkout (single-seller) | International shipping |
| UPI, Cards, Net Banking, Wallets, COD | Telehealth / virtual consultations |
| Content hub (blog/journal) with product linking | Personalization quiz (a la Meology) |
| User accounts (OTP login, profile, orders, wishlist) | Loyalty / rewards program |
| Admin panel (catalog, orders, content, analytics) | Mobile native app (responsive web only) |
| Responsive mobile-first web design | AI-powered recommendations |
| GST invoice generation (own brand) | Social features / forums / user-generated content |
| Pincode-based delivery estimation | Gift cards / store credit |
| Basic coupon/promo system | Multi-language support |

| IN SCOPE (Phase 2) | IN SCOPE (Phase 3) |
|--------------------|--------------------|
| Seller application + onboarding | Personalization / quiz |
| Multi-seller cart + split checkout | Loyalty & rewards program |
| Seller dashboard | Native mobile app |
| Commission + payout engine | AI recommendations |
| Product moderation workflow | Multi-language (Hindi, regional) |
| Multi-seller GST invoicing | Gift cards / store credit |
| Seller performance metrics | Advanced analytics / BI |

---

## 2. User Roles & Permissions Matrix

### 2.1 Role Definitions

| Role | Sub-States | Description |
|------|-----------|-------------|
| **Buyer** | Anonymous → Registered → Returning | End consumer purchasing wellness products |
| **Seller** | Applicant → Approved → Active → Suspended | Third-party brand/vendor listing products on the marketplace (Phase 2) |
| **Content Author** | Draft → Published | Internal team member or expert writing editorial content |
| **Admin** | Super Admin, Catalog Admin, Seller Admin, Content Admin, Order Admin | Platform operators managing different functional areas |

### 2.2 Permissions Table

| Action | Anon Buyer | Reg. Buyer | Seller | Content Author | Catalog Admin | Seller Admin | Content Admin | Order Admin | Super Admin |
|--------|-----------|-----------|--------|---------------|--------------|-------------|--------------|-------------|-------------|
| Browse products | Yes | Yes | Yes | No | Yes | No | No | No | Yes |
| View product detail | Yes | Yes | Yes | No | Yes | No | No | No | Yes |
| Search products | Yes | Yes | Yes | No | Yes | No | No | No | Yes |
| Add to cart | Yes | Yes | No | No | No | No | No | No | No |
| Checkout | No | Yes | No | No | No | No | No | No | No |
| View order history | No | Yes | No | No | No | No | No | Yes | Yes |
| Manage addresses | No | Yes | No | No | No | No | No | No | No |
| Manage wishlist | No | Yes | No | No | No | No | No | No | No |
| Read content/blog | Yes | Yes | Yes | Yes | No | No | Yes | No | Yes |
| Submit seller application | No | No | Yes* | No | No | No | No | No | No |
| Manage own products (seller) | No | No | Yes | No | No | No | No | No | No |
| View seller dashboard | No | No | Yes | No | No | Yes | No | No | Yes |
| Create/edit content | No | No | No | Yes | No | No | Yes | No | Yes |
| Publish content | No | No | No | No | No | No | Yes | No | Yes |
| Manage product catalog | No | No | No | No | Yes | No | No | No | Yes |
| Approve/reject sellers | No | No | No | No | No | Yes | No | No | Yes |
| Manage orders | No | No | No | No | No | No | No | Yes | Yes |
| Manage coupons/promos | No | No | No | No | Yes | No | No | No | Yes |
| View analytics dashboard | No | No | No | No | No | No | No | No | Yes |
| Manage admin users | No | No | No | No | No | No | No | No | Yes |

*Seller application: accessible via "Sell With Us" page, does not require existing buyer account.

---

## 3. Feature Modules

### Feature Template Convention

Every feature below follows this structure:
- **Feature ID**: Unique identifier (e.g., `F-CAT-001`)
- **Priority**: P0 (MVP-blocking) | P1 (MVP-desired) | P2 (post-MVP)
- **Phase**: 1 | 2 | 3
- **User Stories**: "As a [role], I want [action], so that [outcome]"
- **Acceptance Criteria**: Testable checklist items
- **Edge Cases & Error States**: Explicitly enumerated
- **Dependencies**: Other feature IDs this depends on
- **India-Specific Notes**: Regulatory or market-specific considerations

---

### Module A: Storefront & Catalog

#### F-CAT-001: Product Listing Page (PLP)
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-CAT-003]

**User Stories**:
- As a buyer, I want to browse products in a category, so that I can discover products relevant to my needs
- As a buyer, I want to filter and sort products, so that I can narrow results to what I'm looking for

**Acceptance Criteria**:
- [ ] PLP displays products in a responsive grid (4 columns desktop, 2 columns mobile)
- [ ] Each product card shows: product image (primary), product name, brand name, price (MRP + selling price if discounted), discount percentage badge, average rating (stars + count), "Own Brand" or seller name badge
- [ ] Filters available: price range (slider), category/sub-category, concern (immunity, skin glow, energy, etc.), rating (4+, 3+), brand, discount (10%+, 20%+, 30%+)
- [ ] Sort options: Relevance (default), Price: Low to High, Price: High to Low, Rating: High to Low, Newest First
- [ ] Filters persist in URL query parameters (shareable filtered URLs)
- [ ] Pagination: infinite scroll on mobile, numbered pagination on desktop (24 products per page)
- [ ] Empty state: "No products match your filters" with a "Clear Filters" button
- [ ] Product count displayed: "Showing X of Y products"
- [ ] Clicking a product card navigates to PDP (F-CAT-002)

**Edge Cases**:
- Filter combination returns 0 results → show empty state with suggested broader filters
- Product goes out of stock while user is browsing → show "Out of Stock" badge, product remains visible but not clickable for add-to-cart
- Price filter range exceeds available products → auto-adjust slider to min/max of available products

**India-Specific**:
- All prices displayed in ₹ (INR)
- MRP must always be shown (Legal Metrology Act). If selling price < MRP, show MRP with strikethrough

---

#### F-CAT-002: Product Detail Page (PDP)
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-CAT-001, F-USR-004, F-CHK-001]

**User Stories**:
- As a buyer, I want to see complete product information, so that I can make an informed purchase decision
- As a buyer, I want to verify product authenticity and certifications, so that I can trust what I'm buying

**Acceptance Criteria**:
- [ ] Image gallery: minimum 3 images per product, swipeable on mobile, thumbnails on desktop, zoom on hover/pinch
- [ ] Product info section: name, brand, short description (50-100 words), selling price, MRP (strikethrough if discounted), discount percentage, available variants (size/quantity), stock status
- [ ] Trust signals section: FSSAI license number (for supplements), FSSAI badge icon, "Verified Seller" badge (Phase 2), country of origin, vegetarian/non-vegetarian symbol
- [ ] Detailed description tab: full product description, key benefits, how to use/dosage, ingredients list (full INCI for skincare)
- [ ] Additional information tab: nutritional info table (supplements), allergen warnings, storage instructions, shelf life, net weight/volume
- [ ] Reviews section: average rating, rating distribution (5-star breakdown), individual reviews (text + rating + reviewer name + date + "Verified Purchase" badge)
- [ ] "Add to Cart" button: prominent, sticky on mobile scroll
- [ ] Quantity selector: 1-10, default 1
- [ ] Wishlist button (heart icon): requires login, shows toast "Added to wishlist"
- [ ] Delivery check: pincode input field, shows estimated delivery date and shipping cost for entered pincode
- [ ] "Share" button: copy link, WhatsApp share (critical for India)
- [ ] Related products section: 4-8 products from same category/concern
- [ ] Breadcrumb navigation: Home > Category > Sub-category > Product Name

**Edge Cases**:
- Product has no reviews → show "No reviews yet. Be the first to review!" (review submission is Phase 2)
- Variant is out of stock → show variant option as greyed out with "Out of Stock" label, do not allow selection
- All variants out of stock → replace "Add to Cart" with "Notify Me When Available" (email/SMS input)
- Pincode not serviceable → show "Delivery not available for this pincode" with suggestion to try another
- Product is own-brand → show brand badge with "Our Product" label
- Product is from marketplace seller (Phase 2) → show seller name (clickable to seller profile), seller rating

**India-Specific**:
- MRP display is legally mandatory -- must always show MRP even if selling price equals MRP
- FSSAI license number display is mandatory for all food/supplement products
- Vegetarian/Non-vegetarian symbol (green dot / brown dot) is mandatory for supplements
- Country of origin is mandatory per Consumer Protection E-Commerce Rules
- Net quantity in metric units per Legal Metrology Act

---

#### F-CAT-003: Category Navigation
- **Priority**: P0 | **Phase**: 1
- **depends_on**: []

**User Stories**:
- As a buyer, I want to browse by category, so that I can explore products organized by type
- As a buyer, I want to shop by health concern, so that I can find products addressing my specific needs

**Acceptance Criteria**:
- [ ] Primary categories: "Supplements & Nutrition", "Skincare & Beauty"
- [ ] Sub-categories under Supplements: Vitamins & Minerals, Protein & Fitness, Immunity & Wellness, Digestive Health, Herbal & Ayurvedic, Women's Health, Men's Health
- [ ] Sub-categories under Skincare: Face Care, Body Care, Hair Care, Sun Protection, Lip Care
- [ ] Cross-cutting navigation: "Shop by Concern" with tags: Immunity, Energy, Sleep, Skin Glow, Weight Management, Hair Health, Stress & Mood, Gut Health
- [ ] Desktop: mega-menu dropdown from primary nav "Shop" link, showing categories + sub-categories + featured products
- [ ] Mobile: full-screen overlay menu, expandable category tree
- [ ] Category pages have unique SEO-friendly URLs (/shop/supplements/vitamins-minerals)
- [ ] Each category page has a brief description (2-3 sentences) for SEO and context
- [ ] "Shop by Concern" tags are clickable from homepage and from within category pages

**Edge Cases**:
- Category has 0 products → hide category from navigation (do not show empty categories)
- New sub-category added → appears in navigation after admin publishes at least 1 product in it

---

#### F-CAT-004: Search
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-CAT-001, F-CAT-002]

**User Stories**:
- As a buyer, I want to search for products by keyword, so that I can quickly find what I need
- As a buyer, I want search suggestions as I type, so that I can discover relevant products faster

**Acceptance Criteria**:
- [ ] Search bar in header, always visible on desktop, expandable icon on mobile
- [ ] Autocomplete suggestions appear after 2+ characters typed, within 200ms
- [ ] Suggestions include: product name matches (top 5), category matches (top 3), content/article matches (top 2, labeled "From Journal")
- [ ] Search results page follows PLP layout (F-CAT-001) with same filters and sort
- [ ] Search query highlighted in results
- [ ] Search handles: typos (fuzzy matching), singular/plural, common synonyms (e.g., "vitamin c serum" = "ascorbic acid serum")
- [ ] Search scope: products (primary) + content articles (secondary, shown in separate section below products)
- [ ] Recent searches: stored locally, shown when search bar is focused (last 5 searches)
- [ ] Empty results: "No products found for '[query]'" with suggestions: check spelling, try broader terms, browse categories

**Edge Cases**:
- Query matches only content articles, no products → show "No products found" but display matched articles section
- Very long search query (>100 chars) → truncate to 100 chars, execute search on truncated query
- Special characters in search → sanitize input, strip special chars except hyphens and spaces

---

#### F-CAT-005: Product Badges & Labels
- **Priority**: P1 | **Phase**: 1
- **depends_on**: [F-CAT-001, F-CAT-002]

**User Stories**:
- As a buyer, I want to see trust and quality badges on products, so that I can quickly identify verified and certified products

**Acceptance Criteria**:
- [ ] Badge types: "Our Brand" (own-brand products), "FSSAI Certified" (supplements with verified FSSAI), "Vegan", "Cruelty Free", "Organic", "Ayurvedic", "Dermatologist Tested", "New" (listed within last 30 days), "Bestseller" (top 10% by sales in category)
- [ ] Badges appear on: PLP product cards (max 2 badges), PDP (all applicable badges)
- [ ] Badges are admin-assigned per product (not auto-generated, except "New" and "Bestseller")
- [ ] "Bestseller" badge auto-assigned: recalculated weekly based on trailing 30-day sales data
- [ ] "New" badge auto-assigned: applied to products created within last 30 days, auto-removed after
- [ ] Badge icons are consistent in style, small enough to not overwhelm the product card

---

### Module B: Hybrid Marketplace

#### F-MKT-001: Seller Application Flow
- **Priority**: P0 | **Phase**: 2
- **depends_on**: []

**User Stories**:
- As a potential seller, I want to apply to sell on the platform, so that I can list my wellness products on a curated marketplace
- As an admin, I want to review seller applications, so that I can maintain marketplace quality

**Acceptance Criteria**:
- [ ] "Sell With Us" page accessible from main navigation (About > Sell With Us) and footer
- [ ] Application form fields:
  - Business name (required, text, max 200 chars)
  - Business type (required, enum: Proprietorship | Partnership | LLP | Pvt Ltd | Public Ltd)
  - GSTIN (required, text, 15 chars, format-validated: ^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$)
  - Contact person name (required, text)
  - Contact email (required, email-validated)
  - Contact phone (required, 10-digit Indian mobile)
  - Business address (required, structured: line 1, line 2, city, state dropdown, pincode)
  - Product categories (required, multi-select: Supplements & Nutrition, Skincare & Beauty)
  - Number of SKUs (required, enum: 1-10 | 11-50 | 51-200 | 200+)
  - Brand website URL (optional, URL-validated)
  - Brief description of products (required, textarea, 100-500 chars)
  - FSSAI license number (required if supplements selected, text, 14 digits)
  - FSSAI license document upload (required if supplements, PDF/image, max 5MB)
  - Cosmetics manufacturing license (required if skincare, PDF/image, max 5MB)
  - Sample product images (required, 3-5 images, JPG/PNG, max 2MB each)
- [ ] Form submission creates a "Seller Application" record with status: `submitted`
- [ ] Confirmation page: "Thank you for your application. We'll review and respond within 5 business days."
- [ ] Email confirmation sent to applicant with application reference number
- [ ] Admin receives notification (email + admin panel alert) of new application

**Edge Cases**:
- Duplicate GSTIN submission → "An application with this GSTIN already exists. Please contact support if you believe this is an error."
- FSSAI license number fails format validation → inline error with correct format hint
- File upload fails (size/type) → inline error "File must be PDF, JPG, or PNG and under 5MB"
- Application submitted but email delivery fails → application is still recorded, admin can see it

---

#### F-MKT-002: Seller Onboarding
- **Priority**: P0 | **Phase**: 2
- **depends_on**: [F-MKT-001]

**User Stories**:
- As an approved seller, I want to complete my profile and set up my storefront, so that I can start listing products

**Acceptance Criteria**:
- [ ] After admin approves application, seller receives email with onboarding link (unique, time-limited: 7 days)
- [ ] Onboarding wizard steps:
  1. **Account setup**: Create login credentials (email + password), verify phone via OTP
  2. **Business profile**: Legal entity name, brand display name, brand logo upload (PNG/SVG, max 1MB), brand description (100-500 chars), return policy text
  3. **Bank details**: Account holder name, bank name, account number, IFSC code, cancelled cheque upload (for verification)
  4. **GST details**: GSTIN (pre-filled from application), GST certificate upload, PAN number, PAN card upload
  5. **FSSAI details** (if supplements): License number (pre-filled), license expiry date, license document (pre-filled if uploaded during application)
  6. **Agreement**: Digital signature on marketplace seller agreement (terms, commission rates, SLAs, payment terms)
- [ ] All steps must be completed before seller can list products
- [ ] Progress indicator shows completed vs pending steps
- [ ] Seller can save progress and return later (within 30 days)
- [ ] Admin can view onboarding progress per seller

**Edge Cases**:
- Onboarding link expires (7 days) → seller can request new link from support
- Bank verification fails → flag for manual admin review, do not block other onboarding steps
- FSSAI license is expired → block onboarding, notify seller to renew and resubmit
- Seller abandons onboarding (no activity for 30 days) → auto-archive, admin notified

---

#### F-MKT-003: Seller Dashboard
- **Priority**: P0 | **Phase**: 2
- **depends_on**: [F-MKT-002, F-MKT-004, F-MKT-007]

**User Stories**:
- As a seller, I want a dashboard to manage my products, orders, and payouts, so that I can run my business on the platform

**Acceptance Criteria**:
- [ ] Dashboard home shows: today's orders (count + value), pending orders, total revenue (this month), pending payout amount, product performance (top 5 by sales)
- [ ] Navigation: Dashboard, Products, Orders, Payouts, Reviews, Profile, Support
- [ ] **Products section**: list of seller's products with status (draft, pending review, active, rejected, out of stock), search/filter by status, add new product, edit existing product
- [ ] **Orders section**: list of orders containing seller's products, status (new, confirmed, shipped, delivered, returned), order detail view (buyer name, address, items, amount, shipping label)
- [ ] **Payouts section**: payout history (date, amount, UTR/reference, status), upcoming payout (estimated amount, next payout date), payout settings (bank account on file)
- [ ] **Reviews section**: all reviews on seller's products, ability to respond to reviews (visible to buyers)
- [ ] **Profile section**: edit brand details, update bank info, update documents
- [ ] Seller dashboard is on a separate subdomain or URL path (e.g., seller.domain.com or domain.com/seller)
- [ ] Mobile-responsive design (sellers may manage on phone)

**Edge Cases**:
- Seller has 0 orders → show "No orders yet" with tips on optimizing product listings
- Payout calculation in progress → show "Calculating..." with estimated date
- Seller account suspended → dashboard shows suspension notice with reason and appeal process

---

#### F-MKT-004: Seller Product Submission + Admin Approval
- **Priority**: P0 | **Phase**: 2
- **depends_on**: [F-MKT-002]

**User Stories**:
- As a seller, I want to submit new product listings, so that buyers can discover and purchase my products
- As an admin, I want to review and approve seller product listings, so that only quality products appear on the platform

**Acceptance Criteria**:
- [ ] Product submission form fields:
  - Product name (required, text, max 200 chars)
  - Brand name (pre-filled from seller profile, editable)
  - Category (required, select: Supplements & Nutrition | Skincare & Beauty)
  - Sub-category (required, select: dynamic based on category)
  - Short description (required, text, 50-150 chars)
  - Full description (required, rich text editor, 200-2000 chars)
  - Key benefits (required, bullet list, 3-8 items)
  - Ingredients / INCI list (required, textarea)
  - How to use / dosage (required, textarea)
  - Allergen warnings (optional, textarea)
  - Nutritional info table (required for supplements, structured input)
  - Product images (required, 3-8 images, JPG/PNG, max 2MB each, first image = primary)
  - MRP (required, number, in ₹)
  - Selling price (required, number, must be <= MRP)
  - HSN code (required, text, validated against known HSN codes)
  - GST rate (auto-populated from HSN code, display only)
  - Stock quantity (required, number)
  - Weight / volume (required, number + unit)
  - Country of origin (required, text, default: India)
  - Variants (optional): size/quantity variants with individual price, stock, images
  - FSSAI license number (required for supplements, pre-filled from seller profile)
  - Certifications/badges (optional, multi-select: Vegan, Cruelty Free, Organic, Ayurvedic, Dermatologist Tested)
  - Shelf life (required, number + unit: months)
  - Storage instructions (optional, text)
- [ ] "Save as Draft" and "Submit for Review" actions
- [ ] On submission, product status changes to `pending_review`
- [ ] Admin review queue shows all pending products, sortable by submission date, seller name, category
- [ ] Admin can: Approve (product goes `active`), Reject with reason (free text), Request Changes (specific fields flagged)
- [ ] Seller receives email notification on approve/reject/request-changes
- [ ] Approved products appear in catalog within 5 minutes (cache invalidation)
- [ ] Rejected products show rejection reason to seller, seller can edit and resubmit

**Edge Cases**:
- Seller submits product with MRP lower than selling price → validation error "Selling price cannot exceed MRP"
- Product images fail quality check (resolution < 500x500) → warning "Images should be at least 500x500px for best display"
- Seller edits an already-approved product → changes to regulated fields (ingredients, claims, FSSAI, nutritional info) trigger re-review. Non-regulated changes (price, stock, images) go live immediately
- HSN code not recognized → allow manual entry with admin verification flag

---

#### F-MKT-005: Multi-Seller Cart
- **Priority**: P0 | **Phase**: 2
- **depends_on**: [F-CHK-001, F-MKT-004]

**User Stories**:
- As a buyer, I want to add products from multiple sellers (including the platform's own brand) to a single cart, so that I can checkout conveniently

**Acceptance Criteria**:
- [ ] Cart accepts products from own brand AND multiple sellers in the same cart
- [ ] Cart visually groups items by seller: "From [Brand Name]" (own brand), "From [Seller Name]" (each seller)
- [ ] Per-seller subtotal displayed within each group
- [ ] Shipping cost calculated independently per seller group
- [ ] Cart total = sum of all seller groups + sum of all shipping costs
- [ ] Removing all items from one seller group removes that group from display
- [ ] Cart badge (header icon) shows total item count across all sellers
- [ ] "Apply Coupon" field: platform-wide coupons apply to entire cart, seller-specific coupons apply only to that seller's items (with clear labeling)

**Edge Cases**:
- Seller product goes out of stock after being added to cart → on cart page load, show "This item is no longer available" with option to remove. Block checkout until resolved
- Seller gets suspended while their products are in buyer's cart → remove seller's items from cart, show notification "Some items were removed because the seller is no longer available"
- Coupon applicable to only one seller → clearly indicate "Coupon applied to [Seller Name] items only", remaining items at full price

---

#### F-MKT-006: Split Checkout / Split Fulfillment
- **Priority**: P0 | **Phase**: 2
- **depends_on**: [F-MKT-005, F-CHK-002, F-ORD-001]

**User Stories**:
- As a buyer, I want to checkout a multi-seller cart in a single transaction, so that I don't have to pay separately for each seller

**Acceptance Criteria**:
- [ ] Single checkout flow regardless of number of sellers in cart
- [ ] Checkout summary clearly shows items grouped by seller, per-seller shipping, per-seller delivery estimate
- [ ] Single payment transaction captures total amount (all sellers + all shipping)
- [ ] After payment success, system creates one parent order + one sub-order per seller
- [ ] Parent order ID shown to buyer (e.g., ORD-20260503-001)
- [ ] Sub-order IDs generated per seller (e.g., ORD-20260503-001-A, ORD-20260503-001-B)
- [ ] Each sub-order is independently tracked: own status, own shipping, own tracking number
- [ ] Buyer can view parent order (all items) and drill into sub-orders (per seller)
- [ ] Seller sees only their sub-order in their dashboard (never sees other sellers' items or pricing)

**Edge Cases**:
- Payment succeeds but one seller's sub-order creation fails → create sub-orders for successful sellers, mark failed sub-order as "Processing Error", admin alerted for manual resolution, buyer notified
- One seller ships same-day, another ships in 3 days → independent tracking, buyer sees different ETAs per sub-order
- Buyer requests cancellation of only one sub-order → partial cancellation, partial refund for that sub-order's amount, other sub-orders unaffected

---

#### F-MKT-007: Commission Calculation & Seller Payout
- **Priority**: P0 | **Phase**: 2
- **depends_on**: [F-MKT-006, F-ORD-001]

**User Stories**:
- As a seller, I want to receive timely and transparent payouts, so that I can manage my cash flow
- As an admin, I want automated commission calculation, so that payouts are accurate and auditable

**Acceptance Criteria**:
- [ ] Commission rates: Supplements & Nutrition = 12%, Skincare & Beauty = 15% (configurable per category in admin)
- [ ] Commission calculated on selling price (excluding GST, excluding shipping)
- [ ] TCS (Tax Collected at Source) deducted: 1% (0.5% CGST + 0.5% SGST) on net taxable value
- [ ] Payout amount = Selling Price - Commission - TCS - Return Adjustments
- [ ] Settlement cycle: T+7 from delivery confirmation (configurable in admin)
- [ ] Payout initiated automatically on settlement date via Razorpay Route / Cashfree Payouts
- [ ] Payout history visible to seller: date, order references, gross amount, commission deducted, TCS deducted, net payout, UTR/bank reference
- [ ] Monthly payout summary report downloadable as CSV/PDF
- [ ] Admin can view all payouts: by seller, by date range, by status (pending, processing, completed, failed)
- [ ] Failed payouts (bank rejection) → admin notified, seller notified to verify bank details, retry within 3 business days

**Edge Cases**:
- Order returned after payout → deduct from seller's next payout cycle (clawback). If no upcoming orders, create a negative balance, recover when next sale occurs
- Seller has multiple orders in same payout cycle → consolidated payout (single bank transfer covering all orders)
- Payout amount is below ₹100 → hold and accumulate until threshold is met
- Seller changes bank account → new account effective from next payout cycle (not retroactive). Verification required before switch

---

#### F-MKT-008: Seller Performance Metrics & SLAs
- **Priority**: P1 | **Phase**: 2
- **depends_on**: [F-MKT-003, F-ORD-001]

**User Stories**:
- As an admin, I want to track seller performance, so that I can maintain marketplace quality and enforce SLAs

**Acceptance Criteria**:
- [ ] Metrics tracked per seller:
  - Order fulfillment rate (% of orders shipped within SLA)
  - Average ship-out time (hours from order to handover)
  - Cancellation rate (% of orders cancelled by seller)
  - Return rate (% of orders returned)
  - Average customer rating
  - Response time (to buyer queries, if messaging is implemented)
- [ ] SLA definitions (configurable in admin):
  - Ship within 48 hours of order confirmation
  - Cancellation rate must be below 5%
  - Return rate must be below 10%
  - Average rating must be above 3.5/5
- [ ] SLA violation triggers:
  - First violation → warning email to seller
  - Second violation (within 30 days) → admin review, possible temporary suspension
  - Third violation → account suspension, pending admin review
- [ ] Seller sees their own performance metrics on dashboard (not compared to other sellers)
- [ ] Admin sees all sellers ranked by performance metrics

---

### Module C: Cart, Checkout & Payments

#### F-CHK-001: Cart Management
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-CAT-002]

**User Stories**:
- As a buyer, I want to add products to a cart, so that I can purchase multiple items in one transaction

**Acceptance Criteria**:
- [ ] "Add to Cart" button on PDP adds 1 unit of selected variant to cart
- [ ] If item is already in cart, quantity increments by 1
- [ ] If quantity would exceed available stock, show error: "Only X left in stock"
- [ ] Cart icon in header shows item count badge, updates immediately (optimistic UI)
- [ ] Cart page shows: product image (thumbnail), product name, variant (if applicable), unit price, quantity selector (1-10), line total, remove button
- [ ] Quantity change recalculates line total and cart total immediately
- [ ] "Save for Later" option moves item from cart to a saved list (displayed below cart)
- [ ] "Move to Cart" option on saved items returns them to active cart
- [ ] Cart persists across sessions for logged-in users (server-side)
- [ ] Cart for anonymous users persists via local storage; on login, merge with server-side cart (server quantities take precedence on conflict)
- [ ] Empty cart state: "Your cart is empty" with "Continue Shopping" link to homepage

**Edge Cases**:
- Product price changes between adding to cart and checkout → show updated price on cart page with a notice: "Price updated for [product name]"
- Product discontinued while in cart → show "This product is no longer available" with remove option
- Cart merge conflict (anonymous cart has Item A qty 2, logged-in cart has Item A qty 1) → use higher quantity (2), subject to stock availability

---

#### F-CHK-002: Checkout Flow
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-CHK-001, F-USR-001, F-CHK-003, F-CHK-006]

**User Stories**:
- As a buyer, I want to complete my purchase with minimal steps, so that the checkout experience is fast and friction-free

**Acceptance Criteria**:
- [ ] Checkout requires login (redirect to login if anonymous, return to checkout after)
- [ ] Checkout flow (max 4 steps):
  1. **Address**: Select from saved addresses or add new. Pincode serviceability verified before proceeding
  2. **Shipping**: Display available shipping options with cost and estimated delivery date per option. Options: Standard (3-7 days), Express (1-2 days, if available for pincode)
  3. **Payment**: Select payment method (see F-CHK-003), apply coupon (see F-CHK-005)
  4. **Review & Confirm**: Order summary (items, quantities, prices, shipping, taxes, total), selected address, selected payment method. "Place Order" button
- [ ] Order summary sidebar visible throughout checkout (desktop), collapsible on mobile
- [ ] "Place Order" triggers payment processing
- [ ] On payment success → redirect to Order Confirmation page showing: order ID, items, delivery estimate, payment method used, "Continue Shopping" link
- [ ] On payment failure → show error, allow retry with same or different payment method, cart preserved
- [ ] Order confirmation email sent immediately with order details

**Edge Cases**:
- Stock becomes 0 during checkout (between cart and payment) → error on "Place Order": "Sorry, [product] is now out of stock. Please update your cart." Redirect to cart
- Pincode not serviceable for selected address → block at Address step: "Delivery not available to this pincode. Please use a different address."
- Checkout session timeout (30 minutes) → return to cart with items preserved, prompt to restart checkout
- Browser back button during payment → do not create duplicate orders, check for existing pending payment before creating new one

**India-Specific**:
- GST breakdown shown on Review step: CGST + SGST (intra-state) or IGST (inter-state) based on seller and buyer locations
- All prices inclusive of GST (as is standard for B2C in India)

---

#### F-CHK-003: Payment Integration
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-CHK-002]

**User Stories**:
- As a buyer, I want to pay using my preferred payment method, so that I can complete checkout conveniently

**Acceptance Criteria**:
- [ ] Payment methods (in display order):
  1. **UPI**: UPI Intent (opens UPI app directly), UPI ID entry (user types VPA like name@upi), QR code
  2. **Credit Card**: Visa, Mastercard, Amex, RuPay
  3. **Debit Card**: Visa, Mastercard, RuPay
  4. **Net Banking**: Top 10 banks shown, "Other banks" dropdown for rest
  5. **Wallets**: Paytm, PhonePe, Amazon Pay, Mobikwik
  6. **COD (Cash on Delivery)**: Available for orders ₹200-₹5,000 (configurable). OTP verification for orders > ₹1,000 (see F-ORD-005)
- [ ] Payment gateway: Razorpay (primary integration)
- [ ] Saved cards: Razorpay tokenization (RBI compliant), buyer can save card for future use
- [ ] No card data stored on platform servers -- fully delegated to Razorpay (PCI DSS compliance)
- [ ] Payment status handling:
  - Success → create order, show confirmation
  - Failed → show error with retry option
  - Pending (UPI timeout, bank processing) → show "Payment pending" page, auto-check status every 10 seconds for 5 minutes, then show "Contact support if amount was debited"
- [ ] Prepaid discount: ₹50 off for prepaid orders (configurable, to incentivize prepaid over COD)
- [ ] Refunds processed via same payment method as original payment

**Edge Cases**:
- UPI app not installed on mobile → fall back to UPI ID entry
- UPI collect request expires (5 minutes) → show "Payment request expired. Please try again"
- Double payment (network timeout, buyer clicks twice) → idempotency check on order ID, second payment auto-refunded within 24 hours
- COD order placed, buyer refuses delivery → RTO cost absorbed (tracked as RTO rate metric)

**India-Specific**:
- UPI is the dominant payment method in India (70%+ of digital transactions). Must be prominently positioned as first option
- RBI mandates: no card storage by merchants (tokenization only), 2FA for card payments
- COD is essential for first-time buyers and Tier 2/3 cities (trust factor)
- Zero MDR on UPI transactions up to ₹2,000 (government policy, may change)

---

#### F-CHK-004: GST Invoice Generation
- **Priority**: P0 | **Phase**: 1 (own brand), Phase 2 (marketplace)
- **depends_on**: [F-CHK-002, F-ORD-001]

**User Stories**:
- As a buyer, I want to receive a GST-compliant invoice, so that I can claim input tax credit (if applicable) and have proof of purchase

**Acceptance Criteria**:
- [ ] Invoice generated automatically on order confirmation
- [ ] **Phase 1 (own brand)**: Single invoice per order from platform entity
- [ ] **Phase 2 (marketplace)**: Per-seller invoice. Multi-seller order generates multiple invoices (one per seller in the order)
- [ ] Invoice fields:
  - Invoice number (sequential, format: INV-YYYYMMDD-XXXXX)
  - Invoice date
  - Seller details: legal name, GSTIN, address
  - Buyer details: name, address, GSTIN (if provided by buyer, optional for B2C)
  - HSN code per line item
  - Product name, quantity, unit price (before tax)
  - GST breakup: CGST rate + amount, SGST rate + amount (intra-state) OR IGST rate + amount (inter-state)
  - Total amount
  - Place of supply (state)
- [ ] Invoice downloadable as PDF from order detail page
- [ ] Invoice emailed to buyer on order confirmation (as PDF attachment)
- [ ] Seller can download all their invoices from seller dashboard (Phase 2)
- [ ] Admin can generate GSTR-1 export (CSV) for filing period

**Edge Cases**:
- Buyer provides GSTIN at checkout → include in invoice (B2B invoice with reverse charge if applicable)
- Return/refund processed → credit note generated with reference to original invoice
- Partial return (multi-item order, one item returned) → credit note for returned item only

---

#### F-CHK-005: Coupon / Promo Codes
- **Priority**: P1 | **Phase**: 1
- **depends_on**: [F-CHK-002]

**User Stories**:
- As a buyer, I want to apply discount codes, so that I can save money on my purchase
- As an admin, I want to create and manage promotional offers, so that I can drive sales and acquisition

**Acceptance Criteria**:
- [ ] Coupon input field on cart page and checkout page
- [ ] Coupon types:
  - Flat discount (₹ off): e.g., ₹100 off on orders above ₹500
  - Percentage discount (% off): e.g., 15% off up to ₹200
  - Free shipping: waive shipping fee
- [ ] Coupon constraints (configurable per coupon):
  - Minimum order value
  - Maximum discount amount (for percentage coupons)
  - Valid date range (start + end)
  - Usage limit (total uses across all users)
  - Per-user usage limit (e.g., once per user)
  - Applicable categories (all, specific category, specific products)
  - Applicable scope: platform-wide (Phase 1), seller-specific (Phase 2)
  - New user only (first-time buyer flag)
- [ ] Only one coupon per order (no stacking)
- [ ] Coupon validation: immediate feedback on apply -- "Coupon applied: ₹100 off" or "Invalid coupon" or "Coupon expired" or "Minimum order of ₹500 required"
- [ ] Discount reflected in order total on checkout summary
- [ ] Admin panel: create, edit, deactivate, view usage stats per coupon

**Edge Cases**:
- Coupon applied, then cart updated to below minimum order value → auto-remove coupon with message "Coupon removed: order no longer meets minimum ₹X requirement"
- Coupon usage limit reached between apply and checkout → error on Place Order: "Coupon is no longer valid", allow checkout without coupon

---

#### F-CHK-006: Address Management & Pincode Serviceability
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-USR-001]

**User Stories**:
- As a buyer, I want to save and manage delivery addresses, so that I can checkout faster on repeat purchases
- As a buyer, I want to know if delivery is available to my pincode, so that I don't waste time checking out for unserviceable areas

**Acceptance Criteria**:
- [ ] Address form fields: full name, phone number, flat/house/building, area/street, landmark (optional), pincode (6 digits), city (auto-populated from pincode), state (auto-populated from pincode)
- [ ] Pincode lookup: on entering 6 digits, auto-populate city and state via pincode API (India Post or shipping provider API)
- [ ] Pincode serviceability check: on PDP (F-CAT-002) and during checkout address step
- [ ] Serviceability response: "Delivery available. Estimated delivery: [date]" or "Delivery not available for this pincode"
- [ ] Users can save up to 10 addresses
- [ ] Default address: one address marked as default, pre-selected during checkout
- [ ] Edit and delete existing addresses
- [ ] Address validation: all required fields filled, pincode is 6 digits, phone is 10-digit Indian mobile

**Edge Cases**:
- Pincode returns multiple city/state combinations → show dropdown for user to select correct one
- Pincode API is down → allow manual city/state entry, skip serviceability check (fail open), verify during order processing
- User edits address on an existing order → not allowed after order is confirmed (address is locked)

---

### Module D: Orders & Fulfillment

#### F-ORD-001: Order Management & Tracking
- **Priority**: P0 | **Phase**: 1 (single seller), Phase 2 (multi-seller)
- **depends_on**: [F-CHK-002]

**User Stories**:
- As a buyer, I want to track my order status, so that I know when to expect delivery

**Acceptance Criteria**:
- [ ] Order statuses: `confirmed` → `processing` → `shipped` → `out_for_delivery` → `delivered`
- [ ] Additional statuses: `cancelled` (by buyer or seller), `return_requested`, `return_picked`, `refund_processed`
- [ ] Order detail page shows: order ID, order date, items (image, name, qty, price), order total, payment method, delivery address, current status with timeline visualization, tracking number + courier link (when shipped)
- [ ] Tracking: integration with shipping provider API (Shiprocket/Delhivery) for real-time tracking
- [ ] Tracking updates via: SMS (at shipped, out for delivery, delivered), email (at each status change)
- [ ] Phase 2 (multi-seller): parent order shows all items, with sub-order status per seller. Each sub-order has independent tracking
- [ ] Order list in user account: sorted by date (newest first), searchable by order ID, filterable by status

**Edge Cases**:
- Tracking number not available yet (order confirmed but not shipped) → show "Tracking will be available once your order ships"
- Shipping provider tracking API returns error → show last known status with "Tracking temporarily unavailable, please check back later"
- Order stuck in "processing" for >48 hours → auto-alert to admin for follow-up

---

#### F-ORD-002: Returns & Refunds
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-ORD-001]

**User Stories**:
- As a buyer, I want to return a product and get a refund, so that I'm protected if the product doesn't meet expectations

**Acceptance Criteria**:
- [ ] Return window: 7 days from delivery date (configurable per category in admin)
- [ ] Return eligibility: product must be unused, in original packaging (for skincare: sealed/unopened)
- [ ] Supplements: returns accepted only for damaged/expired/wrong product (not for "didn't like it" -- regulatory reason: opened supplements cannot be resold)
- [ ] Return request flow: select order → select item(s) → select reason (dropdown: Damaged, Wrong Product, Expired, Quality Issue, Not As Described, Changed Mind) → upload images (required for Damaged/Quality Issue) → submit
- [ ] Return statuses: `return_requested` → `return_approved` / `return_rejected` → `return_pickup_scheduled` → `return_picked` → `refund_initiated` → `refund_processed`
- [ ] Refund to original payment method. COD orders refunded to bank account (buyer provides bank details) or store credit
- [ ] Refund processing time: 5-7 business days after return pickup
- [ ] Phase 2 (marketplace): returns processed per sub-order, per seller. Seller bears return shipping cost if fault is seller's (wrong/damaged product). Platform bears if it's a platform policy return (change of mind)

**Edge Cases**:
- Return request after return window → "Return window has expired for this order" -- offer to contact support for exceptional cases
- Buyer claims damaged but images don't show damage → admin manually reviews, can approve or reject with explanation
- Refund to original payment method fails (e.g., closed card) → refund to bank account (buyer contacted for bank details)
- Partial return on multi-item order → refund only for returned item(s), rest of order unaffected

---

#### F-ORD-003: Shipping Integration
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-ORD-001]

**User Stories**:
- As an admin, I want automated shipping label generation and tracking, so that fulfillment is efficient

**Acceptance Criteria**:
- [ ] Integration with shipping aggregator: Shiprocket (primary) -- provides multi-carrier access (Delhivery, BlueDart, DTDC, Ecom Express, etc.)
- [ ] Auto-carrier selection based on: pincode serviceability, delivery speed, cost, carrier reliability score
- [ ] AWB (Air Waybill) number generated automatically on order confirmation
- [ ] Shipping label generated as PDF, downloadable from admin panel
- [ ] Manifest generation: daily batch for warehouse pickup
- [ ] Real-time tracking sync: pull tracking updates from carrier API every 2 hours, update order status
- [ ] Shipping cost calculation: weight-based + zone-based (within city, within state, national)
- [ ] Reverse logistics (returns): schedule return pickup via same aggregator

**India-Specific**:
- Weight slab pricing is standard in India (0-500g, 500g-1kg, 1-2kg, etc.)
- Volume weight (dimensional weight) also considered for bulky items
- COD remittance cycle: shipping provider remits COD amount within T+2 to T+7 depending on carrier

---

#### F-ORD-004: Pincode-Based Delivery Estimation
- **Priority**: P1 | **Phase**: 1
- **depends_on**: [F-ORD-003]

**User Stories**:
- As a buyer, I want to see estimated delivery date for my pincode, so that I can plan accordingly

**Acceptance Criteria**:
- [ ] Delivery estimate shown on PDP (F-CAT-002) and checkout (F-CHK-002)
- [ ] Estimate based on: origin pincode (warehouse) → destination pincode, carrier SLAs, current day (cutoff time for same-day dispatch)
- [ ] Display format: "Estimated delivery by [Date, e.g., Wed, 7 May]" or "Delivered in 3-5 business days"
- [ ] Express delivery option (1-2 days) shown if available for pincode, with premium shipping cost
- [ ] Estimate is indicative (disclaimer: "Delivery dates are estimates and may vary")

**Edge Cases**:
- Pincode is in a remote area (ODA - Out of Delivery Area) → show longer estimate + possible surcharge
- Multiple items in cart from different warehouses → show longest estimate across items

---

#### F-ORD-005: COD OTP Verification
- **Priority**: P1 | **Phase**: 1
- **depends_on**: [F-CHK-003, F-ORD-001]

**User Stories**:
- As an admin, I want to reduce fraudulent COD orders and RTOs, so that cash-on-delivery losses are minimized

**Acceptance Criteria**:
- [ ] For COD orders above ₹1,000 (configurable threshold), OTP verification is triggered at order placement
- [ ] Flow: buyer selects COD → "Verify via OTP" → OTP sent to registered mobile → buyer enters OTP → order confirmed
- [ ] OTP valid for 5 minutes, 3 retry attempts
- [ ] Failed OTP → order not placed, buyer prompted to use prepaid payment
- [ ] OTP verification reduces RTO by confirming buyer intent and phone number validity
- [ ] Admin can configure: OTP threshold amount, enable/disable COD OTP globally

**Edge Cases**:
- OTP delivery fails (SMS provider issue) → allow "Resend OTP" (max 3 resends), then offer "Call verification" as fallback
- Buyer's phone number is different from delivery contact → OTP sent to account phone number (not delivery address phone)

---

### Module E: Content Hub

#### F-CNT-001: Blog / Journal Listing Page
- **Priority**: P0 | **Phase**: 1
- **depends_on**: []

**User Stories**:
- As a buyer, I want to browse wellness articles, so that I can learn about health topics and discover products

**Acceptance Criteria**:
- [ ] Journal section accessible from main navigation ("Journal")
- [ ] Listing page shows articles in reverse chronological order (newest first)
- [ ] Each article card: featured image, title, category tag, author name, publication date, reading time estimate, excerpt (first 150 chars)
- [ ] Category filters: Wellness Tips, Expert Advice, Ingredient Deep Dives, Brand Stories (configurable by admin)
- [ ] Pagination: 12 articles per page, "Load More" button
- [ ] Featured article: top of page, larger card format (admin can pin one article as featured)
- [ ] SEO: each listing page has unique meta title, description

---

#### F-CNT-002: Article Detail Page
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-CNT-001]

**User Stories**:
- As a buyer, I want to read detailed wellness articles, so that I can make informed product choices

**Acceptance Criteria**:
- [ ] Article page shows: title, featured image (hero), author name + photo + bio snippet, publication date, reading time, category tag
- [ ] Rich content support: headings (H2, H3), paragraphs, bold/italic, bulleted/numbered lists, inline images, block quotes, embedded videos (YouTube)
- [ ] Table of contents: auto-generated from H2 headings, sticky sidebar on desktop
- [ ] Related articles section (bottom): 3-4 articles from same category
- [ ] Social sharing: WhatsApp, Twitter/X, LinkedIn, Copy Link
- [ ] SEO: article-specific meta title, description, Open Graph tags, structured data (Article schema)

---

#### F-CNT-003: Content-to-Product Linking
- **Priority**: P1 | **Phase**: 1
- **depends_on**: [F-CNT-002, F-CAT-002]

**User Stories**:
- As a buyer, I want to see relevant products mentioned in articles, so that I can purchase recommended products directly

**Acceptance Criteria**:
- [ ] Product embed block: within article body, content author can insert a product card (image, name, price, "View Product" link to PDP)
- [ ] Product embeds are interactive: hover shows quick info, click navigates to PDP
- [ ] "Products Mentioned" section at article bottom: grid of all products referenced in the article
- [ ] Products linked by product ID in CMS -- if product is deleted/unpublished, embed shows gracefully degraded state ("Product no longer available")
- [ ] Content authors select products from a searchable product picker in the CMS

---

#### F-CNT-004: CMS Integration
- **Priority**: P0 | **Phase**: 1
- **depends_on**: []

**User Stories**:
- As a content author, I want a user-friendly CMS, so that I can create and publish articles without developer assistance

**Acceptance Criteria**:
- [ ] Headless CMS integration (Strapi, Contentful, or Sanity -- see TAD for selection)
- [ ] Content model: Article (title, slug, body, excerpt, featured image, category, tags, author, status, published date, SEO fields)
- [ ] WYSIWYG or block-based editor for article body
- [ ] Image upload and management within CMS
- [ ] Draft → Review → Published workflow
- [ ] Scheduled publishing: set a future publish date
- [ ] SEO fields per article: meta title, meta description, OG image
- [ ] Preview: view article as it will appear on the frontend before publishing

---

#### F-CNT-005: Expert / Author Profiles
- **Priority**: P2 | **Phase**: 1
- **depends_on**: [F-CNT-002]

**User Stories**:
- As a buyer, I want to see author credentials, so that I trust the wellness advice in articles

**Acceptance Criteria**:
- [ ] Author profile page: name, photo, title/credentials (e.g., "Certified Nutritionist"), bio (200-500 chars), list of their published articles
- [ ] Author byline on article pages links to author profile
- [ ] Admin manages author profiles in CMS (not self-registered)

---

### Module F: User Accounts

#### F-USR-001: Registration / Login
- **Priority**: P0 | **Phase**: 1
- **depends_on**: []

**User Stories**:
- As a buyer, I want to create an account and log in, so that I can track orders, save addresses, and maintain a wishlist

**Acceptance Criteria**:
- [ ] **Primary login: Phone + OTP** (dominant method for Indian consumers)
  - Enter 10-digit Indian mobile number (validated: starts with 6-9)
  - OTP sent via SMS (6-digit, expires in 5 minutes)
  - If number not registered, account auto-created on first OTP verification (zero-friction registration)
  - If number already registered, OTP login (no password needed)
- [ ] **Secondary login: Email + Password**
  - Registration: email, password (min 8 chars, 1 uppercase, 1 number), name
  - Email verification link sent on registration
  - Login: email + password
  - Forgot password: email-based reset link
- [ ] **Social login** (P2): Google Sign-In
- [ ] Session management: JWT-based, access token (15 min) + refresh token (30 days)
- [ ] Login prompt: triggered at checkout, wishlist add, order history access
- [ ] Post-login redirect: return user to the page they were on before login prompt

**Edge Cases**:
- OTP delivery fails → "Didn't receive OTP? Resend" (max 3 resends, then cooldown 30 minutes)
- User has both phone and email on account → can login with either
- Multiple accounts with same phone number → not allowed (phone is unique identifier)
- User tries to register email that already exists → "This email is already registered. Log in or reset your password"

---

#### F-USR-002: Profile Management
- **Priority**: P1 | **Phase**: 1
- **depends_on**: [F-USR-001]

**Acceptance Criteria**:
- [ ] Profile fields: full name, email, phone number, gender (optional: Male/Female/Other/Prefer not to say), date of birth (optional)
- [ ] Edit name, email (with email re-verification), phone (with OTP re-verification)
- [ ] Change password (if using email login)
- [ ] Delete account option (as per DPDP Act): confirmation prompt, 30-day grace period before data deletion, immediate deactivation

---

#### F-USR-003: Order History
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-USR-001, F-ORD-001]

**Acceptance Criteria**:
- [ ] List of all past orders, sorted by date (newest first)
- [ ] Each order shows: order ID, date, item count, order total, status badge
- [ ] Click to expand: full order details (items, quantities, prices, delivery address, payment method, tracking)
- [ ] "Reorder" button: adds all items from a past order to current cart (checks stock availability)
- [ ] Filters: All, Active (processing/shipped), Delivered, Cancelled/Returned

---

#### F-USR-004: Wishlist
- **Priority**: P1 | **Phase**: 1
- **depends_on**: [F-USR-001, F-CAT-002]

**Acceptance Criteria**:
- [ ] Heart icon on PLP cards and PDP to add/remove from wishlist
- [ ] Requires login (prompt login if anonymous user clicks heart)
- [ ] Wishlist page: grid of saved products with image, name, price, stock status, "Add to Cart" button, remove button
- [ ] If wishlisted product goes out of stock → show "Out of Stock" label
- [ ] If wishlisted product price drops → show "Price dropped!" badge (P2 feature: email notification)
- [ ] Maximum 50 items in wishlist

---

### Module G: Admin Panel

#### F-ADM-001: Admin Dashboard
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-ORD-001, F-CHK-002]

**Acceptance Criteria**:
- [ ] Overview metrics (configurable date range: today, last 7 days, last 30 days, custom):
  - Total orders + trend (% change vs previous period)
  - GMV + trend
  - Average order value
  - New customers
  - Top 5 products by revenue
  - Top 5 products by units sold
- [ ] Phase 2 additions: Active sellers count, Pending seller applications, Marketplace GMV vs Own Brand GMV split
- [ ] Content metrics: articles published this period, total content page views, top 5 articles by views
- [ ] Quick actions: view pending orders, view low-stock products (<10 units)

---

#### F-ADM-002: Seller Management
- **Priority**: P0 | **Phase**: 2
- **depends_on**: [F-MKT-001, F-MKT-002]

**Acceptance Criteria**:
- [ ] Seller list: all sellers with status (applicant, approved, active, suspended), onboarding progress, GMV, rating
- [ ] Application review: view application details, attached documents, approve/reject/request-info actions
- [ ] Seller detail view: profile info, documents, products, orders, payouts, performance metrics, communication history
- [ ] Actions: suspend seller (with reason), reactivate, adjust commission rate (override category default), download seller documents
- [ ] Bulk actions: export seller list as CSV

---

#### F-ADM-003: Product Catalog Management
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-CAT-001, F-CAT-002]

**Acceptance Criteria**:
- [ ] Product list: all products with status, category, price, stock, seller (own brand / seller name)
- [ ] Add new product (own brand): same form as F-MKT-004 but without approval workflow (admin products go live immediately)
- [ ] Edit product: all fields editable
- [ ] Stock management: update stock quantities, low stock alerts (configurable threshold)
- [ ] Bulk import: CSV upload for bulk product creation (template downloadable)
- [ ] Bulk actions: publish/unpublish, update price, update stock
- [ ] Category and sub-category management: add, edit, reorder, hide categories

---

#### F-ADM-004: Order Management
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-ORD-001]

**Acceptance Criteria**:
- [ ] Order list: all orders with status, date, buyer name, amount, payment method
- [ ] Filters: status, date range, payment method, seller (Phase 2)
- [ ] Order detail: all order information, status timeline, payment details, shipping details
- [ ] Actions: update status (for own-brand fulfillment), generate shipping label, initiate refund, add admin notes
- [ ] Phase 2: view parent order + sub-orders, dispute resolution between buyer and seller

---

#### F-ADM-005: Promo / Coupon Management
- **Priority**: P1 | **Phase**: 1
- **depends_on**: [F-CHK-005]

**Acceptance Criteria**:
- [ ] Create coupon form: all fields from F-CHK-005 coupon constraints
- [ ] Coupon list: code, type, discount, validity dates, usage count, status (active/expired/deactivated)
- [ ] Edit and deactivate coupons
- [ ] Usage report: which users used which coupon, total discount given

---

#### F-ADM-006: Content Management
- **Priority**: P0 | **Phase**: 1
- **depends_on**: [F-CNT-004]

**Acceptance Criteria**:
- [ ] Managed via headless CMS (not custom admin panel) -- see F-CNT-004
- [ ] Admin panel provides link/embed to CMS dashboard
- [ ] Content analytics visible in admin dashboard (F-ADM-001)

---

#### F-ADM-007: Analytics & Reports
- **Priority**: P1 | **Phase**: 1
- **depends_on**: [F-ADM-001]

**Acceptance Criteria**:
- [ ] Reports available:
  - Sales report (daily/weekly/monthly): GMV, orders, AOV, revenue by category, revenue by product
  - Customer report: new vs returning, acquisition channel (UTM tracking), geographic distribution
  - Product performance: top sellers, slow movers, out-of-stock frequency
  - Payment report: method distribution, COD vs prepaid ratio, payment failures
  - Shipping report: average delivery time, RTO rate, carrier performance
- [ ] Phase 2 additions: seller performance report, commission report, payout report
- [ ] All reports downloadable as CSV
- [ ] Date range selector for all reports
- [ ] Integration with Google Analytics 4 (GA4) for web analytics

---

## 4. UX Requirements

### 4.1 Brand Identity Integration

- Brand guidelines (logo, colors, typography, tone of voice) are established and provided
- All UI components must conform to the brand's visual identity
- Product photography style guide to be followed for own-brand products
- Seller product images must meet minimum quality standards (defined in F-MKT-004)

### 4.2 Trust Signals (Critical for Wellness E-Commerce)

Trust is the #1 conversion driver for wellness products. Every page must reinforce trust:

| Signal | Where Displayed |
|--------|----------------|
| FSSAI license number | PDP, invoice |
| FSSAI certified badge | PLP card, PDP |
| "Verified Seller" badge | PLP card, PDP (Phase 2) |
| Country of origin | PDP |
| Vegetarian/Non-vegetarian symbol | PLP card, PDP |
| Customer ratings & reviews | PLP card, PDP |
| "Our Brand" badge | PLP card, PDP (for own products) |
| Secure payment icons (Razorpay, UPI, Visa, etc.) | Footer, checkout |
| Return policy link | PDP, checkout |
| COD available indicator | PDP |
| Estimated delivery date | PDP |

### 4.3 Mobile-First Design

- All pages designed mobile-first (70%+ of Indian e-commerce traffic is mobile)
- Touch targets minimum 44x44px
- Thumb-zone optimization for primary actions (Add to Cart, Checkout)
- Sticky bottom bar on mobile: "Add to Cart" on PDP, "Proceed to Checkout" on cart
- Image loading: progressive JPEG / WebP with lazy loading
- Skeleton screens (shimmer loading) instead of spinners
- Bottom sheet patterns for filters, sort, variant selection on mobile

### 4.4 Accessibility

- WCAG 2.1 AA compliance as baseline
- Semantic HTML throughout
- Alt text on all images (product images, content images)
- Keyboard navigation support
- Sufficient color contrast ratios (4.5:1 for text, 3:1 for large text)
- Screen reader compatibility for critical flows (browse, cart, checkout)

### 4.5 Performance

- Page load target: <3 seconds on 4G connection (measured at 75th percentile)
- Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Image optimization: WebP format, responsive srcset, lazy loading below fold
- Critical CSS inlined, non-critical CSS deferred
- JavaScript bundle target: <200KB (gzipped) for initial page load

---

## 5. Non-Functional Requirements Summary

| Requirement | Target | Notes |
|------------|--------|-------|
| Page load time | <3s on 4G | Core Web Vitals compliant |
| Checkout steps | ≤4 | Address → Shipping → Payment → Confirm |
| Uptime | 99.9% | ~8.76 hours downtime/year |
| Concurrent users | 10K (launch), 100K (scale) | Scale-ready architecture |
| Search response time | <200ms (autocomplete), <500ms (results) | Dedicated search engine |
| Payment success rate | >95% | Monitor and optimize by method |
| Mobile responsiveness | All pages | Mobile-first design |
| SEO | All pages indexable, structured data | Product, Article, Breadcrumb schemas |
| Data backup | Daily automated, 30-day retention | Point-in-time recovery |
| Security | PCI DSS (via gateway), DPDP Act, HTTPS everywhere | See TAD for details |

---

## 6. Phasing & Roadmap

### Phase 1: Own Brand Storefront + Content Hub (MVP)

**Goal**: Launch the branded e-commerce store with own products and content hub. Establish brand presence and validate product-market fit.

**Features included**: All P0 features in Modules A, C, D, E, F, G (excluding marketplace-specific features)

**Key deliverables**:
- Product catalog (own brand supplements + skincare)
- Full shopping flow (browse → cart → checkout → payment → order tracking)
- Content hub with editorial articles and product linking
- User accounts (OTP login, profile, orders, wishlist)
- Admin panel (catalog, orders, content, analytics, promos)
- GST invoicing (own brand, single seller)
- Shipping integration (Shiprocket)
- Payment integration (Razorpay -- UPI, cards, net banking, wallets, COD)

### Phase 2: Curated Marketplace

**Goal**: Add multi-vendor marketplace capabilities. Onboard first batch of curated sellers.

**Features included**: All Module B features, multi-seller enhancements to Modules C, D, G

**Key deliverables**:
- Seller application and onboarding
- Seller dashboard
- Product moderation workflow
- Multi-seller cart and split checkout
- Commission calculation and seller payouts
- Multi-seller GST invoicing
- Seller performance metrics

### Phase 3: Growth & Optimization

**Goal**: Advanced features for retention, personalization, and scale.

**Features included**: All P2 features across modules

**Key deliverables**:
- Personalization quiz / recommendation engine
- Loyalty and rewards program
- Native mobile app (iOS + Android)
- AI-powered product recommendations
- Multi-language support (Hindi, regional)
- Gift cards and store credit
- Advanced analytics and BI

---

## 7. Open Questions & Decisions Needed

| # | Question | Owner | Status | Decision |
|---|----------|-------|--------|----------|
| 1 | What is the warehouse/fulfillment model for own-brand products? (Self-fulfilled from own warehouse vs 3PL?) | Operations | Open | |
| 2 | Will seller products be fulfilled by sellers (seller-shipped) or through platform's warehouse (FBA-like model)? | Product + Operations | Open | |
| 3 | Should the platform collect buyer GST numbers (for B2B buyers claiming input tax credit)? | Product + Legal | Open | |
| 4 | What is the exact return policy by category? (e.g., 7 days for skincare, no returns on opened supplements?) | Product + Legal | Open | |
| 5 | Should there be a minimum order value for free shipping? If so, what threshold? | Product + Finance | Open | |
| 6 | What is the budget range for Year 1 technology investment? | Founder | Open | |
| 7 | Are there specific wellness certifications beyond FSSAI that the brand wants to highlight? (e.g., GMP, ISO, AYUSH) | Product + Operations | Open | |
| 8 | Should product reviews be moderated (admin approval before publishing) or auto-published? | Product | Open | |

---

*Cross-references: BMRD (Doc 01), IA (Doc 03), TAD (Doc 04), FSD (Doc 05)*
