(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/game_scene/game_scene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8d4afA99/1CSJlZKjH1aVWl', 'game_scene', __filename);
// Script/game_scene/game_scene.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
		extends: cc.Component,

		properties: {},

		// LIFE-CYCLE CALLBACKS:

		onLoad: function onLoad() {
				cc.log("load game scene js");
				this.zjh_sprite = this.node.getChildByName("ZJH_sprite");
				this.tdk_sprite = this.node.getChildByName("TDK_sprite");
				this.zhq_sprite = this.node.getChildByName("ZHQ_sprite");
		},
		hide: function hide() {
				cc.log("start go into game scene hide");
				this.zjh_sprite.getComponent(cc.Button).interactable = false;
				this.tdk_sprite.getComponent(cc.Button).interactable = false;
				this.zhq_sprite.getComponent(cc.Button).interactable = false;
				this.node.active = false;
		},
		show: function show() {
				cc.log("start go into game scene show");
				this.zjh_sprite.getComponent(cc.Button).interactable = true;
				this.tdk_sprite.getComponent(cc.Button).interactable = true;
				this.zhq_sprite.getComponent(cc.Button).interactable = true;
				this.node.active = true;
		},
		start: function start() {}
}

// update (dt) {},
);

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
        //# sourceMappingURL=game_scene.js.map
        