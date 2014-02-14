var rest = require('restler');
var crypto = require('crypto');

// Work in progress

Mailin = rest.service(function(base_url,access_key,secret_key) {
	this.base_url = base_url;
	this.access_key = access_key;
	this.secret_key = secret_key;
},{
},{
do_request:function(resource,method,input) {
	var called_url = this.base_url + "/" + resource;
	var md5_content = "";
	if(input!="") {
		md5_content = crypto.createHash('md5').update(input).digest('hex');// Generate md5
	}
	var content_type = "application/json";
	var c_date_time = "Tue, 03 Sep 2013 02:01:01 +0530"; // Generate the date
	var sign_string = method + "\n" + md5_content + "\n" + content_type + "\n" + c_date_time + "\n" + called_url;
	var signature = new Buffer(crypto.createHmac('sha1', this.secret_key).update(sign_string).digest('hex')).toString('base64');
	// Make the call
	return this.request(called_url,{method:method,headers:{'X-mailin-date':c_date_time,'Authorization':this.access_key+":"+signature,"content-type":content_type},data:input});
},
get_request:function(resource,input) {
	return this.do_request(resource,"GET",input);
},
post_request:function(resource,input) {
        return this.do_request(resource,"POST",input);
},
put_request:function(resource,input) {
        return this.do_request(resource,"PUT",input);
},
delete_request:function(resource,input) {
        return this.do_request(resource,"DEL",input);
}
,get_account:function() {
	return this.get_request("account","");
}
,send_sms:function(to,from,text,web_url,tag) {
	return this.post_request("sms",JSON.stringify({"text":text,"tag":tag,"web_url":web_url,"from":from,"to":to}));
}
,get_campaigns:function(type) {
	return this.get_request("campaign",JSON.stringify({"type":type}));
}
,get_campaign:function(id) {
	return this.get_request("campaign/" + id,"");
}
,create_campaign:function(category,from_name,name,bat_sent,tags,html_content,html_url,listid,scheduled_date,subject,from_email,reply_to,exclude_list) {
	return this.post_request("campaign",JSON.stringify({"category":category,"from_name":from_name,"name":name,"bat_sent":bat_sent,"tags":tags,"html_content":html_content,"html_url":html_url,"listid":listid,"scheduled_date":scheduled_date,"subject":subject,"from_email":from_email,"reply_to":reply_to,"exclude_list":exclude_list}));
}
,delete_campaign:function(id) {
	return this.delete_request("campaign/" + id,"");
}
,update_campaign:function(id,category,from_name,name,bat_sent,tags,html_content,html_url,listid,scheduled_date,subject,from_email,reply_to,exclude_list) {
	return this.put_request("campaign/" + id,JSON.stringify({"category":category,"from_name":from_name,"name":name,"bat_sent":bat_sent,"tags":tags,"html_content":html_content,"html_url":html_url,"listid":listid,"scheduled_date":scheduled_date,"subject":subject,"from_email":from_email,"reply_to":reply_to,"exclude_list":exclude_list}));
}
,campaign_report_email:function(id,lang,email_subject,email_to,email_content_type,email_bcc,email_cc,email_body) {
	return this.post_request("campaign/" + id + "/report",JSON.stringify({"lang":lang,"email_subject":email_subject,"email_to":email_to,"email_content_type":email_content_type,"email_bcc":email_bcc,"email_cc":email_cc,"email_body":email_body}));
}
,campaign_recipients_export:function(id,notify_url,type) {
	return this.post_request("campaign/" + id + "/report",JSON.stringify({"notify_url":notify_url,"type":type}));
}
,get_processes:function() {
	return this.get_request("process","");
}
,get_process:function(id) {
	return this.get_request("process/" + id,"");
}
,get_lists:function() {
	return this.get_request("list","");
}
,get_list:function(id) {
	return this.get_request("list/" + id,"");
}
,create_list:function(list_name,list_parent) {
	return this.post_request("list",JSON.stringify({"list_name":list_name,"list_parent":list_parent}));
}
,delete_list:function(id) {
	return this.delete_request("list/" + id,"");
}
,update_list:function(id,list_name,list_parent) {
	return this.put_request("list/" + id,JSON.stringify({"list_name":list_name,"list_parent":list_parent}));
}
,display_list_users:function(listids,page,page_limit) {
    return this.get_request("list/display",JSON.stringify({"listids":listids,"page":page,"page_limit":page_limit}));
}
,add_users_list:function(id,users) {
	return this.post_request("list/" + id + "/users",JSON.stringify({"users":users}));
}
,delete_users_list:function(id,users) {
	return this.delete_request("list/" + id + "/delusers",JSON.stringify({"users":users}));
}
,send_email:function(to,subject,from,html,text,cc,bcc,replyto,attachment,headers) {
	return this.post_request("email",JSON.stringify({"cc":cc,"text":text,"bcc":bcc,"replyto":replyto,"html":html,"to":to,"attachment":attachment,"from":from,"subject":subject,"headers":headers}));
}
,get_webhooks:function() {
	return this.get_request("webhook","");
}
,get_webhook:function(id) {
	return this.get_request("webhook/" + id,"");
}
,create_webhook:function(url,description,events) {
	return this.post_request("webhook",JSON.stringify({"url":url,"description":description,"events":events}));
}
,delete_webhook:function(id) {
	return this.delete_request("webhook/" + id,"");
}
,update_webhook:function(id,url,description,events) {
	return this.put_request("webhook/" + id,JSON.stringify({"url":url,"description":description,"events":events}));
}
,get_statistics:function(aggregate,tag,days,end_date,start_date) {
	return this.post_request("statistics",JSON.stringify({"aggregate":aggregate,"tag":tag,"days":days,"end_date":end_date,"start_date":start_date}));
}
,get_user:function(id) {
	return this.get_request("user/" + id,"");
}
,get_user_stats:function(id,type) {
	return this.get_request("user/" + id + "/" + type,"");
}
,create_user:function(attributes,blacklisted,email,listid) {
	return this.post_request("user",JSON.stringify({"attributes":attributes,"blacklisted":blacklisted,"email":email,"listid":listid}));
}
,delete_user:function(id) {
	return this.delete_request("user/" + id,"");
}
,update_user:function(id,attributes,blacklisted,listid,listid_unlink) {
	return this.put_request("user/" + id,JSON.stringify({"attributes":attributes,"blacklisted":blacklisted,"listid":listid,"listid_unlink":listid_unlink}));
}
,import_users:function(url,listids,notify_url,name) {
	return this.post_request("user/import",JSON.stringify({"url":url,"listids":listids,"notify_url":notify_url,"name":name}));
}
,export_users:function(export_attrib,filer,notify_url) {
	return this.post_request("user/export",JSON.stringify({"export_attrib":export_attrib,"filer":filer,"notify_url":notify_url}));
}
,get_attributes:function() {
	return this.get_request("attribute","");
}
,get_attribute:function(id) {
	return this.get_request("attribute/" + id,"");
}
,create_attribute:function(type,data) {
	return this.post_request("attribute",JSON.stringify({"type":type,"data":data}));
}
,delete_attribute:function(id,data) {
	return this.post_request("attribute/" + id,JSON.stringify({"data":data}));
}
,get_report:function(limit,start_date,end_date,offset,date,days,email) {
	return this.post_request("report",JSON.stringify({"limit":limit,"start_date":start_date,"end_date":end_date,"offset":offset,"date":date,"days":days,"email":email}));
}
,get_folders:function() {
	return this.get_request("folder","");
}
,get_folder:function(id) {
	return this.get_request("folder/" + id,"");
}
,create_folder:function(name) {
	return this.post_request("folder",JSON.stringify({"name":name}));
}
,delete_folder:function(id) {
	return this.delete_request("folder/" + id,"");
}
,update_folder:function(id,name) {
	return this.put_request("folder/" + id,JSON.stringify({"name":name}));
}
,delete_bounces:function(start_date,end_date,email) {
	return this.post_request("bounces",JSON.stringify({"start_date":start_date,"end_date":end_date,"email":email}));
}
,send_transactional_template:function(id,to,cc,bcc,attr) {
    return this.put_request("template/" + id,JSON.stringify({"cc"=>cc,"to"=>to,"attr"=>attr,"bcc"=>bcc}));
}
});

