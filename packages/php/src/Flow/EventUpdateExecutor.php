<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleCalendar\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\GoogleCalendar\Actions\EventUpdate;
use ParticleAcademy\GoogleCalendar\GoogleCalendar;

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
 * Update Google Calendar event, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleCalendarEventUpdateExecutor` in
 * @particle-academy/google-calendar-js: the same request, built from the
 * node's config by the same `Actions\EventUpdate` a host would call directly,
 * and the same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Google Calendar. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/google_calendar_event_update',
    aliases: [
        'google_calendar_event_update',
    ],
    category: 'io',
    label: 'Update Google Calendar event',
    description: 'Change one or more fields of an existing event. Only the fields provided are touched.',
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
    sideEffects: 'idempotent',
    outputShape: [
        [
            'path' => 'data.id',
            'type' => 'string',
            'description' => 'The event\'s id.',
        ],
        [
            'path' => 'data.status',
            'type' => 'string',
            'description' => 'The event\'s status after this update.',
        ],
        [
            'path' => 'data.summary',
            'type' => 'string',
            'description' => 'The event\'s title after this update.',
        ],
        [
            'path' => 'data.htmlLink',
            'type' => 'string',
            'description' => 'The event in the Google Calendar UI.',
        ],
        [
            'path' => 'data.start.dateTime',
            'type' => 'string',
            'description' => 'The event\'s start after this update.',
        ],
        [
            'path' => 'data.end.dateTime',
            'type' => 'string',
            'description' => 'The event\'s end after this update.',
        ],
        [
            'path' => 'data.updated',
            'type' => 'string',
            'description' => 'RFC 3339 last modification -- now.',
        ],
        [
            'path' => 'mode',
            'type' => 'string',
            'description' => 'Which estate this ran against. Google has no sandbox, so: fake or live.',
        ],
    ],
)]
final class EventUpdateExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            GoogleCalendar::descriptor(),
            EventUpdate::OPERATION,
            $config,
            [
                'method' => EventUpdate::METHOD,
                'path' => EventUpdate::path($config),
                'json' => EventUpdate::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'google_calendar event_update'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
