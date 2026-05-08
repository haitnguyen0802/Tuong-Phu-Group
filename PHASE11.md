# Phase 11 - Cart + Checkout Foundation

> **Status:** Planned phase. Standardized format document.

---

## 0. Prerequisites

- Phase 10 complete
- Product detail actions available
- RHF + Zod + Zustand available

---

## 1. Objectives

1. Tao cart drawer/page va quan ly state qua Zustand.
2. Tao checkout form voi RHF + Zod.
3. Tinh toan subtotal/shipping/total co ban.
4. Tao order payload mock (khong thanh toan that).

### Product outcomes (business-facing)

- Giam friction tu PDP -> dat hang thu nghiem (mock checkout) trong <= 3 buoc chinh.
- Tao nen tang on dinh de sang Phase 12 co the gan payment that ma khong doi cau truc form/state.
- Dam bao cart behavior nhat quan giua drawer va cart page.

---

## 2. Scope

### In scope

- Cart store: add/remove/update quantity/clear.
- Cart UI: line items + summary.
- Checkout page: contact + shipping form + validation.
- Mock order submit + success state.

### Out of scope

- Real payment gateway integration
- ERP/inventory sync real-time
- Coupon engine phuc tap
- Guest/account merge cart sau login

---

## 3. Deliverables

### Create

```txt
lib/store/useCartStore.ts
app/(marketing)/cart/page.tsx
app/(marketing)/checkout/page.tsx
components/cart/CartDrawer.tsx
components/cart/CartSummary.tsx
components/cart/CartLineItem.tsx
components/checkout/CheckoutForm.tsx
components/checkout/OrderReview.tsx
```

### Modify

```txt
components/product/ProductInfo.tsx (add-to-cart action)
types/index.ts (cart/order types)
```

### Optional (if architecture requires)

```txt
lib/utils/price.ts
lib/constants/checkout.ts
components/header/HeaderActions.tsx (cart badge trigger)
```

---

## 4. Implementation steps

- [ ] Build `useCartStore` with cart actions
- [ ] Build cart UI components and route
- [ ] Build checkout form and order review
- [ ] Wire add-to-cart flow from PDP
- [ ] Add mock submit and success flow

### 4.1 Suggested implementation order (tech lead)

1. Define cart/order types first (`types/index.ts`) to avoid rework.
2. Build pure pricing helpers (subtotal/shipping/total) and unit-test logic.
3. Build Zustand store + selectors (no UI dependency).
4. Build cart UI (drawer + page) using shared presentational components.
5. Build checkout form schema + RHF integration.
6. Connect submit mock + post-submit state reset.

### 4.2 State model (proposed)

```ts
type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  maxQty?: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};
```

### 4.3 Checkout form contract (RHF + Zod baseline)

- `contact.email` (required, valid email)
- `shipping.fullName` (required)
- `shipping.phone` (required, min length)
- `shipping.addressLine1` (required)
- `shipping.ward` / `district` / `city` (required)
- `note` (optional, max length)

### 4.4 Pricing rules (phase baseline)

- `subtotal = sum(price * quantity)`
- `shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE`
- `total = subtotal + shippingFee`
- Currency format thong nhat (VND), khong lam tron sai le.

### 4.5 UX/A11y requirements

- Cart drawer co focus trap va `Esc` de dong.
- Cart badge co `aria-label` ro rang (vi du: "Mo gio hang, 3 san pham").
- Quantity controls keyboard-operable, khong chi click.
- Form errors lien ket `aria-describedby` den field tuong ung.
- Disable submit khi cart rong hoac form invalid.

### 4.6 Edge cases to handle

- Add cung product -> tang quantity thay vi duplicate line.
- Quantity < 1 -> auto remove item hoac clamp ve 1 (chon 1 logic va giu nhat quan).
- Product het hang (neu co stock flag) -> disable add-to-cart.
- Refresh page: cart persistence (neu bat localStorage) hoac clear session (neu khong persist) phai duoc document ro.
- Checkout direct URL voi cart rong -> redirect cart page hoac empty state action.

---

## 5. Acceptance checklist

- [ ] Cart add/update/remove works correctly
- [ ] Checkout validates and shows errors correctly
- [ ] Mock order flow clears cart and shows success
- [ ] Typecheck/lint/build pass

### Definition of done (DoD)

- [ ] Khong su dung `any` trong cart/checkout flow.
- [ ] Khong co hydration mismatch khi mo drawer va thao tac quantity.
- [ ] Cart summary tinh dung tren ca cart page va checkout page.
- [ ] Success state co order code mock + CTA quay lai shopping.
- [ ] Empty states duoc thiet ke va copywriting ro rang.

### QA scenarios (minimum)

- [ ] Mobile (390px): drawer usability + sticky summary readability
- [ ] Tablet/Desktop: cart page layout khong vo grid
- [ ] Keyboard only: co the complete checkout flow
- [ ] Invalid form submit: error message hien dung vi tri
- [ ] Cart clear sau success: badge ve 0
- [ ] Reload sau add-to-cart: behavior dung voi persistence strategy da chon

---

## 6. Verify commands

```bash
npx tsc --noEmit
npm run lint
npm run build
```

---

## 7. Risks and mitigations

- Risk: Logic tinh gia bi duplicate o nhieu component.  
  Mitigation: Tach helpers `price.ts`, UI chi consume selector/helper.

- Risk: Drawer state va route state conflict.  
  Mitigation: Quan ly single source of truth trong Zustand, route khong hold cart data.

- Risk: Checkout schema thay doi lien tuc tu business.  
  Mitigation: Dung Zod object theo section (`contact`, `shipping`) de de mo rong.

- Risk: LocalStorage persistence gay SSR/client mismatch.  
  Mitigation: Hydrate store on client-only, render fallback an toan truoc khi hydrate xong.

---

## 8. Kickoff prompt template

```md
@PHASE11.md @OPENAI.md @TECHSTACK.md @PHASE10.md @AGENTS.md @CLAUDE.md

Implement full Phase 11:
- Build cart foundation with Zustand
- Build checkout page with RHF + Zod
- Connect add-to-cart from product detail
- Submit mock order safely (no real payment)
- Keep pricing helpers centralized (no duplicated calc logic)
- Ensure drawer/cart page/checkout share same cart source of truth

Mandatory:
- Keep server-first where possible; use client only for state/forms
- Strong a11y for controls and form errors
- Handle empty cart and invalid direct checkout access gracefully
- Run and fix until pass:
  - npx tsc --noEmit
  - npm run lint
  - npm run build

Final report:
1) Completed scope
2) Changed files
3) Verify status
4) Known limitations
5) Next phase recommendation
```

