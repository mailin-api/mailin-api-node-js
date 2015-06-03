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
        return this.do_request(resource,"DELETE",input);
}
,get_account:function() {
	return this.get_request("account","");
}
,get_smtp_details:function() {
	return this.get_request("account/smtpdetail","");
}
,create_child_account:function(email,password,company_org,first_name,last_name,credits,associate_ip) {
    return this.post_request("account",JSON.stringify({"child_email":email,"password":password,"company_org":company_org,"first_name":first_name,"last_name":last_name,"credits":credits,"associate_ip":associate_ip}));
}
,update_child_account:function(child_authkey,company_org,first_name,last_name,password,associate_ip,disassociate_ip) {
    return this.put_request("account",JSON.stringify({"auth_key":child_authkey,"company_org":company_org,"first_name":first_name,"last_name":last_name,"password":password,"associate_ip":associate_ip,"disassociate_ip":disassociate_ip}));
}
,delete_child_account:function(child_authkey) {
    return this.delete_request("account/" + child_authkey,"");
}
,get_child_account:function(child_authkey) {
    return this.post_request("account/getchild",JSON.stringify({"auth_key":child_authkey}));
}
,add_remove_child_credits:function(child_authkey,add_credits,remove_credits) {
    return this.post_request("account/addrmvcredit",JSON.stringify({"auth_key":child_authkey,"add_credit":add_credits,"rmv_credit":remove_credits}));
}
,send_sms:function(to,from,text,web_url,tag,type) {
	return this.post_request("sms",JSON.stringify({"text":text,"tag":tag,"web_url":web_url,"from":from,"to":to,"type":type}));
}
,create_sms_campaign:function(camp_name,sender,content,bat_sent,listids,exclude_list,scheduled_date) {
    return this.post_request("sms",JSON.stringify({"name":camp_name,"sender":sender,"content":content,"bat":bat_sent,"listid":listids,"exclude_list":exclude_list,"scheduled_date":scheduled_date}));
}
,update_sms_campaign:function(id,camp_name,sender,content,bat_sent,listids,exclude_list,scheduled_date) {
    return this.put_request("sms/" + id,JSON.stringify({"name":camp_name,"sender":sender,"content":content,"bat":bat_sent,"listid":listids,"exclude_list":exclude_list,"scheduled_date":scheduled_date}));
}
,send_bat_sms:function(campid,mobilephone) {
   return this.get_request("sms/" + campid,JSON.stringify({"to":mobilephone}));
}
,get_campaigns:function(type,status,page,page_limit) {
	return this.get_request("campaign",JSON.stringify({"type":type,"status":status,"page":page,"page_limit":page_limit}));
}
,get_campaign:function(id) {
	return this.get_request("campaign/" + id,"");
}
,create_campaign:function(category,from_name,name,bat_sent,tags,html_content,html_url,listid,scheduled_date,subject,from_email,reply_to,exclude_list,attachmentUrl,inline_image) {
	return this.post_request("campaign",JSON.stringify({"category":category,"from_name":from_name,"name":name,"bat_sent":bat_sent,"tags":tags,"html_content":html_content,"html_url":html_url,"listid":listid,"scheduled_date":scheduled_date,"subject":subject,"from_email":from_email,"reply_to":reply_to,"exclude_list":exclude_list,"attachment_url":attachmentUrl,"inline_image":inline_image}));
}
,delete_campaign:function(id) {
	return this.delete_request("campaign/" + id,"");
}
,update_campaign:function(id,category,from_name,name,bat_sent,tags,html_content,html_url,listid,scheduled_date,subject,from_email,reply_to,exclude_list,attachmentUrl,inline_image) {
	return this.put_request("campaign/" + id,JSON.stringify({"category":category,"from_name":from_name,"name":name,"bat_sent":bat_sent,"tags":tags,"html_content":html_content,"html_url":html_url,"listid":listid,"scheduled_date":scheduled_date,"subject":subject,"from_email":from_email,"reply_to":reply_to,"exclude_list":exclude_list,"attachment_url":attachmentUrl,"inline_image":inline_image}));
}
,campaign_report_email:function(id,lang,email_subject,email_to,email_content_type,email_bcc,email_cc,email_body) {
	return this.post_request("campaign/" + id + "/report",JSON.stringify({"lang":lang,"email_subject":email_subject,"email_to":email_to,"email_content_type":email_content_type,"email_bcc":email_bcc,"email_cc":email_cc,"email_body":email_body}));
}
,campaign_recipients_export:function(id,notify_url,type) {
	return this.post_request("campaign/" + id + "/recipients",JSON.stringify({"notify_url":notify_url,"type":type}));
}
,send_bat_email:function(campid,email_to) {
    return this.post_request("campaign/" + campid + "/test",JSON.stringify({"emails":email_to}));
}
,create_trigger_campaign:function(category,from_name,name,bat_sent,html_content,html_url,listid,scheduled_date,subject,from_email,reply_to,to_field,exclude_list,recurring,attachmentUrl,inline_image) {
    return this.post_request("campaign",JSON.stringify({"category":category,"from_name":from_name,"trigger_name":name,"bat":bat_sent,"html_content":html_content,"html_url":html_url,"listid":listid,"scheduled_date":scheduled_date,"subject":subject,"from_email":from_email,"reply_to":reply_to,"to_field":to_field,"exclude_list":exclude_list,"recurring":recurring,"attachment_url":attachmentUrl,"inline_image":inline_image}));
}
,update_trigger_campaign:function(id,category,from_name,name,bat_sent,html_content,html_url,listid,scheduled_date,subject,from_email,reply_to,to_field,exclude_list,recurring,attachmentUrl,inline_image) {
    return this.put_request("campaign/" + id,JSON.stringify({"category":category,"from_name":from_name,"trigger_name":name,"bat":bat_sent,"html_content":html_content,"html_url":html_url,"listid":listid,"scheduled_date":scheduled_date,"subject":subject,"from_email":from_email,"reply_to":reply_to,"to_field":to_field,"exclude_list":exclude_list,"recurring":recurring,"attachment_url":attachmentUrl,"inline_image":inline_image}));
}
,campaign_share_link:function(campaign_ids) {
    return this.post_request("campaign/sharelink",JSON.stringify({"camp_ids":campaign_ids}));
}
,update_campaign_status:function(id,status) {
    return this.put_request("campaign/" + id + "/updatecampstatus",JSON.stringify({"status":status}));
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
,create_user:function(attributes,blacklisted,email,listid) {
	return this.post_request("user",JSON.stringify({"attributes":attributes,"blacklisted":blacklisted,"email":email,"listid":listid}));
}
,delete_user:function(id) {
	return this.delete_request("user/" + id,"");
}
,update_user:function(id,attributes,blacklisted,listid,listid_unlink) {
	return this.put_request("user/" + id,JSON.stringify({"attributes":attributes,"blacklisted":blacklisted,"listid":listid,"listid_unlink":listid_unlink}));
}
,import_users:function(url,listids,notify_url,name,folder_id) {
	return this.post_request("user/import",JSON.stringify({"url":url,"listids":listids,"notify_url":notify_url,"name":name,"list_parent":folder_id}));
}
,export_users:function(export_attrib,filter,notify_url) {
	return this.post_request("user/export",JSON.stringify({"export_attrib":export_attrib,"filter":filter,"notify_url":notify_url}));
}
,create_update_user:function(email,attributes,blacklisted,listid,listid_unlink,blacklisted_sms) {
      return this.post_request("user/createdituser",JSON.stringify({"email":email,"attributes":attributes,"blacklisted":blacklisted,"listid":listid,"listid_unlink":listid_unlink,"blacklisted_sms":blacklisted_sms}));
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
,send_transactional_template:function(id,to,cc,bcc,attr,attachmentUrl,attachment) {
    return this.put_request("template/" + id,JSON.stringify({"cc":cc,"to":to,"attr":attr,"bcc":bcc,"attachment_url":attachmentUrl,"attachment":attachment}));
}
,create_template:function(from_name,name,bat_sent,html_content,html_url,subject,from_email,reply_to,to_field,status,attach) {
    return this.post_request("template",JSON.stringify({"from_name":from_name,"template_name":name,"bat":bat_sent,"html_content":html_content,"html_url":html_url,"subject":subject,"from_email":from_email,"reply_to":reply_to,"to_field":to_field,"status":status,"attachment":attach}));
}
,update_template:function(id,from_name,name,bat_sent,html_content,html_url,subject,from_email,reply_to,to_field,status,attach) {
    return this.put_request("template/" + id,JSON.stringify({"from_name":from_name,"template_name":name,"bat":bat_sent,"html_content":html_content,"html_url":html_url,"subject":subject,"from_email":from_email,"reply_to":reply_to,"to_field":to_field,"status":status,"attachment":attach}));
}
,get_senders:function(option) {
    return this.get_request("advanced",JSON.stringify({"option":option}));
}
,create_sender:function(sender_name,sender_email,ip_domain) {
    return this.post_request("advanced",JSON.stringify({"name":sender_name,"email":sender_email,"ip_domain":ip_domain}));
}
,update_sender:function(id,sender_name,sender_email,ip_domain) {
    return this.put_request("advanced/" + id,JSON.stringify({"name":sender_name,"email":sender_email,"ip_domain":ip_domain}));
}
,delete_sender:function(id) {
    return this.delete_request("advanced/" + id,"");
}
});

