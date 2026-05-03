# FSD: Functional Specification Document

**Document ID**: FSD-v1.0
**Status**: Draft
**Author**: [Product Manager + Engineering Lead]
**Last Updated**: [Date]
**Audience**: Engineering, QA, AI coding agents
**Dependencies**: PRD (Doc 02), IA (Doc 03), TAD (Doc 04)

---

## 1. Conventions

### 1.1 Requirement Language (RFC 2119)

| Term | Meaning |
|------|---------|
| **MUST** | Absolute requirement. Feature will not ship without this. |
| **MUST NOT** | Absolute prohibition. Implementing this is a defect. |
| **SHOULD** | Recommended. Can be omitted with documented justification. |
| **SHOULD NOT** | Discouraged. Can be implemented with documented justification. |
| **MAY** | Optional. Implement if time permits or future phase. |

### 1.2 Data Formats

| Data Type | Format | Examples |
|-----------|--------|---------|
| Currency | Integer (paise). ₹800.50 = 80050 | All monetary fields: price, tax, shipping, payout |
| Dates | ISO 8601 UTC: `YYYY-MM-DDTHH:mm:ssZ` | `2026-05-03T14:30:00Z` |
| Phone | String, 10 digits, Indian mobile (starts with 6-9) | `9876543210` (no country code stored, +91 prefixed at SMS layer) |
| Email | String, lowercase, RFC 5322 validated | `priya@example.com` |
| GSTIN | String, 15 chars, regex: `^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$` | `29ABCDE1234F1Z5` |
| FSSAI License | String, 14 digits | `10012345678901` |
| Pincode | String, 6 digits | `560001` |
| Slug | Lowercase, hyphen-separated, alphanumeric | `vitamin-d3-2000iu` |
| UUID | v4 UUID for all entity IDs | `550e8400-e29b-41d4-a716-446655440000` |
| Percentage | Integer basis points internally (15% = 1500) or decimal in API (0.15) | Commission: 12% stored as 1200 basis points |

### 1.3 Error Code Taxonomy

| Code Range | Category | Example |
|-----------|----------|---------|
| `ERR-AUTH-xxx` | Authentication errors | `ERR-AUTH-001`: Invalid OTP |
| `ERR-CART-xxx` | Cart errors | `ERR-CART-001`: Product out of stock |
| `ERR-CHK-xxx` | Checkout errors | `ERR-CHK-001`: Pincode not serviceable |
| `ERR-PAY-xxx` | Payment errors | `ERR-PAY-001`: Payment failed |
| `ERR-ORD-xxx` | Order errors | `ERR-ORD-001`: Order not found |
| `ERR-SEL-xxx` | Seller errors | `ERR-SEL-001`: GSTIN already registered |
| `ERR-PRD-xxx` | Product errors | `ERR-PRD-001`: Invalid HSN code |
| `ERR-VAL-xxx` | Validation errors | `ERR-VAL-001`: Required field missing |

All API error responses follow this structure:
```json
{
  "error": {
    "code": "ERR-CART-001",
    "message": "Product is out of stock",
    "details": {
      "product_id": "uuid",
      "available_quantity": 0
    }
  }
}
```

### 1.4 State Notation

States are represented in `UPPER_SNAKE_CASE`. Transitions are documented as:
```
[CURRENT_STATE] --trigger--> [NEXT_STATE]  {guard_condition}
```

---

## 2. Feature Specifications

### 2.1 User Authentication (F-USR-001)

#### State Machine: User Session

```
[ANONYMOUS] --enter_phone--> [OTP_SENT]
[OTP_SENT] --verify_otp(valid)--> [AUTHENTICATED]
[OTP_SENT] --verify_otp(invalid, attempts<3)--> [OTP_SENT]
[OTP_SENT] --verify_otp(invalid, attempts>=3)--> [OTP_LOCKED]
[OTP_SENT] --otp_expired(5min)--> [ANONYMOUS]
[OTP_LOCKED] --cooldown_expired(30min)--> [ANONYMOUS]
[AUTHENTICATED] --logout--> [ANONYMOUS]
[AUTHENTICATED] --token_expired(15min) + refresh_valid--> [AUTHENTICATED]  (silent refresh)
[AUTHENTICATED] --token_expired + refresh_invalid--> [ANONYMOUS]
```

#### Business Rules

- **BR-AUTH-001**: Phone number is the primary unique identifier. One account per phone number.
- **BR-AUTH-002**: OTP MUST be 6 digits, cryptographically random (not sequential).
- **BR-AUTH-003**: OTP MUST expire after 5 minutes from generation.
- **BR-AUTH-004**: Maximum 3 OTP verification attempts per OTP. After 3 failures, lock for 30 minutes.
- **BR-AUTH-005**: Maximum 3 OTP resend requests per phone number per session. After 3 resends, lock for 30 minutes.
- **BR-AUTH-006**: If phone number is not registered, auto-create account on first successful OTP verification (zero-friction registration).
- **BR-AUTH-007**: Access token (JWT) expires in 15 minutes. Refresh token expires in 30 days. Refresh token is rotated on every use (old token invalidated).
- **BR-AUTH-008**: On logout, refresh token MUST be invalidated server-side (deleted from database/Redis).

#### Input/Output Specification

**Send OTP**:
```
POST /api/auth/otp/send
Request:  { "phone": "9876543210" }
Response (200): { "message": "OTP sent successfully", "expires_in": 300 }
Response (429): { "error": { "code": "ERR-AUTH-003", "message": "Too many OTP requests. Try again in X minutes" } }
```

