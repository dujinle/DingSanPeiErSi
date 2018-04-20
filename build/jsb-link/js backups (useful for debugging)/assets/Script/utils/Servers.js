var gateHost = "192.168.10.130", loginHost = "192.168.10.130", gatePort = "3014", gateRouter = "gate.gateHandler.queryEntry", entryRouter = "connector.entryHandler.entry", loginPort = "8210", loginRouter = "login.loginHandler.login", registerRouter = "login.loginHandler.register", isPhoneRouter = "login.loginHandler.isPhone", userUpdateRouter = "user.userHandler.updateInfo", userAddGoldRouter = "user.storeHandler.addGold", userUpdateAccount = "user.userHandler.updateAccount", getPlayerInfo = "user.userHandler.getPlayerInfo", userPresents = "user.userHandler.presents", storeBuyGift = "user.storeHandler.buyGift", storeBuyEquip = "user.storeHandler.buyEquip", storeBuyDiamond = "user.storeHandler.buyDiamond", storeGetData = "user.storeHandler.getStoreData", userRoomRouter = "user.roomHandler.getRoomInfo", storeBuyRouter = "user.storeHandler.buy", feedbackRouter = "user.userHandler.feedback", timeingRewardRouter = "user.taskHandler.timingReward", serverTime = "user.taskHandler.serverTime", Servers = Servers || {};

Servers.updateAccount = function(e, r, o, t) {
pomelo.request(userUpdateAccount, {
userId: e,
userName: r,
password: o
}, function(e) {
t(e);
});
};

Servers.queryRoomByRoomNum = function(e, r) {
pomelo.request(userRoomRouter, {
roomNum: e
}, function(e) {
r(e);
});
};

Servers.buyDiamond = function(e, r, o) {
pomelo.request(storeBuyDiamond, {
playerId: e,
number: r
}, function(e) {
o(e);
});
};

Servers.getPlayerInfo = function(e, r) {
pomelo.request(getPlayerInfo, {
playerId: e
}, function(e) {
r(e);
});
};

Servers.storeBuyEquip = function(e, r, o, t) {
pomelo.request(storeBuyEquip, {
playerId: e,
equip: r,
number: o
}, function(e) {
t(e);
});
};

Servers.buyGold = function(e, r, o) {
pomelo.request(storeBuyGold, {
playerId: e,
number: r
}, function(e) {
o(e);
});
};

Servers.presents = function(e, r, o, t, n) {
pomelo.request(userPresents, {
from: e,
to: r,
number: t
}, function(e) {
n(e);
});
};

Servers.buyGift = function(e, r, o, t) {
pomelo.request(storeBuyGift, {
playerId: e,
gift: r,
number: o
}, function(e) {
t(e);
});
};

Servers.getUpdateInfo = function(e, r, o, t, n) {
pomelo.request(userUpdateRouter, {
playerId: e,
signature: r,
gender: o,
nickName: t
}, function(e) {
n(e);
});
};

Servers.getAddGold = function(e, r, o, t) {
pomelo.request(userAddGoldRouter, {
playerId: e,
gold: r,
diamond: o
}, function(e) {
t(e);
});
};

Servers.getLogin = function(e, r, o) {
pomelo.init({
host: loginHost,
port: loginPort
}, function() {
pomelo.request(loginRouter, {
phone_num: e,
password: r
}, function(e) {
o(e);
});
});
};

Servers.getIsPhone = function(e, r) {
pomelo.init({
host: loginHost,
port: loginPort
}, function() {
pomelo.request(isPhoneRouter, {
phone_num: e
}, function(e) {
r(e);
});
});
};

Servers.getRegister = function(e, r, o, t, n, u) {
pomelo.init({
host: loginHost,
port: loginPort
}, function() {
pomelo.request(registerRouter, {
phone_num: e,
nick_name: r,
password: o,
sign_text: t,
sex_type: n
}, function(e) {
console.log("get register server succ......");
u(e);
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
var r = e.host, o = e.port;
pomelo.init({
host: r,
port: o,
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

Servers.getGateEntry = function(r) {
pomelo.init({
host: gateHost,
port: gatePort,
log: !0
}, function() {
console.log("init getGateEntry ok");
pomelo.request(gateRouter, function(e) {
console.log(JSON.stringify(e));
r(e);
});
});
};

Servers.getStore = function(r) {
pomelo.request(storeGetData, {}, function(e) {
r(e);
});
};

Servers.storeBuy = function(e, r, o) {
pomelo.request(storeBuyRouter, {
playerId: e,
tag: r
}, function(e) {
o(e);
});
};

Servers.feedback = function(e, r, o, t) {
pomelo.request(feedbackRouter, {
playerId: e,
title: r,
content: o
}, function(e) {
t(e);
});
};

Servers.timingReward = function(e, r, o) {
pomelo.request(timeingRewardRouter, {
playerId: e,
flag: r
}, function(e) {
o(e);
});
};

Servers.getServerTime = function(r) {
pomelo.request("user.taskHandler.serverTime", {}, function(e) {
r(e);
});
};

var vipRewardRouter = "user.taskHandler.eventVipReward";

Servers.vipReward = function(e, r, o) {
pomelo.request(vipRewardRouter, {
playerId: e,
vip: r
}, function(e) {
o(e);
});
};

var storeItemRouter = "user.storeHandler.getStoreItem";

Servers.getStoreItem = function(e, r) {
pomelo.request(storeItemRouter, {
itemId: e
}, function(e) {
r(e);
});
};

var eventTreeExtractRouter = "user.taskHandler.eventTreeExtract";

Servers.eventTreeExtract = function(e, r) {
pomelo.request(eventTreeExtractRouter, {
playerId: e
}, function(e) {
r(e);
});
};

var eventTreeGetTreeRouter = "user.taskHandler.getTree";

Servers.getTree = function(e, r) {
pomelo.request(eventTreeGetTreeRouter, {
playerId: e
}, function(e) {
r(e);
});
};

var finishTaskRouter = "user.taskHandler.finishTask";

Servers.finishTask = function(e, r, o) {
pomelo.request(finishTaskRouter, {
playerId: e,
flag: r
}, function(e) {
o(e);
});
};