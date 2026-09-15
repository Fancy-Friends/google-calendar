<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleCalendar\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\GoogleCalendar\Actions\ChannelWatch;
use ParticleAcademy\GoogleCalendar\GoogleCalendar;

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
 * Google Calendar watch, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleCalendarChannelWatchExecutor` in
 * @particle-academy/google-calendar-js: the same request, built from the
 * node's config by the same `Actions\ChannelWatch` a host would call directly,
 * and the same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Google Calendar. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/google_calendar_channel_watch',
    aliases: [
        'google_calendar_channel_watch',
    ],
    category: 'io',
    label: 'Google Calendar watch',
    description: 'Open a push-notification channel on a calendar\'s events. The host\'s subscription machinery calls this; it is not a node most workflows need.',
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
            'description' => 'The channel id -- what was sent.',
        ],
        [
            'path' => 'data.resourceId',
            'type' => 'string',
            'description' => 'Google\'s opaque id for the watched resource. channel_stop needs it together with the channel id.',
        ],
        [
            'path' => 'data.resourceUri',
            'type' => 'string',
            'description' => 'The watched resource\'s URI.',
        ],
        [
            'path' => 'data.token',
            'type' => 'string',
            'description' => 'The token that will be echoed on every notification.',
        ],
        [
            'path' => 'data.expiration',
            'type' => 'string',
            'description' => 'When the channel expires, as epoch MILLISECONDS in a string. The subscription trigger\'s lease is built from this.',
        ],
        [
            'path' => 'mode',
            'type' => 'string',
            'description' => 'Which estate this ran against. Google has no sandbox, so: fake or live.',
        ],
    ],
)]
final class ChannelWatchExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            GoogleCalendar::descriptor(),
            ChannelWatch::OPERATION,
            $config,
            [
                'method' => ChannelWatch::METHOD,
                'path' => ChannelWatch::path($config),
                'json' => ChannelWatch::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'google_calendar channel_watch'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
