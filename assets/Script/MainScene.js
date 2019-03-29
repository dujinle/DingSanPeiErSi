
cc.Class({
    extends: cc.Component,

    properties: {
		touxiang_sprite:cc.Sprite,
        username_label:cc.Label,
        fangka_label:cc.Label,
		gold:cc.Label,
        sex_sprite:cc.Sprite,
		exit_node:cc.Node,
		freshTime:0,
    },

    onLoad () {
        cc.log("on load main scene.....");
		GlobalData.RunTimeParams.CurrentScene = GlobalData.SCENE_TAG.MAIN;
		var size = cc.winSize ;
		if(GlobalData.RunTimeParams.GongGaoTag == false){
			this.gongao_scene = cc.instantiate(GlobalData.assets["GonggaoScene"]);
			this.node.addChild(this.gongao_scene);
			this.gongao_scene.setPosition(this.node.convertToNodeSpaceAR(cc.v2(size.width/2,size.height/2)));
			GlobalData.RunTimeParams.GongGaoTag = true;
		}
		
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').playBg(GlobalData.AudioIdx.MainAudioBg);
		}
		
		//wxapi.set_load_status(1);
		this.username_label.string = GlobalData.MyUserInfo.nick_name;
        this.fangka_label.string = GlobalData.MyUserInfo.fangka_num;
		this.gold.string = GlobalData.MyUserInfo.gold;
		if(GlobalData.MyUserInfo.gender == 1){
			this.sex_sprite.spriteFrame = GlobalData.assets["gender1"];
        }
		var self = this;
		if(GlobalData.MyUserInfo.headimgurl != null && GlobalData.MyUserInfo.headimgurl.length > 0){
			cc.loader.load({url:GlobalData.MyUserInfo.headimgurl,type:'png'},function (err, texture) {
				 var frame = new cc.SpriteFrame(texture);
				 GlobalData.assets["headimg"] = frame;
				 self.touxiang_sprite.spriteFrame = frame;
			});
		}else{
			GlobalData.assets["headimg"] = self.touxiang_sprite.spriteFrame;
		}
		Servers.userInfoProcess("get_player",{player_id:GlobalData.MyUserInfo["id"]},function(data){
			if(data.code == 200){
				for(var key in data.msg) {
					GlobalData.MyUserInfo[key] = data.msg[key];
				}
			}
		});
    },
	update(dt){
		if(this.freshTime >= 1.5){
			this.fangka_label.string = GlobalData.MyUserInfo.fangka_num;
			this.gold.string = GlobalData.MyUserInfo.gold;
			this.freshTime = 0;
		}
		this.freshTime += dt;
	},
	buy_fangka_scene(){
		var size = cc.winSize;
		this.pop_buyfangka = cc.instantiate(GlobalData.assets["PopBuyFangKaScene"]);
		this.node.addChild(this.pop_buyfangka);
		this.pop_buyfangka.setPosition(this.node.convertToNodeSpaceAR(cc.v2(size.width/2,size.height/2)));
	},
	popCreatScene(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		var size = cc.winSize;
		this.pop_creat_scene = cc.instantiate(GlobalData.assets["PopCreatRoomScene"]);
		this.node.addChild(this.pop_creat_scene);
		this.pop_creat_scene.setPosition(this.node.convertToNodeSpaceAR(cc.v2(size.width/2,size.height/2)));
	},
	popEnterScene(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').stopBg();
		}
		cc.director.loadScene("WaitGameScene");
	},
	popGonghuiScene(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').stopBg();
		}
		cc.director.loadScene("GongHuiScene");
	},
	popMyGameScene(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').stopBg();
		}
		cc.director.loadScene("MyGameInfoScene");
	},
	popHelpScene(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		var size = cc.winSize;
		this.pop_help_scene = cc.instantiate(GlobalData.assets["PopHelpScene"]);
		this.node.addChild(this.pop_help_scene);
		this.pop_help_scene.setPosition(this.node.convertToNodeSpaceAR(cc.v2(size.width/2,size.height/2)));
	},
	popFeedBackScene(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		var size = cc.winSize;
		this.pop_feedback_scene = cc.instantiate(GlobalData.assets["PopFeedBack"]);
		this.node.addChild(this.pop_feedback_scene);
		this.pop_feedback_scene.setPosition(this.node.convertToNodeSpaceAR(cc.v2(size.width/2,size.height/2)));
	},
	popSettingScene(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		var self = this;
		var size = cc.winSize;
		var pop_setting = cc.instantiate(GlobalData.assets["PopSettingScene"]);
		var pop_setting_com = pop_setting.getComponent("pop_game_setting");
		
		pop_setting_com.set_callback(function(index){
			if(index == 0){
				if(GlobalData.AudioParams.MUSIC_KEY == 0){
					GlobalData.RunTimeParams.RootNode.getComponent('root_node').stopBg();
				}else if(GlobalData.AudioParams.MUSIC_KEY == 1){
					GlobalData.RunTimeParams.RootNode.getComponent('root_node').playBg(GlobalData.AudioIdx.MainAudioBg);
				}
			}
		});
		var x = size.width/2;
		var y = size.height/2;
		this.node.addChild(pop_setting);
		pop_setting.setPosition(this.node.convertToNodeSpaceAR(cc.v2(x,y)));
	},
	exit(){
		if (cc.sys.os == cc.sys.OS_ANDROID) {
			cc.director.end();
			cc.game.end();
		}else if(cc.sys.os == cc.sys.OS_IOS){
			//cc.director.popScene();
		}
	}
});
