# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- google_calendar

"""The Google Calendar faker.

Bit-for-bit identical to the TypeScript and PHP fakers: the same FNV-1a seed
and the same xorshift32 sequence, so a golden fixture asserts the exact
faked payload and ALL THREE runtimes have to produce it. That turns the
faker into a parity test rather than a convenience — which matters, because
cross-runtime drift does not fail loudly. It completes, down one path, with
no error.
"""

from __future__ import annotations

from typing import Any

from ._fake import FakeValues


def _channel_stop(config: dict[str, Any], fake: FakeValues) -> Any:
    return {}


def _channel_watch(config: dict[str, Any], fake: FakeValues) -> Any:
    bound_channelid = (
        str(_v)
        if (_v := config.get("channelId")) is not None and _v != ""
        else "-".join([fake.hex(8), fake.hex(4), fake.hex(4), fake.hex(4), fake.hex(12)])
    )
    bound_token = (
        str(_v)
        if (_v := config.get("token")) is not None and _v != ""
        else fake.id("tok")
    )

    return {
        "kind": "api#channel",
        "id": bound_channelid,
        "resourceId": fake.id("o3hgv1538sdjfh"),
        "resourceUri": "https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json",
        "token": bound_token,
        "expiration": "1789430400000",
    }


def _event_get(config: dict[str, Any], fake: FakeValues) -> Any:
    bound_eventid = (
        str(_v)
        if (_v := config.get("eventId")) is not None and _v != ""
        else fake.id("evt")
    )

    return {
        "kind": "calendar#event",
        "etag": "\"3456789012345678\"",
        "id": bound_eventid,
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=ZmFrZQ",
        "created": "2026-09-01T09:00:00.000Z",
        "updated": "2026-09-10T15:30:00.000Z",
        "summary": "Design review",
        "description": "Quarterly design review with the platform team.",
        "creator": {
            "email": "ada@example.test",
        },
        "organizer": {
            "email": "ada@example.test",
        },
        "start": {
            "dateTime": "2026-09-22T14:00:00+00:00",
            "timeZone": "UTC",
        },
        "end": {
            "dateTime": "2026-09-22T15:00:00+00:00",
            "timeZone": "UTC",
        },
        "iCalUID": "-".join([fake.hex(8), fake.hex(4), fake.hex(4), fake.hex(4), fake.hex(12)]),
        "sequence": 0,
        "attendees": [
            {
                "email": "ada@example.test",
                "organizer": True,
                "responseStatus": "accepted",
            },
            {
                "email": "grace@example.test",
                "responseStatus": "needsAction",
            },
        ],
        "reminders": {
            "useDefault": True,
        },
        "eventType": "default",
    }


def _event_list(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "kind": "calendar#events",
        "etag": "\"p33cd9r3ab8ne20g\"",
        "summary": "ada@example.test",
        "updated": "2026-09-10T15:30:00.000Z",
        "timeZone": "UTC",
        "accessRole": "owner",
        "defaultReminders": [
            {
                "method": "popup",
                "minutes": 10,
            },
        ],
        "nextSyncToken": fake.id("CPDSyncToken"),
        "items": [
            {
                "kind": "calendar#event",
                "etag": "\"3456789012345678\"",
                "id": fake.id("evt"),
                "status": "confirmed",
                "htmlLink": "https://www.google.com/calendar/event?eid=ZmFrZQ",
                "created": "2026-09-01T09:00:00.000Z",
                "updated": "2026-09-10T15:30:00.000Z",
                "summary": "Design review",
                "creator": {
                    "email": "ada@example.test",
                },
                "organizer": {
                    "email": "ada@example.test",
                },
                "start": {
                    "dateTime": "2026-09-22T14:00:00+00:00",
                    "timeZone": "UTC",
                },
                "end": {
                    "dateTime": "2026-09-22T15:00:00+00:00",
                    "timeZone": "UTC",
                },
                "iCalUID": "-".join(
                    [fake.hex(8), fake.hex(4), fake.hex(4), fake.hex(4), fake.hex(12)]
                ),
                "sequence": 0,
                "reminders": {
                    "useDefault": True,
                },
                "eventType": "default",
            },
        ],
    }


def _events_changed(config: dict[str, Any], fake: FakeValues) -> Any:
    bound_channelid = "-".join(
        [fake.hex(8), fake.hex(4), fake.hex(4), fake.hex(4), fake.hex(12)]
    )

    return {
        "channelId": bound_channelid,
        "messageNumber": "2",
        "resourceId": fake.id("o3hgv1538sdjfh"),
        "resourceState": (
            str(_v)
            if (_v := config.get("sample")) is not None and _v != ""
            else "exists"
        ),
        "resourceUri": "https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json",
        "channelExpiration": "Tue, 15 Sep 2026 00:00:00 GMT",
    }


def respond(operation: str, request: dict[str, Any]) -> Any:
    """Dispatch to the fixture for one operation."""
    config: dict[str, Any] = request.get("config") or {}
    fake: FakeValues = request["fake"]

    if operation == "channel_stop":
        return _channel_stop(config, fake)

    if operation == "channel_watch":
        return _channel_watch(config, fake)

    if operation == "event_get":
        return _event_get(config, fake)

    if operation == "event_list":
        return _event_list(config, fake)

    if operation == "events_changed":
        return _events_changed(config, fake)

    # A faker asked for an operation it has no shape for must SAY so. Making
    # something up would produce a green run whose output silently has none of
    # the fields the author is about to reference.
    raise ValueError(
        f'google_calendar: no fake response is defined for "{operation}". '
        "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker "
        "cannot be developed against, tested, or demonstrated."
    )
