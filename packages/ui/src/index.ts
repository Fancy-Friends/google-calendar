/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * Google Calendar's node kinds for fancy-flow.
 *
 * Install this on every host. The TypeScript executors live in the js
 * package's `./flow` subpath; PHP and Python hosts run their own and need only
 * this.
 */

export * from "./service.js";
export * from "./kinds/channel-stop.js";
export * from "./kinds/channel-watch.js";
export * from "./kinds/event-get.js";
export * from "./kinds/event-list.js";
export * from "./kinds/events-changed.js";

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { googleCalendarChannelStopKind } from "./kinds/channel-stop.js";
import { googleCalendarChannelWatchKind } from "./kinds/channel-watch.js";
import { googleCalendarEventGetKind } from "./kinds/event-get.js";
import { googleCalendarEventListKind } from "./kinds/event-list.js";
import { googleCalendarEventsChangedTriggerKind } from "./kinds/events-changed.js";

/** Every Google Calendar kind, for a host that registers the lot. */
export const GOOGLE_CALENDAR_KINDS: NodeKindDefinition[] = [
  googleCalendarChannelStopKind,
  googleCalendarChannelWatchKind,
  googleCalendarEventGetKind,
  googleCalendarEventListKind,
  googleCalendarEventsChangedTriggerKind,
];
