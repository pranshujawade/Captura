# TAD: Technical Architecture Document

**Document ID**: TAD-v1.0
**Status**: Draft
**Author**: [Engineering Lead / Solutions Architect]
**Last Updated**: [Date]
**Audience**: Engineering, DevOps, AI coding agents
**Dependencies**: BMRD (Doc 01), PRD (Doc 02), IA (Doc 03)

---

## 1. Platform Evaluation & Decision

### 1.1 Evaluation Criteria

The platform must support three surfaces (branded storefront, curated marketplace, content hub) with India-specific integrations. Criteria are weighted by their importance to this specific project.

### 1.2 Decision Matrix

| Criterion | Weight | Shopify + Webkul | WooCommerce + Dokan | Custom Headless (Next.js + Medusa) | BigCommerce + Multi-Vendor |
|-----------|--------|:----------------:|:-------------------:|:---------------------------------:|:--------------------------:|
| **Multi-vendor marketplace support** | 25% | 2/5 -- Plugin-based, fragile one-way syncs, no native split checkout | 3/5 -- Dokan is mature but PHP-based, limited API-first capabilities | 5/5 -- Build exactly what's needed, native multi-seller cart/checkout | 3/5 -- Better plugin ecosystem than Shopify but still third-party |
| **India payment gateways (UPI, COD, Razorpay)** | 15% | 4/5 -- Razorpay plugin available, UPI works | 4/5 -- Razorpay plugin, WooCommerce gateway ecosystem strong | 5/5 -- Direct Razorpay SDK integration, full control over UPI flows, COD OTP | 3/5 -- Razorpay available but less India-focused ecosystem |
| **Content hub / CMS quality** | 10% | 2/5 -- Shopify blog is basic, no headless CMS built-in | 5/5 -- WordPress IS the CMS, best content management | 4/5 -- Integrate any headless CMS (Strapi, Sanity, Contentful) | 2/5 -- Blog is basic, needs headless CMS integration |
| **GST compliance (multi-seller invoicing, HSN, TCS)** | 15% | 1/5 -- No native GST support for marketplace, plugins are limited | 3/5 -- GST plugins exist but multi-seller invoicing requires custom work | 5/5 -- Build GST engine with exact India requirements (HSN mapping, TCS, GSTR-1 export) | 2/5 -- Limited India tax support |
| **Total cost (Year 1)** | 10% | 2/5 -- Shopify Plus ($2,300/mo) + Webkul ($500/yr) + apps = ~$30K+/yr | 4/5 -- Self-hosted, Dokan Pro ($499/yr), hosting (~$200/mo) = ~$5-8K/yr | 3/5 -- Dev cost (~$15-25K build), hosting (~$200-500/mo) = ~$20-30K first year, lower ongoing | 2/5 -- BigCommerce Enterprise ($1,000+/mo) + plugins = ~$15-20K/yr |
| **Scalability** | 10% | 5/5 -- Fully managed, scales automatically | 2/5 -- Self-managed scaling, PHP performance ceiling | 5/5 -- Cloud-native, horizontally scalable, CDN-friendly JAMstack | 4/5 -- Managed, scales well |
| **Developer experience & AI-agent buildability** | 10% | 2/5 -- Liquid templating, limited API, closed ecosystem | 2/5 -- PHP/WordPress ecosystem, dated developer experience | 5/5 -- Modern TypeScript/React stack, API-first, excellent for AI agents | 3/5 -- Better API than Shopify, but still constraints |
| **Speed to MVP** | 5% | 4/5 -- Fast for simple stores, slow when customizing marketplace | 4/5 -- Fast with themes, Dokan setup quick | 3/5 -- Slower initial build, but faster iteration long-term | 3/5 -- Moderate setup time |
| **WEIGHTED SCORE** | 100% | **2.55/5** | **3.25/5** | **4.65/5** | **2.75/5** |

### 1.3 Recommendation

**Custom Headless Build: Next.js (frontend) + Medusa.js (commerce engine)**

Rationale:
1. **Marketplace is core, not an add-on**: The hybrid model (own brand + curated sellers) is the business differentiator. Bolting marketplace onto Shopify/BigCommerce via plugins creates technical debt from day one.
2. **India compliance is non-negotiable**: GST multi-seller invoicing, TCS collection, FSSAI display, COD OTP -- these require custom logic that no off-the-shelf platform handles out of the box.
3. **Content hub needs quality CMS**: A headless CMS (Strapi or Sanity) integrated with a headless commerce engine gives the best of both worlds -- real CMS capabilities with product-to-content linking.
4. **AI-agent buildability**: Modern TypeScript/React codebase is significantly better for AI coding agents than PHP (WooCommerce) or Liquid (Shopify). This matters given the stated goal of using AI agents for development.
5. **Long-term cost advantage**: Higher upfront investment but no recurring platform fees ($2,300/mo for Shopify Plus, $500+/yr for marketplace plugins). Year 2+ costs are substantially lower.

**Why Medusa.js specifically**:
- Open-source, MIT licensed (no vendor lock-in)
- Node.js/TypeScript (same language as Next.js frontend)
- Built-in: products, variants, carts, orders, customers, payments, shipping, discounts, regions, taxes
- Plugin architecture for extending (marketplace logic, seller management)
- Admin panel included (extensible React-based admin)
- Active community, well-documented API

