# Full-Flow QA Checklist (Phase 12)

## Viewports

- [ ] 390px mobile: no horizontal overflow from home -> PLP -> PDP -> cart -> checkout
- [ ] 768px tablet: drawer, grids, sticky summaries remain readable
- [ ] 1024px laptop: section transitions and product layouts stay aligned
- [ ] 1440px desktop: container max widths, hero and footer spacing stay stable

## Browsers

- [ ] Chrome latest
- [ ] Edge latest
- [ ] Firefox latest
- [ ] Safari latest

## Critical Flow Regression

- [ ] Homepage CTAs route to `/products` and key content sections render
- [ ] PLP filters/sort continue working and URLs remain sharable
- [ ] PDP loads valid product, invalid slug goes to not-found
- [ ] Add-to-cart increments quantity for duplicate adds (no duplicate lines)
- [ ] Cart drawer open/close works via click and `Esc`, badge count is accurate
- [ ] Cart page quantity update/remove/empty-state behavior is correct
- [ ] Checkout validates fields and mock submit clears cart on success

## Accessibility Baseline

- [ ] Keyboard-only navigation completes end-to-end purchase flow
- [ ] Focus rings remain visible on interactive controls and dialogs
- [ ] Cart, search, mobile menu dialogs trap focus and close safely
- [ ] Form errors are announced clearly and mapped to the right fields
- [ ] `prefers-reduced-motion` avoids non-essential heavy motion

## Performance Smoke

- [ ] Hero image and first fold render without visible jank
- [ ] Overlay client islands (search/menu/cart) do not block first content paint
- [ ] No noticeable stutter in carousel and key interactions on low-end profile
- [ ] Production build output does not show unexpected route failures

## SEO + Indexability

- [ ] Metadata title/description/canonical render on homepage, PLP, PDP
- [ ] Cart/checkout pages are noindex, nofollow
- [ ] `robots.txt` resolves and excludes private utility routes (`/cart`, `/checkout`)
- [ ] `sitemap.xml` resolves and includes homepage + product listing + product detail URLs
- [ ] Root-level not-found page exists and renders branded recovery CTAs

## Resilience + Observability

- [ ] Root `global-error` UI renders and allows retry
- [ ] Error digest/message is logged in client console for debugging
- [ ] User-facing fallback copy is clear and actionable

## Required Commands

- [ ] `npx tsc --noEmit`
- [ ] `npm run lint`
- [ ] `npm run build`
