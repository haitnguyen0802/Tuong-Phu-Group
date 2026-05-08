# Phase 10 - Product Listing + Product Detail

> **Status:** Planned phase. Standardized format document.

---

## 0. Prerequisites

- Phase 9 complete
- Product data contract available
- Marketing route structure stable

---

## 1. Objectives

1. Tao route `/products` (listing, filter co ban, sort co ban).
2. Tao route `/products/[slug]` (detail, gallery, badges, stock info, CTA).
3. Reuse product data contracts tu CMS layer.
4. SEO metadata cho PLP/PDP.

---

## 2. Scope

### In scope

- PLP: grid + category chips + sort select.
- PDP: hero media, info, ingredients summary, related items.
- Breadcrumb + canonical metadata.
- Empty state va not-found handling.

### Out of scope

- Cart/checkout logic (Phase 11)
- Reviews system
- Recommendation engine nang cao

---

## 3. Deliverables

### Create

```txt
app/(marketing)/products/page.tsx
app/(marketing)/products/[slug]/page.tsx
app/(marketing)/products/[slug]/not-found.tsx
components/product/ProductCard.tsx
components/product/ProductGrid.tsx
components/product/ProductGallery.tsx
components/product/ProductInfo.tsx
components/product/ProductBadges.tsx
```

### Modify

```txt
data/products.ts or lib/cms/get-products.ts
types/index.ts
```

---

## 4. Implementation steps

- [ ] Build reusable product primitives in `components/product/`
- [ ] Build `/products` listing page
- [ ] Build `/products/[slug]` detail page + not-found handling
- [ ] Add metadata and a11y checks for PLP/PDP
- [ ] Validate responsive behavior and interactions

---

## 5. Acceptance checklist

- [ ] `/products` works correctly with data
- [ ] `/products/[slug]` renders valid product and handles invalid slug
- [ ] Metadata and keyboard behavior are correct
- [ ] Typecheck/lint/build pass

---

## 6. Verify commands

```bash
npx tsc --noEmit
npm run lint
npm run build
```

---

## 7. Kickoff prompt template

```md
@PHASE10.md @OPENAI.md @TECHSTACK.md @PHASE9.md @AGENTS.md @CLAUDE.md

Implement full Phase 10:
- Build Product Listing (`/products`)
- Build Product Detail (`/products/[slug]`)
- Reuse CMS/domain product data types
- Keep architecture server-first

Mandatory:
- Preserve existing design tone Verdara
- TypeScript strict, no loose any
- Add metadata for PLP/PDP
- Run and fix until pass:
  - npx tsc --noEmit
  - npm run lint
  - npm run build

Final report:
1) Done items
2) Files changed
3) Verify output
4) Gaps/trade-offs
5) Next phase recommendation
```

