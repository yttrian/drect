# drect
A simple Discord widget invite redirector.

# Purpose
Ever needed a permanent invite for your server you could easily disable, but didn't want to use an Instant Invite that can't be toggled? That's where drect steps in. Using the server widget to automatically retrieve fresh invite links (like a previously popular server listing service did), drect can provide an easy way to have the permanent invite link you've always wanted, without needing to add a bot to your server.

# How to use
1. Enable the server widget in your server settings.
2. Copy the Server ID.
3. Use it to create a url in this format: https://d.yttr.org/#server-id (replace **server-id** with your id).
4. You're all set, and can begin to share your link.
5. (optional) Use a URL shortening service like bit.ly to shorten the URL and make it more presentable.

# How to disable the invite
Because drect uses the server widget to automatically retrieve invite links, disabling the widget and revoking its Instant Invite in your server settings is an easy way to disable your permanent invite link.

# How to re-enable the invite
Simply turn the server widget back on and you're in business. 

# Server widget: pros and cons
The advantage of using the server widget is that this site can be hosted statically on GitHub's generously provided servers. All logic is done on the front end meaning that there's no need to have to add a third party bot to your server that you have no idea what it could be doing. However, enabling the server widget does have one downside. The server widget allows people outside of your server to see the member listing. This may or may not be desirable, so plan accordingly.
