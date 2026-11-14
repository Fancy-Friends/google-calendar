# Setting up Google Calendar

Generated from `provider/manifest.json`; do not edit. Each step cites the provider page it
came from. Words in **bold** are values from YOUR app, filled in where a host shows these steps.

## 1. Create (or reuse) the Google Cloud project for **your app's name**

Every Google connector shares ONE consent grant (oauth.grant "google"), so use one project and one OAuth client for all of them: one consent and one refresh token per person.

Source: [developers.google.com](https://developers.google.com/workspace/guides/create-project)

## 2. Enable the Google Calendar API

Console: APIs & Services, Library; open the Google Calendar API and click Enable.

Source: [developers.google.com](https://developers.google.com/workspace/guides/enable-apis)

## 3. Configure the consent screen

Console: Google Auth platform, Branding (app name **your app's name**, support email, contact email), then Audience: Internal for people inside your Google Workspace organisation only, or External (while it is in testing, add each tester under Test users). Then Data Access, Add or Remove Scopes, and add `https://www.googleapis.com/auth/calendar.events` beside the scopes of any other Google connector you use. You cannot remove the consent screen once it is configured.

Source: [developers.google.com](https://developers.google.com/workspace/guides/configure-oauth-consent)

## 4. Create a Web application OAuth client

Console: Google Auth platform, Clients, Create Client; type Web application. Under Authorized redirect URIs click Add URI and paste **your host's OAuth redirect URL**, then Create. Copy the client ID and client secret when the client is created.

**Copy:**

- Authorized redirect URI: **your host's OAuth redirect URL**

**Yields:** `clientId`, `clientSecret`

Source: [developers.google.com](https://developers.google.com/workspace/guides/create-credentials)

## 5. Give each connection a channel token, and serve **your host's webhook URL for this connector** over HTTPS

events_changed opens a channel whose notifications go to **your host's webhook URL for this connector**, which must be HTTPS with a valid certificate (self-signed, untrusted, revoked or wrong-host certificates are refused). Google echoes the channel token in X-Goog-Channel-Token on every notification, so generate a random token per connection and never put an OAuth token in it. A channel is never renewed automatically: replace it with a new watch before it expires.

**Copy:**

- Notification address: **your host's webhook URL for this connector**

**Yields:** `channelToken`

Source: [developers.google.com](https://developers.google.com/workspace/calendar/api/guides/push)

## 6. Connect an account and check it works — an AGENT step

Connect one Google account through **your app's name**'s OAuth flow, then run the check below.

**The agent is asked:**

> Using **your app's name**'s **this connector's name** connection, run event_list on the primary calendar and report how many events it returns. Then start a channel with channel_watch, ask the person to edit an event, and confirm **your app's name** received an events_changed notification whose channel token matched.

**Done when:** event_list answers, and an edited event arrives as an events_changed notification with the right token.

Source: [developers.google.com](https://developers.google.com/workspace/calendar/api/guides/push)
