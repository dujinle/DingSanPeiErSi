var ThirdAPI = require('ThirdAPI');
cc.Class({
    extends: cc.Component,

    properties: {
        data:null,
		audioSources:{
			type:cc.AudioSource,
			default:[]
		},
		mainAudio:{
            type: cc.AudioClip,
            default: null
        },
		gameAudio:{
			type: cc.AudioClip,
            default: null
		}
    },

    // use this for initialization
    onLoad: function () {
		cc.game.addPersistRootNode(this.node);
		var self = this;
		pomelo.on('disconnect', function(){
			console.log('掉线了');
			/*如果没有进行过掉线的处理*/
			if(GlobalData.RunTimeParams.DisConnect == false){
				GlobalData.RunTimeParams.DisConnect = true;
				onReconnect();
			}
		});
		pomelo.on('heartbeat timeout',function(){
			console.log('心跳超时');
		});
    },
    //自定义的两个函数。将值保存在this变量里  
    setdata : function(json){
        this.data = json;    
    },
    getdata : function(){
        return this.data;    
    },
	play(type){
		if(GlobalData.AudioParams.SOUND_KEY == 1){
			this.audioSources[type].getComponent(cc.AudioSource).play();
		}
	},
	playBg(type){
		if(GlobalData.AudioParams.MUSIC_KEY == 1){
			cc.audioEngine.stopAll();
			if(type == GlobalData.AudioIdx.MainAudioBg){
				this.current = cc.audioEngine.play(this.mainAudio, true, 1);
			}else if(type == GlobalData.AudioIdx.GameAudioBg){
				this.current = cc.audioEngine.play(this.gameAudio, true, 1);
			}
			
		}
	},
	stopBg(){
		if(this.current != null){
			cc.audioEngine.stop(this.current);
		}
	}
});
