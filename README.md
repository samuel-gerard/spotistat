# Spotistat
This application allows you to see the songs you have listened to the most on spotify.

# Spotify Accounts Authentication Examples

This project is basd on Spotify demos showing the different OAuth 2.0 flows for [authenticating against the Spotify Web API](https://developer.spotify.com/web-api/authorization-guide/).

These app use:

* Authorization Code flow
* Client Credentials flow
* Implicit Grant flow

## Installation

These examples run on Node.js. On [its website](http://www.nodejs.org/download/) you can find instructions on how to install it. You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm.

Once installed, clone the repository and install its dependencies running:

    $ npm install

Then, you need to define the following config vars :
- CLIENT_ID
- CLIENT_SECRET
- REDIRECT_URI

Finally, run the app :
```node app.js```
And open `http://localhost:8888` in a browser.

### Using your own credentials
You will need to register your app and get your own credentials from the Spotify for Developers Dashboard.

To do so, go to [your Spotify for Developers Dashboard](https://beta.developer.spotify.com/dashboard) and create your application. For the examples, we registered these Redirect URIs:

* http://localhost:8888 (needed for the implicit grant flow)
* http://localhost:8888/callback