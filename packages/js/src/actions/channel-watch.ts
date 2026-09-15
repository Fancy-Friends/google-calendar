/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/channel-watch.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/channel-watch.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * Open a push-notification channel on a calendar's events. The host's
 * subscription machinery calls this; it is not a node most workflows need.
 *
 * POST /calendar/v3/calendars/{calendarId}/events/watch —
 * https://developers.google.com/workspace/calendar/api/v3/reference/events/watch
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

export const CHANNEL_WATCH_OPERATION = "channel_watch";

export type ChannelWatchOptions = {
  /** The node's resolved config. Keys: calendarId, channelId, address, token, ttlSeconds. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleCalendarChannelWatch(options: ChannelWatchOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.calendarId === undefined || config.calendarId === null || config.calendarId === "") {
    throw new Error(`channel_watch: "calendarId" is required (Calendar ID).`);
  }

  if (config.channelId === undefined || config.channelId === null || config.channelId === "") {
    throw new Error(`channel_watch: "channelId" is required (Channel ID).`);
  }

  if (config.address === undefined || config.address === null || config.address === "") {
    throw new Error(`channel_watch: "address" is required (Notification URL).`);
  }

  if (config.token === undefined || config.token === null || config.token === "") {
    throw new Error(`channel_watch: "token" is required (Channel token).`);
  }

  if (config.ttlSeconds === undefined || config.ttlSeconds === null || config.ttlSeconds === "") {
    throw new Error(`channel_watch: "ttlSeconds" is required (Lifetime (seconds)).`);
  }

  return callConnector(GOOGLE_CALENDAR, {
    operation: CHANNEL_WATCH_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: `/calendar/v3/calendars/${encodeURIComponent(String(config.calendarId))}/events/watch`,
      json: nestFields({
        "id": String(config.channelId),
        "address": String(config.address),
        "token": String(config.token),
        "params.ttl": String(config.ttlSeconds),
        "type": "web_hook",
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
