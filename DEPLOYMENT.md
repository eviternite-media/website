# Eviternite Deployment Guide

Production domain: `https://eviternite.shop`

Canonical domain: `https://eviternite.shop`

WWW domain: `https://www.eviternite.shop` redirects to `https://eviternite.shop`

## 1. Deploy to Vercel

1. Push this project to GitHub.
2. Create a new Vercel project from the repository.
3. Set the framework preset to Next.js.
4. Add the environment variables from `.env.example` in Vercel Project Settings.
5. Deploy.

## 2. Connect `eviternite.shop`

1. Add `eviternite.shop` inside Vercel project settings under Domains.
2. Add `www.eviternite.shop` too.
3. If Vercel gives an A record for the root domain, add it in the domain provider DNS.
4. If Vercel gives a CNAME for `www`, add it in the domain provider DNS.
5. If Vercel asks for TXT verification, add the TXT record exactly as shown in Vercel.
6. Wait for DNS propagation.
7. Confirm SSL/HTTPS is active.
8. Test:
   - `https://eviternite.shop`
   - `https://www.eviternite.shop`
   - `http://eviternite.shop` should redirect to HTTPS

Do not invent DNS values. Copy the exact values shown inside Vercel.

| Type | Name | Value | Purpose |
| --- | --- | --- | --- |
| A | @ | COPY_FROM_VERCEL | Connect root domain |
| CNAME | www | COPY_FROM_VERCEL | Connect www subdomain |
| TXT | @ or provided name | COPY_FROM_VERCEL | Domain verification if needed |

## 3. Supabase Setup

1. Create a Supabase project.
2. Open the SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy the project URL into `NEXT_PUBLIC_SUPABASE_URL`.
5. Copy the anon public key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
6. Copy the service role key into `SUPABASE_SERVICE_ROLE_KEY`.

Important: never expose the service role key in browser code. It belongs only in `.env.local` and Vercel server environment variables.

## 4. Admin Setup

Add these environment variables in Vercel:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SECRET`

Use a strong password and a long random secret. The first version uses a secure HTTP-only cookie session. Later, this can be upgraded to Supabase Auth or NextAuth.

## 5. Optional Email Notifications

The API saves package orders to Supabase first.

If `RESEND_API_KEY` exists, the server sends a notification email to:

`poqimedia@gmail.com`

If `RESEND_API_KEY` is empty, email is skipped and the package order still saves to Supabase.

## 6. Production Checks

- Run `npm run build` before deployment.
- Confirm `/admin` redirects to `/admin/login` when logged out.
- Confirm package order and contact forms save to Supabase after environment variables are set.
- Confirm admin actions update package order records.
- Confirm `https://www.eviternite.shop` redirects to `https://eviternite.shop`.
- Confirm `/sitemap.xml` and `/robots.txt` work.
