var ThirdAPI = require('ThirdAPI');
cc.Class({
    extends: cc.Component,

    properties: {
        delayTime:0,
		delayLabel:cc.Node,
		tipsLabel:cc.Node,
		callback:null,
    },
    onLoad () {
		this.node.on(cc.Node.EventType.TOUCH_START,function(e){
			e.stopPropagation();
		})
    },
	onStart(time,message,cb){
		this.delayTime = time;
		this.callback = cb;
		this.tipsLabel.getComponent(cc.Label).string = message;
		this.delayLabel.getComponent(cc.Label).string = "(" + this.delayTime + "s)";
		this.schedule(this.delayFunc,1);
		GlobalData.RunTimeParams.DisConnect = true;
	},
	delayFunc(){
		this.delayTime -= 1;
		this.delayLabel.getComponent(cc.Label).string = "(" + this.delayTime + "s)";
		if(this.delayTime <= 0){
			GlobalData.RunTimeParams.DisConnect = false;
			this.unschedule(this.delayFunc);
			this.node.removeFromParent();
			this.node.destroy();
			ThirdAPI.disConnect();
			cc.director.loadScene("LoginScene");
		}
		//获取底层的网络状态
		var login_type = -1;
		if(cc.sys.os == cc.sys.OS_ANDROID){
			login_type = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getNetType", "()I");
		}else if(cc.sys.os == cc.sys.OS_IOS){
			login_type = jsb.reflection.callStaticMethod("NativeOcClass", "getNetType");
		}
		
		if(login_type != -1){
			GlobalData.RunTimeParams.DisConnect = false;
			this.unschedule(this.delayFunc);
			this.node.removeFromParent();
			this.node.destroy();
			ThirdAPI.reConnect();
		}
	}
});
