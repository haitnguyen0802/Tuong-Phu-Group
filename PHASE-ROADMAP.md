# PHASE ROADMAP (Phase 3 -> 12)

Master index de chay tuan tu theo docs da chuan hoa.

---

## 1. Sequence

1. `PHASE3.md` - Header Interactions
2. `PHASE4.md` - Hero Carousel
3. `PHASE5.md` - Product Story Scene + Brand Philosophy
4. `PHASE6.md` - Certification + Best Seller Grid
5. `PHASE7.md` - Ingredient Story + Journal Preview + Newsletter
6. `PHASE8.md` - QA + Performance + SEO
7. `PHASE9.md` - CMS Integration
8. `PHASE10.md` - Product Listing + Product Detail
9. `PHASE11.md` - Cart + Checkout Foundation
10. `PHASE12.md` - Launch Hardening

---

## 2. Current status snapshot

- [x] Phase 3
- [x] Phase 4
- [x] Phase 5
- [x] Phase 6
- [x] Phase 7
- [ ] Phase 8
- [ ] Phase 9
- [ ] Phase 10
- [ ] Phase 11
- [ ] Phase 12

---

## 3. Rules for every phase run

Always include:

```md
@OPENAI.md @TECHSTACK.md @AGENTS.md @CLAUDE.md @PHASE{N}.md
```

Mandatory in each implementation run:

- Server-first architecture
- Reuse existing data/types, avoid duplicated hardcode
- A11y + reduced-motion + responsive checks
- Verify and auto-fix until pass:
  - `npx tsc --noEmit`
  - `npm run lint`
  - `npm run build`

---

## 4. Standard output format (for every phase)

1. What changed
2. Files changed
3. Verify results
4. Trade-offs / gaps
5. Next phase recommendation

---

## 5. One-shot kickoff template

```md
@PHASE-ROADMAP.md @OPENAI.md @TECHSTACK.md @AGENTS.md @CLAUDE.md @PHASE{N}.md

Implement Phase {N} exactly by `PHASE{N}.md`.

Requirements:
- Keep server-first architecture
- Keep Verdara design tone
- No copy brand/content/color/assets from cocoonvietnam.com
- TypeScript strict, clean architecture
- Run and fix until pass:
  - npx tsc --noEmit
  - npm run lint
  - npm run build

Final report:
1) What changed
2) Files changed
3) Verify results
4) Trade-offs
5) Next phase
```

