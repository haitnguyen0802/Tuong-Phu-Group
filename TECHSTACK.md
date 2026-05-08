Dưới đây là danh sách thư viện nên dùng để build website tương tự Cocoon, chia theo từng nhóm chức năng.

## 1. Stack chính nên chọn

| Nhóm                        | Thư viện / Framework                 | Mục đích                                                                                                                                                           |
| --------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Frontend framework          | `next`                               | Build website React, hỗ trợ routing, SEO, image optimization, server rendering. Next.js được định nghĩa là React framework cho full-stack web apps. ([Next.js][1]) |
| UI library nền              | `react`, `react-dom`                 | Core UI                                                                                                                                                            |
| Ngôn ngữ                    | `typescript`                         | Type-safe, dễ maintain                                                                                                                                             |
| Styling                     | `tailwindcss`                        | Utility-first CSS framework để build layout nhanh và custom cao. ([Tailwind CSS][2])                                                                               |
| Class helper                | `clsx`, `tailwind-merge`             | Gộp class Tailwind, xử lý conditional class                                                                                                                        |
| Icon                        | `lucide-react`                       | Icon sạch, hiện đại                                                                                                                                                |
| Animation UI                | `motion`                             | Animation cho React, dùng cho fade-in, hover, layout animation, scroll animation nhẹ. Motion là bản hiện tại của Framer Motion. ([Motion][3])                      |
| Scroll animation / Parallax | `gsap`, `ScrollTrigger`              | Làm parallax scene, pin section, scrub animation theo scroll. ScrollTrigger hỗ trợ trigger, scrub, pin, snap cho scroll-based animation. ([GSAP][4])               |
| Carousel / Slider           | `swiper` hoặc `embla-carousel-react` | Hero carousel, product carousel. Swiper mạnh cho slider mobile/touch; Embla nhẹ và kiểm soát markup tốt. ([Swiper][5])                                             |

---

## 2. Bộ thư viện nên dùng cho dự án Cocoon-like

### A. Core Frontend

```bash
npm install next react react-dom typescript
```

Dùng để dựng nền tảng chính. Với website nhiều animation, SEO và hình ảnh lớn, mình khuyến nghị dùng **Next.js** thay vì React SPA thuần.

---

### B. Styling / UI System

```bash
npm install tailwindcss clsx tailwind-merge class-variance-authority
```

Nên dùng:

* `tailwindcss`: style layout nhanh.
* `clsx`: bật/tắt class theo điều kiện.
* `tailwind-merge`: tránh conflict class Tailwind.
* `class-variance-authority`: tạo variant cho Button, Badge, Card.

Nếu muốn dùng component có sẵn:

```bash
npm install @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-dropdown-menu
```

Dùng cho:

* Mega menu.
* Search overlay.
* Mobile menu.
* Accordion danh mục sản phẩm.

---

### C. Animation / Motion / Parallax

```bash
npm install motion gsap
```

Cách chia vai trò:

| Thư viện        | Dùng cho                                                                       |
| --------------- | ------------------------------------------------------------------------------ |
| `motion`        | Fade up, hover product card, text reveal, menu animation, modal/search overlay |
| `gsap`          | Parallax phức tạp, product story scene, scroll timeline, pinned section        |
| `ScrollTrigger` | Plugin của GSAP, dùng để animate theo tiến trình scroll                        |

Ví dụ nên dùng:

```text
Motion:
- Header menu open/close
- Product card hover
- Section fade-in
- Search overlay

GSAP + ScrollTrigger:
- Hero scene layer animation
- Product bottle parallax
- Ingredient floating effect
- Sticky scroll storytelling section
```

---

### D. Carousel / Slider

Chọn 1 trong 2:

```bash
npm install swiper
```

Hoặc:

```bash
npm install embla-carousel-react
```

Khuyến nghị:

| Trường hợp                                                    | Nên dùng               |
| ------------------------------------------------------------- | ---------------------- |
| Hero carousel nhiều hiệu ứng, autoplay, pagination, touch tốt | `swiper`               |
| Muốn nhẹ, custom UI hoàn toàn, ít dependency                  | `embla-carousel-react` |

Với website giống Cocoon, mình nghiêng về **Swiper** cho hero campaign và **Embla** cho product carousel nhỏ. Nhưng để tránh dư dependency, chỉ chọn một là đủ.

---

### E. State Management

```bash
npm install zustand
```

Dùng cho:

* Cart state.
* Search overlay state.
* Mobile menu state.
* Wishlist.
* Recently viewed products.

Zustand là state management nhỏ, nhanh, dùng hooks và ít boilerplate. ([Zustand Documentation][6])

---

### F. API / Data Fetching

```bash
npm install @tanstack/react-query axios
```

Dùng cho:

* Fetch sản phẩm.
* Fetch campaign slides.
* Fetch blog.
* Fetch search result.
* Cache API response.
* Loading/error/retry state.

TanStack Query hỗ trợ fetching, caching, synchronizing và updating server state trong web app. ([TanStack][7])

Nếu dùng Next.js App Router và fetch server-side nhiều, có thể giảm dùng `axios`, chỉ dùng `fetch` native.

---

### G. Form / Validation

```bash
npm install react-hook-form zod @hookform/resolvers
```

Dùng cho:

* Newsletter form.
* Contact form.
* Login/register.
* Checkout form.
* Address form.

Vai trò:

| Thư viện              | Mục đích                        |
| --------------------- | ------------------------------- |
| `react-hook-form`     | Quản lý form nhẹ, nhanh         |
| `zod`                 | Validate schema                 |
| `@hookform/resolvers` | Kết nối Zod với React Hook Form |

---

### H. CMS Integration

Tùy CMS chọn thư viện tương ứng.

