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
    },
    //自定义的两个函数。将值保存在this变量里  
    setdata : function(json){  
        this.data = json;    
    },  
    getdata : function(){
        return this.data;    
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
