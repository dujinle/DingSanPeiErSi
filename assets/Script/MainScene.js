var wxapi = require('wxapi');
cc.Class({
    extends: cc.Component,

    properties: {
		touxiang_sprite:cc.Sprite,
        username_label:cc.Label,
        fangka_label:cc.Label,
		gold:cc.Label,
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
		wxapi.set_load_status(1);
		this.username_label.string = GlobalData.MyUserInfo.nick_name;
        this.fangka_label.string = GlobalData.MyUserInfo.fangka_num;
		this.gold.string = GlobalData.MyUserInfo.gold;
		
		var self = this;
		if(GlobalData.MyUserInfo.headimgurl != null && GlobalData.MyUserInfo.headimgurl.length > 0){
			cc.loader.load({url:GlobalData.MyUserInfo.headimgurl,type:'png'},function (err, texture) {
				 var frame = new cc.SpriteFrame(texture);
				 self.touxiang_sprite.spriteFrame = frame;
			});
		}
		var param = {
			process:'get_player',
			player_id:GlobalData.MyUserInfo["id"]
		};
		Servers.request('userInfoRouter',param,function(data){
			for(var key in data.msg) {
				GlobalData.MyUserInfo[key] = data.msg[key];
			}
		});
    },
	update(dt){
		if(this.freshTime >= 0.3){
			this.fangka_label.string = GlobalData.MyUserInfo.fangka_num;
			this.gold.string = GlobalData.MyUserInfo.gold;
			this.freshTime = 0;
		}
		this.freshTime += dt;
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
			//GlobalData.RunTimeParams.RootNode.getComponent('root_node').stopBg();
		}
		this.pop_gonghui_scene = cc.instantiate(GlobalData.assets["PopGongHuiScene"]);
		this.pop_gonghui_scene.setPosition(cc.v2(0,0));
		this.node.addChild(this.pop_gonghui_scene);
	},
	popMyGameScene(){
		var self = this;
		var size = cc.winSize;
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
			//GlobalData.RunTimeParams.RootNode.getComponent('root_node').stopBg();
		}
		this.pop_zhanji_scene = cc.instantiate(GlobalData.assets["PopZhanjiScene"]);
		this.pop_zhanji_scene.setPosition(cc.v2(0,0));
		this.node.addChild(this.pop_zhanji_scene);
		this.pop_zhanji_scene.getComponent('my_game_zhanji').init_zhanji_info(GlobalData.MyUserInfo,this);
	},
	popJiaoYiScene(){
		var self = this;
		var size = cc.winSize;
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
			//GlobalData.RunTimeParams.RootNode.getComponent('root_node').stopBg();
		}
		this.pop_jiaoyi_scene = cc.instantiate(GlobalData.assets["PopJiaoYiScene"]);
		this.pop_jiaoyi_scene.setPosition(cc.v2(0,0));
		this.node.addChild(this.pop_jiaoyi_scene);
		this.pop_jiaoyi_scene.getComponent('my_game_record').init_record_info(GlobalData.MyUserInfo,this);
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
