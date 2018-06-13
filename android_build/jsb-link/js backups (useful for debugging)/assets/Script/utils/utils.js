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
var n = cc.director.getVisibleSize(), r = cc.instantiate(g_assets.pop_net_error);
r.getComponent("pop_net_error").show_error_info(e, t);
var o = cc.director.getScene().getChildByName("RootNode");
o.addChild(r);
r.setPosition(o.convertToNodeSpaceAR(cc.p(n.width / 2, n.height / 2)));
};

util.show_error_info = function(e, t, n) {
t = cc.director.getVisibleSize();
var r = cc.instantiate(g_assets.prop_error_scene);
r.getComponent("prop_error_info").show_error_info(n);
var o = cc.director.getScene().getChildByName("RootNode");
o.addChild(r);
r.setPosition(o.convertToNodeSpaceAR(cc.p(t.width / 2, t.height / 2)));
};

util.show_isok_info = function(e, t) {
var n = cc.director.getVisibleSize(), r = cc.instantiate(g_assets.pop_isok_scene), o = r.getComponent("prop_isok_info");
o.init(e);
var i = cc.director.getScene().getChildByName("RootNode");
i.addChild(r);
r.setPosition(i.convertToNodeSpaceAR(cc.p(n.width / 2, n.height / 2)));
o.show_error_info(t);
};

util.get = function(e, t, n) {
var r = cc.loader.getXMLHttpRequest();
null == t ? r.open("GET", e, !1) : r.open("GET", e + "?" + t, !1);
n.debug_label.string = e + "?" + t;
r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
r.onreadystatechange = function() {
n.debug_label.string = "onreadystatechange:" + r.readyState + " status:" + r.status;
if (4 == r.readyState && 200 <= r.status && r.status <= 207) {
n.debug_label.string = n.debug_label.string + "resp:" + r.responseText;
var e = JSON.parse(r.responseText);
n.callback(e);
}
};
r.send(null);
};

util.post = function(e, t, n) {
var r = JSON.stringify(t), o = cc.loader.getXMLHttpRequest();
o.open("POST", ServerLink);
o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
o.onreadystatechange = function() {
if (4 == o.readyState && 200 <= o.status && o.status <= 207) {
var e = JSON.parse(o.responseText);
if ("erro" == e.act) {
n(e.msg);
return;
}
n(e);
}
};
o.send(r);
};

util.dateftt = function(e, t) {
var n = new Date(e), r = {
"M+": n.getMonth() + 1,
"d+": n.getDate(),
"h+": n.getHours(),
"m+": n.getMinutes(),
"s+": n.getSeconds(),
"q+": Math.floor((n.getMonth() + 3) / 3),
S: n.getMilliseconds()
};
/(y+)/.test(t) && (t = t.replace(RegExp.$1, (n.getFullYear() + "").substr(4 - RegExp.$1.length)));
for (var o in r) new RegExp("(" + o + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[o] : ("00" + r[o]).substr(("" + r[o]).length)));
return t;
};