/**
 * Created by dujinle on 1/28/18.
 */
room_create = function(param,pthis){
	cc.log("start create room playerId:" + JSON.stringify(param));
	var size = cc.director.getVisibleSize();
	pomelo.request(util.getCreateRoute(), param, function(data) {
		cc.log(JSON.stringify(data));
		if(data.code != 200){
			util.show_error_info(pthis,size,data.msg);
			//cc.director.loadScene("MainScene");
			return ;
		}
		cc.log("create room succ" + JSON.stringify(data.msg));
		g_user["fangka_num"] = g_user["fangka_num"] - data.msg["fangka_num"];
		g_room_data = data.msg;
		cc.director.loadScene("CreatedRoomScene");
	});
}

enter_wait_room = function(param,pthis){
    pomelo.request(util.getEnterWaitRoomRoute(), param, function(data) {
		cc.log(JSON.stringify(data));
        if(data.code != 200) {
			util.show_error_info(pthis,null,data.msg);
			cc.director.loadScene("MainScene");
			return ;
        }
		cc.log("create room succ" + JSON.stringify(data.msg));
		g_room_data = data.msg;
		cc.director.loadScene("CreatedRoomScene");
    });
}

onGameEnterRoom = function(room_num,rid){
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

//断线重连请求
onReconnect = function(){
	cc.log("g_current_scene:" + g_current_scene);
	util.show_net_error("当前网络不可用，请检查自己的网络状态",function(){
		//在主界面断开连接进行重新登录
		if(g_current_scene == SCENE_TAG.MAIN){
			var token = wx.getStorageSync("token");
			Servers.getEntry(token,function(data){
				if(data.code == 200){
					cc.director.loadScene("MainScene");
				}else{
					cc.director.loadScene("LoginScene");
				}
			});
		}
		else if(g_current_scene == SCENE_TAG.GONGHUI){
			var token = wx.getStorageSync("token");
			Servers.getEntry(token,function(data){
				if(data.code == 200){
					cc.director.loadScene("MainScene");
				}else{
					cc.director.loadScene("LoginScene");
				}
			});
		}
		else if(g_current_scene == SCENE_TAG.GAMEINFO){
			var token = wx.getStorageSync("token");
			Servers.getEntry(token,function(data){
				if(data.code == 200){
					cc.director.loadScene("MainScene");
				}else{
					cc.director.loadScene("LoginScene");
				}
			});
		}
		else if(g_current_scene == SCENE_TAG.WAITROOM){
			var token = wx.getStorageSync("token");
			Servers.getEntry(token,function(data){
				if(data.code == 200){
					util.show_error_info(null,null,"重新连接成功");
					var param = {
						player_id:g_user.id,
						room_num: g_room_data["room_num"],
						rid: null
					};
					enter_wait_room(param,null);
				}else{
					cc.director.loadScene("LoginScene");
				}
			});
		}
		else if(g_current_scene == SCENE_TAG.ROOM){
			var token = wx.getStorageSync("token");
			Servers.getEntry(token,function(data){
				if(data.code == 200){
					util.show_error_info(null,null,"重新连接成功");
					var param = {
						"rid":g_room_data["rid"],
						"player_id":g_user["id"]
					};
					pomelo.request(util.getRepairEnterRoomRoute(), param, function(data) {
						cc.log(JSON.stringify(data));
						if(data.code == 200){
							var players = data.msg;
							g_players_data.splice(0,g_players_data.length);
							for(var i = 0;i < players.length;i++){
								if(players[i] != null && players[i] != "null"){
									g_players_data.push(players[i]);
								}
							}
							pomelo.request(util.getRoomInfoRoute(), param, function(data) {
								cc.log(JSON.stringify(data));
								if(data.code == 200){
									for(var key in data.msg) {
										g_room_data[key] = data.msg[key];
									}
									cc.director.loadScene("PJRoomScene");
								}else{
									util.show_error_info(null,null,data.msg);
								}
							});
						}else{
							util.show_error_info(null,null,data.msg);
						}
					});
				}else{
					cc.director.loadScene("LoginScene");
				}
			});
		}
	});
}