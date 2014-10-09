# SendinBlue node js library

This is the official SendinBlue node js library, that can be easily integrated in your node.js application. You need to have the following libraries, which you can install using npm
* Restler

It currently supports all the API calls for v2.0. Each call returns an Object that is documented in our API docs, here are the objects.

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

1. You will need to first get the Access key from [SendinBlue](https://www.sendinblue.com).

2. Assuming that you have cloned this git repo, or downloaded mailin.js . You can use this small sample script to get started
```javascript
require("../mailin.js");
var client = new Mailin("https://api.sendinblue.com/v2.0","<access key>");
client.get_campaigns().on('complete', function(data) {
        console.log(data);
});
```

3. To explore more, you should visit the [SendinBlue API documentation](https://apidocs.sendinblue.com).