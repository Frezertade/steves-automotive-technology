# Builder loop protocol (mechanic shop)

Each Grok `/loop` fire does **one** task from `TASKS.md`, then stops.

## Pick

1. If `.grok/builder.lock` exists and is younger than 25 minutes, exit immediately (`SHOP LOCKED`). Something is still shipping — do not wait, do not retry. The next 60s tick will pick up when the lock is gone.
2. Write `.grok/builder.lock` with ISO time + task id.
3. First markdown line matching `- [ ] **Sxx**` is the task. If none, the board is complete: delete the lock, do not push, report `SHOP COMPLETE — ready to push wip/system-complete`.

## Work

- Repo: `/Users/frezerkifle/steves-automotive-technology`
- Branch: `wip/system-complete` only
- Implement only that task. No drive-by refactors, no extra features.
- Follow `DESIGN.md` (teal/carbon, specialist first, phone visible).
- `npm install` if `node_modules` is missing.

## Test / fix

1. `npm run build`
2. If S11 exists, also `npm run smoke`
3. On failure, fix and rebuild once or twice. Do not mark the task done if build fails.

## Commit

1. In `TASKS.md`, change that task to `- [x]`, set `current: none`, bump `completed`, set `last_completed` to the id.
2. `git add` the work (never add `.next`, `out`, `node_modules`, `.env.local`, lock file).
3. Commit: `feat(shop): Sxx <short done-when>`
4. **Never `git push`.**
5. Delete `.grok/builder.lock`.

## Hard rules

- Do not change the dealership repo in this loop.
- Do not use `--no-verify` to hide a red build.
- Do not invent new customer names. Phone stays `(717) 330-0041`. Domain stays `stevesautomotivetechnology.com`.
