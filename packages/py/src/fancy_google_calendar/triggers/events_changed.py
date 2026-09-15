# GENERATED FILE — do not edit.
#
# Emitted from provider/triggers/events-changed.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/triggers/events-changed.json (or weaver's template/) and
# regenerate:
#
# npm run provider -- google_calendar

"""Google Calendar's subscription trigger — the delivery contract.

Kept beside the service descriptor rather than inside a node, because the
way a delivery is verified is a fact about GOOGLE CALENDAR.

A SUBSCRIPTION: Google Calendar stops delivering unless somebody renews it,
forever, and if nobody does the workflow stops firing with no error
anywhere. LEASE says where the expiry is read from and how early to renew;
the host runs ONE renewal scheduler for every expiring trigger.
"""

from __future__ import annotations

from typing import Any

from .._runtime import Verification, verify_shared_token
from ..faker import respond
from ..service import SERVICE

OPERATION = "events_changed"
DELIVERY = "subscription"
SETUP = (
    "The host mints a UUID, calls channel_watch with it, its own URL for this trigger and the "
    "connection's channelToken, and stores the returned id, resourceId and expiration. Google "
    "cannot renew a channel: 86400 seconds before it expires the host calls channel_stop and "
    "then channel_watch again. A channel that lapsed is re-listed FIRST (event_list with the "
    "stored syncToken; a 410 means list in full) and then re-created, because notifications "
    "during the gap are gone. Google delivers with an EMPTY body: the host verifies "
    "X-Goog-Channel-Token against the connection's channelToken and injects the X-Goog-* "
    "headers as the event, camel-cased as below. The first message on a new channel is `sync` "
    "and carries no change."
)
SUBSCRIPTION_TTL = 604800

# The lease this subscription carries: where the provider's expiry sits in the
# channel_watch response, how it is spelled, how early the host renews, and what it
# calls when the lease is due — the create again, because Google Calendar cannot renew.
LEASE = {
    "expiresAtFrom": "expiration",
    "expiresAtUnit": "epoch-ms",
    "renewBeforeSeconds": 86400,
    "renewOperation": "channel_watch",
}

# Which of this package's actions create, renew and stop the subscription.
# `renew` is None where the provider cannot renew and the host calls create again.
SUBSCRIPTION = {
    "create": "channel_watch",
    "renew": None,
    "stop": "channel_stop",
}

# Where Google Calendar echoes the token it was given when the subscription was created:
# the header carrying it.
# Neither is a secret: S105 reads any *TOKEN* name as a hardcoded password, and
# these say WHERE the token arrives, not what it is.
TOKEN_IN = "header"  # noqa: S105
TOKEN_NAME = "X-Goog-Channel-Token"  # noqa: S105

# WHICH credential holds the token — a field name, not a secret (S105).
SECRET_CREDENTIAL = "channelToken"  # noqa: S105


def verify_delivery(
    raw: str,
    headers: dict[str, str],
    channeltoken: str | None,
    now: int | None = None,
) -> Verification:
    """Verify one inbound Google Calendar delivery.
    
    The host calls this BEFORE starting a run, with the body exactly as
    received. The token is the connection's `channelToken`; `now` is accepted
    for symmetry with signed schemes and unused, because an echoed token carries
    no timestamp.
    """
    del now

    return verify_shared_token(
        raw=raw,
        headers=headers,
        secret=channeltoken,
        placement=TOKEN_IN,
        name=TOKEN_NAME,
    )


def sample_event(config: dict[str, Any] | None = None) -> Any:
    """A faked sample event, so the trigger is runnable before any of the setup
    above.
    
    An author can see the real field names and wire the downstream nodes against
    them before the provider has ever been contacted.
    """
    from .._fake import FakeValues, seed_for_call

    resolved = config or {}
    fake = FakeValues(seed_for_call(SERVICE, OPERATION, resolved))

    return respond(OPERATION, {"config": resolved, "fake": fake})
