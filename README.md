SCHNEENET SMS
=============

Receive SMS from your Android mobile device in real time on the web!

* Receive and reply to SMS from your phone from your browser, on any device!
* Backup SMS messages when changing phones or ROMs
* Integrated Contact management that syncs with Google / Facebook / others

## Project Details

This project is very early in the design phase. I am looking for collaborators that have some familiarity with Node.js as this will likely become the backend of the service.

#### In order to get real-time messages from the phones to the website, we will need:
* An Android app
  * Receive SMS and forward it to web service
  * Receive message from web service and forward to carrier SMS
  * Integrate contacts
* Web Service
  * Utilize Server Sent Events to send messages in real time from the server to the browser (client)
  * Allow sending messages to / from phone
  * Store messages when user is not on the site / phone is not connected to service

#### Potential Issues
* Sending SMS from web to carrier SMS via Phone
* Security (Storing user's SMS in a database, login/accounts, etc.))
