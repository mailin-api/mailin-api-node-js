var rest = require('restler');
var crypto = require('crypto');
var hash = crypto.createHmac('sha1', key).update(text).digest('hex');

// Work in progress

Mailin = rest.service(function(access_key,secret_key) {
	this.access_key = access_key;
	this.secret_key = secret_key;
},{
},{
do_request:function() {
},
get_request:function() {
},
post_request:function() {
},
put_request:function() {
},
delete_request:function() {
}
});


