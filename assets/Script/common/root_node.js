cc.Class({
    extends: cc.Component,

    properties: {
        data:null,
    },

    // use this for initialization
    onLoad: function () {
        cc.game.addPersistRootNode(this.node);
		pomelo.on('disconnect', function(){
			console.log('掉线了');
			var login_type = -1;
			if(cc.sys.os == cc.sys.OS_ANDROID){
				login_type = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getNetType", "()I");
			}else if(cc.sys.os == cc.sys.OS_IOS){
				login_type = jsb.reflection.callStaticMethod("NativeOcClass", "getNetType");
			}
			console.log('掉线了' + login_type);
			if(login_type != -1){
				Servers.getLogin(g_user['player_id'],g_user['nickname'],g_user['gender'],g_user['headimgurl'], function (data) {
					console.log("get login info succ:" + JSON.stringify(data));
					if(data.code != 200){
						util.show_error_info(null,null,data.msg);
						return;
					}
					var token = data.token;
					Servers.getEntry(token,function(data){
						if(data.code != 200){
							util.show_error_info(null,null,data.msg);
						}
					});
				});
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
});
