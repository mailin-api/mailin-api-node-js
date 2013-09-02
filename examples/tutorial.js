// Include mailin

var client = new Mailin("http://api.mailinblue.com","<access key>","<secret key>");
client.get_campaigns().on('complete', function(data) {
	console.log(data);
});
