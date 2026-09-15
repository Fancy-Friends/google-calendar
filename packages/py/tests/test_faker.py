# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- google_calendar

"""The golden fixtures — the SAME values the TypeScript and PHP packages
assert.

Bit-for-bit identical is the claim, and this is what checks it for Python.
Cross-runtime drift does not fail loudly on its own: it completes, down one
path, with no error.
"""

import pytest

from fancy_google_calendar._fake import FakeValues, seed_for_call
from fancy_google_calendar.faker import respond


def test_channel_stop_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("google_calendar", "channel_stop", config))

    faked = respond("channel_stop", {"config": config, "fake": fake})

    assert faked == {}


def test_channel_watch_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("google_calendar", "channel_watch", config))

    faked = respond("channel_watch", {"config": config, "fake": fake})

    assert faked == {
        "kind": "api#channel",
        "id": "c33d4f8c-3353-b37e-38bf-ac0aac4fc9e5",
        "resourceId": "o3hgv1538sdjfh_fake_2d713802445e",
        "resourceUri": "https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json",
        "token": "tok_fake_d45622a81066",
        "expiration": "1789430400000",
    }


def test_event_get_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("google_calendar", "event_get", config))

    faked = respond("event_get", {"config": config, "fake": fake})

    assert faked == {
        "kind": "calendar#event",
        "etag": "\"3456789012345678\"",
        "id": "evt_fake_a9fbf7b336b2",
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
        "iCalUID": "45fc2ac5-d439-85d2-2ca1-a7f84829715a",
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


def test_event_list_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("google_calendar", "event_list", config))

    faked = respond("event_list", {"config": config, "fake": fake})

    assert faked == {
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
        "nextSyncToken": "CPDSyncToken_fake_73f7f893105e",
        "items": [
            {
                "kind": "calendar#event",
                "etag": "\"3456789012345678\"",
                "id": "evt_fake_d0cf12826176",
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
                "iCalUID": "4043fff0-c801-6337-563d-f5d3584545ad",
                "sequence": 0,
                "reminders": {
                    "useDefault": True,
                },
                "eventType": "default",
            },
        ],
    }


def test_events_changed_fakes_the_published_shape() -> None:
    config = {
        "sample": "exists",
    }
    fake = FakeValues(seed_for_call("google_calendar", "events_changed", config))

    faked = respond("events_changed", {"config": config, "fake": fake})

    assert faked == {
        "channelId": "bffaab9c-bba2-8827-98d5-9f56e6c2325e",
        "messageNumber": "2",
        "resourceId": "o3hgv1538sdjfh_fake_2bfda6f07b5e",
        "resourceState": "exists",
        "resourceUri": "https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json",
        "channelExpiration": "Tue, 15 Sep 2026 00:00:00 GMT",
    }


def test_an_operation_with_no_fixture_raises_rather_than_inventing_a_shape() -> None:
    fake = FakeValues(seed_for_call("google_calendar", "no_such_operation", {}))

    with pytest.raises(ValueError, match="no fake response"):
        respond("no_such_operation", {"config": {}, "fake": fake})
