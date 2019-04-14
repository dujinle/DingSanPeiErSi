let ThirdAPI = {
    StorageGName: 'GlobalKey', //全局数据存储

	//加载本地分数等数据并填充到全局变量
    loadLocalData: function () {
        //存储在云端的数据结构
        try {
            let storage = cc.sys.localStorage.getItem(ThirdAPI.StorageGName);
            console.log('storage data : ' + storage);
			if(storage != null && storage != ""){
				let localData = JSON.parse(storage);
                //兼容新添加的数据
				for(var key in localData){
					GlobalData[key] = localData[key];
				}
				console.log('loadLocalData',GlobalData);
            }
        } catch (error) {
			console.log(error);
		}
    },
   
	//更新游戏云端数据
    updateLocalData: function () {
        //云端数据再存储一份在本地
        try {
			var dataDic = {
				"AudioParams":GlobalData.AudioParams,
				'WXLoginParams':GlobalData.WXLoginParams
			};
			console.log('updataGameInfo',dataDic);
            let data = JSON.stringify(dataDic);
            cc.sys.localStorage.setItem(ThirdAPI.StorageGName, data);
        } catch (error) {
            console.error(error);
        }
    },
	reConnect:function(){
		if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.LOAD){
			cc.director.loadScene("LoginScene");
			return;
		}
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
					if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.MAIN){
						console.log("主页链接成功");
						//cc.director.loadScene("MainScene");
					}else if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.GONGHUI){
						//cc.director.loadScene("GongHuiScene");
					}else if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.GAMEINFO){
						//cc.director.loadScene("MyGameInfoScene");
					}else if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.WAITROOM){
						console.log("房间列表成功");
						//cc.director.loadScene("WaitGameScene");
					}else if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.ROOM){
						var roomScene = cc.director.getScene().getChildByName('Canvas');
						if(GlobalData.RunTimeParams.RoomData['game_type'] == 1){
							roomScene.getComponent("QZRoomScene").reConnect();
						}else if(GlobalData.RunTimeParams.RoomData['game_type'] == 3){
							roomScene.getComponent("LZRoomScene").reConnect();
						}else{
							roomScene.getComponent("SJRoomScene").reConnect();
						}
					}
				}else{
					util.show_error_info(data.msg);
				}
			});
		});
	},
	disConnect:function(){
		if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.MAIN){
			console.log("主页链接成功");
			//cc.director.loadScene("MainScene");
		}else if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.GONGHUI){
			//cc.director.loadScene("GongHuiScene");
		}else if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.GAMEINFO){
			//cc.director.loadScene("MyGameInfoScene");
		}else if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.WAITROOM){
			console.log("房间列表成功");
			var waitRoomScene = cc.director.getScene().getChildByName('Canvas');
			waitRoomScene.getComponent('WaitGameScene').pomelo_removeListener();
			//cc.director.loadScene("WaitGameScene");
		}else if(GlobalData.RunTimeParams.CurrentScene == GlobalData.SCENE_TAG.ROOM){
			var roomScene = cc.director.getScene().getChildByName('Canvas');
			if(GlobalData.RunTimeParams.RoomData['game_type'] == 1){
				roomScene.getComponent("QZRoomScene").onExit();
			}else if(GlobalData.RunTimeParams.RoomData['game_type'] == 3){
				roomScene.getComponent("LZRoomScene").onExit();
			}else{
				roomScene.getComponent("SJRoomScene").onExit();
			}
		}
	}
};
module.exports = ThirdAPI;