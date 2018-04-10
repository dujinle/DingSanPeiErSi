"use strict";
cc._RF.push(module, '1670aKLL5hOAIWk8H6TNuBZ', 'MainScene');
// Script/MainScene.js

"use strict";

cc.Class({
	extends: cc.Component,

	properties: {
		username_label: cc.Label,
		fangka_label: cc.Label,
		diamond_label: cc.Label,
		sex_sprite: cc.Sprite,
		entergame_layout: cc.Node
	},

	// LIFE-CYCLE CALLBACKS:

	onLoad: function onLoad() {
		cc.log("on load main scene.....");
		window.g_game_type = "ZJH";
		var self = this;
		self.username_label.string = g_user.nickName;
		self.fangka_label.string = g_user.fangka;
		self.diamond_label.string = g_user.diamond;
		if (g_user.gender == 1) {
			self.sex_sprite.spriteFrame = g_assets["gender1"];
		}
	},
	popUserLayer: function popUserLayer() {
		cc.log("start init pop user layer info");
		var size = cc.director.getWinSize();
		this.user_layer = cc.instantiate(g_assets["pop_userinfo"]);
		var user_layer_com = this.user_layer.getComponent("popUserLayer");
		this.node.addChild(this.user_layer);
		this.user_layer.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 2)));
		user_layer_com.show();
	},
	enterGameLayer: function enterGameLayer(event, customEventData) {
		cc.log("enterGameLayer type:" + customEventData);
		g_game_type = customEventData;
		this.game_layout.getComponent("game_scene").hide();
		this.entergame_layout.getComponent("enter_game_scene").show();
	},
	enterGameBack: function enterGameBack() {
		this.game_layout.getComponent("game_scene").show();
		this.entergame_layout.getComponent("enter_game_scene").hide();
	},
	popCreateGameLayer: function popCreateGameLayer() {
		cc.log("got info createGameLayer......");
		var size = cc.director.getWinSize();
		if (g_game_type == "ZJH") {
			this.pop_game_layer = cc.instantiate(g_assets["pop_creat_zjh_game"]);
			this.node.addChild(this.pop_game_layer);
			this.pop_game_layer.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 2)));
		} else if (g_game_type == "TDK") {
			this.pop_game_layer = cc.instantiate(g_assets["pop_creat_tdk_game"]);
			this.node.addChild(this.pop_game_layer);
			this.pop_game_layer.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 2)));
		} else if (g_game_type == "ZHQ") {
			this.pop_game_layer = cc.instantiate(g_assets["pop_creat_zhq_game"]);
			this.node.addChild(this.pop_game_layer);
			this.pop_game_layer.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 2)));
		}
	},
	popEnterGameLayer: function popEnterGameLayer() {
		cc.log("go into popEnterGameLayer......");
		var size = cc.director.getWinSize();
		this.pop_enter_game_layer = cc.instantiate(g_assets["pop_enter_game"]);
		this.node.addChild(this.pop_enter_game_layer);
		this.pop_enter_game_layer.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 2)));
	},
	store_scene: function store_scene() {
		cc.director.loadScene("StoreScene");
	},
	feed_back_scene: function feed_back_scene() {
		cc.director.loadScene("FeedBack");
	},
	exit: function exit() {
		cc.director.end();
	}
});

cc._RF.pop();