<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleCalendar\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\GoogleCalendar\Actions\ChannelStop;
use ParticleAcademy\GoogleCalendar\GoogleCalendar;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/channel-stop.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/channel-stop.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_calendar
 */
/**
 * Google Calendar stop watching, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleCalendarChannelStopExecutor` in
 * @particle-academy/google-calendar-js: the same request, built from the
 * node's config by the same `Actions\ChannelStop` a host would call directly,
 * and the same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Google Calendar. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/google_calendar_channel_stop',
    aliases: [
        'google_calendar_channel_stop',
    ],
    category: 'io',
    label: 'Google Calendar stop watching',
    description: 'Close a push-notification channel. The host\'s subscription machinery calls this before re-creating a channel and when a trigger is removed.',
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
            'path' => 'mode',
            'type' => 'string',
            'description' => 'Which estate this ran against. Google answers with an empty body, so this is the only thing published.',
        ],
    ],
)]
final class ChannelStopExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            GoogleCalendar::descriptor(),
            ChannelStop::OPERATION,
            $config,
            [
                'method' => ChannelStop::METHOD,
                'path' => ChannelStop::PATH,
                'json' => ChannelStop::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'google_calendar channel_stop'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
