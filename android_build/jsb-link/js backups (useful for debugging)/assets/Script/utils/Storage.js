var Storage = {
setData: function(t, e) {
cc.sys.localStorage.setItem(t, e);
},
getData: function(t) {
return cc.sys.localStorage.getItem(t) || null;
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
}
};