**Alternative considered**: Saleor (Python/GraphQL). Strong option but Python backend introduces a second language. Medusa's Node.js alignment with Next.js frontend keeps the stack unified.

### 1.4 Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Longer MVP development time | Phase approach: Phase 1 (own brand, no marketplace) is simpler. Medusa handles single-seller e-commerce natively. Marketplace is Phase 2. |
| No managed hosting (unlike Shopify) | Use containerized deployment on AWS/GCP with managed services (RDS, ElastiCache). Infrastructure-as-code from day one. |
| Medusa community smaller than Shopify ecosystem | Core commerce features are solid. Custom marketplace logic would need custom development regardless of platform. |

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
                                    ┌──────────────┐
                                    │   CDN        │
                                    │ (CloudFront/ │
                                    │  Cloudflare) │
                                    └──────┬───────┘
                                           │
                                    ┌──────▼───────┐
                                    │   Frontend   │
                                    │   Next.js    │
                                    │  (Vercel or  │
                                    │   self-host) │
                                    └──────┬───────┘
                                           │
                              ┌────────────▼────────────┐
                              │      API Gateway        │
                              │   (Nginx / AWS ALB)     │
                              └─────┬──────────┬────────┘
                                    │          │
                         ┌──────────▼──┐  ┌────▼──────────┐
                         │  Commerce   │  │   CMS API     │
                         │  API        │  │   (Strapi /   │
                         │  (Medusa)   │  │    Sanity)    │
                         └──────┬──────┘  └───────────────┘
                                │
               ┌────────────────┼────────────────┐
               │                │                │
        ┌──────▼──────┐ ┌──────▼──────┐ ┌───────▼──────┐
        │  PostgreSQL │ │    Redis    │ │    Search    │
        │  (Primary   │ │  (Cache +   │ │ (Meilisearch │
        │   Database) │ │   Sessions) │ │  / Algolia)  │
        └─────────────┘ └─────────────┘ └──────────────┘

External Services:
        ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Razorpay │ │Shiprocket│ │  MSG91   │ │  S3/R2   │
        │(Payments)│ │(Shipping)│ │(SMS/OTP) │ │ (Media)  │
        └──────────┘ └──────────┘ └──────────┘ └──────────┘
