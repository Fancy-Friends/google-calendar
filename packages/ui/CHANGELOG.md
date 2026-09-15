# Changelog

All notable changes to `@particle-academy/google-calendar-ui`,
`@particle-academy/google-calendar-js`, `particle-academy/google-calendar-php`
and `fancy-google-calendar`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

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
