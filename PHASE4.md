# Phase 4 - Hero Carousel

> **Status:** Completed baseline phase. Standardized format document.

---

## 0. Prerequisites

- Phase 3 done (header interactions + overlays)
- `data/slides.ts` available
- `motion` + `embla-carousel-react` installed

---

## 1. Objectives

1. Build premium hero carousel for homepage.
2. Support autoplay + manual pagination controls.
3. Add reduced-motion fallback and keyboard-friendly behavior.
4. Keep server-first page structure.

---

## 2. Scope

### In scope

- `HeroCarousel`, `HeroSlide`, `HeroPagination`
- Wire hero into `app/(marketing)/page.tsx`
- Progress animation and active slide semantics

### Out of scope

- CMS-powered slide management
- Heavy video hero

---

## 3. Deliverables

### Files created

```txt
components/home/HeroCarousel.tsx
components/home/HeroSlide.tsx
components/home/HeroPagination.tsx
```

### Files modified

```txt
app/(marketing)/page.tsx
app/globals.css
```

---

## 4. Implementation steps

- [ ] Build Embla wrapper with autoplay and sync state
- [ ] Render slide content from `data/slides.ts`
- [ ] Add pagination with active indicator/progress
- [ ] Add reduced-motion fallback
- [ ] Ensure inactive slide CTA not tabbable

---

## 5. Acceptance checklist

- [ ] Hero renders correctly on mobile/tablet/desktop
- [ ] Autoplay works and can be manually overridden
- [ ] No a11y regression in focus/tab order
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
@PHASE4.md @OPENAI.md @TECHSTACK.md @AGENTS.md @CLAUDE.md

Implement full Phase 4:
- Build HeroCarousel + HeroSlide + HeroPagination
- Wire into app/(marketing)/page.tsx
- Keep reduced-motion and keyboard-safe behavior

Mandatory:
- Server-first architecture
- TypeScript strict
- Run and fix until pass:
  - npx tsc --noEmit
  - npm run lint
  - npm run build
```

