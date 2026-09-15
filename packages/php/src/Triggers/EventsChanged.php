<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleCalendar\Triggers;

use ParticleAcademy\Connectors\DeliveryMechanism;
use ParticleAcademy\Connectors\ExpiresAtUnit;
use ParticleAcademy\Connectors\LeaseDeclaration;
use ParticleAcademy\Connectors\WebhookVerifier;

/*
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
 * way a delivery is verified is a fact about GOOGLE CALENDAR. The twin of the
 * js package's trigger module.
 *
 * A SUBSCRIPTION: Google Calendar stops delivering unless somebody renews it,
 * forever, and if nobody does the workflow stops firing with no error
 * anywhere. `lease()` says where the expiry is read from and how early to
 * renew; the host builds the value with `SubscriptionLease::fromResponse()`
 * and runs ONE renewal scheduler for every expiring trigger.
 */
final class EventsChanged
{
    public const OPERATION = 'events_changed';
    public const DELIVERY = DeliveryMechanism::Subscription;

    public const SETUP = 'The host mints a UUID, calls channel_watch with it, its own URL for this trigger and the connection\'s channelToken, and stores the returned id, resourceId and expiration. Google cannot renew a channel: 86400 seconds before it expires the host calls channel_stop and then channel_watch again. A channel that lapsed is re-listed FIRST (event_list with the stored syncToken; a 410 means list in full) and then re-created, because notifications during the gap are gone. Google delivers with an EMPTY body: the host verifies X-Goog-Channel-Token against the connection\'s channelToken and injects the X-Goog-* headers as the event, camel-cased as below. The first message on a new channel is `sync` and carries no change.';

    /** How long Google Calendar keeps a subscription alive at most, in seconds. */
    public const SUBSCRIPTION_TTL = 604800;

    /** Which of this package's actions create, renew and stop the subscription. */
    public const CREATE_OPERATION = 'channel_watch';

    /** null: Google Calendar cannot renew a subscription — the host stops the old one, re-lists, and calls create again. */
    public const RENEW_OPERATION = null;

    public const STOP_OPERATION = 'channel_stop';

    /**
     * The lease this subscription carries: where the provider's expiry sits in the
     * `channel_watch` response (`expiration`, epoch-ms), how early the host
     * renews, and what it calls when the lease is due.
     */
    public static function lease(): LeaseDeclaration
    {
        return new LeaseDeclaration(
            'expiration',
            ExpiresAtUnit::EpochMs,
            86400,
            'channel_watch',
        );
    }

    /** Where Google Calendar echoes the token it was given when the subscription was created. */
    public const TOKEN_IN = 'header';

    /** The header carrying it. */
    public const TOKEN_NAME = 'X-Goog-Channel-Token';

    /** The credential holding the token. */
    public const SECRET_CREDENTIAL = 'channelToken';

    /**
     * Verify one inbound Google Calendar delivery.
     *
     * The host calls this BEFORE starting a run, with the body exactly as
     * received. The token is the connection's `channelToken`; `$now` is accepted
     * for symmetry with signed schemes and unused, because an echoed token carries
     * no timestamp.
     *
     * @param array<string,string|list<string>> $headers
     * @return array{ok: bool, reason: ?string}
     */
    public static function verifyDelivery(
        string $raw,
        array $headers,
        ?string $channelToken,
        ?int $now = null,
    ): array {
        unset($now);

        return WebhookVerifier::verifySharedToken(
            raw: $raw,
            headers: $headers,
            secret: $channelToken,
            in: self::TOKEN_IN,
            name: self::TOKEN_NAME,
        );
    }
}
