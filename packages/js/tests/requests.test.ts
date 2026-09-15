/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * What Google Calendar actually receives.
 *
 * Every assertion below is about the request rather than the response, and
 * none of it touches the network: the transport is a stub that records what it
 * was handed.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import type { PreparedRequest } from "@particle-academy/fancy-connector-core";

import { googleCalendarChannelStop } from "../src/actions/channel-stop.js";
import { googleCalendarChannelWatch } from "../src/actions/channel-watch.js";
import { googleCalendarEventGet } from "../src/actions/event-get.js";
import { googleCalendarEventList } from "../src/actions/event-list.js";

/** Capture the prepared request instead of sending it. */
function capture() {
  const seen: PreparedRequest[] = [];

  return {
    seen,
    transport: async (request: PreparedRequest) => {
      seen.push(request);

      return { status: 200, body: JSON.stringify({ id: "captured" }), headers: {} };
    },
  };
}

const CREDENTIALS = {
  "clientId": "test_clientId",
  "clientSecret": "test_clientSecret",
  "accessToken": "test_accessToken",
  "refreshToken": "test_refreshToken",
  "channelToken": "test_channelToken"
};

test("channel_stop sends POST /calendar/v3/channels/stop", async () => {
  const { seen, transport } = capture();

  await googleCalendarChannelStop({
    config: {
      "channelId": "example-channelId",
      "resourceId": "example-resourceId"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "POST");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/calendar/v3/channels/stop"), seen[0]!.url);

  assert.deepEqual(JSON.parse(String(seen[0]!.body ?? "{}")), {
    "id": "example-channelId",
    "resourceId": "example-resourceId"
  });
});

test("channel_watch sends POST /calendar/v3/calendars/{calendarId}/events/watch", async () => {
  const { seen, transport } = capture();

  await googleCalendarChannelWatch({
    config: {
      "calendarId": "example-calendarId",
      "channelId": "example-channelId",
      "address": "example-address",
      "token": "example-token",
      "ttlSeconds": "example-ttlSeconds"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "POST");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/calendar/v3/calendars/example-calendarId/events/watch"), seen[0]!.url);

  assert.deepEqual(JSON.parse(String(seen[0]!.body ?? "{}")), {
    "id": "example-channelId",
    "address": "example-address",
    "token": "example-token",
    "params": {
      "ttl": "example-ttlSeconds"
    },
    "type": "web_hook"
  });
});

test("event_get sends GET /calendar/v3/calendars/{calendarId}/events/{eventId}", async () => {
  const { seen, transport } = capture();

  await googleCalendarEventGet({
    config: {
      "calendarId": "example-calendarId",
      "eventId": "example-eventId"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "GET");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/calendar/v3/calendars/example-calendarId/events/example-eventId"), seen[0]!.url);

  assert.deepEqual(
    Object.fromEntries(new URL(seen[0]!.url).searchParams),
    {},
  );
});

test("event_list sends GET /calendar/v3/calendars/{calendarId}/events", async () => {
  const { seen, transport } = capture();

  await googleCalendarEventList({
    config: {
      "calendarId": "example-calendarId",
      "syncToken": "example-syncToken",
      "timeMin": "example-timeMin",
      "timeMax": "example-timeMax",
      "maxResults": 1000,
      "pageToken": "example-pageToken",
      "singleEvents": true
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "GET");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/calendar/v3/calendars/example-calendarId/events"), seen[0]!.url);

  assert.deepEqual(
    Object.fromEntries(new URL(seen[0]!.url).searchParams),
    {
      "syncToken": "example-syncToken",
      "timeMin": "example-timeMin",
      "timeMax": "example-timeMax",
      "maxResults": "1000",
      "pageToken": "example-pageToken",
      "singleEvents": "true"
    },
  );
});

test("the credential is placed the way the provider wants it", async () => {
  const { seen, transport } = capture();

  await googleCalendarChannelStop({
    config: {
      "channelId": "example-channelId",
      "resourceId": "example-resourceId"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen[0]!.headers.Authorization, "Bearer test_accessToken");
});

test("a missing required field is refused BEFORE anything is sent", async () => {
  // Nothing was attempted, so there is nothing to classify — and the message names
  // the field, rather than letting the provider answer three frames later with
  // "invalid request".
  const { seen, transport } = capture();

  await assert.rejects(
    googleCalendarChannelStop({
      config: {
        "resourceId": "example-resourceId"
      },
      credentials: CREDENTIALS,
      mode: "live",
      transport,
    }),
    new RegExp("channelId"),
  );

  assert.equal(seen.length, 0, "the request must not have been sent");
});
