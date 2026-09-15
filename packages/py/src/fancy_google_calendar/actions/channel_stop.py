# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/channel-stop.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/channel-stop.json (or weaver's template/) and regenerate:
#
# npm run provider -- google_calendar

"""Close a push-notification channel. The host's subscription machinery calls
this before re-creating a channel and when a trigger is removed.

POST /calendar/v3/channels/stop —
https://developers.google.com/workspace/calendar/api/v3/reference/channels/stop

This describes the request. `call` resolves the connection, picks the
estate, and either calls Google Calendar or calls the faker.
"""

from __future__ import annotations

from typing import Any

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "channel_stop"
METHOD = "POST"
PATH = "/calendar/v3/channels/stop"
SIDE_EFFECTS = "idempotent"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if config.get("channelId") is None or config.get("channelId") == "":
        raise ConnectorConfigError(
            "channel_stop: \"channelId\" is required (Channel ID)."
        )

    if config.get("resourceId") is None or config.get("resourceId") == "":
        raise ConnectorConfigError(
            "channel_stop: \"resourceId\" is required (Resource ID)."
        )

    out: dict[str, Any] = {}
    _value = config.get("channelId")
    if _value is None or _value == "":
        raise ConnectorConfigError("channel_stop: \"channelId\" is required.")

    out["id"] = str(_value)
    _value = config.get("resourceId")
    if _value is None or _value == "":
        raise ConnectorConfigError("channel_stop: \"resourceId\" is required.")

    out["resourceId"] = str(_value)

    return out


def channel_stop(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Close a push-notification channel. The host's subscription machinery calls this before
    re-creating a channel and when a trigger is removed.
    """
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        json_body=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
