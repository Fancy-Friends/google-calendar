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
 * Remove an event from a Google Calendar.
 *
 * DELETE /calendar/v3/calendars/{calendarId}/events/{eventId} —
 * https://developers.google.com/workspace/calendar/api/v3/reference/events/delete
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Google Calendar or calls the
 * faker.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { GOOGLE_CALENDAR } from "../service.js";

export const EVENT_DELETE_OPERATION = "event_delete";

export type EventDeleteOptions = {
  /** The node's resolved config. Keys: calendarId, eventId. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleCalendarEventDelete(options: EventDeleteOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.calendarId === undefined || config.calendarId === null || config.calendarId === "") {
    throw new Error(`event_delete: "calendarId" is required (Calendar ID).`);
  }

  if (config.eventId === undefined || config.eventId === null || config.eventId === "") {
    throw new Error(`event_delete: "eventId" is required (Event ID).`);
  }

  return callConnector(GOOGLE_CALENDAR, {
    operation: EVENT_DELETE_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "DELETE",
      path: `/calendar/v3/calendars/${encodeURIComponent(String(config.calendarId))}/events/${encodeURIComponent(String(config.eventId))}`,
      query: {},
    },
  });
}