**Verify OTP**:
```
POST /api/auth/otp/verify
Request:  { "phone": "9876543210", "otp": "123456" }
Response (200): {
  "access_token": "jwt...",
  "refresh_token": "opaque...",
  "customer": { "id": "uuid", "phone": "9876543210", "name": null, "email": null, "is_new": true }
}
Response (401): { "error": { "code": "ERR-AUTH-001", "message": "Invalid OTP. X attempts remaining" } }
Response (423): { "error": { "code": "ERR-AUTH-002", "message": "Account locked. Try again in X minutes" } }
```

#### Error Handling

| Error | Code | User Message | Recovery |
|-------|------|-------------|----------|
| Invalid OTP | ERR-AUTH-001 | "Invalid OTP. [X] attempts remaining." | Retry or resend OTP |
| OTP expired | ERR-AUTH-004 | "OTP has expired. Please request a new one." | Resend OTP |
| Too many attempts | ERR-AUTH-002 | "Too many failed attempts. Please try again in 30 minutes." | Wait for cooldown |
| Too many resends | ERR-AUTH-003 | "Too many OTP requests. Please try again in 30 minutes." | Wait for cooldown |
| SMS delivery failure | ERR-AUTH-005 | "Unable to send OTP. Please try again." | Retry (system-level retry first) |
| Phone format invalid | ERR-VAL-001 | "Please enter a valid 10-digit Indian mobile number." | Correct input |

---

### 2.2 Cart Management (F-CHK-001)

#### State Machine: Cart

```
[EMPTY] --add_item--> [ACTIVE]
[ACTIVE] --add_item--> [ACTIVE]
[ACTIVE] --update_quantity--> [ACTIVE]
[ACTIVE] --remove_item(last_item)--> [EMPTY]
[ACTIVE] --remove_item(not_last)--> [ACTIVE]
[ACTIVE] --checkout_initiated--> [CHECKOUT_IN_PROGRESS]
[CHECKOUT_IN_PROGRESS] --payment_success--> [CONVERTED]  (cart cleared)
[CHECKOUT_IN_PROGRESS] --payment_failed--> [ACTIVE]
[CHECKOUT_IN_PROGRESS] --abandoned(30min)--> [ACTIVE]
[ACTIVE] --save_for_later(item)--> [ACTIVE]  (item moved to saved list)
```

#### Business Rules

- **BR-CART-001**: Adding a product already in cart MUST increment quantity by 1 (not create duplicate line item).
- **BR-CART-002**: Quantity per line item MUST be between 1 and 10. Exceeding 10 shows error: "Maximum 10 units per product."
- **BR-CART-003**: Quantity MUST NOT exceed available stock. If stock < requested quantity, show: "Only [X] left in stock."
- **BR-CART-004**: Cart for authenticated users MUST persist server-side (database/Redis). Cart for anonymous users MUST persist in browser local storage.
- **BR-CART-005**: On login, anonymous cart MUST merge with server-side cart. Merge logic: for items in both carts, use the higher quantity (capped at stock). Items unique to either cart are added to merged cart.
- **BR-CART-006**: Cart prices MUST be re-validated on every cart page load. If a product price has changed since it was added, update the price in cart and show notice: "Price updated for [product name]."
- **BR-CART-007**: If a product is discontinued/unpublished after being added to cart, show: "This product is no longer available" with remove option. Block checkout until removed.
- **BR-CART-008**: Cart MUST NOT be cleared on payment failure. Cart returns to ACTIVE state for retry.
- **BR-CART-009** (Phase 2): Multi-seller cart MUST visually group items by seller. Each group shows seller name, per-group subtotal, and per-group shipping cost.

#### API Contract

**Add to Cart**:
```
POST /api/cart/items
Request:  { "variant_id": "uuid", "quantity": 1 }
Response (200): { "cart": { ...full cart object... } }
Response (400): { "error": { "code": "ERR-CART-001", "message": "Product is out of stock" } }
Response (400): { "error": { "code": "ERR-CART-002", "message": "Maximum 10 units per product" } }
```

**Update Quantity**:
```
PATCH /api/cart/items/{item_id}
Request:  { "quantity": 3 }
Response (200): { "cart": { ...full cart object... } }
```

**Remove from Cart**:
```
DELETE /api/cart/items/{item_id}
Response (200): { "cart": { ...full cart object... } }
```

**Cart Object Structure**:
```json
{
  "id": "uuid",
  "items": [
    {
      "id": "uuid",
      "product_id": "uuid",
      "variant_id": "uuid",
      "product_name": "Vitamin D3 2000IU",
      "variant_title": "60 Capsules",
      "image_url": "https://...",
      "unit_price": 59900,
      "quantity": 2,
      "line_total": 119800,
      "seller_id": null,
      "seller_name": "Our Brand",
      "in_stock": true,
      "available_quantity": 45
    }
  ],
  "saved_items": [],
  "subtotal": 119800,
  "item_count": 2,
  "warnings": [
    { "type": "price_changed", "item_id": "uuid", "message": "Price updated for Vitamin D3" }
  ]
}
```

---

### 2.3 Checkout Flow (F-CHK-002)

#### State Machine: Checkout

