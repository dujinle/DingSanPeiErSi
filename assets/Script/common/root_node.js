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
			/*
			if(GlobalData.RunTimeParams.DisConnect == false){
				GlobalData.RunTimeParams.DisConnect = true;
				var login_type = -1;
				if(cc.sys.os == cc.sys.OS_ANDROID){
					login_type = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getNetType", "()I");
				}else if(cc.sys.os == cc.sys.OS_IOS){
					login_type = jsb.reflection.callStaticMethod("NativeOcClass", "getNetType");
				}
				console.log('获取网络状态',login_type);
				if(login_type != -1){
					ThirdAPI.reConnect();
				}else{
					var error_tip = cc.instantiate(GlobalData.assets["PopNetError"]);
					var error_tip_com = error_tip.getComponent("pop_net_error");
					self.node.addChild(error_tip);
					error_tip.setPosition(cc.v2(0,0));
					error_tip_com.onStart(180,"当前网络不可用，请检查自己的网络状态",function(status){
						GlobalData.RunTimeParams.DisConnect = false;
						error_tip.removeFromParent();
						error_tip.destroy();
						if(status == 'exit'){
							cc.director.loadScene("LoginScene");
						}else{
							ThirdAPI.reConnect();
						}
					});
				}
			}
			*/
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
