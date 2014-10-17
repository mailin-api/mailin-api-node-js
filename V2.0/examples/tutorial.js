// Include mailin
require("../mailin.js");
// Initialize mailin object
var client = new Mailin("https://api.sendinblue.com/v2.0","<access key>");
// Get list of all campaigns in account
client.get_campaigns_v2().on('complete', function(data) {
	console.log(data);
});
