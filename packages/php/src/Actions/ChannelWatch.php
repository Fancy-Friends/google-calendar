<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleCalendar\Actions;

use ParticleAcademy\GoogleCalendar\GoogleCalendar;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
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
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Google Calendar or calls the faker.
 */
final class ChannelWatch
{
    public const OPERATION = 'channel_watch';
    public const METHOD = 'POST';
    public const PATH = '/calendar/v3/calendars/{calendarId}/events/watch';
    public const SIDE_EFFECTS = 'unsafe-to-replay';

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
        if (($config['calendarId'] ?? null) === null || ($config['calendarId'] ?? null) === '') {
            throw new ConnectorConfigException('channel_watch: "calendarId" is required (Calendar ID).');
        }

        if (($config['channelId'] ?? null) === null || ($config['channelId'] ?? null) === '') {
            throw new ConnectorConfigException('channel_watch: "channelId" is required (Channel ID).');
        }

        if (($config['address'] ?? null) === null || ($config['address'] ?? null) === '') {
            throw new ConnectorConfigException('channel_watch: "address" is required (Notification URL).');
        }

        if (($config['token'] ?? null) === null || ($config['token'] ?? null) === '') {
            throw new ConnectorConfigException('channel_watch: "token" is required (Channel token).');
        }

        if (($config['ttlSeconds'] ?? null) === null || ($config['ttlSeconds'] ?? null) === '') {
            throw new ConnectorConfigException('channel_watch: "ttlSeconds" is required (Lifetime (seconds)).');
        }

        $body = [];

        $value = $config['channelId'] ?? null;
        $body['id'] = (string) $value;

        $value = $config['address'] ?? null;
        $body['address'] = (string) $value;

        $value = $config['token'] ?? null;
        $body['token'] = (string) $value;

        $value = $config['ttlSeconds'] ?? null;
        $body['params.ttl'] = (string) $value;

        $body['type'] = 'web_hook';

        $body = self::nestFields($body);
        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }

    /**
     * The request path, with each config value URL-ENCODED into it.
     *
     * `PATH` above is the TEMPLATE, which is what the descriptor advertises;
     * this is what a caller sends. A value interpolated raw changes which URL
     * is called — a range like `Sheet1!A:B` or a sheet named `Q1/Q2` — and the
     * provider answers 404 about the document rather than about the encoding.
     *
     * @param array<string,mixed> $config
     */
    public static function path(array $config): string
    {
        return '/calendar/v3/calendars/'.rawurlencode((string) ($config['calendarId'] ?? '')).'/events/watch';
    }

    /**
     * `['properties.email' => x]` -> `['properties' => ['email' => x]]`.
     *
     * A dotted `as` means NESTING, and only a JSON body can nest — in a form
     * body that spelling already means a literal dotted key.
     *
     * @param  array<string,mixed>  $flat
     * @return array<string,mixed>
     */
    private static function nestFields(array $flat): array
    {
        $out = [];

        foreach ($flat as $path => $value) {
            $parts = explode('.', (string) $path);
            $node = &$out;

            while (count($parts) > 1) {
                $key = array_shift($parts);

                if (! isset($node[$key]) || ! is_array($node[$key])) {
                    $node[$key] = [];
                }

                $node = &$node[$key];
            }

            $node[$parts[0]] = $value;
            unset($node);
        }

        return $out;
    }
}