```
[CART_ACTIVE] --initiate_checkout--> [ADDRESS_STEP]  {user is authenticated, cart is non-empty}
[ADDRESS_STEP] --select_address(serviceable)--> [SHIPPING_STEP]
[ADDRESS_STEP] --select_address(not_serviceable)--> [ADDRESS_STEP]  {show error}
[SHIPPING_STEP] --select_shipping--> [PAYMENT_STEP]
[PAYMENT_STEP] --apply_coupon(valid)--> [PAYMENT_STEP]  {recalculate totals}
[PAYMENT_STEP] --apply_coupon(invalid)--> [PAYMENT_STEP]  {show error}
[PAYMENT_STEP] --select_payment_method--> [REVIEW_STEP]
[REVIEW_STEP] --place_order--> [PAYMENT_PROCESSING]
[PAYMENT_PROCESSING] --payment_success--> [ORDER_CONFIRMED]
[PAYMENT_PROCESSING] --payment_failed--> [PAYMENT_STEP]  {show error, allow retry}
[PAYMENT_PROCESSING] --payment_pending--> [PAYMENT_PENDING]  {poll status}
[PAYMENT_PENDING] --payment_confirmed--> [ORDER_CONFIRMED]
[PAYMENT_PENDING] --payment_timeout(5min)--> [PAYMENT_STEP]  {show timeout message}
[any step] --abandoned(30min)--> [CART_ACTIVE]  {session expired}
```

#### Business Rules

- **BR-CHK-001**: Checkout MUST require authentication. Anonymous users are redirected to login and returned to checkout after.
- **BR-CHK-002**: Checkout MUST re-validate stock availability on "Place Order" click. If any item is now out of stock, block order and show error with link back to cart.
- **BR-CHK-003**: Checkout session MUST timeout after 30 minutes of inactivity. Cart items are preserved, checkout restarts from step 1.
- **BR-CHK-004**: Pincode serviceability MUST be checked at the Address step. If not serviceable, user cannot proceed. Message: "Delivery not available to this pincode. Please use a different address."
- **BR-CHK-005**: Shipping cost MUST be calculated after address is confirmed. Shipping cost is based on total cart weight + delivery zone (origin warehouse pincode → buyer pincode).
- **BR-CHK-006**: Only one coupon MUST be allowed per order. Applying a new coupon replaces the previous one.
- **BR-CHK-007**: "Place Order" MUST be idempotent. If clicked multiple times (double-click, network retry), only one order is created. Implement via idempotency key (frontend generates UUID, backend checks for duplicate).
- **BR-CHK-008**: After payment success, order confirmation page MUST display order ID, items, delivery estimate, and payment method. This page MUST be bookmarkable (GET request, not POST result).
- **BR-CHK-009**: Prices shown on checkout summary MUST be inclusive of GST (standard B2C practice in India). GST breakup (CGST/SGST or IGST) MUST be shown as a line item for transparency.

#### Checkout Summary Calculation

```
For each item:
    line_total = unit_price × quantity

subtotal = sum(all line_totals)

if coupon:
    if coupon.type == "flat":
        discount = min(coupon.value, subtotal)
    if coupon.type == "percentage":
        discount = min(subtotal × coupon.percentage, coupon.max_discount)
    if coupon.type == "free_shipping":
        discount = shipping_total

discounted_subtotal = subtotal - discount

shipping_total = sum(shipping per fulfillment group)
    Phase 1: single group (own brand warehouse → buyer)
    Phase 2: per-seller group

tax_breakup:
    For each item:
        tax_rate = lookup(item.hsn_code)
        if seller_state == buyer_state:
            cgst = item.line_total × (tax_rate / 2)
            sgst = item.line_total × (tax_rate / 2)
        else:
            igst = item.line_total × tax_rate
    Note: prices are GST-inclusive, so tax is already in the price
    Tax shown for transparency, not added on top

order_total = discounted_subtotal + shipping_total

prepaid_discount (if applicable): ₹50 off for non-COD
final_total = order_total - prepaid_discount
```

---

### 2.4 Order Lifecycle (F-ORD-001)

#### State Machine: Order

```
                ┌─────────────────────────────────────────┐
                │                                         │
[CONFIRMED] ──processing──▶ [PROCESSING] ──ship──▶ [SHIPPED]
    │                           │                     │
    │                           │                     ▼
    │cancel                     │cancel         [OUT_FOR_DELIVERY]
    │                           │                     │
    ▼                           ▼                     ▼
[CANCELLED]              [CANCELLED]            [DELIVERED]
                                                     │
                                              return_request
                                                     │
                                                     ▼
                                             [RETURN_REQUESTED]
                                                     │
                                          ┌──────────┼──────────┐
                                          │                     │
                                    approved                rejected
                                          │                     │
                                          ▼                     ▼
                                  [RETURN_APPROVED]      [RETURN_REJECTED]
                                          │
                                   pickup_scheduled
                                          │
                                          ▼
                                  [RETURN_PICKED]
                                          │
                                   refund_initiated
                                          │
                                          ▼
                                  [REFUND_PROCESSED]
```

#### Business Rules

- **BR-ORD-001**: Order status transitions MUST follow the state machine. No skipping states (e.g., cannot go from CONFIRMED directly to DELIVERED).
- **BR-ORD-002**: Buyer can cancel order in states: CONFIRMED, PROCESSING. Once SHIPPED, cancellation is not allowed (must use returns).
- **BR-ORD-003**: Seller/admin can cancel order in states: CONFIRMED, PROCESSING (e.g., stock issue discovered post-order). Buyer is notified and refunded.
- **BR-ORD-004**: Order stuck in PROCESSING for >48 hours MUST trigger an admin alert.
- **BR-ORD-005**: On cancellation by buyer (before shipping), full refund MUST be initiated automatically. On cancellation by seller, full refund + apology notification.
- **BR-ORD-006**: Return request MUST be within return window (default: 7 days from delivery, configurable per category).
- **BR-ORD-007**: Return reasons: `damaged`, `wrong_product`, `expired`, `quality_issue`, `not_as_described`, `changed_mind`. For `damaged` and `quality_issue`, image upload is REQUIRED.
- **BR-ORD-008**: Supplements MUST NOT accept `changed_mind` returns (opened supplements cannot be resold per FSSAI guidelines). Only `damaged`, `wrong_product`, `expired` allowed.
- **BR-ORD-009**: Refund MUST be processed within 5-7 business days of return pickup confirmation.
- **BR-ORD-010**: Refund to original payment method. COD orders: refund via bank transfer (buyer provides bank details) or store credit.

