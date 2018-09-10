/**
 * Created by dujinle on 1/28/18.
 */
var room_create = function(param,pthis){
	cc.log("start create room playerId:" + JSON.stringify(param));
	var size = cc.director.getVisibleSize();
	pomelo.request(util.getCreateRoute(), param, function(data) {
		cc.log(JSON.stringify(data));
		if(data.code != 200){
			util.show_error_info(data.msg);
			//cc.director.loadScene("MainScene");
			return ;
		}
		cc.log("create room succ" + JSON.stringify(data.msg));
		g_user["fangka_num"] = g_user["fangka_num"] - data.msg["fangka_num"];
		g_room_data = data.msg;
		cc.director.loadScene("CreatedRoomScene");
	});
}

var enter_wait_room = function(param,pthis){
    pomelo.request(util.getEnterWaitRoomRoute(), param, function(data) {
		cc.log(JSON.stringify(data));
        if(data.code != 200) {
			util.show_error_info(data.msg);
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
				util.show_error_info(data.msg);
				cc.director.loadScene("MainScene");
				return ;
			}
			cc.log("create room succ" + JSON.stringify(data.msg));
			g_room_data = data.msg;
			g_next_scene = null;
			g_next_data = null;
			cc.director.loadScene("CreatedRoomScene");
		});
	}
}

//断线重连请求
var onReconnect = function(){
	cc.log("g_current_scene:" + g_current_scene);
	util.show_net_error("当前网络不可用，请检查自己的网络状态",function(){
		if(g_current_scene == SCENE_TAG.LOAD){
			cc.director.loadScene("LoginScene");
		}
		//在主界面断开连接进行重新登录
		else if(g_current_scene == SCENE_TAG.MAIN){
			Servers.getLogin(g_user['player_id'],g_user['nickname'],g_user['gender'],g_user['headimgurl'], function (data) {
				console.log("get login info succ:" + JSON.stringify(data));
				if(data.code != 200){
					util.show_error_info(data.msg);
					return;
				}
				var token = data.token;
				Servers.getEntry(token,function(data){
					if(data.code == 200){
						cc.director.loadScene("MainScene");
					}else{
						util.show_error_info(data.msg);
					}
				});
			});
		}
		else if(g_current_scene == SCENE_TAG.GONGHUI){
			Servers.getLogin(g_user['player_id'],g_user['nickname'],g_user['gender'],g_user['headimgurl'], function (data) {
				console.log("get login info succ:" + JSON.stringify(data));
				if(data.code != 200){
					util.show_error_info(data.msg);
					return;
				}
				var token = data.token;
				Servers.getEntry(token,function(data){
					if(data.code == 200){
						cc.director.loadScene("GongHuiScene");
					}else{
						util.show_error_info(data.msg);
					}
				});
			});
		}
		else if(g_current_scene == SCENE_TAG.GAMEINFO){
			Servers.getLogin(g_user['player_id'],g_user['nickname'],g_user['gender'],g_user['headimgurl'], function (data) {
				console.log("get login info succ:" + JSON.stringify(data));
				if(data.code != 200){
					util.show_error_info(data.msg);
					return;
				}
				var token = data.token;
				Servers.getEntry(token,function(data){
					if(data.code == 200){
						cc.director.loadScene("MyGameInfoScene");
					}else{
						util.show_error_info(data.msg);
					}
				});
			});
		}
		else if(g_current_scene == SCENE_TAG.WAITROOM){
			Servers.getLogin(g_user['player_id'],g_user['nickname'],g_user['gender'],g_user['headimgurl'], function (data) {
				console.log("get login info succ:" + JSON.stringify(data));
				if(data.code != 200){
					util.show_error_info(data.msg);
					return;
				}
				var token = data.token;
				Servers.getEntry(token,function(data){
					if(data.code == 200){
						util.show_error_info("重新连接成功");
						var param = {
							player_id:g_user.id,
							room_num: g_room_data["room_num"],
							rid: null
						};
						enter_wait_room(param,null);
					}else{
						util.show_error_info(data.msg);
					}
				});
			});
		}
		else if(g_current_scene == SCENE_TAG.ROOM){
			Servers.getLogin(g_user['player_id'],g_user['nickname'],g_user['gender'],g_user['headimgurl'], function (data) {
				console.log("get login info succ:" + JSON.stringify(data));
				if(data.code != 200){
					util.show_error_info(data.msg);
					return;
				}
				var token = data.token;
				Servers.getEntry(token,function(data){
					if(data.code == 200){
						util.show_error_info("重新连接成功");
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
										util.show_error_info(data.msg);
									}
								});
							}else{
								util.show_error_info(data.msg);
							}
						});
					}else{
						util.show_error_info(data.msg);
					}
				});
			});
		}
	});
}