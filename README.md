# Mailin Javascript API

This is the Mailin javascript API, that can be easily integrated in your node.js application. You need to have the following libraries, which you can install using npm
* Restler

It currently supports all the API calls for v1.0. Each call returns an Object that is documented in our API docs, here are the objects.

 * Account
 * Campaign
 * Campaign statistics
 * Folder
 * List
 * Attribute
 * User
 * SMS
 * Process

### SMTP APIs

 * File
 * Mail
 * Bounces
 * Template
 * Report
 * Statistics
 * Webhooks

## Quickstart

1. You will need to first get the Access key and Secret key from [Mailinblue](https://www.mailinblue.com).

2. Assuming that you have cloned this git repo, or downloaded mailin.js . You can use this small sample script to get started
```javascript
require("../mailin.js");
var client = new Mailin("https://api.mailinblue.com/v1.0","<access key>","<secret key>");
client.get_campaigns().on('complete', function(data) {
        console.log(data);
});
```

3. To explore more, you should visit the [Mailin API documentation](https://apidocs.mailinblue.com).
