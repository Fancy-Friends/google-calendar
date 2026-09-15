<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleCalendar;

use ParticleAcademy\Connectors\FakeRequest;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */
/**
 * The Google Calendar faker — the PHP twin of the js package's `src/faker.ts`.
 *
 * Bit-for-bit identical: the same FNV-1a seed and the same xorshift32
 * sequence, so a golden fixture asserts the exact faked payload and BOTH
 * runtimes have to produce it. That turns the faker into a parity test rather
 * than a convenience.
 */
final class GoogleCalendarFaker
{
    /** @param array<string,mixed> $request */
    public static function respond(string $operation, array $request): mixed
    {
        /** @var array<string,mixed> $config */
        $config = $request['config'] ?? [];
        /** @var FakeValuesLike $fake */
        $fake = $request['fake'];

        return match ($operation) {
            'channel_stop' => self::ChannelStop($config, $fake),
            'channel_watch' => self::ChannelWatch($config, $fake),
            'event_get' => self::EventGet($config, $fake),
            'event_list' => self::EventList($config, $fake),
            'events_changed' => self::EventsChanged($config, $fake),
            default => throw new \InvalidArgumentException(
                // A faker asked for an operation it has no shape for must SAY so.
                // Making something up would produce a green run whose output
                // silently has none of the fields the author is about to reference.
                'google_calendar: no fake response is defined for "'.$operation.'". '
                    .'Add a fixture under provider/fixtures/ and regenerate — a connector without a faker '
                    .'cannot be developed against, tested, or demonstrated.'
            ),
        };
    }

    /** @param array<string,mixed> $config */
    private static function ChannelStop(array $config, mixed $fake): array|\stdClass
    {
        return new \stdClass();
    }

    /** @param array<string,mixed> $config */
    private static function ChannelWatch(array $config, mixed $fake): array|\stdClass
    {
        $boundChannelid = ((($v = $config['channelId'] ?? null) !== null && $v !== '') ? (string) $v : $fake->hex(8).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(12));
        $boundToken = ((($v = $config['token'] ?? null) !== null && $v !== '') ? (string) $v : $fake->id('tok'));

        return [
        'kind' => 'api#channel',
        'id' => $boundChannelid,
        'resourceId' => $fake->id('o3hgv1538sdjfh'),
        'resourceUri' => 'https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json',
        'token' => $boundToken,
        'expiration' => '1789430400000',
    ];
    }

    /** @param array<string,mixed> $config */
    private static function EventGet(array $config, mixed $fake): array|\stdClass
    {
        $boundEventid = ((($v = $config['eventId'] ?? null) !== null && $v !== '') ? (string) $v : $fake->id('evt'));

        return [
        'kind' => 'calendar#event',
        'etag' => '"3456789012345678"',
        'id' => $boundEventid,
        'status' => 'confirmed',
        'htmlLink' => 'https://www.google.com/calendar/event?eid=ZmFrZQ',
        'created' => '2026-09-01T09:00:00.000Z',
        'updated' => '2026-09-10T15:30:00.000Z',
        'summary' => 'Design review',
        'description' => 'Quarterly design review with the platform team.',
        'creator' => [
            'email' => 'ada@example.test',
        ],
        'organizer' => [
            'email' => 'ada@example.test',
        ],
        'start' => [
            'dateTime' => '2026-09-22T14:00:00+00:00',
            'timeZone' => 'UTC',
        ],
        'end' => [
            'dateTime' => '2026-09-22T15:00:00+00:00',
            'timeZone' => 'UTC',
        ],
        'iCalUID' => $fake->hex(8).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(12),
        'sequence' => 0,
        'attendees' => [
            [
                'email' => 'ada@example.test',
                'organizer' => true,
                'responseStatus' => 'accepted',
            ],
            [
                'email' => 'grace@example.test',
                'responseStatus' => 'needsAction',
            ],
        ],
        'reminders' => [
            'useDefault' => true,
        ],
        'eventType' => 'default',
    ];
    }

    /** @param array<string,mixed> $config */
    private static function EventList(array $config, mixed $fake): array|\stdClass
    {
        return [
        'kind' => 'calendar#events',
        'etag' => '"p33cd9r3ab8ne20g"',
        'summary' => 'ada@example.test',
        'updated' => '2026-09-10T15:30:00.000Z',
        'timeZone' => 'UTC',
        'accessRole' => 'owner',
        'defaultReminders' => [
            [
                'method' => 'popup',
                'minutes' => 10,
            ],
        ],
        'nextSyncToken' => $fake->id('CPDSyncToken'),
        'items' => [
            [
                'kind' => 'calendar#event',
                'etag' => '"3456789012345678"',
                'id' => $fake->id('evt'),
                'status' => 'confirmed',
                'htmlLink' => 'https://www.google.com/calendar/event?eid=ZmFrZQ',
                'created' => '2026-09-01T09:00:00.000Z',
                'updated' => '2026-09-10T15:30:00.000Z',
                'summary' => 'Design review',
                'creator' => [
                    'email' => 'ada@example.test',
                ],
                'organizer' => [
                    'email' => 'ada@example.test',
                ],
                'start' => [
                    'dateTime' => '2026-09-22T14:00:00+00:00',
                    'timeZone' => 'UTC',
                ],
                'end' => [
                    'dateTime' => '2026-09-22T15:00:00+00:00',
                    'timeZone' => 'UTC',
                ],
                'iCalUID' => $fake->hex(8).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(12),
                'sequence' => 0,
                'reminders' => [
                    'useDefault' => true,
                ],
                'eventType' => 'default',
            ],
        ],
    ];
    }

    /** @param array<string,mixed> $config */
    private static function EventsChanged(array $config, mixed $fake): array|\stdClass
    {
        $boundChannelid = $fake->hex(8).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(12);

        return [
        'channelId' => $boundChannelid,
        'messageNumber' => '2',
        'resourceId' => $fake->id('o3hgv1538sdjfh'),
        'resourceState' => ((($v = $config['sample'] ?? null) !== null && $v !== '') ? (string) $v : 'exists'),
        'resourceUri' => 'https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json',
        'channelExpiration' => 'Tue, 15 Sep 2026 00:00:00 GMT',
    ];
    }
}
