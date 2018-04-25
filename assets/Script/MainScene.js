cc.Class({
    extends: cc.Component,

    properties: {
		touxiang_sprite:cc.Sprite,
        username_label:cc.Label,
        fangka_label:cc.Label,
        sex_sprite:cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("on load main scene.....");
		var self = this;
		//this.node.on("pressed", this.buy_fangka_scene, this);
		this.username_label.string = g_user.nick_name;
        this.fangka_label.string = g_user.fangka_num;
		if(g_user.gender == 1){
			this.sex_sprite.spriteFrame = g_assets["gender1"];
        }
		if(g_user.headimgurl != null){
			cc.loader.load({url:g_user.headimgurl,type:'png'},function (err, texture) {
				 var frame = new cc.SpriteFrame(texture);
				 g_assets["headimg"] = frame;
				 self.touxiang_sprite.spriteFrame = frame;
			});
		}else{
			g_assets["headimg"] = self.touxiang_sprite.spriteFrame;
		}
    },
    popUserLayer(){
        cc.log("start init pop user layer info");
		var size = cc.director.getWinSize();
		this.user_layer = cc.instantiate(g_assets["pop_userinfo"]);
		var user_layer_com = this.user_layer.getComponent("popUserLayer");
		this.node.addChild(this.user_layer);
		this.user_layer.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
		user_layer_com.show();
    },
	buy_fangka_scene(){
		var size = cc.director.getWinSize();
		this.pop_buyfangka = cc.instantiate(g_assets["PopBuyFangKaScene"]);
		this.node.addChild(this.pop_buyfangka);
		this.pop_buyfangka.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
	},
	popCreatScene(){
		var size = cc.director.getWinSize();
		this.pop_creat_scene = cc.instantiate(g_assets["PopCreatRoomScene"]);
		this.node.addChild(this.pop_creat_scene);
		this.pop_creat_scene.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
	},
	popEnterScene(){
		var size = cc.director.getWinSize();
		this.pop_enter_scene = cc.instantiate(g_assets["PopEnterRoomScene"]);
		this.node.addChild(this.pop_enter_scene);
		this.pop_enter_scene.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
	},
	popGonghuiScene(){
		var size = cc.director.getWinSize();
		this.pop_gonghui_scene = cc.instantiate(g_assets["PopGongHuiScene"]);
		this.node.addChild(this.pop_gonghui_scene);
		this.pop_gonghui_scene.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
	},
	popMyGameScene(){
		var size = cc.director.getWinSize();
		this.pop_game_scene = cc.instantiate(g_assets["PopGameInfoScene"]);
		this.node.addChild(this.pop_game_scene);
		this.pop_game_scene.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
	},
	feed_back_scene(){
		cc.director.loadScene("FeedBack");
	},
	exit(){
		cc.director.end();
	}
});
