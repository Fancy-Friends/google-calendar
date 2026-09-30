/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/event-delete.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/event-delete.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * Delete Google Calendar event — Remove an event from a Google Calendar.
 *
 * https://developers.google.com/workspace/calendar/api/v3/reference/events/delete
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleCalendarMeta } from "../service.js";

export const GOOGLE_CALENDAR_EVENT_DELETE_KIND = "@particle-academy/google_calendar_event_delete";
export const GOOGLE_CALENDAR_EVENT_DELETE_OPERATION = "event_delete";

export const GOOGLE_CALENDAR_EVENT_DELETE_META = googleCalendarMeta("action", "delete an event", "https://developers.google.com/workspace/calendar/api/v3/reference/events/delete");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_CALENDAR_EVENT_DELETE_OUTPUT: OutputField[] = [
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against. Google answers 204 with no body, so this is the only thing published."
  }
];

export const googleCalendarEventDeleteKind: NodeKindDefinition = defineConnectorKind(GOOGLE_CALENDAR_EVENT_DELETE_META, {
  name: GOOGLE_CALENDAR_EVENT_DELETE_KIND,
  aliases: ["google_calendar_event_delete"],
  label: "Delete Google Calendar event",
  description: "Remove an event from a Google Calendar.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "idempotent",
  outputShape: GOOGLE_CALENDAR_EVENT_DELETE_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "calendarId",
      "label": "Calendar ID",
      "required": true,
      "default": "primary"
    },
    {
      "type": "text",
      "key": "eventId",
      "label": "Event ID",
      "required": true,
      "description": "From event_create's data.id, or event_list/event_get."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_CALENDAR_EVENT_DELETE_META, config as Record<string, unknown>, "delete an event"),
});
