# Phase 3 - Header Interactions

> **Status:** Completed baseline phase. Standardized format document.

---

## 0. Prerequisites

- Foundation/layout shell available
- `useUIStore` available
- `data/nav.ts` available
- Radix dialog/accordion available

---

## 1. Objectives

1. Implement desktop MegaMenu.
2. Implement MobileMenu drawer.
3. Implement SearchOverlay dialog.
4. Keep state orchestration via Zustand store.

---

## 2. Scope

### In scope

- `MegaMenu.tsx`
- `MobileMenu.tsx`
- `SearchOverlay.tsx`
- Header and marketing layout wiring

### Out of scope

- Real search API integration
- Cart drawer and checkout actions

---

## 3. Deliverables

### Files created

```txt
components/layout/MegaMenu.tsx
components/layout/MobileMenu.tsx
components/layout/SearchOverlay.tsx
```

### Files modified

```txt
components/layout/Header.tsx
app/(marketing)/layout.tsx
app/globals.css
```

---

## 4. Implementation steps

- [ ] Build MegaMenu with hover intent and keyboard behavior
- [ ] Build MobileMenu with Radix dialog + accordion
- [ ] Build SearchOverlay with suggestions and focus management
- [ ] Wire store actions between HeaderActions and overlays
- [ ] Add reduced-motion friendly transitions

---

## 5. Acceptance checklist

- [ ] Desktop mega menu works on hover/focus/escape
- [ ] Mobile drawer opens/closes and supports link navigation
- [ ] Search overlay focuses input and closes reliably
- [ ] No CLS or focus-trap regressions
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
@PHASE3.md @OPENAI.md @TECHSTACK.md @AGENTS.md @CLAUDE.md

Implement full Phase 3:
- MegaMenu
- MobileMenu
- SearchOverlay
- Wire into Header and marketing layout

Mandatory:
- Server-first architecture
- Keep dialog behavior accessible
- Run and fix until pass:
  - npx tsc --noEmit
  - npm run lint
  - npm run build
```