#### Phase 2: Sub-Order States (Multi-Seller)

Each sub-order (per seller) has its own independent state machine (same as above). Parent order status is derived:
- Parent = CONFIRMED if all sub-orders are CONFIRMED
- Parent = PARTIALLY_SHIPPED if at least one sub-order is SHIPPED but not all
- Parent = SHIPPED if all sub-orders are SHIPPED
- Parent = DELIVERED if all sub-orders are DELIVERED
- Parent = PARTIALLY_DELIVERED if at least one is DELIVERED

---

### 2.5 Payment Processing (F-CHK-003)

#### State Machine: Payment

```
[INITIATED] --razorpay_checkout_opened--> [AWAITING_PAYMENT]
[AWAITING_PAYMENT] --payment_success--> [CAPTURED]
[AWAITING_PAYMENT] --payment_failed--> [FAILED]
[AWAITING_PAYMENT] --payment_timeout(5min)--> [TIMED_OUT]
[AWAITING_PAYMENT] --user_cancelled--> [CANCELLED]
[FAILED] --retry--> [AWAITING_PAYMENT]
[TIMED_OUT] --retry--> [AWAITING_PAYMENT]
[CAPTURED] --refund_partial--> [PARTIALLY_REFUNDED]
[CAPTURED] --refund_full--> [REFUNDED]
[PARTIALLY_REFUNDED] --refund_remaining--> [REFUNDED]
```

Special state for COD:
```
[COD_PENDING] --delivery_confirmed + cash_collected--> [COD_COLLECTED]
[COD_PENDING] --delivery_refused--> [COD_RTO]
[COD_COLLECTED] --remittance_received--> [COD_RECONCILED]
```

#### Business Rules

- **BR-PAY-001**: All Razorpay interactions MUST use server-side signature verification. Frontend MUST NOT have access to `key_secret`.
- **BR-PAY-002**: Payment amount MUST be in paise. Amount sent to Razorpay MUST exactly match order total (no floating point).
- **BR-PAY-003**: Webhook (`payment.captured`) is the source of truth for payment confirmation, not the client-side callback. Client-side callback provides immediate UX, but order MUST NOT be fulfilled until webhook confirms.
- **BR-PAY-004**: Webhook processing MUST be idempotent. Check `razorpay_payment_id` against database before processing. If already processed, return 200 OK without re-processing.
- **BR-PAY-005**: Double-payment prevention: order ID is passed as `receipt` in Razorpay order creation. If two Razorpay payments exist for the same receipt, the second is auto-refunded.
- **BR-PAY-006**: COD is available for orders between ₹200 and ₹5,000 (configurable). Below ₹200: minimum order for COD. Above ₹5,000: prepaid only (fraud prevention).
- **BR-PAY-007**: COD orders above ₹1,000 MUST require OTP verification before order confirmation.
- **BR-PAY-008**: Prepaid discount (₹50 off) SHOULD be offered to incentivize non-COD payments. This reduces RTO risk.
- **BR-PAY-009**: Refund API call to Razorpay MUST include `speed: "normal"` (5-7 business days) for standard refunds. Instant refund (`speed: "optimum"`) has higher fees, use only for escalations.

#### COD OTP Verification Flow

```
Buyer selects COD at checkout
    │
    ▼
IF order_total > ₹1,000:
    │
    ▼
Send OTP to buyer's registered phone
    │
    ▼
Buyer enters OTP on checkout page
    │
    ▼
Verify OTP (same MSG91 flow as login, different template)
    │
    ├── Success → proceed with order placement (COD)
    └── Failure (3 attempts) → "Unable to verify. Please use a prepaid payment method."
        → Do NOT place order as COD
```

---

## 3. Key Complex Flows

### 3.1 Multi-Seller Checkout Flow (Phase 2)

