/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/event-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/event-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * Google Calendar event — Read one event from a Google Calendar.
 *
 * https://developers.google.com/workspace/calendar/api/v3/reference/events/get
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleCalendarMeta } from "../service.js";

export const GOOGLE_CALENDAR_EVENT_GET_KIND = "@particle-academy/google_calendar_event_get";
export const GOOGLE_CALENDAR_EVENT_GET_OPERATION = "event_get";

export const GOOGLE_CALENDAR_EVENT_GET_META = googleCalendarMeta("action", "read an event", "https://developers.google.com/workspace/calendar/api/v3/reference/events/get");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_CALENDAR_EVENT_GET_OUTPUT: OutputField[] = [
  {
    "path": "data.id",
    "type": "string",
    "description": "The event id."
  },
  {
    "path": "data.status",
    "type": "string",
    "description": "confirmed, tentative or cancelled."
  },
  {
    "path": "data.summary",
    "type": "string",
    "description": "The title."
  },
  {
    "path": "data.description",
    "type": "string",
    "description": "The description, when there is one."
  },
  {
    "path": "data.start.dateTime",
    "type": "string",
    "description": "RFC 3339 start. All-day events carry start.date instead."
  },
  {
    "path": "data.end.dateTime",
    "type": "string",
    "description": "RFC 3339 end. All-day events carry end.date instead."
  },
  {
    "path": "data.htmlLink",
    "type": "string",
    "description": "The event in the Google Calendar UI."
  },
  {
    "path": "data.updated",
    "type": "string",
    "description": "RFC 3339 last modification."
  },
  {
    "path": "data.organizer.email",
    "type": "string",
    "description": "Who organises it."
  },
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against. Google has no sandbox, so: fake or live."
  }
];

export const googleCalendarEventGetKind: NodeKindDefinition = defineConnectorKind(GOOGLE_CALENDAR_EVENT_GET_META, {
  name: GOOGLE_CALENDAR_EVENT_GET_KIND,
  aliases: ["google_calendar_event_get"],
  label: "Google Calendar event",
  description: "Read one event from a Google Calendar.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: GOOGLE_CALENDAR_EVENT_GET_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "calendarId",
      "label": "Calendar ID",
      "required": true,
      "default": "primary",
      "description": "`primary` for the connected account's own calendar, or a calendar's id (usually an email address)."
    },
    {
      "type": "text",
      "key": "eventId",
      "label": "Event ID",
      "required": true,
      "description": "The event's id, as published by another node or by a notification's follow-up list."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_CALENDAR_EVENT_GET_META, config as Record<string, unknown>, "read an event"),
});