```

### 2.2 Architecture Pattern

**Modular Monolith** for Phase 1, with clear module boundaries for future extraction:

| Module | Responsibility | Future Service Boundary |
|--------|---------------|------------------------|
| `catalog` | Products, categories, variants, search indexing | Product Service |
| `cart` | Cart management, price calculation | Cart Service |
| `checkout` | Order creation, payment orchestration | Order Service |
| `order` | Order management, status tracking, fulfillment | Fulfillment Service |
| `customer` | User accounts, auth, addresses, wishlist | Customer Service |
| `seller` (Phase 2) | Seller accounts, onboarding, dashboard, payouts | Seller Service |
| `content` | CMS integration, content-product linking | Content Service |
| `tax` | GST calculation, HSN mapping, invoice generation | Tax Service |
| `notification` | Email, SMS, push notification orchestration | Notification Service |
| `admin` | Admin panel API, analytics queries | Admin Service |

Modules communicate via direct function calls within the monolith. When extracting to microservices later, these become API calls.

---

## 3. Technology Stack

### 3.1 Core Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend Framework** | Next.js 14+ (App Router) | React-based, SSR/SSG for SEO, API routes, image optimization, TypeScript-native |
| **Frontend Styling** | Tailwind CSS + shadcn/ui (or Radix UI primitives) | Utility-first CSS for rapid UI development, accessible component primitives |
| **Commerce Engine** | Medusa.js v2 | Open-source headless commerce, Node.js/TypeScript, built-in admin, plugin architecture |
| **Backend Runtime** | Node.js 20 LTS | Same language as frontend, Medusa's runtime, strong async I/O |
| **Primary Database** | PostgreSQL 16 | Medusa's default database, robust relational DB, JSON support for flexible schemas |
| **Cache / Sessions** | Redis 7 | Session storage, cart caching, rate limiting, pub/sub for real-time events |
| **Search Engine** | Meilisearch | Open-source, fast full-text search, typo tolerance, faceted search, easy to self-host. Alternative: Algolia (managed, higher cost) |
| **Headless CMS** | Strapi v5 (self-hosted) | Open-source, Node.js, REST + GraphQL API, customizable content types, media management. Alternative: Sanity (managed, better editing UX, higher cost) |
| **Object Storage** | AWS S3 (or Cloudflare R2) | Product images, documents, invoices, CMS media |
| **Email** | AWS SES or Resend | Transactional emails (order confirmation, OTP, etc.) |
| **Language** | TypeScript | End-to-end type safety across frontend and backend |

### 3.2 Infrastructure

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| **Cloud Provider** | AWS (ap-south-1 Mumbai region) | Lowest latency for India users, comprehensive services, Mumbai data center |
| **Containerization** | Docker | Consistent environments, easy deployment |
| **Container Orchestration** | AWS ECS (Fargate) or simple Docker Compose on EC2 (Phase 1) | Serverless containers for MVP simplicity, migrate to ECS/EKS as scale demands |
| **CDN** | CloudFront (or Cloudflare) | Indian PoPs for static asset delivery, image caching |
| **CI/CD** | GitHub Actions | Automated testing, building, and deployment on push |
| **Monitoring** | Sentry (errors) + AWS CloudWatch (infra) + Grafana (dashboards) | Error tracking, infrastructure monitoring, custom business dashboards |
| **Logging** | AWS CloudWatch Logs or Loki | Centralized log aggregation |
| **DNS** | Cloudflare or Route 53 | DNS management, DDoS protection |

### 3.3 Frontend Architecture

```
Next.js App
├── app/
│   ├── (storefront)/          -- Public-facing pages
│   │   ├── page.tsx           -- Homepage
│   │   ├── shop/
│   │   │   ├── [category]/
│   │   │   │   ├── page.tsx   -- PLP (category listing)
│   │   │   │   └── [product]/
│   │   │   │       └── page.tsx -- PDP
│   │   │   ├── concern/
│   │   │   │   └── [concern]/page.tsx
│   │   │   └── brands/       -- Phase 2
│   │   ├── journal/
│   │   │   ├── page.tsx       -- Article listing
│   │   │   ├── [category]/
│   │   │   │   └── [slug]/page.tsx -- Article detail
│   │   │   └── authors/[slug]/page.tsx
│   │   ├── about/
│   │   ├── cart/page.tsx
│   │   ├── checkout/
│   │   ├── search/page.tsx
│   │   └── sell-with-us/page.tsx
│   ├── (account)/             -- Authenticated pages
│   │   └── account/
│   │       ├── profile/page.tsx
│   │       ├── orders/page.tsx
│   │       ├── addresses/page.tsx
│   │       └── wishlist/page.tsx
│   ├── (seller)/              -- Seller portal (Phase 2)
│   │   └── seller/
│   ├── (admin)/               -- Admin panel (Medusa admin or custom)
│   └── api/                   -- API routes (BFF pattern)
├── components/                -- Shared UI components
├── lib/                       -- Utilities, API clients, hooks
├── styles/                    -- Global styles, Tailwind config
└── public/                    -- Static assets
```

**Rendering Strategy**:

| Page Type | Rendering | Rationale |
|-----------|-----------|-----------|
| Homepage | ISR (Incremental Static Regeneration, revalidate: 300s) | SEO + frequent content updates |
| PLP (Category) | SSR with client-side filtering | SEO for category pages, dynamic filters |
| PDP (Product) | ISR (revalidate: 60s) | SEO + price/stock freshness |
| Article | SSG at build time + ISR | Content changes infrequently, SEO critical |
| Cart | Client-side only | No SEO value, real-time state |
| Checkout | Client-side only | No SEO value, real-time state |
| Account pages | Client-side only | Authenticated, no SEO value |
| Search | SSR (initial) + client-side (filters) | SEO for popular search terms |

---

## 4. Integration Architecture

### 4.1 Payments -- Razorpay

**Integration Type**: Razorpay Standard Checkout (client-side SDK) + Server-side API

**Flow**:
```
Buyer clicks "Place Order"
    │
    ▼
Frontend creates order via Medusa API
    │
    ▼
Medusa creates Razorpay Order (server-side: POST /v1/orders)
    → Amount in paise (₹800 = 80000 paise)
    → Currency: INR
    → Receipt: order_[medusa_order_id]
    │
    ▼
Frontend opens Razorpay Checkout modal (razorpay_order_id)
    → Buyer selects payment method (UPI/Card/NetBanking/Wallet)
    → Razorpay handles 2FA, UPI intent, etc.
    │
    ▼
On success: Razorpay returns payment_id + signature
    │
    ▼
Frontend sends payment_id + signature to Medusa API
    │
    ▼
Medusa verifies signature (HMAC-SHA256 with Razorpay key_secret)
    → If valid: capture payment, confirm order
    → If invalid: reject, show error
    │
    ▼
Webhook: Razorpay sends payment.captured event to /api/webhooks/razorpay
    → Idempotent processing (check if already processed)
    → Update order payment status
```

**Phase 2 -- Marketplace Split Payments (Razorpay Route)**:
```
Order with items from 3 sellers (A, B, own brand)
    │
    ▼
Single Razorpay payment captured (full amount: ₹3,000)
    │
    ▼
Create transfers via Razorpay Route API:
    → Transfer to Seller A's linked account: ₹800 (selling price - commission)
    → Transfer to Seller B's linked account: ₹1,100 (selling price - commission)
    → Remaining ₹1,100 stays in platform account (own brand + commissions)
    │
    ▼
Transfers can be:
    → Immediate (on payment capture)
    → Delayed (on delivery confirmation -- recommended for buyer protection)
