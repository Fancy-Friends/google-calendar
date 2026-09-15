# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/channel-watch.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/channel-watch.json (or weaver's template/) and regenerate:
#
# npm run provider -- google_calendar

"""Open a push-notification channel on a calendar's events. The host's
subscription machinery calls this; it is not a node most workflows need.

POST /calendar/v3/calendars/{calendarId}/events/watch —
https://developers.google.com/workspace/calendar/api/v3/reference/events/watch

This describes the request. `call` resolves the connection, picks the
estate, and either calls Google Calendar or calls the faker.
"""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "channel_watch"
METHOD = "POST"
PATH = "/calendar/v3/calendars/{calendarId}/events/watch"
SIDE_EFFECTS = "unsafe-to-replay"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if config.get("calendarId") is None or config.get("calendarId") == "":
        raise ConnectorConfigError(
            "channel_watch: \"calendarId\" is required (Calendar ID)."
        )

    if config.get("channelId") is None or config.get("channelId") == "":
        raise ConnectorConfigError(
            "channel_watch: \"channelId\" is required (Channel ID)."
        )

    if config.get("address") is None or config.get("address") == "":
        raise ConnectorConfigError(
            "channel_watch: \"address\" is required (Notification URL)."
        )

    if config.get("token") is None or config.get("token") == "":
        raise ConnectorConfigError(
            "channel_watch: \"token\" is required (Channel token)."
        )

    if config.get("ttlSeconds") is None or config.get("ttlSeconds") == "":
        raise ConnectorConfigError(
            "channel_watch: \"ttlSeconds\" is required (Lifetime (seconds))."
        )

    out: dict[str, Any] = {}
    _value = config.get("channelId")
    if _value is None or _value == "":
        raise ConnectorConfigError("channel_watch: \"channelId\" is required.")

    out["id"] = str(_value)
    _value = config.get("address")
    if _value is None or _value == "":
        raise ConnectorConfigError("channel_watch: \"address\" is required.")

    out["address"] = str(_value)
    _value = config.get("token")
    if _value is None or _value == "":
        raise ConnectorConfigError("channel_watch: \"token\" is required.")

    out["token"] = str(_value)
    _value = config.get("ttlSeconds")
    if _value is None or _value == "":
        raise ConnectorConfigError("channel_watch: \"ttlSeconds\" is required.")

    out["params.ttl"] = str(_value)

    out["type"] = "web_hook"
    return _nest_fields(out)



def path(config: dict[str, Any]) -> str:
    """The request path, with each config value URL-ENCODED into it.

    `PATH` above is the TEMPLATE, which is what the descriptor advertises;
    this is what a caller sends. A value interpolated raw changes WHICH URL is
    called — a range like `Sheet1!A:B`, or a sheet named `Q1/Q2` — and the
    provider answers 404 about the document rather than about the encoding.
    """
    return (
        "/calendar/v3/calendars/"
        + quote(str(config.get("calendarId") or ""), safe="")
        + "/events/watch"
    )

def channel_watch(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Open a push-notification channel on a calendar's events. The host's subscription machinery
    calls this; it is not a node most workflows need.
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



def _nest_fields(flat: dict[str, Any]) -> dict[str, Any]:
    """`{"properties.email": x}` -> `{"properties": {"email": x}}`.

    A dotted `as` means NESTING, and only a JSON body can nest -- in a form body
    that spelling already means a literal dotted key.
    """
    out: dict[str, Any] = {}

    for path, value in flat.items():
        parts = path.split(".")
        node = out

        for key in parts[:-1]:
            found = node.get(key)
            if not isinstance(found, dict):
                found = {}
                node[key] = found
            node = found

        node[parts[-1]] = value

    # The ROOT is always an object -- a JSON body's top level is never a list
    # -- so only its VALUES are converted. That also keeps the return type
    # honest: `_listify` returns Any, and returning it directly is a
    # no-any-return error under mypy --strict.
    return {key: _listify(value) for key, value in out.items()}


def _listify(node: Any) -> Any:
    """A mapping whose keys are 0, 1, 2 ... is an ARRAY, not an object.

    `dateRanges.0.startDate` has to become `[{...}]`. PHP produced the list by
    accident -- its integer-keyed arrays serialise as JSON arrays -- while
    TypeScript and Python produced `{"0": {...}}`, which the provider refuses
    as the wrong type. The parity suite is what caught the disagreement, and
    converting at the END keeps the walk above simple.
    """
    if not isinstance(node, dict):
        return node

    walked = {key: _listify(value) for key, value in node.items()}
    wanted = [str(index) for index in range(len(walked))]

    if walked and list(walked.keys()) == wanted:
        return [walked[key] for key in wanted]

    return walked