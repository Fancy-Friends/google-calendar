<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleCalendar\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use ParticleAcademy\Connectors\ConnectionHost;
use ParticleAcademy\Connectors\TriggerEvent;
use ParticleAcademy\GoogleCalendar\GoogleCalendar;
use ParticleAcademy\GoogleCalendar\Triggers\EventsChanged;

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
 * Google Calendar change, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleCalendarEventsChangedTriggerExecutor` in
 * @particle-academy/google-calendar-js. A webhook trigger never calls Google
 * Calendar: it republishes, on `out`, the delivery the HOST received and
 * verified at its own route. With nothing delivered, fake mode publishes the
 * faker's sample event, so a flow can be designed before the endpoint exists;
 * any other mode refuses, and says how to deliver one.
 */
#[FlowNode(
    name: '@particle-academy/google_calendar_events_changed_trigger',
    aliases: [
        'google_calendar_events_changed_trigger',
    ],
    category: 'trigger',
    label: 'Google Calendar change',
    description: 'Start a run when something changes on a watched Google Calendar.',
    icon: '📅',
    inputs: [],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'channelId',
            'type' => 'string',
            'description' => 'X-Goog-Channel-ID: which channel this came from.',
        ],
        [
            'path' => 'messageNumber',
            'type' => 'string',
            'description' => 'X-Goog-Message-Number: increases per channel; 1 is the sync message.',
        ],
        [
            'path' => 'resourceId',
            'type' => 'string',
            'description' => 'X-Goog-Resource-ID: the watched resource.',
        ],
        [
            'path' => 'resourceState',
            'type' => 'string',
            'description' => 'X-Goog-Resource-State: sync, exists or not_exists. `sync` carries no change.',
        ],
        [
            'path' => 'resourceUri',
            'type' => 'string',
            'description' => 'X-Goog-Resource-URI: the watched resource\'s URI.',
        ],
        [
            'path' => 'channelExpiration',
            'type' => 'string',
            'description' => 'X-Goog-Channel-Expiration, when Google sends it: the channel\'s expiry in a human-readable format, not an instant to compute with.',
        ],
    ],
)]
final class EventsChangedTriggerExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectionHost $host = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();
        $service = GoogleCalendar::descriptor();

        $connection = ($this->host ?? new ConnectionHost)->resolve(
            $service->service,
            EventsChanged::OPERATION,
            $config,
            $service->sandbox,
            $service->requires,
            $service->baseUrls,
        );

        $event = TriggerEvent::resolve(
            $service->service,
            EventsChanged::OPERATION,
            EventsChanged::DELIVERY,
            EventsChanged::SETUP,
            $service->faker,
            $connection,
            $ctx->input('in'),
            $config,
        );

        return Port::only('out', $event);
    }
}
