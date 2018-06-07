var gateHost = "193.112.243.189", loginHost = "193.112.243.189", gatePort = "3014", gateRouter = "gate.gateHandler.queryEntry", entryRouter = "connector.entryHandler.entry", loginPort = "8210", loginRouter = "login.loginHandler.login", gonghuiRouter = "user.gonghuiHandler.gonghuiProcess", storeRouter = "user.storeHandler.storeProcess", gameInfoRouter = "user.gameInfoHandler.gameInfoProcess", userInfoRouter = "user.userHandler.userInfoProcess", gameRouter = "game.gameHandler.gameProcess", userRoomRouter = "user.roomHandler.getRoomInfo", storeBuyRouter = "user.storeHandler.buy", feedbackRouter = "user.userHandler.feedback", Servers = Servers || {};

Servers.getPlayerInfo = function(e, o) {
pomelo.request(getPlayerInfo, {
playerId: e
}, function(e) {
o(e);
});
};

Servers.presents = function(e, o, r, t, n) {
pomelo.request(userPresents, {
from: e,
to: o,
number: t
}, function(e) {
n(e);
});
};

Servers.storeProcess = function(e, o, r) {
pomelo.request(storeRouter, {
process: e,
data: o
}, function(e) {
r(e);
});
};

Servers.gonghuiProcess = function(e, o, r) {
pomelo.request(gonghuiRouter, {
process: e,
data: o
}, function(e) {
r(e);
});
};

Servers.gameInfoProcess = function(e, o, r) {
pomelo.request(gameInfoRouter, {
process: e,
data: o
}, function(e) {
r(e);
});
};

Servers.userInfoProcess = function(e, o, r) {
pomelo.request(userInfoRouter, {
process: e,
data: o
}, function(e) {
r(e);
});
};

Servers.getLogin = function(e, o, r, t, n) {
pomelo.init({
host: loginHost,
port: loginPort
}, function() {
pomelo.request(loginRouter, {
player_id: e,
nick_name: o,
sex: r,
head_img: t
}, function(e) {
n(e);
});
});
};

Servers.getEntry = function(t, n) {
pomelo.init({
host: gateHost,
port: gatePort,
log: !0
}, function() {
console.log("init gate server ok");
pomelo.request(gateRouter, {}, function(e) {
console.log("gate info:" + JSON.stringify(e));
var o = e.host, r = e.port;
pomelo.init({
host: o,
port: r,
log: !0
}, function() {
pomelo.request(entryRouter, {
token: t
}, function(e) {
n(e);
});
});
});
});
};

Servers.getGateEntry = function(o) {
pomelo.init({
host: gateHost,
port: gatePort,
log: !0
}, function() {
console.log("init getGateEntry ok");
pomelo.request(gateRouter, function(e) {
console.log(JSON.stringify(e));
o(e);
});
});
};

Servers.feedback = function(e, o, r, t) {
pomelo.request(feedbackRouter, {
playerId: e,
title: o,
content: r
}, function(e) {
t(e);
});
};