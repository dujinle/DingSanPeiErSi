/**
 * Created by dujinle on 1/28/18.
 */
var room_create = function(param,pthis){
	cc.log("start create room playerId:" + JSON.stringify(param));
	var size = cc.director.getVisibleSize();
	pomelo.request(util.getCreateRoute(), param, function(data) {
		cc.log(JSON.stringify(data));
		if(data.code != 200){
			util.show_error_info(pthis,size,data.msg);
			cc.director.loadScene("MainScene");
			return ;
		}
		cc.log("create room succ" + JSON.stringify(data.msg));
		g_room_data = data.msg;
		cc.director.loadScene("CreatedRoomScene");
	});
}

var enter_wait_room = function(param,pthis){
    pomelo.request(util.getEnterWaitRoomRoute(), param, function(data) {
		cc.log(JSON.stringify(data));
        if(data.code != 200) {
			util.show_error_info(pthis,size,data.msg);
			cc.director.loadScene("MainScene");
			return ;
        }
		cc.log("create room succ" + JSON.stringify(data.msg));
		g_room_data = data.msg;
		cc.director.loadScene("CreatedRoomScene");
    });
}

var onGameEnterRoom = function(room_num,rid){
	//这是回调函数如果已经登录则直接进入相应的界面
	if(g_is_login == true){
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
			g_next_scene = null;
			g_next_data = null;
			cc.director.loadScene("CreatedRoomScene");
		});
	}else{
		//如果没有登录则执行登录操作并进入相应的界面
		g_next_scene = "enter_room";
		g_next_data = {
			"room_num":room_num,
			"rid":rid
		};
		g_login_auto = true;
	}
}