var ThirdAPI = require('ThirdAPI');
cc.Class({
    extends: cc.Component,

    properties: {
		choice_sprite:{
			type:cc.Sprite,
			default:[],
		},
		callback:null,
		bg_sprite:cc.Node,
    },
    onLoad () {
		cc.log("start go into create game js");
		this.init_back_info();
		this.node.on("pressed", this.switchRadio, this);
		this.node.on(cc.Node.EventType.TOUCH_START,function(e){
			e.stopPropagation();
		})
	},
	init_back_info(){
		var g_music_key = GlobalData.AudioParams.MUSIC_KEY;
        var g_sound_key = GlobalData.AudioParams.SOUND_KEY;
        var g_chat_key = GlobalData.AudioParams.CHAT_KEY;
		var values = [g_music_key,g_sound_key,g_chat_key,0];
		for(var i = 0;i < this.choice_sprite.length;i++){
			var sprite = this.choice_sprite[i];
			if(values[i] == 0){
				sprite.spriteFrame = GlobalData.assets["set_close"];
			}else{
				sprite.spriteFrame = GlobalData.assets["set_open"];
			}
		}
	},
	set_callback(callback){
		this.callback = callback;
	},
    buttonCloseCallback:function(){
        console.log("running buttonCloseCallback:function()");
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		this.node.removeFromParent();
        this.destroy();
    },
    buttonMusicSettingCallback(){
		var sprite = this.choice_sprite[0];
        if(GlobalData.AudioParams.MUSIC_KEY == 0){
            GlobalData.AudioParams.MUSIC_KEY = 1;
			sprite.spriteFrame = GlobalData.assets["set_open"];
        }else{
            GlobalData.AudioParams.MUSIC_KEY = 0;
			sprite.spriteFrame = GlobalData.assets["set_close"];
        }
		ThirdAPI.updateLocalData();
    },
    buttonSoundSettingCallback(){
		var sprite = this.choice_sprite[1];
        if(GlobalData.AudioParams.SOUND_KEY == 0){
			GlobalData.AudioParams.SOUND_KEY = 1;
			sprite.spriteFrame = GlobalData.assets["set_open"];
        }else{
            GlobalData.AudioParams.SOUND_KEY = 0;
			sprite.spriteFrame = GlobalData.assets["set_close"];
        }
		ThirdAPI.updateLocalData();
    },
    buttonChatSettingCallback(){
		var sprite = this.choice_sprite[2];
        if(GlobalData.AudioParams.CHAT_KEY == 0){
			GlobalData.AudioParams.CHAT_KEY = 1;
			sprite.spriteFrame = GlobalData.assets["set_open"];
        }else{
			GlobalData.AudioParams.CHAT_KEY = 0;
			sprite.spriteFrame = GlobalData.assets["set_close"];
        }
		ThirdAPI.updateLocalData();
    },
	switchRadio(event) {
		event.stopPropagation();
        var index = event.target.getComponent("one_choice").index;
		var type = event.target.getComponent("one_choice").type;
		cc.log("switchRadio : index:" + index + " type:" + type);
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		if(index == 0){
			this.buttonMusicSettingCallback();
		}else if(index == 1){
			this.buttonSoundSettingCallback();
		}else if(index == 2){
			this.buttonChatSettingCallback();
		}else if(index == 3){
			this.buttonShockSettingCallback();
		}
		this.callback(index);
    },
});
