(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/game_scene/enter_game_scene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '80075bAHldNQrIGuxPiNse3', 'enter_game_scene', __filename);
// Script/game_scene/enter_game_scene.js

"use strict";

cc.Class({
		extends: cc.Component,

		properties: {
				create_game_sprite: cc.Node,
				enter_game_sprite: cc.Node,
				back: cc.Node
		},

		// LIFE-CYCLE CALLBACKS:

		onLoad: function onLoad() {
				cc.log("load enter game scene js");
		},
		hide: function hide() {
				cc.log("start go into enter game scene hide");
				this.create_game_sprite.getComponent(cc.Button).interactable = false;
				this.enter_game_sprite.getComponent(cc.Button).interactable = false;
				this.back.getComponent(cc.Button).interactable = false;
				this.node.active = false;
		},
		show: function show() {
				cc.log("start go into enter game scene show");
				this.create_game_sprite.getComponent(cc.Button).interactable = true;
				this.enter_game_sprite.getComponent(cc.Button).interactable = true;
				this.back.getComponent(cc.Button).interactable = true;
				this.node.active = true;
		},
		start: function start() {}
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
        //# sourceMappingURL=enter_game_scene.js.map
        