```
Step 1: Cart Analysis
────────────────────
INPUT: Cart with items from multiple sellers

FOR each item in cart:
    group_by seller_id
    → Creates fulfillment_groups[]

FOR each fulfillment_group:
    origin_pincode = seller.warehouse_pincode (or platform warehouse if own_brand)
    destination_pincode = buyer.address.pincode
    total_weight = sum(item.weight × item.quantity for items in group)

    shipping_options = Shiprocket.check_serviceability(origin, destination, weight)
    IF no carriers available:
        → ERROR: "Delivery not available for [seller_name] products to your pincode"
        → Block checkout, show which seller group is unserviceable

    group.shipping_cost = cheapest_option.cost
    group.estimated_delivery = cheapest_option.estimated_days


Step 2: Checkout Display
────────────────────────
Show grouped summary:
    ┌─────────────────────────────────────┐
    │ From Our Brand                      │
    │   Item A  ₹500 × 1 = ₹500          │
    │   Shipping: ₹50                     │
    │   Delivery by: May 8                │
    ├─────────────────────────────────────┤
    │ From [Seller 1]                     │
    │   Item B  ₹800 × 1 = ₹800          │
    │   Item C  ₹300 × 1 = ₹300          │
    │   Shipping: ₹60                     │
    │   Delivery by: May 10               │
    ├─────────────────────────────────────┤
    │ Subtotal:        ₹1,600             │
    │ Shipping:        ₹110               │
    │ Discount:        -₹100 (coupon)     │
    │ Total:           ₹1,610             │
    └─────────────────────────────────────┘


Step 3: Payment (Single Transaction)
─────────────────────────────────────
Create single Razorpay order for ₹1,610 (total)
Buyer pays once


Step 4: Order Creation (Post-Payment)
─────────────────────────────────────
1. Create parent_order:
     id: ORD-20260503-001
     customer_id: buyer_uuid
     total: 161000 (paise)
     payment_id: razorpay_payment_id
     status: CONFIRMED

2. FOR each fulfillment_group:
     Create sub_order:
       id: ORD-20260503-001-A (own_brand)
       parent_order_id: ORD-20260503-001
       seller_id: seller_uuid (or null for own brand)
       items: [group items]
       subtotal: group subtotal
       shipping_cost: group shipping
       commission_amount: subtotal × commission_rate (marketplace only)
       tcs_amount: subtotal × 0.01 (marketplace only)
       status: CONFIRMED

3. Notify each seller of their sub-order (email + dashboard notification)
4. Notify buyer with order confirmation (email + SMS with parent order ID)


Step 5: Fulfillment (Independent per Sub-Order)
────────────────────────────────────────────────
Each sub-order is independently:
    → Picked, packed, shipped by respective seller (or platform warehouse)
    → Gets its own AWB number and tracking
    → Delivered on its own timeline
    → Can be individually cancelled/returned


Step 6: Payout (Post-Delivery)
──────────────────────────────
ON sub_order.status == DELIVERED:
    wait settlement_period (T+7 days)
    THEN calculate payout:
        payout = sub_order.subtotal - commission - tcs + shipping_reimbursement
    initiate bank transfer via Razorpay Route
```

### 3.2 Seller Onboarding Flow

#### State Machine: Seller Application

```
[NOT_APPLIED] --submit_application--> [SUBMITTED]
[SUBMITTED] --admin_review--> [UNDER_REVIEW]
[UNDER_REVIEW] --admin_approve--> [APPROVED]
[UNDER_REVIEW] --admin_request_info--> [INFO_REQUESTED]
[UNDER_REVIEW] --admin_reject--> [REJECTED]
[INFO_REQUESTED] --seller_responds--> [UNDER_REVIEW]
[INFO_REQUESTED] --no_response(14days)--> [EXPIRED]
[APPROVED] --seller_starts_onboarding--> [ONBOARDING]
[ONBOARDING] --all_steps_complete--> [ONBOARDING_COMPLETE]
[ONBOARDING] --abandoned(30days)--> [ARCHIVED]
[ONBOARDING_COMPLETE] --admin_final_verify--> [ACTIVE]
[ACTIVE] --sla_violation--> [WARNING]
[WARNING] --repeated_violation--> [SUSPENDED]
[SUSPENDED] --admin_reactivate--> [ACTIVE]
[REJECTED] --seller_reapplies(after_90_days)--> [SUBMITTED]
```

#### Document Verification Checklist

```
Application Stage:
    ☐ GSTIN format validation (regex)
    ☐ FSSAI license number format validation (14 digits) [if supplements]
    ☐ FSSAI license document uploaded (PDF/image, <5MB)
    ☐ Cosmetics manufacturing license uploaded [if skincare]
    ☐ Sample product images (3-5, quality check: resolution ≥ 500x500)

Onboarding Stage:
    ☐ Bank account details provided (account number, IFSC)
    ☐ Cancelled cheque uploaded (for bank verification)
    ☐ PAN number provided (format validated: [A-Z]{5}[0-9]{4}[A-Z]{1})
    ☐ PAN card image uploaded
    ☐ GST certificate uploaded
    ☐ FSSAI license expiry date > today + 90 days (warn if expiring soon)
    ☐ Marketplace seller agreement digitally signed

Admin Verification:
    ☐ GSTIN validated against government GST portal (manual or API check)
    ☐ FSSAI license validated against FSSAI portal (manual check)
    ☐ Bank details verified via penny drop test (Razorpay/Cashfree API)
    ☐ PAN-GSTIN cross-verification (PAN should match GSTIN)
    ☐ Product samples reviewed for quality (if physical samples requested)
    ☐ Brand website/social media verified for legitimacy
```

### 3.3 Payment & Payout Flow (Phase 2)

#### Settlement Calculation

```
INPUT: sub_order (delivered, past settlement period)

gross_amount = sub_order.subtotal  (product selling prices, GST-inclusive)

# Determine commission
IF sub_order.seller.custom_commission_rate:
    commission_rate = seller.custom_commission_rate
ELSE:
    commission_rate = category_default_commission_rate
    # Supplements: 12%, Skincare: 15%

commission_amount = gross_amount × commission_rate

# TCS (Tax Collected at Source)
# TCS is on net taxable value (exclusive of GST)
gst_rate = weighted_average_gst_rate(sub_order.items)
net_taxable_value = gross_amount / (1 + gst_rate)
tcs_amount = net_taxable_value × 0.01  # 1% TCS

# Shipping reimbursement
IF fulfillment_model == "seller_shipped":
    shipping_reimbursement = sub_order.shipping_cost  # pass through to seller
ELSE:  # platform_fulfilled
    shipping_reimbursement = 0  # platform handles shipping

# Return adjustments
return_adjustments = sum(returned_item.refund_amount for returned items in sub_order)

# Final payout
payout_amount = gross_amount - commission_amount - tcs_amount - return_adjustments + shipping_reimbursement

OUTPUT: {
    seller_id,
    sub_order_id,
    gross_amount,
    commission_amount,
    commission_rate,
    tcs_amount,
    return_adjustments,
    shipping_reimbursement,
    payout_amount,
    payout_date: delivery_date + settlement_period
}
```

