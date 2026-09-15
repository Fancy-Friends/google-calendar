<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleCalendar\Actions;

use ParticleAcademy\GoogleCalendar\GoogleCalendar;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
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
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Google Calendar or calls the faker.
 */
final class ChannelStop
{
    public const OPERATION = 'channel_stop';
    public const METHOD = 'POST';
    public const PATH = '/calendar/v3/channels/stop';
    public const SIDE_EFFECTS = 'idempotent';

    /**
     * Build the JSON body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Google Calendar.
     *
     * @param array<string,mixed> $config
     * An EMPTY body is `{}`, not `[]` — and PHP cannot tell those apart, because
     * both are `array()` and `json_encode` picks the list. So an empty one is
     * returned as an object. TypeScript and Python have no such ambiguity, which
     * is why this is a difference only the byte-parity suite can see.
     *
     * @return array<string,mixed>|\stdClass
     */
    public static function body(array $config): array|\stdClass
    {
        if (($config['channelId'] ?? null) === null || ($config['channelId'] ?? null) === '') {
            throw new ConnectorConfigException('channel_stop: "channelId" is required (Channel ID).');
        }

        if (($config['resourceId'] ?? null) === null || ($config['resourceId'] ?? null) === '') {
            throw new ConnectorConfigException('channel_stop: "resourceId" is required (Resource ID).');
        }

        $body = [];

        $value = $config['channelId'] ?? null;
        $body['id'] = (string) $value;

        $value = $config['resourceId'] ?? null;
        $body['resourceId'] = (string) $value;

        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }
}
