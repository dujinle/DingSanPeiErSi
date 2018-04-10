"use strict";
cc._RF.push(module, '80075bAHldNQrIGuxPiNse3', 'enter_game_scene');
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