/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/triggers/events-changed.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/triggers/events-changed.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * Google Calendar change — Start a run when something changes on a watched
 * Google Calendar.
 *
 * https://developers.google.com/workspace/calendar/api/guides/push
 *
 * Delivery: subscription. The host mints a UUID, calls channel_watch with it,
 * its own URL for this trigger and the connection's channelToken, and stores
 * the returned id, resourceId and expiration. Google cannot renew a channel:
 * 86400 seconds before it expires the host calls channel_stop and then
 * channel_watch again. A channel that lapsed is re-listed FIRST (event_list
 * with the stored syncToken; a 410 means list in full) and then re-created,
 * because notifications during the gap are gone. Google delivers with an EMPTY
 * body: the host verifies X-Goog-Channel-Token against the connection's
 * channelToken and injects the X-Goog-* headers as the event, camel-cased as
 * below. The first message on a new channel is `sync` and carries no change.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleCalendarMeta } from "../service.js";

export const GOOGLE_CALENDAR_EVENTS_CHANGED_TRIGGER_KIND = "@particle-academy/google_calendar_events_changed_trigger";
export const GOOGLE_CALENDAR_EVENTS_CHANGED_TRIGGER_OPERATION = "events_changed";

export const GOOGLE_CALENDAR_EVENTS_CHANGED_TRIGGER_META = googleCalendarMeta("trigger", "a calendar change", "https://developers.google.com/workspace/calendar/api/guides/push");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_CALENDAR_EVENTS_CHANGED_TRIGGER_OUTPUT: OutputField[] = [
  {
    "path": "channelId",
    "type": "string",
    "description": "X-Goog-Channel-ID: which channel this came from."
  },
  {
    "path": "messageNumber",
    "type": "string",
    "description": "X-Goog-Message-Number: increases per channel; 1 is the sync message."
  },
  {
    "path": "resourceId",
    "type": "string",
    "description": "X-Goog-Resource-ID: the watched resource."
  },
  {
    "path": "resourceState",
    "type": "string",
    "description": "X-Goog-Resource-State: sync, exists or not_exists. `sync` carries no change."
  },
  {
    "path": "resourceUri",
    "type": "string",
    "description": "X-Goog-Resource-URI: the watched resource's URI."
  },
  {
    "path": "channelExpiration",
    "type": "string",
    "description": "X-Goog-Channel-Expiration, when Google sends it: the channel's expiry in a human-readable format, not an instant to compute with."
  }
];

export const googleCalendarEventsChangedTriggerKind: NodeKindDefinition = defineConnectorKind(GOOGLE_CALENDAR_EVENTS_CHANGED_TRIGGER_META, {
  name: GOOGLE_CALENDAR_EVENTS_CHANGED_TRIGGER_KIND,
  aliases: ["google_calendar_events_changed_trigger"],
  label: "Google Calendar change",
  description: "Start a run when something changes on a watched Google Calendar.",
  icon: "📅",
  inputs: [],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: GOOGLE_CALENDAR_EVENTS_CHANGED_TRIGGER_OUTPUT,
  configSchema: [
    {
      "type": "select",
      "key": "sample",
      "label": "Sample state (fake mode)",
      "default": "exists",
      "description": "Which resource state the faked notification carries: `exists` is a change, `sync` is the first message on a new channel, `not_exists` is the resource going away.",
      "options": [
        {
          "value": "exists",
          "label": "exists — something changed"
        },
        {
          "value": "sync",
          "label": "sync — the channel just opened"
        },
        {
          "value": "not_exists",
          "label": "not_exists — the resource is gone"
        }
      ]
    }
  ],
  defaultConfig: {
    "mode": "auto",
    "sample": "exists"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_CALENDAR_EVENTS_CHANGED_TRIGGER_META, config as Record<string, unknown>, "a calendar change"),
});
