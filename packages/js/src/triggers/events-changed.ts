/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/triggers/events-changed.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/triggers/events-changed.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */

/**
 * Google Calendar's subscription trigger — the delivery contract.
 *
 * Kept beside the service descriptor rather than inside a node, because the
 * way a delivery is verified is a fact about GOOGLE CALENDAR. Two Google
 * Calendar triggers must not be able to disagree about how a delivery is
 * verified.
 *
 * A SUBSCRIPTION: Google Calendar stops delivering unless somebody renews it,
 * forever, and if nobody does the workflow stops firing with no error
 * anywhere. The lease below says where the expiry is read from and how early
 * to renew; the host runs ONE renewal scheduler for every expiring trigger.
 */

import { verifyDelivery, type InboundDelivery, type LeaseDeclaration, type SharedTokenScheme, type TriggerDescriptor, type WebhookVerification } from "@particle-academy/fancy-connector-core";
import { googleCalendarFaker } from "../faker.js";

/** Where Google Calendar echoes the token it was given when the subscription was created. */
export const GOOGLE_CALENDAR_EVENTS_CHANGED_TOKEN_SCHEME: SharedTokenScheme = { kind: "shared-token", in: "header", name: "X-Goog-Channel-Token" };

/**
 * The lease this subscription carries: where the provider's expiry sits in the
 * `channel_watch` response (`expiration`, epoch-ms), how early the host
 * renews, and what it calls when the lease is due — the create again, because
 * Google Calendar cannot renew. The host builds the value with the core's
 * `leaseFromResponse` and runs one scheduler for every expiring trigger.
 */
export const GOOGLE_CALENDAR_EVENTS_CHANGED_LEASE: LeaseDeclaration = {
  expiresAtFrom: "expiration",
  expiresAtUnit: "epoch-ms",
  renewBeforeSeconds: 86400,
  renewOperation: "channel_watch",
};

/**
 * Which of this package's actions create, renew and stop the subscription.
 * `renew` is null where the provider cannot renew and the host calls create
 * again — after stopping the old one, and after re-listing, because
 * notifications during the gap are gone.
 */
export const GOOGLE_CALENDAR_EVENTS_CHANGED_SUBSCRIPTION = { create: "channel_watch", renew: null, stop: "channel_stop" } as const;

export const GOOGLE_CALENDAR_EVENTS_CHANGED: TriggerDescriptor = {
  service: "google_calendar",
  operation: "events_changed",
  delivery: "subscription",
  setup:
    "The host mints a UUID, calls channel_watch with it, its own URL for this trigger and the connection's channelToken, and stores the returned id, resourceId and expiration. Google cannot renew a channel: 86400 seconds before it expires the host calls channel_stop and then channel_watch again. A channel that lapsed is re-listed FIRST (event_list with the stored syncToken; a 410 means list in full) and then re-created, because notifications during the gap are gone. Google delivers with an EMPTY body: the host verifies X-Goog-Channel-Token against the connection's channelToken and injects the X-Goog-* headers as the event, camel-cased as below. The first message on a new channel is `sync` and carries no change.",
  subscriptionTtl: 604800,
  lease: GOOGLE_CALENDAR_EVENTS_CHANGED_LEASE,
  verification: {
    scheme: GOOGLE_CALENDAR_EVENTS_CHANGED_TOKEN_SCHEME,
  },
  faker: googleCalendarFaker,
};

/**
 * Verify one inbound Google Calendar delivery.
 *
 * The host calls this BEFORE starting a run, with the body exactly as
 * received. Re-serialised JSON changes key order and whitespace, and produces
 * a mismatch that looks precisely like a wrong secret — hours of debugging the
 * wrong thing.
 *
 * The secret is the connection's `channelToken`.
 */
export function verifyGoogleCalendarDelivery(
  delivery: InboundDelivery,
  channelToken: string | undefined,
  now?: number,
): Promise<WebhookVerification> {
  return verifyDelivery(GOOGLE_CALENDAR_EVENTS_CHANGED, delivery, channelToken, now);
}
