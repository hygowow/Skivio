# Affiliate Compass

Affiliate Compass is a production-ready affiliate marketing website built with Next.js App Router, TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL-ready models, and NextAuth credentials authentication for the admin console.

## Features

- Professional public marketing site:
  - Home page with hero, featured offers, trust section, and clear CTAs
  - Offers page with disclosure-friendly affiliate cards
  - Blog listing page and blog detail pages by slug
  - About and Contact pages
- Admin console under `/admin`:
  - Credentials login (`/admin/login`)
  - Protected dashboard
  - CRUD for offers and posts
- Secure server-side mutations with:
  - Next.js server actions
  - Zod validation
  - Admin auth checks before data mutations
- SEO basics:
  - Page metadata
  - `robots.txt` and `sitemap.xml`
- Seed script with starter content and local development admin credentials

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL schema
- NextAuth (credentials provider)
- Zod

## Environment variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Required values:

- `DATABASE_URL` – PostgreSQL connection string
- `AUTH_SECRET` – long random secret for NextAuth
- `NEXTAUTH_URL` – app URL (local: `http://localhost:3000`)
- `NEXT_PUBLIC_SITE_URL` – public site URL used by SEO routes
- `ADMIN_SEED_EMAIL` – local seeded admin login email
- `ADMIN_SEED_PASSWORD` – local seeded admin login password

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Generate Prisma client:

   ```bash
   npm run prisma:generate
   ```

3. Push schema to your database:

   ```bash
   npm run prisma:push
   ```

4. Seed demo content + admin user:

   ```bash
   npm run prisma:seed
   ```

5. Start development server:

   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000`.

## Admin login (local development)

Use the credentials configured in your `.env`:

- Email: `ADMIN_SEED_EMAIL`
- Password: `ADMIN_SEED_PASSWORD`

Default local seed values are provided in `.env.example` and should be changed for real environments.

## Scripts

- `npm run dev` – start local dev server
- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – run ESLint
- `npm run prisma:generate` – generate Prisma client
- `npm run prisma:push` – push Prisma schema to DB
- `npm run prisma:migrate` – create/apply Prisma migration in dev
- `npm run prisma:seed` – seed admin/offers/posts

## Deploying to Vercel

1. Push repository to GitHub.
2. Import project into Vercel.
3. Configure environment variables from `.env.example` in Vercel project settings.
4. Set up a PostgreSQL database and `DATABASE_URL`.
5. Run Prisma schema deployment as part of your deploy workflow (for example via `prisma migrate deploy`, or use `prisma db push` for non-migration workflows).
6. Deploy.

For production, use strong secrets and non-default admin credentials.
