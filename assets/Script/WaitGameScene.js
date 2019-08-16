cc.Class({
    extends: cc.Component,

    properties: {
		roomList:cc.Node,
		roomContent:cc.Node,
    },

    onLoad () {
		GlobalData.RunTimeParams.CurrentScene = GlobalData.SCENE_TAG.WAITROOM;
		this.pomelo_removeListener();
		this.roomList.getComponent('ScrollView').clear_scroll_data();
		if(GlobalData.MyUserInfo.gonghui_id != null){
			this.initRoomScroll();
			this.node.on('scroll',this.scrollFunc,this);
		}else{
			util.show_error_info('您还没有加入任何公会，无法进行游戏，请加入公会！');
		}
		GlobalData.RunTimeParams.RoomData = null;
		cc.log("created_room_scene","start gointo created room scene......");
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
		this.roomList.getComponent('ScrollView').setInitData(room_datas,3);
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
					//验证房间有效性
					if(room_data.is_gaming != 0){
						util.show_error_info('游戏已经开始无法进入，换个房间试试！(下拉房间列表刷新)');
					}else if(room_data.real_num == room_data.player_num){
						util.show_error_info('房间人数已满无法进入，换个房间试试！(下拉房间列表刷新)');
					}else{
						var popRoom = cc.instantiate(GlobalData.assets['PopRoomScene']);
						popRoom.getComponent('pop_room_wait').initData(room_data,function(status){
							self.pomelo_removeListener();
						});
						self.node.addChild(popRoom);
						popRoom.setPosition(cc.v2(0,0));
					}
				}else{
					util.show_error_info('没有找到请求路由');
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
				self.node.removeFromParent();
				self.node.destroy();
			}
		},"你确定要退出界面吗？");
	},
	
	pomelo_removeListener(){
		cc.log("remove listener");
		pomelo.removeListener('onActBroadcast');
	},
});