#### Payout Execution

```
Daily Payout Job (runs at 10:00 AM IST):
    1. Query all settlements where payout_date <= today AND payout_status = PENDING
    2. Group by seller_id (consolidate multiple sub-orders into single payout)
    3. FOR each seller:
        IF total_payout < ₹100:
            → Skip (accumulate until threshold met)
            → Set payout_status = HELD (below minimum)
        ELSE:
            → Call Razorpay Route Transfer API or Cashfree Payout API
            → Request body: { account_id, amount (paise), currency: INR, notes }
            → On success: set payout_status = PROCESSING, store transfer_id
            → On failure: set payout_status = FAILED, alert admin, retry next day

    4. Webhook from Razorpay/Cashfree:
        → transfer.processed: set payout_status = COMPLETED, store UTR number
        → transfer.failed: set payout_status = FAILED, alert admin + seller
```

### 3.4 Product Moderation Flow (Phase 2)

```
Seller submits product
    │
    ▼
Auto-Validation (immediate):
    ☐ All required fields present
    ☐ Product name length: 5-200 chars
    ☐ Description length: 200-2000 chars
    ☐ At least 3 product images, each ≥ 500x500px
    ☐ MRP > 0
    ☐ Selling price ≤ MRP
    ☐ Selling price > 0
    ☐ HSN code is in valid HSN list
    ☐ Stock quantity > 0
    ☐ FSSAI license number matches seller's verified FSSAI (for supplements)
    │
    ├── FAIL → status: DRAFT, show validation errors to seller
    │
    ▼ PASS
    │
    status: PENDING_REVIEW
    → Added to admin moderation queue
    → Admin receives notification (if queue was empty)
    │
    ▼
Admin Review:
    Admin checks:
    ☐ Product images are genuine (not stock photos with watermarks)
    ☐ Description is accurate, not misleading
    ☐ Health claims comply with FSSAI / D&C Act (no "cures" or "treats" claims)
    ☐ Ingredients list is complete and accurate
    ☐ HSN code is correct for the product type
    ☐ Category and sub-category assignment is correct
    ☐ Pricing is reasonable (not suspiciously cheap or expensive)
    │
    ├── APPROVE → status: ACTIVE
    │   → Product visible in catalog within 5 minutes (cache invalidation)
    │   → Product indexed in Meilisearch
    │   → Seller notified: "Your product [name] has been approved and is now live"
    │
    ├── REQUEST_CHANGES → status: CHANGES_REQUESTED
    │   → Admin specifies which fields need changes + reason
    │   → Seller notified with specific feedback
    │   → Seller edits product, re-submits → back to PENDING_REVIEW
    │
    └── REJECT → status: REJECTED
        → Admin provides rejection reason (free text, required)
        → Seller notified: "Your product [name] was not approved. Reason: [reason]"
        → Seller can edit and re-submit as a new submission


Post-Approval Edits:
    Seller edits an ACTIVE product:
    │
    ├── Non-regulated fields changed (price, stock, images):
    │   → Changes go live immediately
    │   → No re-review needed
    │
    └── Regulated fields changed (ingredients, description, health claims, FSSAI, HSN):
        → status: PENDING_REVIEW (version tracking: old version stays live until new version approved)
        → Admin re-reviews the changes
        → On approve: new version replaces old
        → On reject: old version remains live, seller notified
```

### 3.5 GST Invoice Generation

#### Invoice Generation Rules

```
ON order_confirmed:

IF order is own-brand only (Phase 1):
    Generate 1 invoice:
        seller = platform legal entity
        seller_gstin = platform GSTIN
        buyer_gstin = buyer.gstin (if provided, optional for B2C)
        items = all order items
        tax_determination:
            FOR each item:
                seller_state = platform_warehouse_state
                buyer_state = buyer.address.state
                IF same: CGST + SGST
                ELSE: IGST

IF order has marketplace items (Phase 2):
    FOR each sub_order (grouped by seller):
        Generate 1 invoice per seller:
            seller = seller legal entity
            seller_gstin = seller.gstin
            buyer_gstin = buyer.gstin (if provided)
            items = items in this sub_order
            tax_determination:
                seller_state = seller.registered_state
                buyer_state = buyer.address.state
                IF same: CGST + SGST
                ELSE: IGST

    Result: multi-seller order with 3 sellers → buyer receives 3 invoices


ON return_approved:
    Generate credit note:
        reference_invoice = original invoice number
        items = returned items only
        amount = negative (refund amount)
        tax = negative (proportional tax refund)
```

#### Invoice PDF Fields

```
INVOICE
─────────────────────────────────────────────────
Invoice No: INV/2627/00042          Date: 03-May-2026
Order No: ORD-20260503-001

SOLD BY:
[Seller Legal Name]
[Seller Address]
GSTIN: [Seller GSTIN]
FSSAI: [FSSAI Number] (if supplements)

BILL TO:                           SHIP TO:
[Buyer Name]                       [Buyer Name]
[Buyer Address]                    [Delivery Address]
GSTIN: [Buyer GSTIN if provided]   [Pincode]

─────────────────────────────────────────────────
SN | Product    | HSN  | Qty | Rate   | Taxable | CGST    | SGST    | Total
                                       Value    | Rate Amt | Rate Amt |
───┼────────────┼──────┼─────┼────────┼─────────┼─────────┼─────────┼──────
 1 | Vitamin D3 | 2106 |  2  | ₹499   | ₹891    | 6% ₹53  | 6% ₹53  | ₹998
 2 | Face Serum | 3304 |  1  | ₹546   | ₹427    | 14% ₹60 | 14% ₹60 | ₹546
───┼────────────┼──────┼─────┼────────┼─────────┼─────────┼─────────┼──────
                               SUBTOTAL: ₹1,318 | ₹113    | ₹113    | ₹1,544
                               SHIPPING:                              ₹50
                               DISCOUNT:                             -₹100
                               ─────────────────────────────────────────────
                               TOTAL:                                ₹1,494
                               ─────────────────────────────────────────────
                               Amount in words: Rupees One Thousand Four
                               Hundred Ninety-Four Only

Place of Supply: Karnataka (29)
Reverse Charge: No

─────────────────────────────────────────────────
This is a computer-generated invoice. No signature required.
```

