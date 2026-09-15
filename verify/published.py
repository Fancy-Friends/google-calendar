"""
Google Calendar — the published PyPI wheel.

GENERATED — do not edit. Fix weaver's template/ and regenerate.

Runs against the PUBLISHED wheel, installed by name into a fresh venv.
Every other test here imports from ../src and cannot see the packaging —
a missing py.typed or an unshipped module passes there and breaks for
every user.
"""

from importlib.metadata import requires

from fancy_google_calendar._fake import FakeValues, seed_for_call
from fancy_google_calendar.faker import respond

GOLDENS = [
    {
        "operation": "channel_stop",
        "config": {},
        "expected": {},
    },
    {
        "operation": "channel_watch",
        "config": {},
        "expected": {
            "kind": "api#channel",
            "id": "c33d4f8c-3353-b37e-38bf-ac0aac4fc9e5",
            "resourceId": "o3hgv1538sdjfh_fake_2d713802445e",
            "resourceUri": (
                               "https://www.googleapis.com/calendar/v3/calendars/primary/eve"
                               "nts?alt=json"
                           ),
            "token": "tok_fake_d45622a81066",
            "expiration": "1789430400000",
        },
    },
    {
        "operation": "event_get",
        "config": {},
        "expected": {
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
        },
    },
    {
        "operation": "event_list",
        "config": {},
        "expected": {
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
        },
    },
    {
        "operation": "events_changed",
        "config": {
            "sample": "exists",
        },
        "expected": {
            "channelId": "bffaab9c-bba2-8827-98d5-9f56e6c2325e",
            "messageNumber": "2",
            "resourceId": "o3hgv1538sdjfh_fake_2bfda6f07b5e",
            "resourceState": "exists",
            "resourceUri": (
                               "https://www.googleapis.com/calendar/v3/calendars/primary/eve"
                               "nts?alt=json"
                           ),
            "channelExpiration": "Tue, 15 Sep 2026 00:00:00 GMT",
        },
    },
]


def main() -> None:
    # Zero runtime dependencies is a design constraint, checked on the
    # INSTALLED distribution rather than on the pyproject that claimed it.
    declared = requires("fancy-google-calendar")
    assert not declared, f"expected no runtime dependencies, got {declared}"
    print("  ok   zero runtime dependencies on the installed distribution")

    for golden in GOLDENS:
        operation, config = golden["operation"], golden["config"]
        fake = FakeValues(seed_for_call("google_calendar", operation, config))
        faked = respond(operation, {"config": config, "fake": fake})

        assert faked == golden["expected"], (
            f"the PUBLISHED wheel produced different bytes for {operation} than the repo does"
        )
        print(f"  ok   {operation}")

    print(f"\n  {len(GOLDENS)} operations verified against the published wheel.")


if __name__ == "__main__":
    main()
