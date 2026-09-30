/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/event-update.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/event-update.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * Update Google Calendar event — Change one or more fields of an existing
 * event. Only the fields provided are touched.
 *
 * https://developers.google.com/workspace/calendar/api/v3/reference/events/patch
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleCalendarMeta } from "../service.js";

export const GOOGLE_CALENDAR_EVENT_UPDATE_KIND = "@particle-academy/google_calendar_event_update";
export const GOOGLE_CALENDAR_EVENT_UPDATE_OPERATION = "event_update";

export const GOOGLE_CALENDAR_EVENT_UPDATE_META = googleCalendarMeta("action", "update an event", "https://developers.google.com/workspace/calendar/api/v3/reference/events/patch");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_CALENDAR_EVENT_UPDATE_OUTPUT: OutputField[] = [
  {
    "path": "data.id",
    "type": "string",
    "description": "The event's id."
  },
  {
    "path": "data.status",
    "type": "string",
    "description": "The event's status after this update."
  },
  {
    "path": "data.summary",
    "type": "string",
    "description": "The event's title after this update."
  },
  {
    "path": "data.htmlLink",
    "type": "string",
    "description": "The event in the Google Calendar UI."
  },
  {
    "path": "data.start.dateTime",
    "type": "string",
    "description": "The event's start after this update."
  },
  {
    "path": "data.end.dateTime",
    "type": "string",
    "description": "The event's end after this update."
  },
  {
    "path": "data.updated",
    "type": "string",
    "description": "RFC 3339 last modification -- now."
  },
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against. Google has no sandbox, so: fake or live."
  }
];

export const googleCalendarEventUpdateKind: NodeKindDefinition = defineConnectorKind(GOOGLE_CALENDAR_EVENT_UPDATE_META, {
  name: GOOGLE_CALENDAR_EVENT_UPDATE_KIND,
  aliases: ["google_calendar_event_update"],
  label: "Update Google Calendar event",
  description: "Change one or more fields of an existing event. Only the fields provided are touched.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "idempotent",
  outputShape: GOOGLE_CALENDAR_EVENT_UPDATE_OUTPUT,
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
    },
    {
      "type": "text",
      "key": "summary",
      "label": "Title"
    },
    {
      "type": "textarea",
      "key": "description",
      "label": "Description"
    },
    {
      "type": "text",
      "key": "location",
      "label": "Location"
    },
    {
      "type": "text",
      "key": "startDateTime",
      "label": "Start",
      "description": "RFC 3339. Leave blank to leave the start time unchanged."
    },
    {
      "type": "text",
      "key": "startTimeZone",
      "label": "Start time zone"
    },
    {
      "type": "text",
      "key": "endDateTime",
      "label": "End",
      "description": "RFC 3339. Leave blank to leave the end time unchanged."
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
        },
        {
          "value": "cancelled",
          "label": "Cancelled"
        }
      ],
      "description": "Setting cancelled here has the same effect as event_delete -- offered because PATCH is also Google's documented way to cancel one instance of a recurring event, which event_delete (which removes the whole resource) cannot target."
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
      ]
    },
    {
      "type": "text",
      "key": "colorId",
      "label": "Color ID"
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_CALENDAR_EVENT_UPDATE_META, config as Record<string, unknown>, "update an event"),
});
