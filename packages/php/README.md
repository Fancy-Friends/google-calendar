# Google Calendar

[![Fancified](art/fancified.svg)](https://particle.academy)

Google Calendar for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/google-calendar-ui` | `npm install @particle-academy/google-calendar-ui` |
| Node | `@particle-academy/google-calendar-js` | `npm install @particle-academy/google-calendar-js` |
| PHP 8.4+ | `particle-academy/google-calendar-php` | `composer require particle-academy/google-calendar-php` |
| Python 3.11+ | `fancy-google-calendar` | `pip install fancy-google-calendar` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No Google Calendar SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### Credentials

A Google Calendar connection holds 5 values.

**Two kinds of value, and mixing them up matters.** A `provider` credential is ONE value for the whole installation — an OAuth app's client secret serves every connected account. An `account` credential is one per connected account. A host that stores the second where it stores the first lets one account's credentials reach another's.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **OAuth client ID** | per installation | not secret | From Google Cloud Console -> APIs & Services -> Credentials. ONE value for the whole installation, not per connected account. |
| **OAuth client secret** | per installation | **secret** | The client secret for the same OAuth app. One value for the whole installation. |
| **Access token** | per connected account | **secret** | Per connected Google account, and it expires after ONE HOUR. The host refreshes it with the refresh token. |
| **Refresh token** | per connected account | **secret** | Per connected Google account. Google issues one only when the consent request asks for offline access; without it the connection dies within the hour. |
| **Channel token** | per connected account | **secret** | A secret the host chooses per connected account and sends as `token` on every events.watch. Google echoes it back in the X-Goog-Channel-Token header of every notification, and that echo is the ONLY thing that authenticates a delivery -- Google does not sign them. Up to 256 characters. |

### Authorising

Google Calendar uses OAuth2 (authorization_code). The package DECLARES the exchange; the HOST performs it — a consent screen needs a browser, a redirect URI and somewhere to persist the result, and all three belong to the host.

- **Authorize URL** — https://accounts.google.com/o/oauth2/v2/auth
- **Token URL** — https://oauth2.googleapis.com/token
- **Scopes** — `https://www.googleapis.com/auth/calendar.events`
- **Access token lifetime** — 3600 seconds (1 hours). A host that never refreshes works all afternoon and is broken by morning.

The refresh tokens do **not** rotate: the same one is reusable, so a refresh may safely be retried and may run concurrently. Stated rather than assumed, because the opposite — a provider that spends the token and revokes the grant on a replay — looks identical until it happens.

### The estate

**Google Calendar has no test estate, and somebody checked.** Everything this connector does is real. Use the faker to build against it.

> Google has no sandbox for Calendar. A test calendar is a real one in a real account, so every watch and every read is real -- point this at a scratch calendar, not a production one. The faker is the only way to develop against it without touching an account.

## What it can do

### Actions

#### `channel_stop` — Google Calendar stop watching

Close a push-notification channel. The host's subscription machinery calls this before re-creating a channel and when a trigger is removed.

`POST /calendar/v3/channels/stop` · idempotent — safe to replay

| Input | Required | What it is |
|---|---|---|
| `channelId` | yes | The channel's id, as sent to channel_watch. |
| `resourceId` | yes | The resourceId channel_watch answered with. Both are needed; Google refuses a stop with only one. |

#### `channel_watch` — Google Calendar watch

Open a push-notification channel on a calendar's events. The host's subscription machinery calls this; it is not a node most workflows need.

`POST /calendar/v3/calendars/{calendarId}/events/watch` · **unsafe to replay** — a retried durable run does it TWICE

| Input | Required | What it is |
|---|---|---|
| `calendarId` | yes | `primary` for the connected account's own calendar, or a calendar's id. |
| `channelId` | yes | A UUID the host mints for THIS channel. Google requires it to be unique; it comes back in every notification as X-Goog-Channel-ID and is what channel_stop needs. |
| `address` | yes | The HTTPS URL the host mounts for this trigger. Google POSTs notifications here with an EMPTY body and the facts in X-Goog-* headers. |
| `token` | yes | The connection's channelToken. The host fills this from the connection -- never type a value here. Google echoes it in X-Goog-Channel-Token, and that echo is how a delivery is verified. |
| `ttlSeconds` | yes | How long Google keeps the channel alive. Google's default is 604800 (one week), and the discovery document types it as a STRING inside `params`. |

#### `event_get` — Google Calendar event

Read one event from a Google Calendar.

`GET /calendar/v3/calendars/{calendarId}/events/{eventId}` · reads only — safe to replay

| Input | Required | What it is |
|---|---|---|
| `calendarId` | yes | `primary` for the connected account's own calendar, or a calendar's id (usually an email address). |
| `eventId` | yes | The event's id, as published by another node or by a notification's follow-up list. |

#### `event_list` — Google Calendar events

List events from a Google Calendar, in full or incrementally with a sync token.

`GET /calendar/v3/calendars/{calendarId}/events` · reads only — safe to replay

| Input | Required | What it is |
|---|---|---|
| `calendarId` | yes | `primary` for the connected account's own calendar, or a calendar's id. |
| `syncToken` | no | From a previous list's nextSyncToken. With one set, Google returns ONLY what changed since -- including deletions, as cancelled events. Leave blank for a full list. |
| `timeMin` | no | RFC 3339 lower bound on an event's END time, e.g. 2026-09-15T00:00:00Z. Not allowed together with a sync token. |
| `timeMax` | no | RFC 3339 upper bound on an event's START time. Not allowed together with a sync token. |
| `maxResults` | no | Events per page. Google's default is 250 and its maximum 2500; a nextPageToken means there are more. |
| `pageToken` | no | From a previous page's nextPageToken. |
| `singleEvents` | no | Return each occurrence of a recurring event as its own item, rather than the series once. |

### Triggers

#### `events_changed` — Google Calendar change

Start a run when something changes on a watched Google Calendar.

A SUBSCRIPTION: Google Calendar delivers to your endpoint only while a subscription it issued is alive, at most 168 hours at a time. Its expiry is read from the `channel_watch` response (`expiration`); 86400 seconds before it, Google Calendar cannot renew one, so the host stops it (`channel_stop`) and creates it again (`channel_watch`). A lease that lapses is re-listed AND re-subscribed, because notifications during the gap are gone. Every delivery: the token Google Calendar echoes back is compared with the connection's `channelToken` before anything runs.

**You have to set this up with the provider first:**

The host mints a UUID, calls channel_watch with it, its own URL for this trigger and the connection's channelToken, and stores the returned id, resourceId and expiration. Google cannot renew a channel: 86400 seconds before it expires the host calls channel_stop and then channel_watch again. A channel that lapsed is re-listed FIRST (event_list with the stored syncToken; a 410 means list in full) and then re-created, because notifications during the gap are gone. Google delivers with an EMPTY body: the host verifies X-Goog-Channel-Token against the connection's channelToken and injects the X-Goog-* headers as the event, camel-cased as below. The first message on a new channel is `sync` and carries no change.

## Run it before you have credentials

Every operation ships a **faker**, whether or not Google Calendar has a sandbox. Set a
node's mode to `fake` and it returns the shape Google Calendar actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/google-calendar`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
