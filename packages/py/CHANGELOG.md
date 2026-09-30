# Changelog

All notable changes to `@particle-academy/google-calendar-ui`,
`@particle-academy/google-calendar-js`, `particle-academy/google-calendar-php`
and `fancy-google-calendar`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

## [0.2.0] — 2026-09-30

### Added

- **`event_create`**, **`event_update`** and **`event_delete`** — write
  support, the first this connector has had. `event_update` uses PATCH
  (`events.patch`), not PUT (`events.update`): PUT requires resending the
  whole event or Google clears every field left out, which is a trap for
  a caller that only wants to change one thing. No scope change —
  `calendar.events` already covers create/update/delete.
- Deliberately NOT included: attendees and recurrence. Both need an
  array-of-objects (attendees) or array-of-strings (recurrence) config
  shape nothing in this estate's vocabulary has needed before now; same
  bar as everything in `vocabulary-deferred.md` — a second real need,
  not a first guess. All-day (date-only) events are out of scope for the
  same reason: they need `start.date`/`end.date` instead of
  `start.dateTime`/`end.dateTime`, a variant this config shape cannot
  express yet.

## [0.1.0] — 2026-09-15

### Added

- **First release.** Actions `event_get`, `event_list` (full or incremental
  with a `syncToken`; a `410` means list in full again), `channel_watch` and
  `channel_stop`; the `events_changed` trigger, the first in the estate with
  `delivery: "subscription"`. Google cannot renew a channel, so the trigger's
  lease names `channel_watch` again as its renew, 86400 seconds before the
  week-long channel expires. Deliveries carry an EMPTY body and are verified
  by the channel token Google echoes in `X-Goog-Channel-Token`.
- Requires `fancy-connector-core` ≥ 0.8.0 in js and php — the release that
  carries `LeaseDeclaration` and the shared-token verification scheme.
