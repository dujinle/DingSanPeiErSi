var Storage = {
getUserId: function() {
return cc.sys.localStorage.getItem("userId") || null;
},
setUserId: function(t) {
cc.sys.localStorage.setItem("userId", t);
return !0;
},
getPassword: function() {
return cc.sys.localStorage.getItem("password") || null;
},
setPassword: function(t) {
cc.sys.localStorage.setItem("password", t);
return !0;
},
getPhoneNumber: function() {
return cc.sys.localStorage.getItem("phone_num") || null;
},
setPhoneNumber: function(t) {
cc.sys.localStorage.setItem("phone_num", t);
return !0;
},
getLoginType: function() {
return cc.sys.localStorage.getItem("login_type") || null;
},
setLoginType: function(t) {
cc.sys.localStorage.setItem("login_type", t);
return !0;
},
getImei: function() {
var t = cc.sys.localStorage.getItem("imei") || 0;
if (!t) {
t = util.createUUID();
Storage.setImei(t);
}
return t;
},
setImei: function(t) {
cc.sys.localStorage.setItem("imei", t);
return !0;
},
getPasswordFlag: function() {
return !!cc.sys.localStorage.getItem("pwd_flag");
},
setPasswordFlag: function(t) {
cc.sys.localStorage.setItem("pwd_flag", t);
return !0;
},
getAutoLoginFlag: function() {
return !!cc.sys.localStorage.getItem("auto_flag");
},
setAutoLoginFlag: function(t) {
cc.sys.localStorage.setItem("auto_flag", t);
return !0;
}
};