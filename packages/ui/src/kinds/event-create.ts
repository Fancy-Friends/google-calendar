/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/event-create.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/event-create.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * Create Google Calendar event — Create a timed event on a Google Calendar.
 *
 * https://developers.google.com/workspace/calendar/api/v3/reference/events/insert
 *
 * `unsafe-to-replay`.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleCalendarMeta } from "../service.js";

export const GOOGLE_CALENDAR_EVENT_CREATE_KIND = "@particle-academy/google_calendar_event_create";
export const GOOGLE_CALENDAR_EVENT_CREATE_OPERATION = "event_create";

export const GOOGLE_CALENDAR_EVENT_CREATE_META = googleCalendarMeta("action", "create an event", "https://developers.google.com/workspace/calendar/api/v3/reference/events/insert");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_CALENDAR_EVENT_CREATE_OUTPUT: OutputField[] = [
  {
    "path": "data.id",
    "type": "string",
    "description": "The new event's id."
  },
  {
    "path": "data.status",
    "type": "string",
    "description": "confirmed or tentative, echoing what was sent (or Google's default)."
  },
  {
    "path": "data.summary",
    "type": "string",
    "description": "Echoes what was sent."
  },
  {
    "path": "data.htmlLink",
    "type": "string",
    "description": "The event in the Google Calendar UI."
  },
  {
    "path": "data.start.dateTime",
    "type": "string",
    "description": "Echoes what was sent."
  },
  {
    "path": "data.end.dateTime",
    "type": "string",
    "description": "Echoes what was sent."
  },
  {
    "path": "data.created",
    "type": "string",
    "description": "RFC 3339 creation time."
  },
  {
    "path": "data.organizer.email",
    "type": "string",
    "description": "The connected account, almost always."
  },
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against. Google has no sandbox, so: fake or live."
  }
];

export const googleCalendarEventCreateKind: NodeKindDefinition = defineConnectorKind(GOOGLE_CALENDAR_EVENT_CREATE_META, {
  name: GOOGLE_CALENDAR_EVENT_CREATE_KIND,
  aliases: ["google_calendar_event_create"],
  label: "Create Google Calendar event",
  description: "Create a timed event on a Google Calendar.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "unsafe-to-replay",
  outputShape: GOOGLE_CALENDAR_EVENT_CREATE_OUTPUT,
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
      "key": "summary",
      "label": "Title",
      "required": true
    },
    {
      "type": "textarea",
      "key": "description",
      "label": "Description",
      "description": "Can contain HTML."
    },
    {
      "type": "text",
      "key": "location",
      "label": "Location",
      "description": "Free-form text."
    },
    {
      "type": "text",
      "key": "startDateTime",
      "label": "Start",
      "required": true,
      "description": "RFC 3339, e.g. 2026-10-01T14:00:00Z. Include an offset, or pair with a time zone below."
    },
    {
      "type": "text",
      "key": "startTimeZone",
      "label": "Start time zone",
      "description": "IANA name, e.g. America/New_York. Optional when the start time already carries an offset."
    },
    {
      "type": "text",
      "key": "endDateTime",
      "label": "End",
      "required": true,
      "description": "RFC 3339. Exclusive -- the event ends at, not through, this instant."
    },
    {
      "type": "text",
      "key": "endTimeZone",
      "label": "End time zone"
    },
    {
      "type": "select",
      "key": "status",
      "label": "Status",
      "options": [
        {
          "value": "confirmed",
          "label": "Confirmed"
        },
        {
          "value": "tentative",
          "label": "Tentative"
        }
      ],
      "description": "\"cancelled\" is not offered here -- that is event_delete's job, not a status this action should be able to set on create."
    },
    {
      "type": "select",
      "key": "visibility",
      "label": "Visibility",
      "options": [
        {
          "value": "default",
          "label": "Default"
        },
        {
          "value": "public",
          "label": "Public"
        },
        {
          "value": "private",
          "label": "Private"
        }
      ]
    },
    {
      "type": "select",
      "key": "transparency",
      "label": "Show me as",
      "options": [
        {
          "value": "opaque",
          "label": "Busy"
        },
        {
          "value": "transparent",
          "label": "Available"
        }
      ],
      "description": "opaque blocks time on the calendar (Busy); transparent does not (Available)."
    },
    {
      "type": "text",
      "key": "colorId",
      "label": "Color ID",
      "description": "An id from the colors endpoint's event section. Leave blank for the calendar's default."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_CALENDAR_EVENT_CREATE_META, config as Record<string, unknown>, "create an event"),
});
