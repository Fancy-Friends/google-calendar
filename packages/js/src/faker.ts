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
 * The Google Calendar faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES Google Calendar actually publishes, so an author can wire {{
 * $json.data.id }} against a fake and have it keep working against the real
 * thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakeChannelStop({ config, fake }: FakeRequest): unknown {
  return {};
}

function fakeChannelWatch({ config, fake }: FakeRequest): unknown {
  const boundChannelid = (config.channelId !== undefined && config.channelId !== null && config.channelId !== "" ? String(config.channelId) : `${fake.hex(8)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(12)}`);
  const boundToken = (config.token !== undefined && config.token !== null && config.token !== "" ? String(config.token) : fake.id("tok"));

  return {
    "kind": "api#channel",
    "id": boundChannelid,
    "resourceId": fake.id("o3hgv1538sdjfh"),
    "resourceUri": "https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json",
    "token": boundToken,
    "expiration": "1789430400000",
  };
}

function fakeEventGet({ config, fake }: FakeRequest): unknown {
  const boundEventid = (config.eventId !== undefined && config.eventId !== null && config.eventId !== "" ? String(config.eventId) : fake.id("evt"));

  return {
    "kind": "calendar#event",
    "etag": "\"3456789012345678\"",
    "id": boundEventid,
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=ZmFrZQ",
    "created": "2026-09-01T09:00:00.000Z",
    "updated": "2026-09-10T15:30:00.000Z",
    "summary": "Design review",
    "description": "Quarterly design review with the platform team.",
    "creator": {
      "email": "ada@example.test",
    },
    "organizer": {
      "email": "ada@example.test",
    },
    "start": {
      "dateTime": "2026-09-22T14:00:00+00:00",
      "timeZone": "UTC",
    },
    "end": {
      "dateTime": "2026-09-22T15:00:00+00:00",
      "timeZone": "UTC",
    },
    "iCalUID": `${fake.hex(8)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(12)}`,
    "sequence": 0,
    "attendees": [
      {
        "email": "ada@example.test",
        "organizer": true,
        "responseStatus": "accepted",
      },
      {
        "email": "grace@example.test",
        "responseStatus": "needsAction",
      },
    ],
    "reminders": {
      "useDefault": true,
    },
    "eventType": "default",
  };
}

function fakeEventList({ config, fake }: FakeRequest): unknown {
  return {
    "kind": "calendar#events",
    "etag": "\"p33cd9r3ab8ne20g\"",
    "summary": "ada@example.test",
    "updated": "2026-09-10T15:30:00.000Z",
    "timeZone": "UTC",
    "accessRole": "owner",
    "defaultReminders": [
      {
        "method": "popup",
        "minutes": 10,
      },
    ],
    "nextSyncToken": fake.id("CPDSyncToken"),
    "items": [
      {
        "kind": "calendar#event",
        "etag": "\"3456789012345678\"",
        "id": fake.id("evt"),
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=ZmFrZQ",
        "created": "2026-09-01T09:00:00.000Z",
        "updated": "2026-09-10T15:30:00.000Z",
        "summary": "Design review",
        "creator": {
          "email": "ada@example.test",
        },
        "organizer": {
          "email": "ada@example.test",
        },
        "start": {
          "dateTime": "2026-09-22T14:00:00+00:00",
          "timeZone": "UTC",
        },
        "end": {
          "dateTime": "2026-09-22T15:00:00+00:00",
          "timeZone": "UTC",
        },
        "iCalUID": `${fake.hex(8)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(12)}`,
        "sequence": 0,
        "reminders": {
          "useDefault": true,
        },
        "eventType": "default",
      },
    ],
  };
}

function fakeEventsChanged({ config, fake }: FakeRequest): unknown {
  const boundChannelid = `${fake.hex(8)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(12)}`;

  return {
    "channelId": boundChannelid,
    "messageNumber": "2",
    "resourceId": fake.id("o3hgv1538sdjfh"),
    "resourceState": (config.sample !== undefined && config.sample !== null && config.sample !== "" ? String(config.sample) : "exists"),
    "resourceUri": "https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json",
    "channelExpiration": "Tue, 15 Sep 2026 00:00:00 GMT",
  };
}

export const googleCalendarFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "channel_stop":
      return fakeChannelStop(request);

    case "channel_watch":
      return fakeChannelWatch(request);

    case "event_get":
      return fakeEventGet(request);

    case "event_list":
      return fakeEventList(request);

    case "events_changed":
      return fakeEventsChanged(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `google_calendar: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
