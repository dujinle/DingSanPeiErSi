var util = util || {};

util.toLevel = function(e) {
return parseInt(e / 10);
};

util.toDelta = function(e) {
return 100 * parseInt(e / 10) + 1e3;
};

util.toVolume = function(e) {
return 10 * (100 * parseInt(e / 10) + 1e3);
};

util.createUUID = function() {
var n = new Date().getTime();
return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
var t = (n + 16 * Math.random()) % 16 | 0;
n = Math.floor(n / 16);
return ("x" == e ? t : 3 & t | 8).toString(16);
});
};

util.getGameRoute = function() {
return "game.gameHandler.game_process";
};

util.getCreateRoute = function() {
return "connector.entryHandler.create";
};

util.getEnterWaitRoomRoute = function() {
return "connector.entryHandler.enter_wait_room";
};

util.getRoomInfoRoute = function() {
return "connector.entryHandler.get_room";
};

util.getEnterRoute = function() {
return "connector.entryHandler.enter";
};

util.getRoomInfoRoute = function() {
return "connector.entryHandler.get_room_info";
};

util.getRepairEnterRoomRoute = function() {
return "connector.entryHandler.repair_enter_room";
};

util.getStartGameRoute = function() {
return "connector.entryHandler.start_game";
};

util.getDelayWaitTimeRoute = function() {
return "connector.entryHandler.delay_wait_time";
};

util.getDissolveRoomRoute = function() {
return "connector.entryHandler.dissolve_room";
};

util.getLeaveRoomRoute = function() {
return "connector.entryHandler.leave_room";
};

util.show_net_error = function(e, t) {
var n = cc.director.getVisibleSize(), o = cc.instantiate(g_assets.pop_net_error);
o.getComponent("pop_net_error").show_error_info(e, t);
var r = cc.director.getScene().getChildByName("RootNode");
r.addChild(o);
o.setPosition(r.convertToNodeSpaceAR(cc.p(n.width / 2, n.height / 2)));
};

util.show_error_info = function(e, t, n) {
t = cc.director.getVisibleSize();
var o = cc.instantiate(g_assets.prop_error_scene);
o.getComponent("prop_error_info").show_error_info(n);
var r = cc.director.getScene().getChildByName("RootNode");
r.addChild(o);
o.setPosition(r.convertToNodeSpaceAR(cc.p(t.width / 2, t.height / 2)));
};

util.show_isok_info = function(e, t) {
var n = cc.director.getVisibleSize(), o = cc.instantiate(g_assets.pop_isok_scene), r = o.getComponent("prop_isok_info");
r.init(e);
var i = cc.director.getScene().getChildByName("RootNode");
i.addChild(o);
o.setPosition(i.convertToNodeSpaceAR(cc.p(n.width / 2, n.height / 2)));
r.show_error_info(t);
};

util.get = function(e, t, n) {
var o = cc.loader.getXMLHttpRequest();
null == t ? o.open("GET", e, !1) : o.open("GET", e + "?" + t, !1);
o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
o.onreadystatechange = function() {
if (4 == o.readyState && 200 <= o.status && o.status <= 207) {
var e = JSON.parse(o.responseText);
n.callback(e);
}
};
o.send(null);
};

util.post = function(e, t, n) {
var o = JSON.stringify(t), r = cc.loader.getXMLHttpRequest();
r.open("POST", ServerLink);
r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
r.onreadystatechange = function() {
if (4 == r.readyState && 200 <= r.status && r.status <= 207) {
var e = JSON.parse(r.responseText);
if ("erro" == e.act) {
n(e.msg);
return;
}
n(e);
}
};
r.send(o);
};

util.dateftt = function(e, t) {
var n = new Date(e), o = {
"M+": n.getMonth() + 1,
"d+": n.getDate(),
"h+": n.getHours(),
"m+": n.getMinutes(),
"s+": n.getSeconds(),
"q+": Math.floor((n.getMonth() + 3) / 3),
S: n.getMilliseconds()
};
/(y+)/.test(t) && (t = t.replace(RegExp.$1, (n.getFullYear() + "").substr(4 - RegExp.$1.length)));
for (var r in o) new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? o[r] : ("00" + o[r]).substr(("" + o[r]).length)));
return t;
};