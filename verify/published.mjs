/*
 * Google Calendar — the published npm packages.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { googleCalendarFaker } from "@particle-academy/google-calendar-js";
import { GOOGLE_CALENDAR_KINDS } from "@particle-academy/google-calendar-ui";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

/*
 * WHERE did that come from?
 *
 * Node resolves a bare specifier from the importing MODULE's directory, not
 * the working directory. So running this script across from a checkout
 * resolves out of the REPO's node_modules and silently tests the source
 * again — which it did, and passed, before CI caught it.
 *
 * Two things are checked, because neither is enough alone: that the package
 * came from an INSTALL rather than from source, and that this script is not
 * sitting inside the provider repo it is supposed to be testing.
 */
const resolved = import.meta.resolve("@particle-academy/google-calendar-js");
const here = dirname(fileURLToPath(import.meta.url));

assert.ok(
  !existsSync(join(here, "..", "packages", "js", "package.json")),
  `${here} is inside the provider repo, so a bare import resolves the repo's ` +
    "own node_modules. Copy this script into a project that installed the " +
    "published package and run it there.",
);
assert.match(resolved, /node_modules/, `resolved ${resolved}, which is not an installed package`);
console.log(`  ok   resolved from ${resolved}`);

const GOLDENS = [
  {
    "operation": "channel_stop",
    "config": {},
    "expected": {}
  },
  {
    "operation": "channel_watch",
    "config": {},
    "expected": {
      "kind": "api#channel",
      "id": "c33d4f8c-3353-b37e-38bf-ac0aac4fc9e5",
      "resourceId": "o3hgv1538sdjfh_fake_2d713802445e",
      "resourceUri": "https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json",
      "token": "tok_fake_d45622a81066",
      "expiration": "1789430400000"
    }
  },
  {
    "operation": "event_get",
    "config": {},
    "expected": {
      "kind": "calendar#event",
      "etag": "\"3456789012345678\"",
      "id": "evt_fake_a9fbf7b336b2",
      "status": "confirmed",
      "htmlLink": "https://www.google.com/calendar/event?eid=ZmFrZQ",
      "created": "2026-09-01T09:00:00.000Z",
      "updated": "2026-09-10T15:30:00.000Z",
      "summary": "Design review",
      "description": "Quarterly design review with the platform team.",
      "creator": {
        "email": "ada@example.test"
      },
      "organizer": {
        "email": "ada@example.test"
      },
      "start": {
        "dateTime": "2026-09-22T14:00:00+00:00",
        "timeZone": "UTC"
      },
      "end": {
        "dateTime": "2026-09-22T15:00:00+00:00",
        "timeZone": "UTC"
      },
      "iCalUID": "45fc2ac5-d439-85d2-2ca1-a7f84829715a",
      "sequence": 0,
      "attendees": [
        {
          "email": "ada@example.test",
          "organizer": true,
          "responseStatus": "accepted"
        },
        {
          "email": "grace@example.test",
          "responseStatus": "needsAction"
        }
      ],
      "reminders": {
        "useDefault": true
      },
      "eventType": "default"
    }
  },
  {
    "operation": "event_list",
    "config": {},
    "expected": {
      "kind": "calendar#events",
      "etag": "\"p33cd9r3ab8ne20g\"",
      "summary": "ada@example.test",
      "updated": "2026-09-10T15:30:00.000Z",
      "timeZone": "UTC",
      "accessRole": "owner",
      "defaultReminders": [
        {
          "method": "popup",
          "minutes": 10
        }
      ],
      "nextSyncToken": "CPDSyncToken_fake_73f7f893105e",
      "items": [
        {
          "kind": "calendar#event",
          "etag": "\"3456789012345678\"",
          "id": "evt_fake_d0cf12826176",
          "status": "confirmed",
          "htmlLink": "https://www.google.com/calendar/event?eid=ZmFrZQ",
          "created": "2026-09-01T09:00:00.000Z",
          "updated": "2026-09-10T15:30:00.000Z",
          "summary": "Design review",
          "creator": {
            "email": "ada@example.test"
          },
          "organizer": {
            "email": "ada@example.test"
          },
          "start": {
            "dateTime": "2026-09-22T14:00:00+00:00",
            "timeZone": "UTC"
          },
          "end": {
            "dateTime": "2026-09-22T15:00:00+00:00",
            "timeZone": "UTC"
          },
          "iCalUID": "4043fff0-c801-6337-563d-f5d3584545ad",
          "sequence": 0,
          "reminders": {
            "useDefault": true
          },
          "eventType": "default"
        }
      ]
    }
  },
  {
    "operation": "events_changed",
    "config": {
      "sample": "exists"
    },
    "expected": {
      "channelId": "bffaab9c-bba2-8827-98d5-9f56e6c2325e",
      "messageNumber": "2",
      "resourceId": "o3hgv1538sdjfh_fake_2bfda6f07b5e",
      "resourceState": "exists",
      "resourceUri": "https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json",
      "channelExpiration": "Tue, 15 Sep 2026 00:00:00 GMT"
    }
  }
];

for (const { operation, config, expected } of GOLDENS) {
  const faked = googleCalendarFaker(operation, fakeRequest("google_calendar", operation, config));

  assert.deepEqual(
    faked,
    expected,
    `the PUBLISHED package produced different bytes for ${operation} than the repo does`,
  );
  console.log(`  ok   ${operation}`);
}

// The ui package is a separate tarball, and js depends on it by its
// published name — so this also proves that dependency resolves.
assert.equal(GOOGLE_CALENDAR_KINDS.length, 5);
for (const kind of GOOGLE_CALENDAR_KINDS) {
  const keys = kind.configSchema.map((field) => field.key);
  assert.equal(keys[0], "connection");
  assert.equal(keys[1], "mode");
  assert.ok(kind.outputShape.length > 0, `${kind.name} declares no output shape`);
}
console.log(`  ok   ui kinds resolve from ${"@particle-academy/google-calendar-ui"}`);

console.log(`\n  ${GOLDENS.length} operations verified against the published packages.`);