---

## 4. Notification Specifications

### 4.1 Buyer Notifications

| Trigger | Channel | Template | Variables |
|---------|---------|----------|-----------|
| OTP for login | SMS | "{{otp}} is your OTP to login to [Brand]. Valid for 5 min. Do not share with anyone." | otp |
| COD OTP | SMS | "{{otp}} is your OTP to confirm COD order #{{order_id}} of ₹{{amount}}. Valid for 5 min." | otp, order_id, amount |
| Order placed | Email + SMS | Email: full order summary with items, total, delivery estimate. SMS: "Order #{{order_id}} placed! Expected delivery by {{delivery_date}}. Track: {{url}}" | order_id, items, total, delivery_date, url |
| Order shipped | Email + SMS | Email: tracking details. SMS: "Order #{{order_id}} shipped via {{carrier}}. Track: {{tracking_url}}" | order_id, carrier, tracking_url |
| Out for delivery | SMS | "Order #{{order_id}} is out for delivery today." | order_id |
| Order delivered | Email + SMS | SMS: "Order #{{order_id}} delivered! Rate your experience: {{review_url}}" | order_id, review_url |
| Order cancelled (by buyer) | Email | "Your order #{{order_id}} has been cancelled. Refund of ₹{{amount}} will be processed within 5-7 business days." | order_id, amount |
| Order cancelled (by seller) | Email + SMS | "Order #{{order_id}} has been cancelled by the seller. Full refund of ₹{{amount}} will be processed." | order_id, amount, reason |
| Refund processed | Email + SMS | "Refund of ₹{{amount}} for order #{{order_id}} has been processed. It will reflect in your account within 5-7 business days." | amount, order_id |
| Return approved | Email | "Your return request for [product] from order #{{order_id}} has been approved. Pickup will be scheduled within 2-3 business days." | product_name, order_id |
| Return rejected | Email | "Your return request for [product] was not approved. Reason: {{reason}}. Contact support for assistance." | product_name, reason |

### 4.2 Seller Notifications (Phase 2)

| Trigger | Channel | Template Variables |
|---------|---------|-------------------|
| Application received | Email | business_name, reference_number |
| Application approved | Email | business_name, onboarding_link |
| Application rejected | Email | business_name, rejection_reason |
| New order (sub-order) | Email + Dashboard | order_id, items, buyer_address, total |
| Product approved | Email + Dashboard | product_name |
| Product rejected | Email + Dashboard | product_name, rejection_reason |
| Product changes requested | Email + Dashboard | product_name, feedback |
| Payout processed | Email + Dashboard | payout_amount, utr_number, order_references |
| Payout failed | Email + Dashboard | payout_amount, failure_reason |
| SLA warning | Email + Dashboard | metric_name, current_value, threshold |
| Account suspended | Email | suspension_reason, appeal_process |
| FSSAI license expiring (30 days before) | Email | license_number, expiry_date |

### 4.3 Admin Notifications

| Trigger | Channel |
|---------|---------|
| New seller application | Email + Dashboard |
| Product moderation queue > 10 items | Dashboard alert |
| Order stuck in PROCESSING > 48 hours | Dashboard alert |
| Payout failure | Email + Dashboard |
| High RTO rate (>15% in a week) | Dashboard alert |
| Seller SLA violation | Dashboard alert |
| Low stock alert (product < threshold units) | Dashboard alert |

---

## 5. Search & Filter Specifications

### 5.1 Search Ranking

**Ranking Strategy** (Meilisearch configuration):

```
Ranking Rules (in priority order):
1. words       -- documents containing all query words rank higher
2. typo        -- fewer typos rank higher
3. proximity   -- words closer together rank higher
4. attribute   -- matches in higher-weighted fields rank higher
5. sort        -- user-selected sort order (if applied)
6. exactness   -- exact matches rank higher than prefix/substring

Searchable Attributes (in priority order):
1. name        (highest weight)
2. brand
3. description
4. ingredients
5. concerns    (array field)
6. tags        (array field)
```

### 5.2 Filter Logic

```
Applied filters are ANDed across dimensions, ORed within a dimension.

Example:
    User selects:
        Category: Supplements
        Concern: [Immunity, Energy]     (OR: Immunity OR Energy)
        Price: 500-1000                 (range)
        Product Type: [Capsule, Tablet] (OR: Capsule OR Tablet)
        Rating: 4+                      (minimum threshold)

    Query: category=supplements AND (concern=immunity OR concern=energy) AND price>=500 AND price<=1000 AND (type=capsule OR type=tablet) AND rating>=4
```

### 5.3 Autocomplete Behavior

