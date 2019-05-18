cc.Class({
    extends: cc.Component,

    properties: {
		roomContent:cc.Node,
		msage_scroll:cc.Node,
		//房间信息
		tips:cc.Label,
    },

    onLoad () {
		GlobalData.RunTimeParams.CurrentScene = GlobalData.SCENE_TAG.WAITROOM;
		this.roomContent.removeAllChildren();
		this.pomelo_removeListener();
		if(GlobalData.MyUserInfo.gonghui_id != null){
			this.tips.node.active = false;
			this.initRoomScroll();
			this.pomelo_on();
			this.node.on('scroll',this.scrollFunc);
			//this.schedule(this.freshRoomView,3);
		}else{
			this.tips.node.active = true;
			this.tips.string = '您还没有加入任何公会，无法进行游戏，请加入公会！';
		}
		GlobalData.RunTimeParams.RoomData = null;
		cc.log("created_room_scene","start gointo created room scene......");
	},
	
	freshRoomView(){
		var self = this;
		if(GlobalData.MyUserInfo.gonghui_id != null){
			var p = {
				process:'getGonghuiGongHuiId',
				gonghui_id:GlobalData.MyUserInfo.gonghui_id
			}
			Servers.request('gonghuiRouter',p,function(res){
				var gonghuiInfo = res.msg;
				if(gonghuiInfo != null){
					var param = {
						"process":'getRoomByPlayerId',
						"player_id":gonghuiInfo.player_id
					};
					Servers.request('roomInfoRouter', param, function(data) {
						var room_datas = data.msg;
						for(var i = 0;i < room_datas.length;i++){
							var data = room_datas[i];
							if(self.roomContent.children.length > i){
								var item = self.roomContent.children[i];
								var itemCom = item.getComponent('room_item');
								itemCom.initData(i,data);
							}else{
								var item = cc.instantiate(GlobalData.assets['roomItem']);
								var itemCom = item.getComponent('room_item');
								itemCom.initData(i,data);
								self.roomContent.addChild(item);
							}
							if(GlobalData.RunTimeParams.RoomData.rid == data.rid){
								GlobalData.RunTimeParams.RoomData = data;
							}
						}
					});
				}
			});
		}
	},
	
	initRoomScroll(){
		var self = this;
		var param = {
			process:'getGonghuiGongHuiId',
			gonghui_id:GlobalData.MyUserInfo.gonghui_id
		}
		Servers.request('gonghuiRouter',param,function(res){
			console.log(res);
			var gonghuiInfo = res.msg;
			if(gonghuiInfo != null){
				var param = {
					"process":'getRoomByPlayerId',
					"player_id":gonghuiInfo.player_id
				};
				Servers.request('roomInfoRouter', param, function(data) {
					//cc.log(JSON.stringify(data));
					self.initRoomView(data.msg);
				});
			}
		});
	},
	
	initRoomView(room_datas){
		if(room_datas == null){
			return;
		}
		for(var i = 0;i < room_datas.length;i++){
			var data = room_datas[i];
			var item = cc.instantiate(GlobalData.assets['roomItem']);
			var itemCom = item.getComponent('room_item');
			itemCom.initData(i,data);
			this.roomContent.addChild(item);
		}
	},

	scrollFunc(event){
		var self = this;
		if(event.target){
			var data = event.target.getComponent("room_item").roomInfo;
			var param = {
				"process":'getRoomById',
				"rid":data.rid
			};
			Servers.request('roomInfoRouter', param, function(roomRes) {
				cc.log(JSON.stringify(roomRes));
				var room_data = roomRes.msg;
				if(room_data != null){
					var popRoom = cc.instantiate(GlobalData.assets['PopRoomScene']);
					popRoom.getComponent('pop_room_wait').initData(room_data);
					self.node.addChild(popRoom);
					popRoom.setPosition(cc.v2(0,0));
				}
			});
		}
	},
	
	onUserBroadcast_function(data){
		console.log("onUserBroadcast:"+JSON.stringify(data));
		var msage_scroll_com = this.msage_scroll.getComponent("msage_scroll");
		msage_scroll_com.set_string(data);
	},
	pomelo_on(){
		pomelo.on('onActBroadcast',this.onUserBroadcast_function.bind(this));
	},
	game_back(){
		var self = this;
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		util.show_isok_info(function(flag){
			if(flag == true){
				self.pomelo_removeListener();
				cc.director.loadScene("MainScene");
			}
		},"你确定要退出界面吗？");
	},
	start_game(){
		//进入游戏房间，发送公告告诉准备的玩家进入游戏
		var self = this;
		var param = {
			process:null,
			rid:GlobalData.RunTimeParams.RoomData["rid"]
		};
		Servers.request('startGameRouter', param, function(data) {
			cc.log(JSON.stringify(data));
		});
	},
	leave_room(rid){
		var self = this;
		var param = {
			process:null,
			rid:rid,
			player_id:GlobalData.MyUserInfo["id"],
			location:this.enterLocation
		};
		console.log('leave_room',param);
		Servers.request('leaveRoomRouter', param, function(data) {
			cc.log(JSON.stringify(data));
			if(data.code == 200){
				self.enterFlag = false;
			}
		});
	},
	pomelo_removeListener(){
		cc.log("remove listener");
		pomelo.removeListener('onActBroadcast');
	},
});
