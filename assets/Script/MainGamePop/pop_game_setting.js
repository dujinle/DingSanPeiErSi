var ThirdAPI = require('ThirdAPI');
cc.Class({
    extends: cc.Component,

    properties: {
		choice_sprite:{
			type:cc.Sprite,
			default:[],
		},
		soundNode:cc.Node,
		effectNode:cc.Node,
		callback:null,
		bg_sprite:cc.Node,
    },
    onLoad () {
		cc.log("start go into create game js");
		this.init_back_info();
		//this.node.on("pressed", this.switchRadio, this);
		this.node.on(cc.Node.EventType.TOUCH_START,function(e){
			e.stopPropagation();
		})
	},
	init_back_info(){
		var g_music_key = GlobalData.AudioParams.MUSIC_KEY;
        var g_sound_key = GlobalData.AudioParams.SOUND_KEY;
        var g_chat_key = GlobalData.AudioParams.CHAT_KEY;

		if(g_music_key == 0){
			this.soundNode.getChildByName('open_sprite').active = false;
			this.soundNode.getChildByName('close_sprite').active = true;
		}else{
			this.soundNode.getChildByName('open_sprite').active = true;
			this.soundNode.getChildByName('close_sprite').active = false;
		}
		if(g_sound_key == 0){
			this.effectNode.getChildByName('open_sprite').active = false;
			this.effectNode.getChildByName('close_sprite').active = true;
		}else{
			this.effectNode.getChildByName('open_sprite').active = true;
			this.effectNode.getChildByName('close_sprite').active = false;
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
        if(GlobalData.AudioParams.MUSIC_KEY == 0){
            GlobalData.AudioParams.MUSIC_KEY = 1;
			this.soundNode.getChildByName('open_sprite').active = true;
			this.soundNode.getChildByName('close_sprite').active = false;
        }else{
            GlobalData.AudioParams.MUSIC_KEY = 0;
			this.soundNode.getChildByName('open_sprite').active = false;
			this.soundNode.getChildByName('close_sprite').active = true;
        }
		ThirdAPI.updateLocalData();
		this.callback(0);
    },
    buttonSoundSettingCallback(){
        if(GlobalData.AudioParams.SOUND_KEY == 0){
			GlobalData.AudioParams.SOUND_KEY = 1;
			this.effectNode.getChildByName('open_sprite').active = true;
			this.effectNode.getChildByName('close_sprite').active = false;
        }else{
            GlobalData.AudioParams.SOUND_KEY = 0;
			this.effectNode.getChildByName('open_sprite').active = false;
			this.effectNode.getChildByName('close_sprite').active = true;
        }
		ThirdAPI.updateLocalData();
		this.callback(1);
    }
});
