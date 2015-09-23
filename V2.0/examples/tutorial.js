// Include mailin
require("../mailin.js");

// Initialize mailin object
var client = new Mailin("https://api.sendinblue.com/v2.0","<access key>");

// to retrieve all campaigns of type 'classic' & status 'queued'
data = { "type":"classic",
	"status":"queued",
	"page":1,
	"page_limit":10
}

client.get_campaigns_v2(data).on('complete', function(data) {
	console.log(data);
});