# Agent Instructions

## Product invariants

Secure Family is a security check-up for non-technical people (parents,
grandparents). Its credibility depends on keeping these promises:

- **Nothing leaves the device.** No backend, no analytics, no cookies, no
  third-party requests: no CDNs, no Google Fonts, no external images or
  scripts. The UI tells visitors "We store nothing about you".
- **Saved data goes through `src/lib/storage.js` only**, and every new field
  is validated in `sanitize()`. If the saved shape changes incompatibly, bump
  the storage key version.
- **Every string is escaped.** Views build HTML strings, so any text or
  attribute value goes through `escapeHtml()`. Never insert raw content.
- **The advice must be correct and current.** Follow mainstream guidance
  (NIST, the vendors' own help pages); for example, never recommend routine
  password rotation. Never tell people to share a code, PIN or password.
  When adding or changing menu paths in a guide, say in the PR that they
  need checking on a real device.
- **Both languages, always.** All visible text lives in `src/content/` with
  `en` and `es` versions. Never hardcode copy in views.
- **Written for older, non-technical people.** Plain words, no jargon, one
  idea per screen, touch targets of at least 44px, and no motion when the
  visitor prefers reduced motion.

## Non-derivable facts

- Deployed to GitHub Pages under `/secure-family/`. That is why routing uses
  the URL hash and `vite.config.js` sets `base: './'`. Keep both.
- The source runs as plain browser modules with no build step, and tests use
  Node's built-in runner. Keep it that way: no frameworks, and no new
  dependency unless its value clearly outweighs its maintenance cost.

## Git

After finishing a change, commit it, push it to a feature branch, and open a
PR without asking first. PR descriptions use these sections: Summary,
Changes, Notes, Test plan (with what was and wasn't verified).

Always ask for explicit confirmation before merging. Merging to `main`
deploys to production.

Never do the following unless the user explicitly asks:
- push directly to `main`;
- force-push, rebase, amend, or reset pushed commits.

## Testing

- A test earns its place by failing when the site breaks. Name the bug it
  would catch before writing it.
- Test logic: scoring, saved-data validation, routing, and content
  completeness (both languages, valid links between questions and steps).
- Do not test prose, CSS or layout. Smoke-test visual changes in the browser
  at phone width instead.
- Assert outcomes, not mock calls.

## Verify before claiming "done"

"Done" means `npm test` and `npm run build` passed and, for visual changes,
the affected screens were checked at phone width in `npm run preview`. If a
step failed or was skipped, say so plainly.

## Commands

- `npm test`
- `npm run build`
- `npm run preview` for smoke tests (serves `dist/` on http://localhost:4173)

## Preferences

- Write code, comments, docs, and developer-facing strings in English.
- Keep the diff to the requested scope.
