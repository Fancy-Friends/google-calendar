# Changelog

All notable changes to `@particle-academy/google-calendar-ui`,
`@particle-academy/google-calendar-js`, `particle-academy/google-calendar-php`
and `fancy-google-calendar`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

## [0.4.0] — 2026-11-08

### Added

- **One Google consent grant, shared by every Google connector** (`oauth.grant:
  "google"`), for an org-level Google connection: one OAuth client, one consent
  and one refresh token per person, with each feature's scopes asked for when it
  is first used. Declared in the manifest, the `-ui` package's OAuth constant,
  the README and the registry index:
  - `authorizeParams`: `access_type=offline` and `include_granted_scopes=true`.
    A refresh token comes back only on the FIRST code exchange, so keep the stored
    one when an exchange returns none.
  - `revoke`: POST `https://oauth2.googleapis.com/revoke` with `token`, and
    `scope: "grant"`. **Revoking removes the person's WHOLE Google grant, every
    Google connector**, so a per-feature disconnect stops using that feature's
    scopes locally and only a full Google disconnect revokes.
  - `identity`: identify the account by the id_token's `sub` (request `openid`;
    issuer `https://accounts.google.com` or `accounts.google.com`; audience is
    the `clientId`), never by email, which Google says is neither unique nor
    permanent.
  `restrictedScopes` is empty: none of this connector's scopes is restricted.

  Nothing a request sends has changed; this is what a host needs to run the
  connection.

## [0.3.0] — 2026-11-08

### Added

- **Laravel integration, in this package** (`src/Laravel/`), auto-discovered
  through composer's `extra.laravel`. Laravel is SUGGESTED, never required:
  outside a Laravel app none of it loads.
  - a service provider that merges `config/google-calendar.php` under
    `connectors.google-calendar` (credentials from the environment, or per call for a
    multi-account app);
  - the `GoogleCalendar` facade: `GoogleCalendar::call('<operation>', [...])` runs any action;
  - `GoogleCalendar::fake()`, answered from the connector's faker, with
    `assertSent` / `assertNotSent` / `assertNothingSent` / `assertSentCount`;
  - a webhook ROUTE per trigger (`Route::googleCalendarEventsChanged('/path')`) that VERIFIES the raw delivery with the trigger's own scheme before the app sees it, answers 401 with the reason when it does not, then dispatches an event (`Events\\…Received`);
  - its own Pest test of all of it against a booted Laravel app.

### Changed

- **Tests: Pest `^5`**, and `laravel/framework` `^13` as a DEV-ONLY test
  dependency (the framework this package integrates with; nothing ships in
  `require`).

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
