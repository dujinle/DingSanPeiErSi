/**
 * Created by dujinle on 1/28/18.
 */
 /*
var room_create = function(param,pthis){
	cc.log("start create room playerId:" + JSON.stringify(param));
	if(GlobalData.MyUserInfo.gonghui_id == null){
		util.show_error_info("您不是公会会长，无法进行房间的创建！");
	}else{
		Servers.gonghuiProcess('getGonghuiGongHuiId',{gonghui_id:GlobalData.MyUserInfo.gonghui_id},function(res){
			if(res.code == 200){
				var gonghuiInfo = res.msg;
				if(gonghuiInfo.player_id != GlobalData.MyUserInfo.id){
					util.show_error_info("您不是公会会长，无法进行房间的创建！");
				}else{
					pomelo.request(util.getCreateRoomRoute(), param, function(data) {
						cc.log(JSON.stringify(data));
						if(data.code != 200){
							util.show_error_info(data.msg);
						}else{
							util.show_error_info("创建房间成功!");
							GlobalData.MyUserInfo.fangka_num = GlobalData.MyUserInfo.fangka_num - 1;
							pthis.close_scene();
							return ;
						}
					});
				}
			}else{
				util.show_error_info("您不是公会会长，无法进行房间的创建！");
			}
		});
	}
}
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
	var error_tip = cc.instantiate(GlobalData.assets["PopNetError"]);
	var error_tip_com = error_tip.getComponent("pop_net_error");
	GlobalData.RunTimeParams.RootNode.addChild(error_tip);
	error_tip.setPosition(cc.v2(0,0));
	error_tip_com.onStart(180,"当前网络不可用，请检查自己的网络状态",null);
}