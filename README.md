# AAAGTMP Portal

Governance-first approval portal for AAAGTMP.

## What this includes

- `/` — Live governance feed from `content_tasks` (Supabase Realtime)
- `/approve/[run_id]` — Approval screen with Approve/Reject actions
- `/review` — Rejected/Error review queue
- `/audit` — Paginated audit trail from `audit_log`
- `/api/approval-decision` — Server proxy that forwards decision payloads to n8n `resume_webhook_url`

## Environment

Create `.env.local` from `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Required:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
npm run start
```

## Docker (Coolify)

This repo includes a standalone Next.js Dockerfile.

```bash
docker build -t aaagtmp-portal .
docker run -p 3000:3000 --env-file .env.local aaagtmp-portal
```

## Supabase requirements

Portal expects the AAAGTMP schema to exist:

- `content_tasks`
- `audit_log`
- `review_queue` view

Enable Realtime on `content_tasks`.
