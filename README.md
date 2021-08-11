# Richpanel - FB helper

Richpanel assignment - Sarthak Pranesh ( 18BCE0814 ), VIT Vellore
Video link - https://github.com/sarthakpranesh/Richpanel/video.mkv

<br />

## What it is?

FB Help Desk - shows all your page messages and comments in one place to help manage all interactions with users.

<br />

## Architecture
This project contains one react server for web user application and one express server for webhooks with Facebook
- server folder: the express server controlling webhooks and providing some end points for front end
- parent folder: contains the react front end for this project

Both are express service handling webhooks and react front end are deployed on Heroku separately.


## Todo

- [x] UI as per document
- [x] Facebook Login
- [x] Facebook Logout
- [x] Receive message if someone messages on the Page
- [x] Send replies, would also be visible in facebook messenger
- [x] New chats are created if 1h pass for the same customer
- [ ] Receive comments as messages