Nếu dùng **Sanity**:

```bash
npm install next-sanity @sanity/image-url
```

Nếu dùng **Strapi**:

```bash
npm install axios
```

Nếu dùng **Shopify Headless**:

```bash
npm install @shopify/hydrogen-react
```

Nếu dùng **Directus**:

```bash
npm install @directus/sdk
```

Khuyến nghị thực tế:

| Nhu cầu                                | CMS nên chọn         |
| -------------------------------------- | -------------------- |
| Landing page + blog + campaign         | Sanity hoặc Strapi   |
| E-commerce thật                        | Shopify Headless     |
| Team muốn tự host, quản trị dữ liệu rõ | Strapi hoặc Directus |
| Cần backend custom nhiều               | Strapi + PostgreSQL  |

---

### I. E-commerce

Nếu chỉ làm giao diện trước, chưa cần cài nhiều.

Nếu có cart/checkout custom:

```bash
npm install zustand react-hook-form zod
```

Nếu dùng Shopify:

```bash
npm install @shopify/hydrogen-react
```

Nếu dùng Medusa:

```bash
npm install @medusajs/js-sdk
```

Nếu cần payment tại Việt Nam, thường sẽ tích hợp trực tiếp API/cổng thanh toán, không nhất thiết có package chuẩn. Ví dụ: VNPay, MoMo, ZaloPay, PayOS… phần này nên xử lý ở backend.

---

### J. SEO / Metadata / Sitemap

```bash
npm install next-sitemap
```

Dùng cho:

* `sitemap.xml`
* `robots.txt`
* SEO route tự động

Với Next.js App Router, metadata cơ bản có thể dùng built-in `metadata` của Next.js, không nhất thiết dùng `next-seo`.

---

### K. Image / Media Optimization

Next.js đã có `next/image`, nhưng nếu xử lý ảnh trước khi upload:

```bash
npm install sharp
```

Dùng cho:

* Resize ảnh.
* Convert WebP/AVIF.
* Optimize ảnh sản phẩm/campaign.

Nếu team dùng Cloudinary:

```bash
npm install next-cloudinary
```

---

### L. Utility Libraries

```bash
npm install date-fns slugify
```

Dùng cho:

* `date-fns`: format ngày bài viết.
* `slugify`: tạo slug sản phẩm/bài viết.
* Có thể thêm `lodash-es` nếu cần xử lý data nhiều.

---

### M. Dev Tools / Code Quality

```bash
npm install -D eslint prettier prettier-plugin-tailwindcss
```

Nên có:

```bash
npm install -D husky lint-staged
```

Dùng để:

* Format code tự động.
* Sort Tailwind class.
* Check lint trước khi commit.
* Giữ code sạch khi nhiều dev cùng làm.

---

## 3. Bộ package đề xuất cho MVP

Nếu build website đẹp giống Cocoon, có CMS, animation, carousel nhưng chưa làm checkout phức tạp:

```bash
npm install next react react-dom typescript
npm install tailwindcss clsx tailwind-merge class-variance-authority
npm install motion gsap swiper
npm install zustand @tanstack/react-query axios
npm install react-hook-form zod @hookform/resolvers
npm install lucide-react next-sitemap date-fns slugify
npm install @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-dropdown-menu
npm install -D eslint prettier prettier-plugin-tailwindcss
```

Nếu dùng Sanity CMS thì thêm:

```bash
npm install next-sanity @sanity/image-url
```

Nếu dùng Strapi thì chỉ cần dùng API qua `fetch` hoặc `axios`.

---

## 4. Bộ thư viện khuyến nghị cuối cùng

Cho dự án tương tự Cocoon, mình đề xuất stack này:

```text
Framework:
- Next.js
- React
- TypeScript

Styling:
- Tailwind CSS
- clsx
- tailwind-merge
- class-variance-authority

Animation:
- Motion
- GSAP + ScrollTrigger

Carousel:
- Swiper

UI Primitive:
- Radix UI Dialog
- Radix UI Accordion
- Radix UI Dropdown Menu

State:
- Zustand

Data Fetching:
- TanStack Query
- Axios hoặc native fetch

Form:
- React Hook Form
- Zod

CMS:
- Sanity hoặc Strapi

SEO:
- next-sitemap
- Next.js Metadata API

Media:
- next/image
- Sharp hoặc Cloudinary

Tooling:
- ESLint
- Prettier
- Prettier Plugin Tailwind
- Husky
- lint-staged
```

## 5. Gợi ý chọn nhanh

Với website kiểu Cocoon, phần quan trọng nhất là:

```text
Next.js
+ Tailwind CSS
+ Motion
+ GSAP ScrollTrigger
+ Swiper
+ Sanity/Strapi
```

Chỉ cần bộ này là đã đủ để dựng homepage có hero carousel, product scene, parallax, product grid, brand story, blog và CMS quản trị nội dung.

[1]: https://nextjs.org/docs?utm_source=chatgpt.com "Next.js Docs"
[2]: https://tailwindcss.com/?utm_source=chatgpt.com "Tailwind CSS - Rapidly build modern websites without ever ..."
[3]: https://motion.dev/?utm_source=chatgpt.com "Motion — JavaScript & React animation library"
[4]: https://gsap.com/docs/v3/Plugins/ScrollTrigger/?utm_source=chatgpt.com "ScrollTrigger | GSAP | Docs & Learning"
[5]: https://swiperjs.com/?utm_source=chatgpt.com "Swiper - The Most Modern Mobile Touch Slider"
[6]: https://zustand.docs.pmnd.rs/?utm_source=chatgpt.com "Zustand: Introduction"
[7]: https://tanstack.com/query/latest/docs/framework/react/overview?utm_source=chatgpt.com "Overview | TanStack Query React Docs"
