# Phase 5 - Product Story Scene + Brand Philosophy

> **Status:** Completed baseline phase. Standardized format document.

---

## 0. Prerequisites

- Phase 4 done (hero carousel)
- Data available: `data/ingredients.ts`, `data/products.ts`
- `gsap` + `motion` available

---

## 1. Objectives

1. Build Product Story Scene after Hero.
2. Build Brand Philosophy section.
3. Use desktop parallax with GSAP and reduced-motion fallback.
4. Keep section structure accessible and responsive.

---

## 2. Scope

### In scope

- `ProductStoryScene`
- `BrandPhilosophy`
- Wire both sections into homepage
- Desktop GSAP timeline + fallback behavior

### Out of scope

- Multi-scene storytelling
- Ingredient tab/slider navigation
- CMS dynamic story feed

---

## 3. Deliverables

### Files created

```txt
components/home/ProductStoryScene.tsx
components/home/BrandPhilosophy.tsx
```

### Files modified

```txt
app/(marketing)/page.tsx
```

---

## 4. Implementation steps

- [ ] Build ProductStoryScene layout using ingredient/product data
- [ ] Add GSAP ScrollTrigger on desktop only
- [ ] Add cleanup and reduced-motion fallback
- [ ] Build BrandPhilosophy with commitments + CTA
- [ ] Wire sections after Hero

---

## 5. Acceptance checklist

- [ ] Story section renders smoothly and remains readable
- [ ] Brand section has clear hierarchy and CTA
- [ ] Mobile/reduced mode remains stable
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
@PHASE5.md @OPENAI.md @TECHSTACK.md @AGENTS.md @CLAUDE.md

Implement full Phase 5:
- ProductStoryScene (GSAP desktop + reduced/mobile fallback)
- BrandPhilosophy
- Wire into app/(marketing)/page.tsx

Mandatory:
- Keep server-first architecture
- TypeScript strict, no duplicated hardcode from existing data
- Run and fix until pass:
  - npx tsc --noEmit
  - npm run lint
  - npm run build
```
