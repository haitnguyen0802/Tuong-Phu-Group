# Phase 7 - Ingredient Story + Journal Preview + Newsletter

> **Status:** Completed baseline phase. Standardized format document.

---

## 0. Prerequisites

- Phase 6 done
- Data available: `data/ingredients.ts`, `data/articles.ts`
- RHF + Zod installed

---

## 1. Objectives

1. Build Ingredient Story section.
2. Build Journal Preview section.
3. Build Newsletter section with RHF + Zod.
4. Wire all sections to homepage in the correct order.

---

## 2. Scope

### In scope

- `IngredientStorySection`
- `JournalPreviewSection`
- `NewsletterSection`
- Responsive layout and reduced-motion handling

### Out of scope

- Newsletter backend API integration
- Article search/filter system

---

## 3. Deliverables

### Files created

```txt
components/home/IngredientStorySection.tsx
components/home/JournalPreviewSection.tsx
components/home/NewsletterSection.tsx
```

### Files modified

```txt
app/(marketing)/page.tsx
```

---

## 4. Implementation steps

- [ ] Build ingredient cards from `data/ingredients.ts`
- [ ] Build journal preview cards from `data/articles.ts`
- [ ] Build newsletter form with RHF + Zod validation
- [ ] Add a11y labels and aria-live status messaging
- [ ] Wire all sections after Phase 6 blocks

---

## 5. Acceptance checklist

- [ ] All 3 sections render and are responsive
- [ ] Newsletter validation works correctly
- [ ] Keyboard focus and screen-reader hints are present
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
@PHASE7.md @OPENAI.md @TECHSTACK.md @AGENTS.md @CLAUDE.md

Implement full Phase 7:
- IngredientStorySection
- JournalPreviewSection
- NewsletterSection (RHF + Zod)
- Wire into app/(marketing)/page.tsx

Mandatory:
- Server-first architecture, use client only when required
- Reuse data from existing `data/*.ts`
- TypeScript strict + clean architecture
- Run and fix until pass:
  - npx tsc --noEmit
  - npm run lint
  - npm run build
```