```

**COD Handling**:
- COD is not processed through Razorpay
- Order marked as `payment_method: cod`, `payment_status: pending`
- On delivery: carrier collects cash, remits to platform via COD remittance (Shiprocket handles this)
- Platform reconciles COD collections daily

**Refunds**:
- Full/partial refund via Razorpay Refund API
- Refund to original payment method (automatic)
- COD refunds: requires buyer bank details, processed via Razorpay Payout or manual bank transfer

### 4.2 Shipping -- Shiprocket

**Integration Type**: Shiprocket REST API

**Key Integrations**:

| Function | API Endpoint | When Used |
|----------|-------------|-----------|
| Pincode serviceability | `GET /v1/external/courier/serviceability` | PDP (delivery check), Checkout (address step) |
| Delivery estimate | `GET /v1/external/courier/serviceability` (includes ETA) | PDP, Checkout |
| Create shipment | `POST /v1/external/orders/create/adhoc` | On order confirmation (own brand) or seller ships (marketplace) |
| Generate AWB | Auto-assigned on shipment creation | After order creation |
| Generate label | `POST /v1/external/courier/generate/label` | Admin downloads for packaging |
| Track shipment | `GET /v1/external/courier/track/awb/[awb]` | Order tracking page, status updates |
| Cancel shipment | `POST /v1/external/orders/cancel` | On order cancellation |
| Return pickup | `POST /v1/external/orders/create/return` | On return approval |

**Carrier Selection Logic**:
- Shiprocket auto-selects cheapest carrier for serviceable pincode
- Override rules (configurable): prefer BlueDart for metro cities (faster), DTDC for Tier 2/3
- Express delivery: select carriers with 1-2 day SLA for metro pincodes

**Shipping Cost Calculation**:
```
Applicable Weight = MAX(actual_weight, volumetric_weight)
Volumetric Weight = (L × W × H) / 5000 (in cm and grams)

Rate = base_rate[zone] + per_kg_rate × ceil(weight_kg)
Zone = derived from origin_pincode → destination_pincode mapping
```

**Webhook**: Shiprocket sends tracking updates to `/api/webhooks/shiprocket`
- Events: `pickup_scheduled`, `picked_up`, `in_transit`, `out_for_delivery`, `delivered`, `rto_initiated`, `rto_delivered`
- Webhook updates order status in Medusa

### 4.3 SMS & OTP -- MSG91

**Integration Type**: MSG91 REST API

**Use Cases**:

| Trigger | Template | Variables |
|---------|----------|-----------|
| Login OTP | "{{otp}} is your OTP to login to [Brand]. Valid for 5 minutes. Do not share." | otp |
| COD verification OTP | "{{otp}} is your OTP to confirm COD order #{{order_id}} of ₹{{amount}}. Valid for 5 minutes." | otp, order_id, amount |
| Order placed | "Order #{{order_id}} placed successfully. Track: {{tracking_url}}" | order_id, tracking_url |
| Order shipped | "Order #{{order_id}} shipped via {{carrier}}. Track: {{tracking_url}}" | order_id, carrier, tracking_url |
| Order delivered | "Order #{{order_id}} delivered. Rate your experience: {{review_url}}" | order_id, review_url |

**OTP Flow**:
```
User enters phone number
    │
    ▼
Server calls MSG91 Send OTP API (POST /api/v5/otp)
    → Template configured in MSG91 dashboard
    → OTP length: 6 digits
    → Expiry: 5 minutes
    → Retry type: text
    │
    ▼
User enters OTP
    │
    ▼
Server calls MSG91 Verify OTP API (POST /api/v5/otp/verify)
    → On success: create/authenticate user session
    → On failure: "Invalid OTP. Please try again." (max 3 attempts)
    │
    ▼
Resend: max 3 resends, then 30-minute cooldown
    → First resend: text SMS
    → Second resend: text SMS
    → Third resend: voice call OTP
```

### 4.4 GST & Invoicing Engine

**Custom-built module** (no off-the-shelf solution handles India marketplace GST correctly).

**HSN Code Mapping** (stored in database):

| Product Category | HSN Code | CGST | SGST | IGST | Total GST |
|-----------------|----------|------|------|------|-----------|
| Health Supplements (general) | 2106 | 6% | 6% | 12% | 12% |
| Protein Supplements | 2106 | 9% | 9% | 18% | 18% |
| Vitamins (pharmaceutical grade) | 2936 | 9% | 9% | 18% | 18% |
| Skincare (cosmetics) | 3304 | 14% | 14% | 28% | 28% |
| Ayurvedic products | 3003 | 6% | 6% | 12% | 12% |

**Tax Determination Logic**:
```
INPUT: product_hsn_code, seller_state, buyer_state

IF seller_state == buyer_state:
    tax_type = "INTRA_STATE"
    cgst = hsn_rate / 2
    sgst = hsn_rate / 2
    igst = 0
ELSE:
    tax_type = "INTER_STATE"
    cgst = 0
    sgst = 0
    igst = hsn_rate

Price display (B2C): inclusive of GST
Invoice: show GST breakup (unit price excl. tax + tax amount)
```

**TCS (Tax Collected at Source) -- Marketplace**:
```
For each marketplace seller:
    tcs_rate = 1% (0.5% CGST + 0.5% SGST)
    tcs_amount = net_taxable_value × tcs_rate
    net_taxable_value = selling_price - returns - discounts (GST exclusive)

