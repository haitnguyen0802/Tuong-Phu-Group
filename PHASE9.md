# Phase 9 - CMS Integration (Sanity/Strapi-ready)

> **Status:** Planned phase. Standardized format document.

---

## 0. Prerequisites

- Phase 8 complete
- Homepage structure stable
- Existing `data/*.ts` available as fallback

---

## 1. Objectives

1. Move homepage data access into CMS-ready layer.
2. Create strict typed contracts for external content.
3. Keep graceful fallback when CMS is unavailable.
4. Preserve existing section order/UX.

---

## 2. Scope

### In scope

- Tao schema mapping cho: slide, product, ingredient, certification, article, social.
- Tao `lib/cms/` query + mapper typed.
- Tao env contract cho endpoint/token.
- Ket noi homepage sections vao CMS data (co fallback local data).
- Revalidate strategy cho App Router.

### Out of scope

- E-commerce checkout/payment
- Dashboard CMS custom
- Real-time preview UI phuc tap

---

## 3. Deliverables

### Create

```txt
lib/cms/types.ts
lib/cms/client.ts
lib/cms/mappers.ts
lib/cms/queries.ts
lib/cms/get-homepage-data.ts
```

### Modify

```txt
app/(marketing)/page.tsx
data/*.ts (giu lam fallback source)
types/index.ts (chi khi can bo sung type)
```

---

## 4. Implementation steps

- [ ] Define CMS response types and mappers
- [ ] Build CMS client + query functions
- [ ] Aggregate homepage payload in one server function
- [ ] Wire homepage to CMS payload + fallback
- [ ] Keep revalidate/error behavior safe

---

## 5. Acceptance checklist

- [ ] Homepage can render from CMS or fallback data
- [ ] CMS error does not break `/`
- [ ] Existing interactions remain stable
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
@PHASE9.md @OPENAI.md @TECHSTACK.md @PHASE8.md @AGENTS.md @CLAUDE.md

Implement full Phase 9:
- Build CMS data layer in `lib/cms/*`
- Refactor homepage to consume typed CMS payload (server-first)
- Keep local `data/*.ts` as fallback
- Preserve existing section order and design tone

Mandatory:
- TypeScript strict, no sloppy `any`
- No brand/content copy from cocoonvietnam.com
- Run and fix until pass:
  - npx tsc --noEmit
  - npm run lint
  - npm run build

Final report format:
1) What changed
2) Files changed
3) Verify results
4) Trade-offs
5) Next phase recommendation
```

