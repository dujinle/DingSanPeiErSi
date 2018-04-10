(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/compare/game_player_item.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0ac50C0VvpHK7fELCHsSS37', 'game_player_item', __filename);
// Script/compare/game_player_item.js

"use strict";

cc.Class({
	extends: cc.Component,

	properties: {
		player_name: cc.Label,
		start_gold: cc.Label,
		end_gold: cc.Label,
		diff_gold: cc.Label
	},

	onLoad: function onLoad() {},
	set_player_info: function set_player_info(infos) {
		cc.log(JSON.stringify(infos));
		this.player_name.string = infos[0];
		this.start_gold.string = infos[1];
		this.end_gold.string = infos[2];
		this.diff_gold.string = infos[3];
	}
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=game_player_item.js.map
        