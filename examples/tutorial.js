// Include mailin
require("../mailin.js");
// Initialize mailin object
var client = new Mailin("https://api.sendinblue.com/v1.0","<access key>","<secret key>");
// Get list of all campaigns in account
client.get_campaigns().on('complete', function(data) {
	console.log(data);
});
