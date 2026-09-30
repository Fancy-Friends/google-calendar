<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleCalendar\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\GoogleCalendar\Actions\EventCreate;
use ParticleAcademy\GoogleCalendar\GoogleCalendar;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/event-create.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/event-create.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */
/**
 * Create Google Calendar event, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleCalendarEventCreateExecutor` in
 * @particle-academy/google-calendar-js: the same request, built from the
 * node's config by the same `Actions\EventCreate` a host would call directly,
 * and the same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Google Calendar. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/google_calendar_event_create',
    aliases: [
        'google_calendar_event_create',
    ],
    category: 'io',
    label: 'Create Google Calendar event',
    description: 'Create a timed event on a Google Calendar.',
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
    sideEffects: 'unsafe-to-replay',
    outputShape: [
        [
            'path' => 'data.id',
            'type' => 'string',
            'description' => 'The new event\'s id.',
        ],
        [
            'path' => 'data.status',
            'type' => 'string',
            'description' => 'confirmed or tentative, echoing what was sent (or Google\'s default).',
        ],
        [
            'path' => 'data.summary',
            'type' => 'string',
            'description' => 'Echoes what was sent.',
        ],
        [
            'path' => 'data.htmlLink',
            'type' => 'string',
            'description' => 'The event in the Google Calendar UI.',
        ],
        [
            'path' => 'data.start.dateTime',
            'type' => 'string',
            'description' => 'Echoes what was sent.',
        ],
        [
            'path' => 'data.end.dateTime',
            'type' => 'string',
            'description' => 'Echoes what was sent.',
        ],
        [
            'path' => 'data.created',
            'type' => 'string',
            'description' => 'RFC 3339 creation time.',
        ],
        [
            'path' => 'data.organizer.email',
            'type' => 'string',
            'description' => 'The connected account, almost always.',
        ],
        [
            'path' => 'mode',
            'type' => 'string',
            'description' => 'Which estate this ran against. Google has no sandbox, so: fake or live.',
        ],
    ],
)]
final class EventCreateExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            GoogleCalendar::descriptor(),
            EventCreate::OPERATION,
            $config,
            [
                'method' => EventCreate::METHOD,
                'path' => EventCreate::path($config),
                'json' => EventCreate::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'google_calendar event_create'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
