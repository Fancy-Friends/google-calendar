/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/event-list.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/event-list.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * Google Calendar events — List events from a Google Calendar, in full or
 * incrementally with a sync token.
 *
 * https://developers.google.com/workspace/calendar/api/v3/reference/events/list
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleCalendarMeta } from "../service.js";

export const GOOGLE_CALENDAR_EVENT_LIST_KIND = "@particle-academy/google_calendar_event_list";
export const GOOGLE_CALENDAR_EVENT_LIST_OPERATION = "event_list";

export const GOOGLE_CALENDAR_EVENT_LIST_META = googleCalendarMeta("action", "list events", "https://developers.google.com/workspace/calendar/api/v3/reference/events/list");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_CALENDAR_EVENT_LIST_OUTPUT: OutputField[] = [
  {
    "path": "data.items",
    "type": "array",
    "description": "The events on this page, each shaped like event_get's output."
  },
  {
    "path": "data.nextPageToken",
    "type": "string",
    "description": "Present when there is another page."
  },
  {
    "path": "data.nextSyncToken",
    "type": "string",
    "description": "Present on the LAST page only. Store it and pass it as syncToken next time to get only what changed."
  },
  {
    "path": "data.updated",
    "type": "string",
    "description": "RFC 3339 last modification of the calendar."
  },
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against. Google has no sandbox, so: fake or live."
  }
];

export const googleCalendarEventListKind: NodeKindDefinition = defineConnectorKind(GOOGLE_CALENDAR_EVENT_LIST_META, {
  name: GOOGLE_CALENDAR_EVENT_LIST_KIND,
  aliases: ["google_calendar_event_list"],
  label: "Google Calendar events",
  description: "List events from a Google Calendar, in full or incrementally with a sync token.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: GOOGLE_CALENDAR_EVENT_LIST_OUTPUT,
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
      "key": "syncToken",
      "label": "Sync token",
      "description": "From a previous list's nextSyncToken. With one set, Google returns ONLY what changed since -- including deletions, as cancelled events. Leave blank for a full list."
    },
    {
      "type": "text",
      "key": "timeMin",
      "label": "From",
      "description": "RFC 3339 lower bound on an event's END time, e.g. 2026-09-15T00:00:00Z. Not allowed together with a sync token."
    },
    {
      "type": "text",
      "key": "timeMax",
      "label": "To",
      "description": "RFC 3339 upper bound on an event's START time. Not allowed together with a sync token."
    },
    {
      "type": "number",
      "key": "maxResults",
      "label": "Page size",
      "min": 1,
      "max": 2500,
      "default": 250,
      "description": "Events per page. Google's default is 250 and its maximum 2500; a nextPageToken means there are more."
    },
    {
      "type": "text",
      "key": "pageToken",
      "label": "Page token",
      "description": "From a previous page's nextPageToken."
    },
    {
      "type": "switch",
      "key": "singleEvents",
      "label": "Expand recurring events",
      "default": true,
      "description": "Return each occurrence of a recurring event as its own item, rather than the series once."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_CALENDAR_EVENT_LIST_META, config as Record<string, unknown>, "list events"),
});
