# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (or weaver's template/) and regenerate:
#
# npm run provider -- google_calendar

"""Google Calendar for Python.

The service descriptor, its faker, its delivery contract, and one function
per operation — plain HTTP on the stdlib, no vendor SDK and no runtime
dependency.
"""

from __future__ import annotations

from ._fake import FakeValues
from .actions.channel_stop import channel_stop
from .actions.channel_watch import channel_watch
from .actions.event_create import event_create
from .actions.event_delete import event_delete
from .actions.event_get import event_get
from .actions.event_list import event_list
from .actions.event_update import event_update
from .faker import respond
from .service import BASE_URLS, CONNECTOR_API_VERSION, REQUIRES, SANDBOX, SERVICE, TITLE, descriptor
from .triggers import events_changed

__version__ = "0.2.0"

__all__ = [
    "BASE_URLS",
    "CONNECTOR_API_VERSION",
    "REQUIRES",
    "SANDBOX",
    "SERVICE",
    "TITLE",
    "FakeValues",
    "channel_stop",
    "channel_watch",
    "descriptor",
    "event_create",
    "event_delete",
    "event_get",
    "event_list",
    "event_update",
    "events_changed",
    "respond",
]
