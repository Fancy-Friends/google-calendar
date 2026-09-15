/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { googleCalendarFaker } from "../src/faker.js";

test("channel_stop fakes the shape Google Calendar publishes", () => {
  const config = {};

  const faked = googleCalendarFaker("channel_stop", fakeRequest("google_calendar", "channel_stop", config));

  assert.deepEqual(faked, {});
});

test("channel_watch fakes the shape Google Calendar publishes", () => {
  const config = {};

  const faked = googleCalendarFaker("channel_watch", fakeRequest("google_calendar", "channel_watch", config));

  assert.deepEqual(faked, {
    "kind": "api#channel",
    "id": "c33d4f8c-3353-b37e-38bf-ac0aac4fc9e5",
    "resourceId": "o3hgv1538sdjfh_fake_2d713802445e",
    "resourceUri": "https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json",
    "token": "tok_fake_d45622a81066",
    "expiration": "1789430400000"
  });
});

test("event_get fakes the shape Google Calendar publishes", () => {
  const config = {};

  const faked = googleCalendarFaker("event_get", fakeRequest("google_calendar", "event_get", config));

  assert.deepEqual(faked, {
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
  });
});

test("event_list fakes the shape Google Calendar publishes", () => {
  const config = {};

  const faked = googleCalendarFaker("event_list", fakeRequest("google_calendar", "event_list", config));

  assert.deepEqual(faked, {
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
  });
});

test("events_changed fakes the shape Google Calendar publishes", () => {
  const config = {
    "sample": "exists"
  };

  const faked = googleCalendarFaker("events_changed", fakeRequest("google_calendar", "events_changed", config));

  assert.deepEqual(faked, {
    "channelId": "bffaab9c-bba2-8827-98d5-9f56e6c2325e",
    "messageNumber": "2",
    "resourceId": "o3hgv1538sdjfh_fake_2bfda6f07b5e",
    "resourceState": "exists",
    "resourceUri": "https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json",
    "channelExpiration": "Tue, 15 Sep 2026 00:00:00 GMT"
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => googleCalendarFaker("no_such_operation", fakeRequest("google_calendar", "no_such_operation", {})), /no fake response/);
});