Platform deducts TCS from seller payout
Platform files GSTR-8 quarterly with TCS details per seller
```

**Invoice Generation**:
- PDF generated using a template engine (e.g., Puppeteer rendering HTML to PDF, or a library like PDFKit)
- Stored in S3, linked to order record
- Invoice numbering: sequential per financial year, format: `INV/[FY]/[sequence]` (e.g., INV/2627/00001)

### 4.5 Search -- Meilisearch

**Integration**: Meilisearch self-hosted instance, synced from PostgreSQL.

**Indexes**:

| Index | Documents | Searchable Fields | Filterable Fields | Sortable Fields |
|-------|-----------|------------------|-------------------|-----------------|
| `products` | All active products | name, brand, description, ingredients, concerns | category, sub_category, concern, product_type, price, rating, discount_pct, seller_id, dietary, certifications | price, rating, created_at, discount_pct |
| `articles` | All published articles | title, body, tags, author_name | category, tags, author | published_at |

**Sync Strategy**:
- On product create/update/delete: push change to Meilisearch via Medusa event subscriber
- On article publish/update/unpublish: push change via Strapi webhook → sync service
- Full re-index: scheduled nightly as safety net

**Search Configuration**:
- Typo tolerance: enabled (default Meilisearch settings)
- Synonyms: configured for common wellness terms (e.g., "vit c" → "vitamin c", "whey" → "protein")
- Stop words: common English + Hindi stop words
- Ranking rules: words → typo → proximity → attribute → sort → exactness

---

## 5. Data Architecture

### 5.1 Core Entity Relationship Diagram

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Customer   │     │    Seller    │     │    Admin     │
│──────────────│     │──────────────│     │──────────────│
│ id           │     │ id           │     │ id           │
│ email        │     │ business_name│     │ email        │
│ phone        │     │ brand_name   │     │ role         │
│ name         │     │ gstin        │     │ password_hash│
│ password_hash│     │ fssai_number │     └──────────────┘
│ created_at   │     │ status       │
└──────┬───────┘     │ commission_%│
       │             │ bank_details │
       │             └──────┬───────┘
       │                    │
       │         ┌──────────▼──────────┐
       │         │      Product        │
       │         │─────────────────────│
       │         │ id                  │
       │         │ name                │
       │         │ slug                │
       │         │ description         │
       │         │ category_id         │
       │         │ seller_id (nullable)│ ← null = own brand
       │         │ hsn_code            │
       │         │ status              │
       │         │ metadata (JSON)     │ ← badges, certifications, FSSAI
       │         └──────────┬──────────┘
       │                    │
       │         ┌──────────▼──────────┐
       │         │   Product Variant   │
       │         │─────────────────────│
       │         │ id                  │
       │         │ product_id          │
       │         │ title (e.g., "60    │
       │         │   capsules")        │
       │         │ mrp                 │ ← stored in paise
       │         │ selling_price       │ ← stored in paise
       │         │ stock_quantity      │
       │         │ weight              │
       │         │ sku                 │
       │         └────────────────────┘
       │
┌──────▼───────┐     ┌──────────────────┐
│    Order     │────▶│    Sub-Order     │ [Phase 2]
│──────────────│     │──────────────────│
│ id           │     │ id               │
│ customer_id  │     │ order_id         │
│ status       │     │ seller_id        │
│ total        │     │ status           │
│ payment_method     │ subtotal         │
│ payment_status     │ shipping_cost    │
│ shipping_address   │ commission_amt   │
│ billing_address    │ tcs_amount       │
│ coupon_id    │     │ payout_status    │
│ created_at   │     │ tracking_number  │
└──────┬───────┘     └──────────────────┘
       │
┌──────▼───────┐
│  Order Item  │
│──────────────│
│ id           │
│ order_id     │
│ sub_order_id │ [Phase 2]
│ product_id   │
│ variant_id   │
│ quantity     │
│ unit_price   │
│ tax_amount   │
│ hsn_code     │
│ seller_id    │
└──────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Address    │     │   Wishlist   │     │    Review    │
│──────────────│     │──────────────│     │──────────────│
│ id           │     │ customer_id  │     │ id           │
│ customer_id  │     │ product_id   │     │ product_id   │
│ name         │     │ created_at   │     │ customer_id  │
│ phone        │     └──────────────┘     │ rating (1-5) │
│ line_1       │                          │ title        │
│ line_2       │     ┌──────────────┐     │ body         │
│ city         │     │    Coupon    │     │ verified_    │
│ state        │     │──────────────│     │   purchase   │
│ pincode      │     │ id           │     │ created_at   │
│ landmark     │     │ code         │     └──────────────┘
│ is_default   │     │ type         │
└──────────────┘     │ value        │     ┌──────────────┐
                     │ min_order    │     │   Invoice    │
                     │ max_discount │     │──────────────│
                     │ usage_limit  │     │ id           │
                     │ per_user_    │     │ invoice_no   │
                     │   limit      │     │ order_id     │
                     │ valid_from   │     │ sub_order_id │
                     │ valid_to     │     │ seller_gstin │
                     │ seller_id    │     │ buyer_gstin  │
                     │ category_ids │     │ items (JSON) │
                     │ new_user_only│     │ tax_breakup  │
                     └──────────────┘     │ total        │
                                          │ pdf_url      │
                                          └──────────────┘
```

### 5.2 Key Data Design Decisions

