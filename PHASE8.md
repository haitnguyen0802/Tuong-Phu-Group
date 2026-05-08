# Phase 8 - QA + Performance + SEO

> **Status:** Ready for execution after Phase 7. Standardized format document.

---

## 0. Prerequisites

- Phase 3 -> 7 implemented
- Homepage order aligned with OPENAI.md
- Build pipeline currently green

---

## 1. Objectives

1. Run full regression QA for completed homepage flow.
2. Polish performance hotspots (images, motion, bundle pressure).
3. Validate core SEO and metadata readiness.
4. Close key a11y gaps before moving into CMS/e-commerce phases.

---

## 2. Scope

### In scope

- QA matrix by viewport and browser
- Performance tuning for homepage blocks
- Metadata/OG/robots/sitemap checks
- Keyboard and screen-reader pass

### Out of scope

- CMS integration
- PLP/PDP/cart/checkout feature work

---

## 3. Deliverables

### Files likely modified

```txt
app/(marketing)/page.tsx
app/layout.tsx
app/globals.css
next.config.ts
components/home/*
```

### Optional files

```txt
app/robots.ts
app/sitemap.ts
docs/QA-CHECKLIST.md
```

---

## 4. Implementation steps

- [ ] Build QA checklist for 390/768/1024/1440
- [ ] Validate Chrome/Edge/Firefox/Safari behavior
- [ ] Audit `next/image` sizes and priority
- [ ] Reduce heavy animation cost on low-end devices
- [ ] Validate metadata and indexability basics
- [ ] Recheck reduced-motion and keyboard nav

---

## 5. Acceptance checklist

- [ ] No major layout regressions in homepage
- [ ] Key interactions remain stable (header, hero, section transitions)
- [ ] A11y baseline improved or unchanged
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
@PHASE8.md @OPENAI.md @TECHSTACK.md @AGENTS.md @CLAUDE.md

Implement full Phase 8:
- QA + regression for completed homepage phases
- Performance polish (image and motion)
- SEO + a11y readiness checks

Mandatory:
- Keep current architecture and completed behavior intact
- Fix issues until all checks pass:
  - npx tsc --noEmit
  - npm run lint
  - npm run build

Final report:
1) What changed
2) Files changed
3) Verify results
4) Remaining trade-offs
5) Next phase recommendation
```

