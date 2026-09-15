<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleCalendar\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\GoogleCalendar\Actions\EventList;
use ParticleAcademy\GoogleCalendar\GoogleCalendar;

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
 * Google Calendar events, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleCalendarEventListExecutor` in
 * @particle-academy/google-calendar-js: the same request, built from the
 * node's config by the same `Actions\EventList` a host would call directly,
 * and the same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Google Calendar. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/google_calendar_event_list',
    aliases: [
        'google_calendar_event_list',
    ],
    category: 'io',
    label: 'Google Calendar events',
    description: 'List events from a Google Calendar, in full or incrementally with a sync token.',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'data.items',
            'type' => 'array',
            'description' => 'The events on this page, each shaped like event_get\'s output.',
        ],
        [
            'path' => 'data.nextPageToken',
            'type' => 'string',
            'description' => 'Present when there is another page.',
        ],
        [
            'path' => 'data.nextSyncToken',
            'type' => 'string',
            'description' => 'Present on the LAST page only. Store it and pass it as syncToken next time to get only what changed.',
        ],
        [
            'path' => 'data.updated',
            'type' => 'string',
            'description' => 'RFC 3339 last modification of the calendar.',
        ],
        [
            'path' => 'mode',
            'type' => 'string',
            'description' => 'Which estate this ran against. Google has no sandbox, so: fake or live.',
        ],
    ],
)]
final class EventListExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            GoogleCalendar::descriptor(),
            EventList::OPERATION,
            $config,
            [
                'method' => EventList::METHOD,
                'path' => EventList::path($config),
                'query' => EventList::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'google_calendar event_list'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
