var room_create = function(e, r) {
cc.log("start create room playerId:" + JSON.stringify(e));
var o = cc.director.getVisibleSize();
pomelo.request(util.getCreateRoute(), e, function(e) {
cc.log(JSON.stringify(e));
if (200 == e.code) {
cc.log("create room succ" + JSON.stringify(e.msg));
g_user.fangka_num = g_user.fangka_num - e.msg.fangka_num;
g_room_data = e.msg;
cc.director.loadScene("CreatedRoomScene");
} else util.show_error_info(r, o, e.msg);
});
}, enter_wait_room = function(e, r) {
pomelo.request(util.getEnterWaitRoomRoute(), e, function(e) {
cc.log(JSON.stringify(e));
if (200 == e.code) {
cc.log("create room succ" + JSON.stringify(e.msg));
g_room_data = e.msg;
cc.director.loadScene("CreatedRoomScene");
} else {
util.show_error_info(r, null, e.msg);
cc.director.loadScene("MainScene");
}
});
}, onGameEnterRoom = function(e, r) {
if (1 == g_is_login) {
var o = {
room_num: e,
rid: r,
player_id: g_user.id
}, n = cc.director.getVisibleSize();
pomelo.request(util.getEnterWaitRoomRoute(), o, function(e) {
cc.log(JSON.stringify(e));
if (200 == e.code) {
cc.log("create room succ" + JSON.stringify(e.msg));
g_room_data = e.msg;
g_next_scene = null;
g_next_data = null;
cc.director.loadScene("CreatedRoomScene");
} else {
util.show_error_info(null, n, e.msg);
cc.director.loadScene("MainScene");
}
});
} else {
g_next_scene = "enter_room";
g_next_data = {
room_num: e,
rid: r
};
g_login_auto = !0;
}
}, onReconnect = function() {
cc.log("g_current_scene:" + g_current_scene);
util.show_net_error("当前网络不可用，请检查自己的网络状态", function() {
g_current_scene == SCENE_TAG.MAIN ? Servers.getLogin(g_user.player_id, g_user.nickname, g_user.gender, g_user.headimgurl, function(e) {
console.log("get login info succ:" + JSON.stringify(e));
if (200 == e.code) {
var r = e.token;
Servers.getEntry(r, function(e) {
200 == e.code ? cc.director.loadScene("MainScene") : util.show_error_info(null, null, e.msg);
});
} else util.show_error_info(null, null, e.msg);
}) : g_current_scene == SCENE_TAG.GONGHUI ? Servers.getLogin(g_user.player_id, g_user.nickname, g_user.gender, g_user.headimgurl, function(e) {
console.log("get login info succ:" + JSON.stringify(e));
if (200 == e.code) {
var r = e.token;
Servers.getEntry(r, function(e) {
200 == e.code ? cc.director.loadScene("GongHuiScene") : util.show_error_info(null, null, e.msg);
});
} else util.show_error_info(null, null, e.msg);
}) : g_current_scene == SCENE_TAG.GAMEINFO ? Servers.getLogin(g_user.player_id, g_user.nickname, g_user.gender, g_user.headimgurl, function(e) {
console.log("get login info succ:" + JSON.stringify(e));
if (200 == e.code) {
var r = e.token;
Servers.getEntry(r, function(e) {
200 == e.code ? cc.director.loadScene("MyGameInfoScene") : util.show_error_info(null, null, e.msg);
});
} else util.show_error_info(null, null, e.msg);
}) : g_current_scene == SCENE_TAG.WAITROOM ? Servers.getLogin(g_user.player_id, g_user.nickname, g_user.gender, g_user.headimgurl, function(e) {
console.log("get login info succ:" + JSON.stringify(e));
if (200 == e.code) {
var r = e.token;
Servers.getEntry(r, function(e) {
if (200 == e.code) {
util.show_error_info(null, null, "重新连接成功");
var r = {
player_id: g_user.id,
room_num: g_room_data.room_num,
rid: null
};
enter_wait_room(r, null);
} else util.show_error_info(null, null, e.msg);
});
} else util.show_error_info(null, null, e.msg);
}) : g_current_scene == SCENE_TAG.ROOM && Servers.getLogin(g_user.player_id, g_user.nickname, g_user.gender, g_user.headimgurl, function(e) {
console.log("get login info succ:" + JSON.stringify(e));
if (200 == e.code) {
var r = e.token;
Servers.getEntry(r, function(e) {
if (200 == e.code) {
util.show_error_info(null, null, "重新连接成功");
var n = {
rid: g_room_data.rid,
player_id: g_user.id
};
pomelo.request(util.getRepairEnterRoomRoute(), n, function(e) {
cc.log(JSON.stringify(e));
if (200 == e.code) {
var r = e.msg;
g_players_data.splice(0, g_players_data.length);
for (var o = 0; o < r.length; o++) null != r[o] && "null" != r[o] && g_players_data.push(r[o]);
pomelo.request(util.getRoomInfoRoute(), n, function(e) {
cc.log(JSON.stringify(e));
if (200 == e.code) {
for (var r in e.msg) g_room_data[r] = e.msg[r];
cc.director.loadScene("PJRoomScene");
} else util.show_error_info(null, null, e.msg);
});
} else util.show_error_info(null, null, e.msg);
});
} else util.show_error_info(null, null, e.msg);
});
} else util.show_error_info(null, null, e.msg);
});
});
};