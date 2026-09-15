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
 * Google Calendar, as one service descriptor shared by every Google Calendar
 * operation.
 *
 * @particle-academy/fancy-connector-core carries what is true of ALL
 * connectors. This carries what is true of Google Calendar: its base URL, its
 * auth scheme, its idempotency header, and its faker.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Google has no sandbox for Calendar. A test calendar is a real one in a real
 * account, so every watch and every read is real -- point this at a scratch
 * calendar, not a production one. The faker is the only way to develop against
 * it without touching an account.
 */

import type { ConnectorMode, PreparedRequest, ServiceDescriptor } from "@particle-academy/fancy-connector-core";

import { googleCalendarFaker } from "./faker.js";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported. An imported constant lets an upgrade rewrite the
 * very claim it exists to detect, after which the copy agrees with itself
 * forever.
 */
export const CONNECTOR_API_VERSION = 1;

export const GOOGLE_CALENDAR_BASE_URLS = {
  "live": "https://www.googleapis.com"
} as const;

/** Credential keys a remote call cannot proceed without. */
export const GOOGLE_CALENDAR_REQUIRES = [
  "accessToken",
  "refreshToken",
  "clientId",
  "clientSecret"
] as const;

/**
 * Apply Google Calendar's auth scheme to an outgoing request.
 *
 *
 *
 * The mode is passed in because for some providers auth and estate are the
 * same decision expressed in the URL; here it is unused, and saying so is
 * cheaper than wondering later whether it was forgotten.
 */
export function googleCalendarAuthorize(
  credentials: Record<string, string | undefined>,
  request: PreparedRequest,
  _mode: ConnectorMode,
): void {
  request.headers.Authorization = `Bearer ${credentials.accessToken ?? ""}`;
}

/** The Google Calendar service, for the TypeScript runtime. */
export const GOOGLE_CALENDAR: ServiceDescriptor = {
  service: "google_calendar",
  title: "Google Calendar",
  sandbox: "none",
  baseUrls: { ...GOOGLE_CALENDAR_BASE_URLS },
  requires: [...GOOGLE_CALENDAR_REQUIRES],
  authorize: googleCalendarAuthorize,
  faker: googleCalendarFaker,
};