| Decision | Approach | Rationale |
|----------|----------|-----------|
| Currency storage | Store all monetary values in **paise** (integer) | Avoid floating-point rounding errors. ₹800.50 = 80050 paise |
| Seller products vs own-brand | Same `product` table, `seller_id = NULL` for own brand | Unified catalog, simpler queries, same PLP/PDP for both |
| Multi-tenancy | Shared schema with `seller_id` foreign keys | Simpler than schema-per-seller for the scale expected (50-100 sellers) |
| Soft deletes | Products and sellers are soft-deleted (status = 'archived') | Preserve order history referential integrity |
| Dates/times | All timestamps in UTC, convert to IST on frontend display | Standard practice, avoids timezone bugs |
| JSON columns | Used for flexible/evolving data: product metadata (badges, certifications), invoice line items, notification payloads | Avoids excessive schema migrations for non-queryable data |

---

## 6. Marketplace-Specific Architecture

### 6.1 Product Ownership Model

```
Product table:
    seller_id = NULL     → Own-brand product (managed by Catalog Admin)
    seller_id = [uuid]   → Seller product (managed by seller, moderated by admin)
```

Both types appear in the same catalog, same search index, same PLP. Differentiated by badges ("Our Brand" vs seller name).

### 6.2 Cart Splitting Logic

```
Cart items:
    Item A (seller: own_brand)  ₹500
    Item B (seller: seller_1)   ₹800
    Item C (seller: seller_1)   ₹300
    Item D (seller: seller_2)   ₹1,200

Split into fulfillment groups:
    Group 1: own_brand  → [Item A]         Subtotal: ₹500   Shipping: ₹50
    Group 2: seller_1   → [Item B, Item C] Subtotal: ₹1,100 Shipping: ₹60
    Group 3: seller_2   → [Item D]         Subtotal: ₹1,200 Shipping: ₹70

Cart Total: ₹500 + ₹1,100 + ₹1,200 + ₹50 + ₹60 + ₹70 = ₹2,980
```

