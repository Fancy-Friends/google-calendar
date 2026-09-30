# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/event-delete.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/event-delete.json (or weaver's template/) and regenerate:
#
# npm run provider -- google_calendar

"""Remove an event from a Google Calendar.

DELETE /calendar/v3/calendars/{calendarId}/events/{eventId} —
https://developers.google.com/workspace/calendar/api/v3/reference/events/delete

This describes the request. `call` resolves the connection, picks the
estate, and either calls Google Calendar or calls the faker.
"""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "event_delete"
METHOD = "DELETE"
PATH = "/calendar/v3/calendars/{calendarId}/events/{eventId}"
SIDE_EFFECTS = "idempotent"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the form body for one call, failing loudly and specifically."""
    if config.get("calendarId") is None or config.get("calendarId") == "":
        raise ConnectorConfigError(
            "event_delete: \"calendarId\" is required (Calendar ID)."
        )

    if config.get("eventId") is None or config.get("eventId") == "":
        raise ConnectorConfigError(
            "event_delete: \"eventId\" is required (Event ID)."
        )

    out: dict[str, Any] = {}

    return out



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
        + "/events/"
        + quote(str(config.get("eventId") or ""), safe="")
    )

def event_delete(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Remove an event from a Google Calendar."""
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        form=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
