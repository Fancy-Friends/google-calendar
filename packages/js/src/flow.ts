/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ + triggers/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ + triggers/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * Google Calendar's node kinds with their TypeScript executors attached — for
 * hosts that EXECUTE on TS.
 *
 * The authoring surface in @particle-academy/google-calendar-ui carries no
 * executor: the editor is React on every host, so a PHP or Python project
 * installs the ui package and never this one.
 */

import type { NodeExecutor, NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import {
  idempotencyKeyFor,
  NO_IDEMPOTENCY_KEY_WARNING,
  resolveConnection,
  triggerEvent,
  type RequestedMode,
} from "@particle-academy/fancy-connector-core";
import { GOOGLE_CALENDAR } from "./service.js";

import {
  googleCalendarChannelStopKind,
  googleCalendarChannelWatchKind,
  googleCalendarEventCreateKind,
  googleCalendarEventDeleteKind,
  googleCalendarEventGetKind,
  googleCalendarEventListKind,
  googleCalendarEventUpdateKind,
  googleCalendarEventsChangedTriggerKind,
} from "@particle-academy/google-calendar-ui";

import { googleCalendarChannelStop } from "./actions/channel-stop.js";
import { googleCalendarChannelWatch } from "./actions/channel-watch.js";
import { googleCalendarEventCreate } from "./actions/event-create.js";
import { googleCalendarEventDelete } from "./actions/event-delete.js";
import { googleCalendarEventGet } from "./actions/event-get.js";
import { googleCalendarEventList } from "./actions/event-list.js";
import { googleCalendarEventUpdate } from "./actions/event-update.js";
import { GOOGLE_CALENDAR_EVENTS_CHANGED } from "./triggers/events-changed.js";

export const googleCalendarChannelStopExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await googleCalendarChannelStop({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `google_calendar channel_stop ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const googleCalendarChannelWatchExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await googleCalendarChannelWatch({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `google_calendar channel_watch ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const googleCalendarEventCreateExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await googleCalendarEventCreate({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `google_calendar event_create ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const googleCalendarEventDeleteExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await googleCalendarEventDelete({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `google_calendar event_delete ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const googleCalendarEventGetExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await googleCalendarEventGet({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `google_calendar event_get ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const googleCalendarEventListExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await googleCalendarEventList({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `google_calendar event_list ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const googleCalendarEventUpdateExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await googleCalendarEventUpdate({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `google_calendar event_update ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const googleCalendarEventsChangedTriggerExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});
  const connection = resolveConnection({
    service: GOOGLE_CALENDAR.service,
    operation: "events_changed",
    sandbox: GOOGLE_CALENDAR.sandbox,
    baseUrls: GOOGLE_CALENDAR.baseUrls,
    requires: GOOGLE_CALENDAR.requires,
    connectionId: typeof config.connection === "string" ? config.connection : null,
    requested: typeof config.mode === "string" ? (config.mode as RequestedMode) : null,
  });

  const event = triggerEvent(GOOGLE_CALENDAR_EVENTS_CHANGED, connection, ctx.inputs?.in, config);

  return { __port: "out", value: event };
};

/** The kinds a TypeScript host registers. */
export const GOOGLE_CALENDAR_RUNNABLE_KINDS: NodeKindDefinition[] = [
  { ...googleCalendarChannelStopKind, executor: googleCalendarChannelStopExecutor },
  { ...googleCalendarChannelWatchKind, executor: googleCalendarChannelWatchExecutor },
  { ...googleCalendarEventCreateKind, executor: googleCalendarEventCreateExecutor },
  { ...googleCalendarEventDeleteKind, executor: googleCalendarEventDeleteExecutor },
  { ...googleCalendarEventGetKind, executor: googleCalendarEventGetExecutor },
  { ...googleCalendarEventListKind, executor: googleCalendarEventListExecutor },
  { ...googleCalendarEventUpdateKind, executor: googleCalendarEventUpdateExecutor },
  { ...googleCalendarEventsChangedTriggerKind, executor: googleCalendarEventsChangedTriggerExecutor },
];
