# CLAUDE.md — AAAGTMP Governance Portal

## What This Is

The AAAGTMP Governance Portal is the operational dashboard for Aurion's AI GTM Platform. It shows real-time agent activity, task status, approval flows, and audit logs. This is NOT a marketing site — it is internal institutional infrastructure.

**Live URL:** https://aaagtmp.com  
**Coolify app UUID:** `o88www8sggwoccwc4g40c48k`  
**Hosting:** Coolify on radi (5.223.50.174)

---

## Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (Realtime enabled)
- **Deployment:** Coolify (Docker)
- **Language:** TypeScript

---

## Supabase Config

- **Project ref:** `nzsgqmzndywdfwltvtxu`
- **Region:** ap-southeast-1
- **URL:** `https://nzsgqmzndywdfwltvtxu.supabase.co`
- **Anon key:** in `.env.local` as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Service role key:** in `.env.local` as `SUPABASE_SERVICE_ROLE_KEY` (server-side only, never expose to client)

### Database Tables

| Table | Purpose |
|---|---|
| `tasks` | Agent task queue — task_id, agent_id, status, payload, opco |
| `approvals` | Approval requests — task_id, approver, status, response |
| `audit_log` | Immutable event log — every agent action logged here |
| `decisions` | Approved/rejected decisions with reasoning |

### Task Status Flow
`pending` → `processing` → `draft_ready` → `pending_approval` → `approved` / `rejected`

### Governance Status Colors (use these consistently)
- `pending` → gray
- `processing` → blue  
- `draft_ready` → yellow
- `pending_approval` → orange
- `approved` → green
- `rejected` → red
- `failed` → red/dark

---

## Key Features to Maintain

1. **Real-time audit_log feed** — Supabase Realtime subscription on `audit_log` table
2. **Task status panel** — live view of all active/recent tasks
3. **Trust tags** — display `[trust:X.X|src:Y]` badges on content claims
4. **Origin type badges** — `agent_generated`, `human_approved`, `human_edited`
5. **Governance status indicator** — color-coded by status
6. **Zero-unauthorized-sends counter** — must always be 0; alert if any external send bypassed approval

---

## AAAGTMP Architecture Context

### The 16 Agents
1. HQ Orchestrator (hq_orchestrator)
2. Content Agent (content_agent)
3. Research Agent (research_agent)
4. Meeting Prep (meeting_prep)
5. DARA Intel (dara_intel)
6. AurionID (aurion_id)
7. Pilot Tracker (pilot_tracker)
8. CRM Agent (crm_agent)
9. Regulatory Watch (regulatory_watch)
10. Cross-OpCo Relay (crossopco_relay)
11. LinkedIn Intel (linkedin_intel)
12. Community Intel (community_intel)
13. Signal Trigger (signal_trigger)
14. AEO+SEO (aeo_seo)
15. Voice+Video (voice_video)
16. SentienClaw / Intent Signal (sentien_claw)

### The 5 OpCos
- **DARA** — institutional B2B AI platform
- **SentienFi** — B2C fintech
- **Kendall** — pre-activation (limited info only)
- **AurionID** — identity/compliance
- **Aurion Mirai** — future division (not a person)

### Content Rules (NON-NEGOTIABLE — from Dec 17, 2025 Workshop)
- NO emojis in any external content
- NO hashtags
- NO "book a call" CTAs
- Institutional tone: measured, authoritative
- All external content requires human approval before publish
- CC Puan (male) is default approver; Fabian Lim is fallback

---

## What NOT To Do

- Never add any button or flow that publishes content without approval
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client
- Never hardcode Supabase keys — use env vars
- Do not add Star Office or pixel art dependencies
- Do not add social sharing or auto-post functionality

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://nzsgqmzndywdfwltvtxu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key — server only>
```

---

## Current Priority (March 2026)

1. **WhatsApp approval gate** — task → Content Agent → draft stored → notify CC Puan → await WhatsApp reply → log decision
2. **Audit log real-time feed** — must be live and streaming
3. **Task queue panel** — show all tasks with status, agent, opco, timestamp
4. **Approval panel** — show pending approvals, approved/rejected history

---

## Deployment

Push to `main` → Coolify auto-builds → deploys to aaagtmp.com

To trigger manual deploy:
```bash
curl -X POST http://5.223.50.174:8000/api/v1/applications/o88www8sggwoccwc4g40c48k/restart \
  -H "Authorization: Bearer $COOLIFY_TOKEN"
```
