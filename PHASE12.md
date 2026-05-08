# Phase 12 - Launch Hardening (QA + Perf + SEO + Observability)

> **Status:** Planned phase. Standardized format document.

---

## 0. Prerequisites

- Phase 11 complete
- Core user flow implemented
- Build pipeline stable

---

## 1. Objectives

1. Chot QA matrix full-flow (homepage -> PLP -> PDP -> cart -> checkout).
2. Dat target perf co ban (LCP/CLS/INP practical).
3. Chot SEO fundamentals + sitemap/robots.
4. Them observability/co so debug sau launch.

---

## 2. Scope

### In scope

- QA checklist theo viewport + browser.
- Perf tuning image loading, animation cost, bundle hot spots.
- SEO metadata, canonical, OpenGraph, robots, sitemap.
- Basic logging + error boundary sanity checks.

### Out of scope

- Full BI pipeline
- Enterprise monitoring stack phuc tap

---

## 3. Deliverables

### Create

```txt
app/robots.ts
app/sitemap.ts
app/not-found.tsx (if missing)
docs/QA-CHECKLIST.md
```

### Modify

```txt
app/layout.tsx
app/(marketing)/**/page.tsx
next.config.ts
components/** (where performance fixes needed)
```

---

## 4. Implementation steps

- [ ] Run QA matrix across viewport/browser
- [ ] Tune performance hotspots (image/motion/bundle)
- [ ] Validate metadata + robots + sitemap
- [ ] Improve resilience and fallback handling
- [ ] Re-run full verification suite

---

## 5. Acceptance checklist

- [ ] Critical flow is stable end-to-end
- [ ] No severe responsive or interaction regressions
- [ ] Perf and SEO baseline suitable for launch
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
@PHASE12.md @OPENAI.md @TECHSTACK.md @PHASE11.md @AGENTS.md @CLAUDE.md

Implement full Phase 12:
- Launch hardening: QA + performance + SEO + resilience
- Keep visual tone and architecture decisions from previous phases
- Fix regressions without breaking existing completed phases

Mandatory:
- Validate flow: homepage -> products -> product detail -> cart -> checkout
- Add/verify sitemap + robots + metadata
- Run and fix until pass:
  - npx tsc --noEmit
  - npm run lint
  - npm run build

Final report:
1) Hardening changes
2) Files changed
3) Verification results
4) Remaining risks
5) Go-live recommendation
```

