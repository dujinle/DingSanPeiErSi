var room_create = function(e, a) {
cc.log("start create room playerId:" + JSON.stringify(e));
pomelo.request(util.getCreateRoute(), e, function(e) {
cc.log(JSON.stringify(e));
if (e.error) a(e.error); else {
cc.log("create room succ");
pomelo.request(util.getGameRoute(), {
process: "getRoomInfo"
}, function(e) {
cc.log(JSON.stringify(e));
g_dealCardBack = new cc.Node("fapai_back");
g_dealCardBack.addComponent(cc.Sprite).spriteFrame = g_assets.back;
g_roomData.push(e.current_chip);
g_roomData.push(e.all_chip);
g_roomData.push(e.round);
g_roomData.push(e.room_num);
g_roomData.push(e.player_num);
g_roomData.push(e.is_gaming);
g_totalCount = e.total_round;
var a = e.current_player;
0 == a ? g_roomData.push(1) : g_roomData.push(a);
g_roomMasterName = e.master_name;
for (var o = e.players, r = 0; r < o.length; r++) {
var t = o[r];
if (null != t && "null" != t) {
var c = new Array();
c.push(t.id);
c.push(t.location);
c.push(t.isGame);
c.push(t.nickName);
c.push(t.gold);
c.push(t.gender);
"TDK" == g_game_type ? c.push(t.paiXing) : "ZJH" == g_game_type && c.push(t.mark);
g_playerData.push(c);
}
}
if ("ZJH" == g_game_type) cc.director.loadScene("ZJHRoomScene"); else if ("TDK" == g_game_type) {
g_fapaiNum = e.fapai_num;
cc.director.loadScene("TDKRoomScene");
} else "ZHQ" == g_game_type && cc.director.loadScene("ZHQRoomScene");
});
}
});
}, room_enter = function(e, a) {
pomelo.request(util.getEnterRoute(), e, function(e) {
e.error ? a(e.error) : pomelo.request(util.getGameRoute(), {
process: "getRoomInfo"
}, function(e) {
cc.log(JSON.stringify(e));
g_dealCardBack = new cc.Node("fapai_back");
g_dealCardBack.addComponent(cc.Sprite).spriteFrame = g_assets.back;
g_roomData.push(e.current_chip);
g_roomData.push(e.all_chip);
g_roomData.push(e.round);
g_roomData.push(e.room_num);
g_roomData.push(e.player_num);
g_roomData.push(e.is_gaming);
g_totalCount = e.total_round;
var a = e.current_player;
0 == a ? g_roomData.push(1) : g_roomData.push(a);
g_roomMasterName = e.master_name;
for (var o = e.players, r = 0; r < o.length; r++) {
var t = o[r];
if (null != t && "null" != t) {
var c = new Array();
c.push(t.id);
c.push(t.location);
c.push(t.isGame);
c.push(t.nickName);
c.push(t.gold);
c.push(t.gender);
"TDK" == g_game_type ? c.push(t.paiXing) : "ZJH" == g_game_type && c.push(t.mark);
g_playerData.push(c);
}
}
if ("ZJH" == g_game_type) cc.director.loadScene("ZJHRoomScene"); else if ("TDK" == g_game_type) {
g_fapaiNum = e.fapai_num;
cc.director.loadScene("TDKRoomScene");
} else "ZHQ" == g_game_type && cc.director.loadScene("ZHQRoomScene");
});
});
};