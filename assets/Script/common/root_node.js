cc.Class({
    extends: cc.Component,

    properties: {
        data:null,
    },

    // use this for initialization
    onLoad: function () {
        cc.game.addPersistRootNode(this.node);
		cc.eventManager.addListener({
			event:cc.EventListener.KEYBOARD,
			onKeyReleased : function(keyCode,event){
				cc.log("keyCode:" + keyCode + " cc.KEY.back:" + cc.KEY.back);
				if (keyCode == cc.KEY.back) {
					cc.director.popScene();
				}
			}
		}, this);
		pomelo.on('disconnect', function(){
			console.log('掉线了');
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
		});
		pomelo.on('heartbeat timeout',function(){
			console.log('心跳超时');
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
