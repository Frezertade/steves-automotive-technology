# Steve's Automotive Technology

Next.js rebuild of the independent auto repair shop site for Steve's Automotive Technology in Lancaster / Millersville, PA. Hybrid-battery specialist first, plus inspections, brakes, A/C, and general repair. **This is not a car lot.**

Production WordPress still lives at [stevesautomotivetechnology.com](https://stevesautomotivetechnology.com). This repo is the server-rendered replacement (booking, services, hybrid-battery pages, shop chat).

- Shop: 1027 Dillerville Rd #16, Lancaster, PA 17603
- Phone: `(717) 330-0041`
- Email: `stevesautotech@gmail.com`
- Shared constants: [`lib/shop.ts`](lib/shop.ts)

## Design

Follow [`DESIGN.md`](DESIGN.md). Carbon/teal, specialist-first copy, phone always visible, hero poster + reduced-motion fallback. Do not bury the call CTA or invent customer names.

## Do not push yet

Work stays on branch `wip/system-complete`. **Do not `git push` until every item in [`TASKS.md`](TASKS.md) is `[x]`.** Push happens once, after the board is complete.

## Requirements

- Node.js 18.18+ (Next.js 15)
- npm

API keys are optional for local browsing. Without them, booking still writes to disk and chat uses a keyword matcher.

## How to run

```bash
git clone <this-repo>
cd steves-automotive-technology
git checkout wip/system-complete
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server (default port 3000) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |

Copy `.env.example` to `.env.local` (gitignored). Empty keys are fine for a first run.

## Environment variables

Defined in [`.env.example`](.env.example):

| Variable | Required | Purpose |
| --- | --- | --- |
| `OPENAI_API_KEY` | No | Shop chat (`POST /api/chat`). If unset, replies come from the keyword + shop-knowledge matcher. |
| `RESEND_API_KEY` | No for local, **yes in production** | Emails appointment/contact requests via Resend. If unset, `delivered` is `false` and the UI tells the visitor to call. |
| `LEAD_INBOX` | No | Inbox for those emails. Defaults to `stevesautotech@gmail.com`. |
| `LEAD_FROM` | No | Resend `from` address. Defaults to `Steve's Automotive Technology <onboarding@resend.dev>` (Resend test sender). |

Do not commit `.env`, `.env.local`, or `data/appointments.json`.

## Booking API

`POST /api/appointments` — JSON body. Used by the booking form (`source: "booking"`) and the contact / callback form (`source: "contact"`).

**Booking** requires `name`, `phone` (10–15 digits), `service`, `date` (`YYYY-MM-DD`), and `time` (`HH:MM` 24-hour). Optional: `email`, `vehicle`, `notes`.

**Contact** (`source: "contact"`) requires `name` and `phone`. `service` defaults to `Question / callback`. Date and time are optional but must be valid if sent.

```bash
curl -sS -X POST http://localhost:3000/api/appointments \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Test Driver",
    "phone": "7173300041",
    "service": "Hybrid Battery Diagnostic",
    "date": "2026-09-15",
    "time": "09:30",
    "source": "booking"
  }'
```

Success `200`:

```json
{ "ok": true, "id": "<uuid>", "saved": true, "delivered": false }
```

- `saved` — wrote to `data/appointments.json` (falls back to `/tmp/steves-appointments.json` if the data dir is not writable).
- `delivered` — Resend accepted the email. `false` when `RESEND_API_KEY` is missing or send failed. Success copy must tell the visitor to call `(717) 330-0041` to confirm if `delivered` is false.

Validation failures return `400` with `{ "ok": false, "error": "..." }`.

Chat is separate: `POST /api/chat` with `{ "message": "..." }` returns `{ "text": "..." }`.

## Layout

| Path | Role |
| --- | --- |
| `app/` | App Router pages, API routes, UI |
| `app/api/appointments/` | Booking + contact intake |
| `app/api/chat/` | Shop chatbot |
| `app/services/` | Hybrid battery, inspection, brakes |
| `lib/shop.ts` | Phone, email, address, hours, service lists |
| `DESIGN.md` | Visual and conversion rules |
| `TASKS.md` | Rebuild board — do not push until complete |

## License

Private shop site. Not licensed for reuse.
