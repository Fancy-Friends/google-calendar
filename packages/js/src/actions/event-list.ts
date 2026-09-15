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
 * List events from a Google Calendar, in full or incrementally with a sync
 * token.
 *
 * GET /calendar/v3/calendars/{calendarId}/events —
 * https://developers.google.com/workspace/calendar/api/v3/reference/events/list
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

export const EVENT_LIST_OPERATION = "event_list";

export type EventListOptions = {
  /** The node's resolved config. Keys: calendarId, syncToken, timeMin, timeMax, maxResults, pageToken, singleEvents. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleCalendarEventList(options: EventListOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.calendarId === undefined || config.calendarId === null || config.calendarId === "") {
    throw new Error(`event_list: "calendarId" is required (Calendar ID).`);
  }

  {
    const n = Number(config.maxResults);
    const given = config.maxResults !== undefined && config.maxResults !== null && config.maxResults !== "";
    if (given && !(Number.isInteger(n) && n >= 1 && n <= 2500)) {
      throw new Error(
        `event_list: "maxResults" must be a integer, got ${JSON.stringify(config.maxResults)}.`,
      );
    }
  }

  return callConnector(GOOGLE_CALENDAR, {
    operation: EVENT_LIST_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "GET",
      path: `/calendar/v3/calendars/${encodeURIComponent(String(config.calendarId))}/events`,
      query: {
        ...(config.syncToken !== undefined && config.syncToken !== null && config.syncToken !== "" ? { "syncToken": String(config.syncToken) } : {}),
        ...(config.timeMin !== undefined && config.timeMin !== null && config.timeMin !== "" ? { "timeMin": String(config.timeMin) } : {}),
        ...(config.timeMax !== undefined && config.timeMax !== null && config.timeMax !== "" ? { "timeMax": String(config.timeMax) } : {}),
        "maxResults": config.maxResults !== undefined && config.maxResults !== null && config.maxResults !== "" ? Math.trunc(Number(config.maxResults)) : 250,
        ...(config.pageToken !== undefined && config.pageToken !== null && config.pageToken !== "" ? { "pageToken": String(config.pageToken) } : {}),
        ...(config.singleEvents !== undefined && config.singleEvents !== null && config.singleEvents !== "" ? { "singleEvents": Boolean(config.singleEvents) } : {}),
      },
    },
  });
}
