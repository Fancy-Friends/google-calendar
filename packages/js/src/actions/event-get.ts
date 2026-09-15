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
 * Read one event from a Google Calendar.
 *
 * GET /calendar/v3/calendars/{calendarId}/events/{eventId} —
 * https://developers.google.com/workspace/calendar/api/v3/reference/events/get
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

export const EVENT_GET_OPERATION = "event_get";

export type EventGetOptions = {
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

export async function googleCalendarEventGet(options: EventGetOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.calendarId === undefined || config.calendarId === null || config.calendarId === "") {
    throw new Error(`event_get: "calendarId" is required (Calendar ID).`);
  }

  if (config.eventId === undefined || config.eventId === null || config.eventId === "") {
    throw new Error(`event_get: "eventId" is required (Event ID).`);
  }

  return callConnector(GOOGLE_CALENDAR, {
    operation: EVENT_GET_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "GET",
      path: `/calendar/v3/calendars/${encodeURIComponent(String(config.calendarId))}/events/${encodeURIComponent(String(config.eventId))}`,
      query: {},
    },
  });
}
