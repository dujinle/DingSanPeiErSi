/**
 * Created by dujinle on 1/28/18.
 */
var enter_wait_room = function(param,pthis){
    pomelo.request(util.getEnterWaitRoomRoute(), param, function(data) {
		cc.log(JSON.stringify(data));
        if(data.code != 200) {
			util.show_error_info(data.msg);
			cc.director.loadScene("MainScene");
			return ;
        }
		cc.log("create room succ" + JSON.stringify(data.msg));
		GlobalData.RunTimeParams.RoomData = data.msg;
		cc.director.loadScene("CreatedRoomScene");
    });
}

//断线重连请求
var onReconnect = function(){
	console.log("GlobalData.RunTimeParams.CurrentScene:" + GlobalData.RunTimeParams.CurrentScene);
	
	if(GlobalData.RunTimeParams.RootNode == null){
		console.log("GlobalData.RunTimeParams.RootNode: null");
		return;
	}
	/*如果没有进行过掉线的处理*/
	if(GlobalData.RunTimeParams.DisConnect == false){
		var error_tip = cc.instantiate(GlobalData.assets["PopNetError"]);
		var error_tip_com = error_tip.getComponent("pop_net_error");
		GlobalData.RunTimeParams.RootNode.addChild(error_tip);
		error_tip.setPosition(cc.v2(0,0));
		error_tip_com.onStart(90,"当前网络不可用，请检查自己的网络状态",null);
	}
}