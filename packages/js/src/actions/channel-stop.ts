/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/channel-stop.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/channel-stop.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * Close a push-notification channel. The host's subscription machinery calls
 * this before re-creating a channel and when a trigger is removed.
 *
 * POST /calendar/v3/channels/stop —
 * https://developers.google.com/workspace/calendar/api/v3/reference/channels/stop
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

export const CHANNEL_STOP_OPERATION = "channel_stop";

export type ChannelStopOptions = {
  /** The node's resolved config. Keys: channelId, resourceId. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleCalendarChannelStop(options: ChannelStopOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.channelId === undefined || config.channelId === null || config.channelId === "") {
    throw new Error(`channel_stop: "channelId" is required (Channel ID).`);
  }

  if (config.resourceId === undefined || config.resourceId === null || config.resourceId === "") {
    throw new Error(`channel_stop: "resourceId" is required (Resource ID).`);
  }

  return callConnector(GOOGLE_CALENDAR, {
    operation: CHANNEL_STOP_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: "/calendar/v3/channels/stop",
      json: {
        "id": String(config.channelId),
        "resourceId": String(config.resourceId),
      },
    },
  });
}
