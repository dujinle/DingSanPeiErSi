/**
 * Created by dujinle on 1/28/18.
 */
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
	cc.log("GlobalData.RunTimeParams.CurrentScene:" + GlobalData.RunTimeParams.CurrentScene);
	util.show_net_error("当前网络不可用，请检查自己的网络状态",function(){
		if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.LOAD){
			cc.director.loadScene("LoginScene");
		}
		//在主界面断开连接进行重新登录
		else if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.MAIN){
			Servers.getLogin(GlobalData.MyUserInfo['player_id'],GlobalData.MyUserInfo['nickname'],GlobalData.MyUserInfo['gender'],GlobalData.MyUserInfo['headimgurl'], function (data) {
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
		else if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.GONGHUI){
			Servers.getLogin(GlobalData.MyUserInfo['player_id'],GlobalData.MyUserInfo['nickname'],GlobalData.MyUserInfo['gender'],GlobalData.MyUserInfo['headimgurl'], function (data) {
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
		else if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.GAMEINFO){
			Servers.getLogin(GlobalData.MyUserInfo['player_id'],GlobalData.MyUserInfo['nickname'],GlobalData.MyUserInfo['gender'],GlobalData.MyUserInfo['headimgurl'], function (data) {
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
		else if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.WAITROOM){
			Servers.getLogin(GlobalData.MyUserInfo['player_id'],GlobalData.MyUserInfo['nickname'],GlobalData.MyUserInfo['gender'],GlobalData.MyUserInfo['headimgurl'], function (data) {
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
							player_id:GlobalData.MyUserInfo.id,
							room_num: GlobalData.RunTimeParams.RoomData["room_num"],
							rid: null
						};
						enter_wait_room(param,null);
					}else{
						util.show_error_info(data.msg);
					}
				});
			});
		}
		else if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.ROOM){
			Servers.getLogin(GlobalData.MyUserInfo['player_id'],GlobalData.MyUserInfo['nickname'],GlobalData.MyUserInfo['gender'],GlobalData.MyUserInfo['headimgurl'], function (data) {
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
							"rid":GlobalData.RunTimeParams.RoomData["rid"],
							"player_id":GlobalData.MyUserInfo["id"]
						};
						pomelo.request(util.getRepairEnterRoomRoute(), param, function(data) {
							cc.log(JSON.stringify(data));
							if(data.code == 200){
								var players = data.msg;
								GlobalData.RunTimeParams.AllPlayers.splice(0,GlobalData.RunTimeParams.AllPlayers.length);
								for(var i = 0;i < players.length;i++){
									if(players[i] != null && players[i] != "null"){
										GlobalData.RunTimeParams.AllPlayers.push(players[i]);
									}
								}
								pomelo.request(util.getRoomInfoRoute(), param, function(data) {
									cc.log(JSON.stringify(data));
									if(data.code == 200){
										for(var key in data.msg) {
											GlobalData.RunTimeParams.RoomData[key] = data.msg[key];
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