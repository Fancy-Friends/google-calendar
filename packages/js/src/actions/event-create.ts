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
 * Create a timed event on a Google Calendar.
 *
 * POST /calendar/v3/calendars/{calendarId}/events —
 * https://developers.google.com/workspace/calendar/api/v3/reference/events/insert
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Google Calendar or calls the
 * faker.
 *
 * sideEffects: unsafe-to-replay.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { GOOGLE_CALENDAR } from "../service.js";

export const EVENT_CREATE_OPERATION = "event_create";

export type EventCreateOptions = {
  /** The node's resolved config. Keys: calendarId, summary, description, location, startDateTime, startTimeZone, endDateTime, endTimeZone, status, visibility, transparency, colorId. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleCalendarEventCreate(options: EventCreateOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.calendarId === undefined || config.calendarId === null || config.calendarId === "") {
    throw new Error(`event_create: "calendarId" is required (Calendar ID).`);
  }

  if (config.summary === undefined || config.summary === null || config.summary === "") {
    throw new Error(`event_create: "summary" is required (Title).`);
  }

  if (config.startDateTime === undefined || config.startDateTime === null || config.startDateTime === "") {
    throw new Error(`event_create: "startDateTime" is required (Start).`);
  }

  if (config.endDateTime === undefined || config.endDateTime === null || config.endDateTime === "") {
    throw new Error(`event_create: "endDateTime" is required (End).`);
  }

  return callConnector(GOOGLE_CALENDAR, {
    operation: EVENT_CREATE_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: `/calendar/v3/calendars/${encodeURIComponent(String(config.calendarId))}/events`,
      json: nestFields({
        "summary": String(config.summary),
        ...(config.description !== undefined && config.description !== null && config.description !== "" ? { "description": String(config.description) } : {}),
        ...(config.location !== undefined && config.location !== null && config.location !== "" ? { "location": String(config.location) } : {}),
        "start.dateTime": String(config.startDateTime),
        ...(config.startTimeZone !== undefined && config.startTimeZone !== null && config.startTimeZone !== "" ? { "start.timeZone": String(config.startTimeZone) } : {}),
        "end.dateTime": String(config.endDateTime),
        ...(config.endTimeZone !== undefined && config.endTimeZone !== null && config.endTimeZone !== "" ? { "end.timeZone": String(config.endTimeZone) } : {}),
        ...(config.status !== undefined && config.status !== null && config.status !== "" ? { "status": String(config.status) } : {}),
        ...(config.visibility !== undefined && config.visibility !== null && config.visibility !== "" ? { "visibility": String(config.visibility) } : {}),
        ...(config.transparency !== undefined && config.transparency !== null && config.transparency !== "" ? { "transparency": String(config.transparency) } : {}),
        ...(config.colorId !== undefined && config.colorId !== null && config.colorId !== "" ? { "colorId": String(config.colorId) } : {}),
      }),
    },
  });
}

/**
 * `{"properties.email": x}` -> `{properties: {email: x}}`.
 *
 * A dotted `as` means NESTING, and only a JSON body can nest. The validator
 * refuses that spelling anywhere else, because in a form body it already means
 * something different — a literal dotted key.
 */
function nestFields(flat: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split(".");
    let node = out;

    while (parts.length > 1) {
      const key = parts.shift() as string;
      // A NUMERIC segment is an array index: `dateRanges.0.startDate` has to
      // become `[{startDate}]`, not `{"0": {startDate}}`. PHP produced the
      // array by accident (its integer-keyed arrays serialise as JSON lists)
      // and the other two produced an object, which the provider rejects as
      // the wrong type. The parity suite is what caught the disagreement.
      const wantsArray = /^\d+$/.test(parts[0] ?? "");

      if (typeof node[key] !== "object" || node[key] === null) node[key] = wantsArray ? [] : {};
      node = node[key] as Record<string, unknown>;
    }

    node[parts[0] as string] = value;
  }

  return out;
}
