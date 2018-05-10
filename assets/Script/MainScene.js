cc.Class({
    extends: cc.Component,

    properties: {
		touxiang_sprite:cc.Sprite,
        username_label:cc.Label,
        fangka_label:cc.Label,
        sex_sprite:cc.Sprite,
		audio:{
            url: cc.AudioClip,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("on load main scene.....");
		var self = this;
		g_music_key = cc.sys.localStorage.getItem(MUSIC_KEY);
		if(g_music_key == null || g_music_key == BOOL.YES){
			this.current = cc.audioEngine.play(this.audio, true, 1);
		}
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
	update(){
		this.fangka_label.string = g_user.fangka_num;
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
		cc.director.loadScene("GongHuiScene");
	},
	popMyGameScene(){
		cc.director.loadScene("MyGameInfoScene");
	},
	feed_back_scene(){
		cc.director.loadScene("FeedBack");
	},
	exit(){
		cc.director.end();
	},
	onDestroy: function () {
        cc.audioEngine.stop(this.current);
    }
});
