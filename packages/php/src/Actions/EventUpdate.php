<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleCalendar\Actions;

use ParticleAcademy\GoogleCalendar\GoogleCalendar;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/event-update.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/event-update.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */
/**
 * Change one or more fields of an existing event. Only the fields provided are
 * touched.
 *
 * PATCH /calendar/v3/calendars/{calendarId}/events/{eventId} —
 * https://developers.google.com/workspace/calendar/api/v3/reference/events/patch
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Google Calendar or calls the faker.
 */
final class EventUpdate
{
    public const OPERATION = 'event_update';
    public const METHOD = 'PATCH';
    public const PATH = '/calendar/v3/calendars/{calendarId}/events/{eventId}';
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
        if (($config['calendarId'] ?? null) === null || ($config['calendarId'] ?? null) === '') {
            throw new ConnectorConfigException('event_update: "calendarId" is required (Calendar ID).');
        }

        if (($config['eventId'] ?? null) === null || ($config['eventId'] ?? null) === '') {
            throw new ConnectorConfigException('event_update: "eventId" is required (Event ID).');
        }

        $body = [];

        $value = $config['summary'] ?? null;
        if ($value !== null && $value !== '') {
            $body['summary'] = (string) $value;
        }

        $value = $config['description'] ?? null;
        if ($value !== null && $value !== '') {
            $body['description'] = (string) $value;
        }

        $value = $config['location'] ?? null;
        if ($value !== null && $value !== '') {
            $body['location'] = (string) $value;
        }

        $value = $config['startDateTime'] ?? null;
        if ($value !== null && $value !== '') {
            $body['start.dateTime'] = (string) $value;
        }

        $value = $config['startTimeZone'] ?? null;
        if ($value !== null && $value !== '') {
            $body['start.timeZone'] = (string) $value;
        }

        $value = $config['endDateTime'] ?? null;
        if ($value !== null && $value !== '') {
            $body['end.dateTime'] = (string) $value;
        }

        $value = $config['endTimeZone'] ?? null;
        if ($value !== null && $value !== '') {
            $body['end.timeZone'] = (string) $value;
        }

        $value = $config['status'] ?? null;
        if ($value !== null && $value !== '') {
            $body['status'] = (string) $value;
        }

        $value = $config['visibility'] ?? null;
        if ($value !== null && $value !== '') {
            $body['visibility'] = (string) $value;
        }

        $value = $config['transparency'] ?? null;
        if ($value !== null && $value !== '') {
            $body['transparency'] = (string) $value;
        }

        $value = $config['colorId'] ?? null;
        if ($value !== null && $value !== '') {
            $body['colorId'] = (string) $value;
        }

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
        return '/calendar/v3/calendars/'.rawurlencode((string) ($config['calendarId'] ?? '')).'/events/'.rawurlencode((string) ($config['eventId'] ?? ''));
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
