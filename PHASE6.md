# Phase 6 - Certification + Best Seller Grid

> **Status:** Completed baseline phase. Standardized format document.

---

## 0. Prerequisites

- Phase 5 done (ProductStoryScene + BrandPhilosophy)
- Data available: `data/certifications.ts`, `data/products.ts`
- Homepage shell stable

---

## 1. Objectives

1. Add trust-building certification section.
2. Add best seller product grid with rich card UX.
3. Reuse existing data source, no duplicated hardcode.
4. Maintain responsive and a11y standards.

---

## 2. Scope

### In scope

- `CertificationSection`
- `BestSellerProductGrid`
- Product cards with badge, stock, price and hover state
- Wire into homepage order

### Out of scope

- Product listing page (`/products`)
- Cart/checkout flow

---

## 3. Deliverables

### Files created

```txt
components/home/CertificationSection.tsx
components/home/BestSellerProductGrid.tsx
```

### Files modified

```txt
app/(marketing)/page.tsx
```

---

## 4. Implementation steps

- [ ] Build certification cards from `data/certifications.ts`
- [ ] Build product grid from `data/products.ts`
- [ ] Add image front/back hover behavior
- [ ] Add CTA and stock/price display
- [ ] Wire both sections after Phase 5 blocks

---

## 5. Acceptance checklist

- [ ] Certification section is visible and responsive
- [ ] Product grid is responsive with clean hover behavior
- [ ] A11y labels and focus states are present
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
@PHASE6.md @OPENAI.md @TECHSTACK.md @AGENTS.md @CLAUDE.md

Implement full Phase 6:
- CertificationSection
- BestSellerProductGrid
- Wire into app/(marketing)/page.tsx in the correct order

Mandatory:
- Reuse data from data/certifications.ts and data/products.ts
- Keep server-first architecture
- TypeScript strict, no loose any
- Run and fix until pass:
  - npx tsc --noEmit
  - npm run lint
  - npm run build
```

