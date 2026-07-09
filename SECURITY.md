# Eviternite Security Notes

## Environment Variables

Private keys must only be stored in `.env.local` and production hosting environment variables.

Never expose:

- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `ADMIN_PASSWORD`
- `ADMIN_SECRET`

Only variables starting with `NEXT_PUBLIC_` are safe for browser use.

## Admin

`/admin` is protected with a simple admin login using:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SECRET`

The session is stored in an HTTP-only cookie. Admin API routes check the session before reading, updating, or deleting package orders.

Future upgrade path: replace this simple auth with Supabase Auth or NextAuth for multi-user admin accounts, password resets, and audit logs.

## Forms

Package order and contact form APIs include:

- Server-side Zod validation
- Input sanitization
- Honeypot field
- Basic in-memory rate limiting
- Origin checks
- Safe user-facing error messages

For high traffic, replace in-memory rate limiting with Upstash Redis, Supabase rate limit tables, or another persistent rate limiter.

## Supabase

Row Level Security is enabled on:

- `package_orders`
- `contact_messages`

Anonymous users can insert package order/contact rows only. They cannot read, update, or delete submissions.

The admin dashboard uses server-side API routes with `SUPABASE_SERVICE_ROLE_KEY`, which must never be sent to the browser.

## Headers

Security headers are configured in `next.config.ts`, including:

- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security
- Cross-Origin-Opener-Policy

CSP may need to be updated when adding new third-party tools like Google Analytics, Meta Pixel, payment providers, chat widgets, or external images.
