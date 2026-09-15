# Cookie and Tea — Frontend

React SPA for **Cookie and Tea**, a creator-support platform in the spirit of Buy Me a Coffee / Ko-fi — supporters tip creators ("tea", "cookie", or both) and leave encouraging messages. No likes, no vanity metrics: the design centers genuine support.

- **Live App:** https://cookie-and-tea.vercel.app
- **Backend API:** https://cookie-and-tea-backend.vercel.app
- **Backend repo:** [cookie-and-tea-backend](https://github.com/kybrakorkmaz/cookie-and-tea-backend)
- **Design (Figma):** [Cookie and Tea](https://www.figma.com/design/RjrtJpLfLmu4fB0rpPdoM5/cookie-and-tea)

---

## Türkçe

**Cookie and Tea**, içerik üreticilerinin takipçilerinden bağış ve destek mesajları alabildiği bir platformdur (Buy Me a Coffee / Ko-fi benzeri). Bu depo, platformun web arayüzünü içerir. Beğeni sayısı gibi "gösteriş metrikleri" bilinçli olarak yoktur; amaç gerçek destek etkileşimidir.

### Canlı Bağlantılar

- **Uygulama:** https://cookie-and-tea.vercel.app
- **API:** https://cookie-and-tea-backend.vercel.app
- **Sunucu deposu:** [cookie-and-tea-backend](https://github.com/kybrakorkmaz/cookie-and-tea-backend)
- **Tasarım (Figma):** [Cookie and Tea](https://www.figma.com/design/RjrtJpLfLmu4fB0rpPdoM5/cookie-and-tea)

### Öne Çıkan Özellikler

- Kayıt → e-posta doğrulama → giriş akışı; hata ve başarı mesajları arayüzde kart/bildirim olarak gösterilir
- Gezinme çubuğunda **canlı kullanıcı arama**: yazarken 300 ms gecikmeyle API'den öneriler gelir, sonuca tıklayınca profile gidilir
- Üç bağış seviyesi (Çay 5$ / Kurabiye 7$ / İkisi 12$) ve destek mesajları (şu an demo modunda)
- Profil, gönderi akışı (feed), takipçi/takip sistemi, bildirimler, ayarlar sayfaları
- React 19 + Vite, Tailwind CSS 4, React Query, React Router 7, Zod doğrulama
- Tarayıcı hataları backend'e iletilir (global error reporting)

### Hızlı Başlangıç

Gereksinim: Node.js 20.19+ (Vite 8 gereksinimi).

```bash
npm install
# .env dosyası oluşturun (aşağıdaki tabloya bakın)
npm run dev
```

Uygulama `http://localhost:5173` adresinde açılır. Production derlemesi için `npm run build`, önizleme için `npm run preview`.

Detaylı İngilizce dokümantasyon aşağıdadır. ⬇️

---

## English

### What Is This?

This is the web client for Cookie and Tea: a React 19 single-page application built with Vite, styled with Tailwind CSS 4, talking to the Express/PostgreSQL backend over a cookie-authenticated REST API. It is deployed on Vercel as a static SPA with a catch-all rewrite to `index.html`.

### Feature Highlights

- **Full auth flow in the UI:** sign-up with per-field validation errors, a success card prompting email verification, and a login page that understands the `?verified=1|0` redirect from the verification email
- **Live people search:** the navbar search box debounces (300 ms) requests to `GET /api/v1/search/users`, renders avatar/name/@username suggestions, guards against stale responses, and navigates to `/profile/:username` on select
- **Donations:** three tiers (Tea $5 / Cookie $7 / Both $12) with optional support messages — currently in mock mode on the backend, so no real charges
- **Pages:** Home, Feed, Profile, Posts, People (followers/following), Activity (notifications), Settings, About/FAQ
- **Error surfacing:** backend error responses render as in-page cards/toasts (not just the console); global `error`/`unhandledrejection` handlers relay browser crashes to the backend log endpoint
- **Design philosophy:** intentionally no "like" button or nested comments — interactions stay focused on supporting creators

### Tech Stack

| Area | Choice |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | React Router 7 |
| Data fetching | Axios (central instance), TanStack Query |
| Styling | Tailwind CSS 4, MUI icons, Emotion |
| Animation | Framer Motion, GSAP |
| Validation | Zod (forms + env vars) |
| Email (contact form) | EmailJS |
| Deployment | Vercel (static SPA) |

### Getting Started

#### Prerequisites

- Node.js 20.19+ (Vite 8 requirement) and npm
- A running backend (see the [backend repo](https://github.com/kybrakorkmaz/cookie-and-tea-backend)) or use the deployed API

#### Setup

```bash
npm install
```

Create a `.env` file in the project root:

```bash
VITE_API_BASE_URL=http://localhost:8000
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Backend origin **only** (no path) — the app appends `/api/v1/...` itself |
| `VITE_EMAILJS_*` | Contact-form email delivery |

> Env vars are validated with Zod at startup — the app fails fast with a clear message if one is missing or malformed. `VITE_*` values are baked in at build time, so rebuild after changing them.

#### Run

```bash
npm run dev       # dev server on http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run lint      # ESLint
```

### Project Structure

```
src/
├── assets/         # static images/fonts (placeholder)
├── components/     # shared UI (ui/, media/)
├── features/       # domain modules (auth, profile, posts, feed, ...)
├── pages/          # marketing routes (Home, FAQ, About, ...)
├── layouts/        # GuestLayout, UserLayout, nav chrome
├── services/       # axios apiClient
├── store/          # AuthContext (TanStack Query lives in main.jsx)
├── utils/          # constants, env validation, logger
├── App.jsx         # router + lazy routes
├── setupErrorReporting.js  # global error → backend relay (first import)
└── main.jsx        # entry point
```

### Deployment (Vercel)

- Static SPA; `vercel.json` rewrites all paths to `/index.html` for client-side routing
- Set `VITE_API_BASE_URL` to the backend origin (e.g. `https://cookie-and-tea-backend.vercel.app`) in the Vercel project env vars, then redeploy
- Cross-domain auth relies on the backend's `sameSite=none; secure` cookies, so both sides must be HTTPS

---

## License

ISC — © Kübra Korkmaz
