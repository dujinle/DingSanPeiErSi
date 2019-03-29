
cc.Class({
    extends: cc.Component,

    properties: {
        message:cc.Label,
        error_sprite:cc.Sprite,
		cb:null,
    },
    onLoad () {
		this.updateTimer = 0;  
        this.updateInterval = 0.2;
    },
	show_error_info(message,cb){
		this.message.string = message;
		this.cb = cb;
	},
	update(dt){
		this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) {
            return; // we don't need to do the math every frame
        }
		this.updateTimer = 0;
		//获取底层的网络状态
		if(cc.sys.os == cc.sys.OS_ANDROID){
			var login_type = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getNetType", "()I");
			if(login_type != -1){
				this.cb();
				this.node.active = false;
				this.node.destroy();
			}
		}else if(cc.sys.os == cc.sys.OS_IOS){
			var login_type = jsb.reflection.callStaticMethod("NativeOcClass", "getNetType");
			if(login_type != -1){
				this.cb();
				this.node.active = false;
				this.node.destroy();
			}
		}
	}
});
