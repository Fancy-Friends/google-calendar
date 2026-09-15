/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/channel-watch.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/channel-watch.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * Google Calendar watch — Open a push-notification channel on a calendar's
 * events. The host's subscription machinery calls this; it is not a node most
 * workflows need.
 *
 * https://developers.google.com/workspace/calendar/api/v3/reference/events/watch
 *
 * `unsafe-to-replay`.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleCalendarMeta } from "../service.js";

export const GOOGLE_CALENDAR_CHANNEL_WATCH_KIND = "@particle-academy/google_calendar_channel_watch";
export const GOOGLE_CALENDAR_CHANNEL_WATCH_OPERATION = "channel_watch";

export const GOOGLE_CALENDAR_CHANNEL_WATCH_META = googleCalendarMeta("action", "watch a calendar", "https://developers.google.com/workspace/calendar/api/v3/reference/events/watch");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_CALENDAR_CHANNEL_WATCH_OUTPUT: OutputField[] = [
  {
    "path": "data.id",
    "type": "string",
    "description": "The channel id -- what was sent."
  },
  {
    "path": "data.resourceId",
    "type": "string",
    "description": "Google's opaque id for the watched resource. channel_stop needs it together with the channel id."
  },
  {
    "path": "data.resourceUri",
    "type": "string",
    "description": "The watched resource's URI."
  },
  {
    "path": "data.token",
    "type": "string",
    "description": "The token that will be echoed on every notification."
  },
  {
    "path": "data.expiration",
    "type": "string",
    "description": "When the channel expires, as epoch MILLISECONDS in a string. The subscription trigger's lease is built from this."
  },
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against. Google has no sandbox, so: fake or live."
  }
];

export const googleCalendarChannelWatchKind: NodeKindDefinition = defineConnectorKind(GOOGLE_CALENDAR_CHANNEL_WATCH_META, {
  name: GOOGLE_CALENDAR_CHANNEL_WATCH_KIND,
  aliases: ["google_calendar_channel_watch"],
  label: "Google Calendar watch",
  description: "Open a push-notification channel on a calendar's events. The host's subscription machinery calls this; it is not a node most workflows need.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "unsafe-to-replay",
  outputShape: GOOGLE_CALENDAR_CHANNEL_WATCH_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "calendarId",
      "label": "Calendar ID",
      "required": true,
      "default": "primary",
      "description": "`primary` for the connected account's own calendar, or a calendar's id."
    },
    {
      "type": "text",
      "key": "channelId",
      "label": "Channel ID",
      "required": true,
      "description": "A UUID the host mints for THIS channel. Google requires it to be unique; it comes back in every notification as X-Goog-Channel-ID and is what channel_stop needs."
    },
    {
      "type": "text",
      "key": "address",
      "label": "Notification URL",
      "required": true,
      "description": "The HTTPS URL the host mounts for this trigger. Google POSTs notifications here with an EMPTY body and the facts in X-Goog-* headers."
    },
    {
      "type": "text",
      "key": "token",
      "label": "Channel token",
      "required": true,
      "description": "The connection's channelToken. The host fills this from the connection -- never type a value here. Google echoes it in X-Goog-Channel-Token, and that echo is how a delivery is verified."
    },
    {
      "type": "text",
      "key": "ttlSeconds",
      "label": "Lifetime (seconds)",
      "required": true,
      "default": "604800",
      "description": "How long Google keeps the channel alive. Google's default is 604800 (one week), and the discovery document types it as a STRING inside `params`."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_CALENDAR_CHANNEL_WATCH_META, config as Record<string, unknown>, "watch a calendar"),
});
