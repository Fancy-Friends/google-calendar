<?php

declare(strict_types=1);

/*
 * Google Calendar — the published Composer package.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

$autoload = getcwd().'/vendor/autoload.php';

if (! is_file($autoload)) {
    fwrite(STDERR, 'No vendor/autoload.php in '.getcwd().PHP_EOL);
    fwrite(STDERR, 'Run this from a project that has composer-required the published package:'.PHP_EOL);
    fwrite(STDERR, '    composer require particle-academy/google-calendar-php'.PHP_EOL);
    exit(2);
}

require $autoload;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\GoogleCalendar\GoogleCalendarFaker;

$goldens = [
    [
        'operation' => 'channel_stop',
        'config' => [],
        'expected' => [],
    ],
    [
        'operation' => 'channel_watch',
        'config' => [],
        'expected' => [
            'kind' => 'api#channel',
            'id' => 'c33d4f8c-3353-b37e-38bf-ac0aac4fc9e5',
            'resourceId' => 'o3hgv1538sdjfh_fake_2d713802445e',
            'resourceUri' => 'https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json',
            'token' => 'tok_fake_d45622a81066',
            'expiration' => '1789430400000',
        ],
    ],
    [
        'operation' => 'event_get',
        'config' => [],
        'expected' => [
            'kind' => 'calendar#event',
            'etag' => '"3456789012345678"',
            'id' => 'evt_fake_a9fbf7b336b2',
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
            'iCalUID' => '45fc2ac5-d439-85d2-2ca1-a7f84829715a',
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
        ],
    ],
    [
        'operation' => 'event_list',
        'config' => [],
        'expected' => [
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
            'nextSyncToken' => 'CPDSyncToken_fake_73f7f893105e',
            'items' => [
                [
                    'kind' => 'calendar#event',
                    'etag' => '"3456789012345678"',
                    'id' => 'evt_fake_d0cf12826176',
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
                    'iCalUID' => '4043fff0-c801-6337-563d-f5d3584545ad',
                    'sequence' => 0,
                    'reminders' => [
                        'useDefault' => true,
                    ],
                    'eventType' => 'default',
                ],
            ],
        ],
    ],
    [
        'operation' => 'events_changed',
        'config' => [
            'sample' => 'exists',
        ],
        'expected' => [
            'channelId' => 'bffaab9c-bba2-8827-98d5-9f56e6c2325e',
            'messageNumber' => '2',
            'resourceId' => 'o3hgv1538sdjfh_fake_2bfda6f07b5e',
            'resourceState' => 'exists',
            'resourceUri' => 'https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json',
            'channelExpiration' => 'Tue, 15 Sep 2026 00:00:00 GMT',
        ],
    ],
];

foreach ($goldens as $golden) {
    $operation = $golden['operation'];
    $config = $golden['config'];

    $fake = new FakeValues(FakeValues::seedForCall('google_calendar', $operation, $config));
    $faked = GoogleCalendarFaker::respond($operation, ['config' => $config, 'fake' => $fake]);

    if ($faked !== $golden['expected']) {
        fwrite(STDERR, "the PUBLISHED package produced different bytes for {$operation}\n");
        fwrite(STDERR, '  got:      '.json_encode($faked)."\n");
        fwrite(STDERR, '  expected: '.json_encode($golden['expected'])."\n");
        exit(1);
    }

    echo "  ok   {$operation}\n";
}

echo "\n  ".count($goldens)." operations verified against the published package.\n";
