/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/channel-stop.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/channel-stop.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * Google Calendar stop watching — Close a push-notification channel. The
 * host's subscription machinery calls this before re-creating a channel and
 * when a trigger is removed.
 *
 * https://developers.google.com/workspace/calendar/api/v3/reference/channels/stop
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleCalendarMeta } from "../service.js";

export const GOOGLE_CALENDAR_CHANNEL_STOP_KIND = "@particle-academy/google_calendar_channel_stop";
export const GOOGLE_CALENDAR_CHANNEL_STOP_OPERATION = "channel_stop";

export const GOOGLE_CALENDAR_CHANNEL_STOP_META = googleCalendarMeta("action", "stop a channel", "https://developers.google.com/workspace/calendar/api/v3/reference/channels/stop");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_CALENDAR_CHANNEL_STOP_OUTPUT: OutputField[] = [
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against. Google answers with an empty body, so this is the only thing published."
  }
];

export const googleCalendarChannelStopKind: NodeKindDefinition = defineConnectorKind(GOOGLE_CALENDAR_CHANNEL_STOP_META, {
  name: GOOGLE_CALENDAR_CHANNEL_STOP_KIND,
  aliases: ["google_calendar_channel_stop"],
  label: "Google Calendar stop watching",
  description: "Close a push-notification channel. The host's subscription machinery calls this before re-creating a channel and when a trigger is removed.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "idempotent",
  outputShape: GOOGLE_CALENDAR_CHANNEL_STOP_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "channelId",
      "label": "Channel ID",
      "required": true,
      "description": "The channel's id, as sent to channel_watch."
    },
    {
      "type": "text",
      "key": "resourceId",
      "label": "Resource ID",
      "required": true,
      "description": "The resourceId channel_watch answered with. Both are needed; Google refuses a stop with only one."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_CALENDAR_CHANNEL_STOP_META, config as Record<string, unknown>, "stop a channel"),
});
