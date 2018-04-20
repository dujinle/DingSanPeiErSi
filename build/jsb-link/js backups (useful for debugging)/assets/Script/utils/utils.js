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
return "ZJH" == g_game_type ? "game.ZJHGameHandler.ZJHGameProcess" : "TDK" == g_game_type ? "game.TDKGameHandler.TDKGameProcess" : "ZHQ" == g_game_type ? "game.ZHQGameHandler.ZHQGameProcess" : void 0;
};

util.getCreateRoute = function() {
return "ZJH" == g_game_type ? "connector.ZJHEntryHandler.create" : "TDK" == g_game_type ? "connector.TDKEntryHandler.create" : "ZHQ" == g_game_type ? "connector.ZHQEntryHandler.create" : void 0;
};

util.getEnterRoute = function() {
return "ZJH" == g_game_type ? "connector.ZJHEntryHandler.enter" : "TDK" == g_game_type ? "connector.TDKEntryHandler.enter" : "ZHQ" == g_game_type ? "connector.ZHQEntryHandler.enter" : void 0;
};

util.show_error_info = function(e, t, n) {
var r = cc.instantiate(g_assets.prop_error_scene);
r.getComponent("prop_error_info").show_error_info(n);
e.node.addChild(r);
r.setPosition(e.node.convertToNodeSpace(t.width / 2, t.height / 2));
};