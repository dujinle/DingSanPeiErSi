cc.Class({
    extends: cc.Component,

    properties: {
        data:null,
		options:null,
    },

    // use this for initialization
    onLoad: function () {
		var self = this;
		cc.game.addPersistRootNode(this.node);
		pomelo.on('disconnect', function(){
			console.log('掉线了');
		});
		pomelo.on('heartbeat timeout',function(){
			console.log('心跳超时');
			wx.getNetworkType({
			  success: function(res) {
				// 返回网络类型, 有效值：
				// wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
				var networkType = res.networkType;
				if(networkType == "none"){
					onReconnect();
				}
			  }
			});
		});
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		cc.game.on(cc.game.EVENT_HIDE, function(){
			console.log("游戏进入后台");
			self.options = null;
		},this);
		cc.game.on(cc.game.EVENT_SHOW, function(){
			console.log("重新返回游戏");
			self.options = wx.getLaunchOptionsSync();
			cc.log(JSON.stringify(self.options));
			if(self.options['scene'] == 1007){
			if(self.options['query']['room_num'] != null){
				cc.log(self.options['query']);
				self.enter_scene(self.options['query']['room_num'],self.options['query']['rid']);
			}
		}
		},this);
		//this.schedule(this.my_update,0.5);
    },
    //自定义的两个函数。将值保存在this变量里
	
    setdata : function(json){  
        this.data = json;    
    },  
    getdata : function(){
        return this.data;    
    },
	enter_scene:function(room_num,rid){
		var param = {
			"room_num":room_num,
			"rid":rid,
			"player_id":g_user["id"]
		};
		var size = cc.director.getVisibleSize();
		pomelo.request(util.getEnterWaitRoomRoute(), param, function(data) {
			cc.log(JSON.stringify(data));
			if(data.code != 200){
				util.show_error_info(null,size,data.msg);
				cc.director.loadScene("MainScene");
				return ;
			}
			cc.log("create room succ" + JSON.stringify(data.msg));
			g_room_data = data.msg;
			cc.director.loadScene("CreatedRoomScene");
		});
	},
	onKeyDown (event) {
        switch(event.keyCode) {
            case cc.KEY.back:
				util.show_isok_info(function(flag){
					if(flag == true){
						cc.director.end();
					}else{
						cc.log("press back continue");
					}
				},'确定要退出游戏吗?');
                break;
        }
    }
});