Shipping is calculated per group using Shiprocket API (origin = seller's warehouse pincode, destination = buyer pincode).

### 6.3 Payout Architecture

```
                    ┌──────────────────────┐
                    │  Buyer pays ₹2,980   │
                    │  (single Razorpay    │
                    │   transaction)        │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │  Platform Razorpay   │
                    │  account holds full  │
                    │  amount in escrow    │
                    └──────────┬───────────┘
                               │
              On delivery confirmation:
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
   ┌─────▼──────┐      ┌──────▼──────┐      ┌──────▼──────┐
   │  Own Brand │      │  Seller 1   │      │  Seller 2   │
   │  ₹500+₹50  │      │  ₹1,100     │      │  ₹1,200     │
   │  stays in   │      │  -15% comm  │      │  -12% comm  │
   │  platform   │      │  = ₹165     │      │  = ₹144     │
   │  account    │      │  -1% TCS    │      │  -1% TCS    │
   │             │      │  = ₹11      │      │  = ₹12      │
   │             │      │  Payout:    │      │  Payout:    │
   │             │      │  ₹924+₹60   │      │  ₹1,044+₹70│
   │             │      │  shipping   │      │  shipping   │
   └─────────────┘      └─────────────┘      └─────────────┘
```

Note: Shipping cost collected from buyer is passed through to the seller (if seller-fulfilled) or retained by platform (if platform-fulfilled). Commission is on product selling price only, not shipping.

### 6.4 Seller Data Isolation

| Data | Seller Can See | Seller Cannot See |
|------|---------------|-------------------|
| Own products | All fields, all statuses | Other sellers' products |
| Own orders (sub-orders) | Items, buyer name, delivery address, amounts | Other sellers' sub-orders, parent order total, other sellers' items |
| Own payouts | All payout details, commission breakdown | Other sellers' payouts, platform revenue |
| Own reviews | All reviews on their products | Reviews on other sellers' products |
| Own performance metrics | Their own scores | Platform averages, other sellers' metrics |
| Buyer full profile | Name + delivery address (for fulfillment) | Email, phone, purchase history, other orders |

---

## 7. Content Architecture

### 7.1 CMS Selection

**Recommendation: Strapi v5 (self-hosted)**

| Factor | Strapi (self-hosted) | Sanity (managed) | Contentful (managed) |
|--------|---------------------|-------------------|---------------------|
| Cost | Free (open-source), hosting cost only | Free tier (3 users), $99/mo (Pro) | $300/mo (Team) |
| Hosting | Self-hosted on same infrastructure | Cloud-managed | Cloud-managed |
| Content API | REST + GraphQL | GROQ (custom query language) | REST + GraphQL |
| Media management | Built-in, S3-backed | Built-in (Sanity CDN) | Built-in |
| Customization | Fully customizable (plugins, custom fields) | Custom schemas, limited UI customization | Limited customization |
| Editor UX | Good (v5 improved significantly) | Excellent (best-in-class) | Good |

Strapi chosen for: zero licensing cost, self-hosted (data stays in India for DPDP Act), same Node.js stack, full customization for content-product linking.

### 7.2 Content Models (Strapi)

**Article**:
```
{
  title: string (required),
  slug: string (unique, auto-generated from title),
  excerpt: text (required, max 300 chars),
  body: rich text / blocks (required),
  featured_image: media (required),
  category: relation (ArticleCategory, many-to-one),
  tags: JSON array of strings,
  author: relation (Author, many-to-one),
  related_products: JSON array of product IDs (from Medusa),
  seo_title: string,
  seo_description: text,
  og_image: media,
  status: enum [draft, review, published],
  published_at: datetime,
  reading_time: integer (computed on save)
}
```

**ArticleCategory**: `{ name, slug, description }`

**Author**: `{ name, slug, photo, title, bio, credentials }`

### 7.3 Content-to-Commerce Linking

```
Strapi (Content)                    Medusa (Commerce)
┌──────────────┐                    ┌──────────────┐
│   Article    │                    │   Product    │
│              │  product IDs       │              │
│ related_     │───────────────────▶│  id          │
│ products:    │                    │  name        │
│ [prod_1,     │                    │  price       │
│  prod_2]     │                    │  image       │
└──────────────┘                    └──────────────┘

Frontend rendering:
1. Fetch article from Strapi API
2. Extract product IDs from related_products
3. Fetch product data from Medusa API (batch)
4. Render product cards inline within article body
```

For inline product embeds within article body: use a custom Strapi block type ("Product Embed") that stores a product ID. Frontend recognizes this block and renders a product card component.

### 7.4 Content Delivery

- Articles rendered via Next.js SSG (Static Site Generation) at build time
- ISR (Incremental Static Regeneration) with `revalidate: 3600` (1 hour) for new/updated articles
- On-demand revalidation: Strapi webhook triggers Next.js revalidation API route when article is published/updated
- Images served via CDN (CloudFront) with optimization (Next.js `<Image>` component for automatic WebP conversion and responsive sizing)

---

## 8. Security Architecture

### 8.1 Authentication

| Method | Implementation | Use Case |
|--------|---------------|----------|
| Phone + OTP | MSG91 OTP API → verify → create JWT session | Primary buyer login (India standard) |
| Email + Password | bcrypt hash (cost factor 12) → JWT | Secondary buyer login |
| Seller login | Email + password (bcrypt) → JWT with seller role | Seller portal access |
| Admin login | Email + password (bcrypt) → JWT with admin role + IP allowlist | Admin panel access |

**Session Management**:
- Access token: JWT, 15-minute expiry, stored in httpOnly cookie
- Refresh token: opaque token, 30-day expiry, stored in httpOnly cookie, rotated on use
- Token payload: `{ user_id, role, email }` -- no sensitive data in JWT
- Logout: invalidate refresh token (database-backed token store), clear cookies

### 8.2 Authorization (RBAC)

- Role-based access control as defined in PRD Section 2.2
- Middleware on every API route checks JWT → extracts role → checks against route permissions
- Seller routes: verify `seller_id` in JWT matches the resource being accessed (no seller can access another seller's data)
- Admin routes: verify admin role + specific admin permission (catalog_admin, seller_admin, etc.)

### 8.3 Data Protection

| Measure | Implementation |
|---------|---------------|
| HTTPS everywhere | TLS 1.3, HSTS header, redirect HTTP→HTTPS |
| Encryption at rest | AWS RDS encryption (AES-256), S3 server-side encryption |
| Encryption in transit | TLS for all API communication, internal service communication |
| PCI DSS | Fully delegated to Razorpay. No card data touches platform servers. Razorpay tokenization for saved cards |
| Password hashing | bcrypt with cost factor 12 |
| Input validation | Server-side validation on all API inputs (Zod schemas in TypeScript) |
| SQL injection prevention | Parameterized queries via ORM (Medusa uses MikroORM/TypeORM) |
| XSS prevention | React's built-in escaping, Content-Security-Policy header, DOMPurify for user-generated content |
| CSRF protection | SameSite=Strict cookies, CSRF tokens for state-changing operations |
| Rate limiting | Redis-backed rate limiter: 100 requests/min per IP (general), 5 requests/min for OTP endpoints |
| File upload security | Type validation (whitelist: JPG, PNG, PDF), size limits, virus scanning (ClamAV or AWS S3 built-in) |

### 8.4 DPDP Act 2023 Compliance

| Requirement | Implementation |
|-------------|---------------|
| Consent collection | Explicit consent checkbox at registration, separate marketing consent |
| Consent records | Store consent timestamp, version of privacy policy consented to |
| Data access request | API endpoint for user to download their data (profile, orders, addresses) as JSON/CSV |
| Data deletion request | "Delete Account" flow: 30-day grace period, then permanent deletion of PII, anonymize order records |
| Data minimization | Collect only necessary fields, do not store data beyond retention period |
| Breach notification | Incident response plan, notify DPB and affected users within 72 hours |
| Data storage | All personal data stored in India (AWS ap-south-1). No cross-border transfer without adequate safeguards |

---

## 9. Infrastructure & DevOps

### 9.1 Deployment Architecture (Phase 1 -- MVP)

```
AWS ap-south-1 (Mumbai)
│
├── Route 53 / Cloudflare DNS
│
├── CloudFront CDN
│   ├── Static assets (JS, CSS, images)
│   └── Next.js ISR cached pages
│
├── ALB (Application Load Balancer)
│   ├── Target: ECS Fargate Service (or EC2)
│   │   ├── Container: Next.js frontend (port 3000)
│   │   ├── Container: Medusa backend (port 9000)
│   │   └── Container: Strapi CMS (port 1337)
│   └── Health checks on each container
│
├── RDS PostgreSQL 16 (db.t3.medium → scale up)
│   ├── Multi-AZ for high availability
│   ├── Automated backups (7-day retention)
│   └── Read replica (add when needed)
│
├── ElastiCache Redis 7 (cache.t3.micro → scale up)
│   └── Sessions, caching, rate limiting
│
├── EC2 or ECS: Meilisearch instance
│   └── Search index, auto-synced from PostgreSQL
│
├── S3 Bucket: media storage
│   ├── Product images
│   ├── Seller documents
│   ├── Invoice PDFs
│   └── CMS media
│
└── SES: Transactional email
```

**Estimated Monthly Cost (Phase 1)**:

| Service | Specification | Est. Cost/Month |
|---------|--------------|----------------|
| ECS Fargate (3 containers) | 0.5 vCPU, 1GB RAM each | $50-80 |
| RDS PostgreSQL | db.t3.medium, Multi-AZ | $80-120 |
| ElastiCache Redis | cache.t3.micro | $15-25 |
| EC2 (Meilisearch) | t3.small | $15-20 |
| S3 | 50GB storage + transfer | $5-10 |
| CloudFront | 100GB transfer | $10-15 |
| ALB | Standard | $20-25 |
| SES | 10,000 emails/month | $1-2 |
| **Total** | | **~$200-300/month** |

Alternative: Deploy on Vercel (frontend) + Railway/Render (backend) for even simpler ops at similar cost.

### 9.2 CI/CD Pipeline

```
GitHub Push (main branch)
    │
    ▼
GitHub Actions Workflow
    │
    ├── 1. Lint (ESLint + Prettier)
    ├── 2. Type check (tsc --noEmit)
    ├── 3. Unit tests (Vitest)
    ├── 4. Integration tests (against test DB)
    ├── 5. Build (Next.js build, Medusa build)
    │
    ▼ (on success)
    │
    ├── 6. Build Docker images
    ├── 7. Push to ECR (Elastic Container Registry)
    └── 8. Deploy to ECS (rolling update)
    │
    ▼
    9. Post-deploy smoke tests (health checks, critical flow test)
```

**Branch Strategy**: trunk-based development with feature branches. PRs require 1 approval + passing CI.

### 9.3 Monitoring & Alerting

| Tool | Purpose | Key Metrics |
|------|---------|-------------|
| Sentry | Error tracking (frontend + backend) | Error rate, error frequency by type, affected users |
| CloudWatch | Infrastructure monitoring | CPU, memory, disk, network, RDS connections |
| Grafana + CloudWatch Metrics | Custom dashboards | Orders/minute, payment success rate, API latency p95 |
| UptimeRobot (or Better Uptime) | Uptime monitoring | Homepage, API health endpoint, checkout flow |
| PagerDuty / Slack alerts | Incident alerting | Critical: >1% error rate, payment gateway down, database unreachable |

---

## 10. Non-Functional Requirements (Detailed)

### 10.1 Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 2.5s | Chrome UX Report, Lighthouse |
| FID (First Input Delay) | < 100ms | Chrome UX Report |
| CLS (Cumulative Layout Shift) | < 0.1 | Chrome UX Report |
| TTFB (Time to First Byte) | < 600ms | Server-side monitoring |
| API response time (p95) | < 500ms | Application monitoring |
| Search autocomplete latency | < 200ms | Meilisearch metrics |
| Checkout completion time | < 60 seconds (median) | Analytics funnel |
| Image load time | < 1s per image on 4G | CDN metrics, responsive images |

### 10.2 Availability & Reliability

| Metric | Target |
|--------|--------|
| Uptime | 99.9% (~8.76 hours downtime/year) |
| RPO (Recovery Point Objective) | 1 hour (hourly DB snapshots) |
| RTO (Recovery Time Objective) | 4 hours (failover + restore) |
| Database backup | Automated daily, 30-day retention, point-in-time recovery |
| Deployment strategy | Rolling update (zero-downtime) |

### 10.3 Scalability Targets

| Phase | Concurrent Users | Orders/Day | Products | Sellers |
|-------|-----------------|------------|----------|---------|
| Phase 1 (Launch) | 1,000 | 50-100 | 100-500 | 0 (own brand only) |
| Phase 1 (6 months) | 5,000 | 200-500 | 500-1,000 | 0 |
| Phase 2 (12 months) | 10,000 | 500-1,000 | 2,000-5,000 | 30-50 |
| Phase 3 (24 months) | 50,000-100,000 | 5,000-10,000 | 10,000+ | 100+ |

Architecture supports horizontal scaling at each layer:
- Frontend: Vercel auto-scales / add ECS instances behind ALB
- Backend: add ECS instances, use Redis for shared state
- Database: read replicas for query scaling, vertical scale for write scaling
- Search: Meilisearch scales to millions of documents, add replicas if needed

---

*Cross-references: BMRD (Doc 01), PRD (Doc 02), IA (Doc 03), FSD (Doc 05)*
