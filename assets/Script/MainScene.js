cc.Class({
    extends: cc.Component,

    properties: {
		user_info:cc.Node,
        username_label:cc.Label,
        fangka_label:cc.Label,
        sex_sprite:cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("on load main scene.....");
		this.node.on("pressed", this.buy_fangka_scene, this);
		this.username_label.string = g_user.nickName;
        this.fangka_label.string = g_user.fangka;
		if(g_user.gender == 1){
			this.sex_sprite.spriteFrame = g_assets["gender1"];
        }
		//test for 
		cc.loader.loadResDir("",cc.SpriteFrame,function (err, assets) {
			for(var i = 0;i < assets.length;i++){
				g_assets[assets[i].name] = assets[i];
				cc.log("load res :" + assets[i].name);
			}
		});
		cc.loader.loadResDir("prefab",function (err, assets) {
			for(var i = 0;i < assets.length;i++){
				g_assets[assets[i].name] = assets[i];
				cc.log("load res :" + assets[i].name);
			}
		});
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
		var pop_buyfangka_com = this.pop_buyfangka.getComponent("buy_fangka");
		pop_buyfangka_com.init(g_buy_fangka_data);
		this.node.addChild(this.pop_buyfangka);
		this.pop_buyfangka.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
	},
	store_scene(){
		cc.director.loadScene("StoreScene");
	},
	feed_back_scene(){
		cc.director.loadScene("FeedBack");
	},
	exit(){
		cc.director.end();
	}
});
