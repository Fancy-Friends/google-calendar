<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleCalendar\Actions;

use ParticleAcademy\GoogleCalendar\GoogleCalendar;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/event-list.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/event-list.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */
/**
 * List events from a Google Calendar, in full or incrementally with a sync
 * token.
 *
 * GET /calendar/v3/calendars/{calendarId}/events —
 * https://developers.google.com/workspace/calendar/api/v3/reference/events/list
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Google Calendar or calls the faker.
 */
final class EventList
{
    public const OPERATION = 'event_list';
    public const METHOD = 'GET';
    public const PATH = '/calendar/v3/calendars/{calendarId}/events';
    public const SIDE_EFFECTS = 'none';

    /**
     * Build the form body for one call.
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
            throw new ConnectorConfigException('event_list: "calendarId" is required (Calendar ID).');
        }

        $maxResults = $config['maxResults'] ?? null;
        if (($maxResults !== null && $maxResults !== '') && ! (is_numeric($maxResults) && (float) $maxResults === floor((float) $maxResults) && (float) $maxResults >= 1 && (float) $maxResults <= 2500)) {
            throw new ConnectorConfigException(
                'event_list: "maxResults" must be a integer, got '.json_encode($maxResults).'.'
            );
        }

        $body = [];

        $value = $config['syncToken'] ?? null;
        if ($value !== null && $value !== '') {
            $body['syncToken'] = (string) $value;
        }

        $value = $config['timeMin'] ?? null;
        if ($value !== null && $value !== '') {
            $body['timeMin'] = (string) $value;
        }

        $value = $config['timeMax'] ?? null;
        if ($value !== null && $value !== '') {
            $body['timeMax'] = (string) $value;
        }

        $value = $config['maxResults'] ?? null;
        $body['maxResults'] = ($value !== null && $value !== '') ? (int) $value : 250;

        $value = $config['pageToken'] ?? null;
        if ($value !== null && $value !== '') {
            $body['pageToken'] = (string) $value;
        }

        $value = $config['singleEvents'] ?? null;
        if ($value !== null && $value !== '') {
            $body['singleEvents'] = (bool) $value;
        }

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
        return '/calendar/v3/calendars/'.rawurlencode((string) ($config['calendarId'] ?? '')).'/events';
    }
}
