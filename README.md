# Apex Roofing Co. — Website

Professional roofing company website for the Twin Cities metro area. Built as a full-stack Next.js 14 demo showcasing modern web development practices.

**Live site:** [apexroofingco.pages.dev](https://apexroofingco.pages.dev)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Forms | React Hook Form + Zod |
| CMS | Sanity (headless) |
| Email | Resend |
| Unit tests | Vitest + Testing Library |
| E2E tests | Playwright (Chrome, Firefox, Mobile) |
| CI/CD | GitHub Actions |
| Hosting | Cloudflare Pages |

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in .env.local with your values
npm run dev
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm test` | Run unit + integration tests |
| `npm run test:coverage` | Tests with coverage report |
| `npm run test:e2e` | Playwright end-to-end tests |
| `npm run lint` | ESLint check |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── api/              # API routes (contact, quote)
│   ├── about/
│   ├── blog/
│   ├── contact/
│   ├── quote/
│   └── services/
│       └── [slug]/       # Dynamic service pages
├── components/
│   ├── layout/           # Navigation, Footer
│   ├── sections/         # Page sections (Hero, Services, etc.)
│   └── ui/               # Reusable components
└── lib/
    ├── constants.ts      # Site data (services, testimonials, etc.)
    ├── utils.ts          # Utility functions
    ├── validations.ts    # Zod schemas
    └── sanity.ts         # CMS client
```

## CI/CD Pipeline

```
push/PR
  └─► Lint & Type Check
        ├─► Unit Tests (parallel)
        └─► Build (parallel)
              └─► E2E Tests
                    ├─► Deploy Preview (PRs)
                    └─► Deploy Production (main)
```

Weekly SEO/Lighthouse audits run every Monday at 8am UTC.

## Environment Variables

See `.env.example` for required variables. For CI, set these GitHub secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `NEXT_PUBLIC_SANITY_PROJECT_ID` (optional)
- `RESEND_API_KEY` (optional)

## Cloudflare Pages Deployment

1. Connect repo at dash.cloudflare.com → Workers & Pages
2. Framework: Next.js
3. Build command: `npm run build`
4. Output directory: `.next`
