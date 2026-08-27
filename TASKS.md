# Steve's Automotive Technology — auto repair shop system

System type: independent hybrid-battery specialist + general auto repair in Lancaster / Millersville, PA. Address 1027 Dillerville Rd #16, Lancaster, PA 17603. Phone `(717) 330-0041`. Email `stevesautotech@gmail.com`. Canonical domain `https://stevesautomotivetechnology.com` (still on WordPress in production; this repo is the Next.js rebuild).

This is **not** a car lot. Booking, services, hybrid-battery proof, and shop chat are the product. Follow `DESIGN.md` (carbon/teal, specialist first, phone always visible).

Branch: `wip/system-complete`. **Never `git push`.** Push happens once, after every task is `[x]`.

## Status

- current: none
- completed: 8/12
- last_completed: S08

## Backlog

- [x] **S01** Turn this into a real Next.js server app. Remove `output: 'export'` from `next.config.js`. Stop tracking build artifacts: `git rm -r --cached .next out` (keep them gitignored). Add `.env.example` with `OPENAI_API_KEY`, `RESEND_API_KEY`, `LEAD_INBOX=stevesautotech@gmail.com`. Gitignore `.env`, `.env.local`, `data/appointments.json`, `.grok/builder.lock`. Keep `export const dynamic = 'force-static'` only where it still makes sense. Done when: `npm run build` succeeds as a server app and `.next`/`out` are untracked.
- [x] **S02** Appointment API. Add `POST /api/appointments` that validates name, phone, service, date, time. Persist to `data/appointments.json` when possible. Email via Resend only if `RESEND_API_KEY` is set. Wire `AppointmentBooking` to fetch this API instead of `mailto:`. Success UI must not claim the shop already received mail if `delivered` is false — say the request was recorded and to call `(717) 330-0041` to confirm. Done when: curl POST returns 200 and the booking form no longer depends on the visitor’s mail app.
- [x] **S03** Contact form uses the same appointment/lead API (`source: "contact"`). Remove the duplicate “Book Your Appointment” heading clash if both sections say the same thing — contact can be “Ask a question / request a callback”. Done when: contact submit hits the API and duplicate H2s are gone.
- [x] **S04** Shop chatbot with a real backend. Add `POST /api/chat` returning `{ text }`. Knowledge: hybrid battery diagnostics/reconditioning/replacement vs dealer price, hours (Mon–Fri 8:30–5, Sat 8:30–1, Sun closed), address, phone. If no OpenAI key, use keyword + this knowledge (upgrade the current client-only matcher). Done when: the widget talks to `/api/chat` and still works without a key.
- [x] **S05** Service detail pages. Add `/services/hybrid-battery`, `/services/inspection`, `/services/brakes` with specialist copy, FAQ, and book/call CTAs. Link from `ServicesSection` cards. Hybrid battery page is the money page. Done when: all three routes build and link from the home services grid.
- [x] **S06** Sitemap + robots include the new service URLs. Keep canonical host `https://stevesautomotivetechnology.com`. Update `public/llms.txt` with those paths. Done when: sitemap lists `/`, the three service pages, `/privacy`.
- [x] **S07** Privacy page at `/privacy`, footer link. State: appointment requests, optional chat, no sale of personal data. Done when: route builds and is linked.
- [x] **S08** Testimonials honesty. Keep the Jeremy Metze hybrid-battery quote (it reads like a real review). If other quotes are generic placeholders, label the section “Customer comments” or keep only sourced reviews. Do not invent new 5-star names. Done when: no unsourced full-name fake reviews remain.
- [ ] **S09** Shared shop constants. Create `lib/shop.ts` (phone, email, address, hours, services list) and use it from nav, footer, schema, booking, chat, contact. Done when: the phone number is not copy-pasted as a raw string in 6+ components.
- [ ] **S10** Product README. How to run, env vars, booking API, design rules pointer to DESIGN.md, do not push until TASKS.md is complete. Done when: a stranger can run the shop site from README.
- [ ] **S11** Smoke tests. Add `scripts/smoke.mjs` that fails if TASKS still has `- [ ]` (except after all done), if static export is still on, or if `/api/appointments` / `/api/chat` are missing. Add `npm run smoke`. Done when: `npm run smoke` and `npm run build` pass.
- [ ] **S12** Final shop QA pass. Hero still shows hybrid-battery CTA + `(717) 330-0041`. Booking, services, contact, chat compile. Reduced-motion / poster still present for the hero video. Done when: `npm run build` passes and those surfaces still exist.

## Done rule

Mark a task `[x]` only after build (and smoke, once S11 exists) pass, then commit on `wip/system-complete`.