```
User types: "vit"

Meilisearch search with limit=10, prefix matching

Response groups:
    Products (max 5):
        "Vitamin D3 2000IU" → link to PDP
        "Vitamin C Serum" → link to PDP
        "Vital Protein Powder" → link to PDP

    Categories (max 3):
        "Vitamins & Minerals" → link to category PLP

    Journal (max 2):
        "Benefits of Vitamin D for Indian Summers" → link to article

Display:
    ┌────────────────────────────────────┐
    │ 🔍 vit                        [X] │
    ├────────────────────────────────────┤
    │ Products                          │
    │   Vitamin D3 2000IU        ₹499   │
    │   Vitamin C Serum          ₹799   │
    │   Vital Protein Powder   ₹1,299   │
    ├────────────────────────────────────┤
    │ Categories                        │
    │   Vitamins & Minerals             │
    ├────────────────────────────────────┤
    │ From Journal                      │
    │   Benefits of Vitamin D for ...   │
    └────────────────────────────────────┘

Timing:
    - Debounce input: 150ms (don't search on every keystroke)
    - API response target: <200ms
    - Show skeleton loading state after 100ms if no response
```

---

## 6. API Contract Summary

### 6.1 Key API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/api/auth/otp/send` | Send OTP | No |
| POST | `/api/auth/otp/verify` | Verify OTP, return tokens | No |
| POST | `/api/auth/refresh` | Refresh access token | Refresh token |
| POST | `/api/auth/logout` | Invalidate refresh token | Yes |
| GET | `/api/products` | List products (with filters, sort, pagination) | No |
| GET | `/api/products/:slug` | Product detail | No |
| GET | `/api/categories` | Category tree | No |
| GET | `/api/search?q=` | Search products + content | No |
| GET | `/api/search/suggest?q=` | Autocomplete suggestions | No |
| GET | `/api/cart` | Get current cart | Optional (anon or auth) |
| POST | `/api/cart/items` | Add item to cart | Optional |
| PATCH | `/api/cart/items/:id` | Update item quantity | Optional |
| DELETE | `/api/cart/items/:id` | Remove item from cart | Optional |
| POST | `/api/cart/merge` | Merge anonymous cart on login | Yes |
| POST | `/api/checkout` | Initiate checkout | Yes |
| POST | `/api/checkout/address` | Set delivery address | Yes |
| GET | `/api/checkout/shipping` | Get shipping options | Yes |
| POST | `/api/checkout/payment` | Create Razorpay order | Yes |
| POST | `/api/checkout/confirm` | Verify payment, create order | Yes |
| POST | `/api/checkout/coupon` | Apply coupon | Yes |
| DELETE | `/api/checkout/coupon` | Remove coupon | Yes |
| GET | `/api/orders` | List buyer's orders | Yes |
| GET | `/api/orders/:id` | Order detail | Yes |
| POST | `/api/orders/:id/cancel` | Cancel order | Yes |
| POST | `/api/orders/:id/return` | Request return | Yes |
| GET | `/api/account/profile` | Get profile | Yes |
| PATCH | `/api/account/profile` | Update profile | Yes |
| GET | `/api/account/addresses` | List addresses | Yes |
| POST | `/api/account/addresses` | Add address | Yes |
| PATCH | `/api/account/addresses/:id` | Update address | Yes |
| DELETE | `/api/account/addresses/:id` | Delete address | Yes |
| GET | `/api/account/wishlist` | Get wishlist | Yes |
| POST | `/api/account/wishlist` | Add to wishlist | Yes |
| DELETE | `/api/account/wishlist/:product_id` | Remove from wishlist | Yes |
| GET | `/api/serviceability/:pincode` | Check pincode serviceability | No |
| GET | `/api/content/articles` | List articles | No |
| GET | `/api/content/articles/:slug` | Article detail | No |
| POST | `/api/webhooks/razorpay` | Razorpay payment webhooks | Webhook signature |
| POST | `/api/webhooks/shiprocket` | Shiprocket tracking webhooks | IP whitelist |

### 6.2 Phase 2 Seller API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/seller/apply` | Submit seller application | No |
| POST | `/api/seller/auth/login` | Seller login | No |
| GET | `/api/seller/dashboard` | Dashboard metrics | Seller |
| GET | `/api/seller/products` | List seller's products | Seller |
| POST | `/api/seller/products` | Submit new product | Seller |
| PATCH | `/api/seller/products/:id` | Edit product | Seller |
| GET | `/api/seller/orders` | List seller's sub-orders | Seller |
| GET | `/api/seller/orders/:id` | Sub-order detail | Seller |
| PATCH | `/api/seller/orders/:id/status` | Update sub-order status (ship, etc.) | Seller |
| GET | `/api/seller/payouts` | Payout history | Seller |
| GET | `/api/seller/profile` | Seller profile | Seller |
| PATCH | `/api/seller/profile` | Update profile | Seller |

### 6.3 Admin API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/dashboard` | Admin dashboard metrics | Admin |
| GET/POST/PATCH | `/api/admin/products/*` | Product CRUD | Catalog Admin |
| GET | `/api/admin/orders/*` | Order management | Order Admin |
| GET/PATCH | `/api/admin/sellers/*` | Seller management | Seller Admin |
| PATCH | `/api/admin/sellers/:id/approve` | Approve seller | Seller Admin |
| PATCH | `/api/admin/sellers/:id/reject` | Reject seller | Seller Admin |
| PATCH | `/api/admin/products/:id/moderate` | Approve/reject product | Catalog Admin |
| GET/POST/PATCH | `/api/admin/coupons/*` | Coupon management | Admin |
| GET | `/api/admin/reports/*` | Reports | Admin |

---

*Cross-references: BMRD (Doc 01), PRD (Doc 02), IA (Doc 03), TAD (Doc 04)*
