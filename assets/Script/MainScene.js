
cc.Class({
    extends: cc.Component,

    properties: {
		touxiang_sprite:cc.Sprite,
        username_label:cc.Label,
        fangka_label:cc.Label,
        sex_sprite:cc.Sprite,
		exit_node:cc.Node,
		audio:{
            url: cc.AudioClip,
            default: null
        }
    },

    onLoad () {
        cc.log("on load main scene.....");
		g_current_scene = SCENE_TAG.MAIN;
		var size = cc.director.getWinSize();
		if(g_gonggao_tag == false){
			this.gongao_scene = cc.instantiate(g_assets["GonggaoScene"]);
			this.node.addChild(this.gongao_scene);
			this.gongao_scene.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
			g_gonggao_tag = true;
		}
		
		g_root_node = cc.director.getScene().getChildByName('RootNode');
		var self = this;
		if (cc.sys.os == cc.sys.OS_ANDROID) {
			jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "setLoadStatus", "(I)V",1);
		}else if(cc.sys.os == cc.sys.OS_IOS){
			this.exit_node.active = false;
			jsb.reflection.callStaticMethod("NativeOcClass", "setLoadStatus:",1);
		}
		g_music_key = cc.sys.localStorage.getItem(MUSIC_KEY);
		if(g_music_key == null || g_music_key == BOOL.YES){
			cc.audioEngine.stopAll();
			this.current = cc.audioEngine.play(this.audio, true, 1);
		}
		this.username_label.string = g_user.nick_name;
        this.fangka_label.string = g_user.fangka_num;
		if(g_user.gender == 1){
			this.sex_sprite.spriteFrame = g_assets["gender1"];
        }
		if(g_user.headimgurl != null && g_user.headimgurl.length > 0){
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
	popHelpScene(){
		var size = cc.director.getWinSize();
		this.pop_help_scene = cc.instantiate(g_assets["PopHelpScene"]);
		this.node.addChild(this.pop_help_scene);
		this.pop_help_scene.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
	},
	exit(){
		if (cc.sys.os == cc.sys.OS_ANDROID) {
			cc.director.end();
		}else if(cc.sys.os == cc.sys.OS_IOS){
			//cc.director.popScene();
		}
	},
	onDestroy: function () {
        cc.audioEngine.stop(this.current);
    }
});
