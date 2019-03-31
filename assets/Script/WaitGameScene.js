cc.Class({
    extends: cc.Component,

    properties: {
		roomContent:cc.Node,
		roomView:cc.Node,
		roomInfo:cc.Node,
		msage_scroll:cc.Node,
		choice_sprite:{
			type:cc.Node,
			default:[]
		},
		//房间信息
		roomNameNode:cc.Node,
		roomNumNode:cc.Node,
		fangkaNode:cc.Node,
		modelNode:cc.Node,
		maxNode:cc.Node,
		tips:cc.Node,
		lastRoomItem:null,
		enterFlag:false,
		player_num:0,
    },

    onLoad () {
		this.enterFlag = false;
		this.roomInfo.active = false;
		GlobalData.RunTimeParams.CurrentScene = GlobalData.SCENE_TAG.WAITROOM;
		this.roomContent.removeAllChildren();
		this.pomelo_removeListener();
		if(GlobalData.MyUserInfo.gonghui_id != null){
			this.tips.active = false;
			this.initRoomScroll();
			this.node.on("pressed", this.switchRadio, this);
			this.node.on("scroll", this.scrollFunc, this);
			this.pomelo_on();
			//this.schedule(this.freshRoomView,3);
		}else{
			this.roomView.active = false;
			this.roomInfo.active = false;
			this.tips.active = true;
			this.tips.getComponent(cc.Label).string = '您还没有加入任何公会，无法进行游戏，请加入公会！';
		}
		
		cc.log("created_room_scene","start gointo created room scene......");
	},
	freshRoomView(){
		var self = this;
		Servers.gonghuiProcess('getGonghuiGongHuiId',{gonghui_id:GlobalData.MyUserInfo.gonghui_id},function(res){
			console.log(res);
			if(res.code == 200){
				var gonghuiInfo = res.msg;
				var param = {
					"process":'getRoomByPlayerId',
					"player_id":gonghuiInfo.player_id
				};
				pomelo.request(util.getRoomInfoRoute(), param, function(data) {
					cc.log(JSON.stringify(data));
					if(data.code == 200){
						var room_datas = data.msg;
						for(var i = 0;i < room_datas.length;i++){
							var data = room_datas[i];
							if(self.roomContent.children.length > i){
								var item = self.roomContent.children[i];
								var itemCom = item.getComponent('roomItem');
								itemCom.initData(i,data);
							}else{
								var item = cc.instantiate(GlobalData.assets['roomItem']);
								var itemCom = item.getComponent('roomItem');
								itemCom.initData(i,data);
								self.roomContent.addChild(item);
							}
							if(GlobalData.RunTimeParams.RoomData.rid == data.rid){
								GlobalData.RunTimeParams.RoomData = data;
							}
						}
						self.init_room_pos(GlobalData.RunTimeParams.RoomData);
					}
				});
			}
		});
	},
	initRoomScroll(){
		var self = this;
		Servers.gonghuiProcess('getGonghuiGongHuiId',{gonghui_id:GlobalData.MyUserInfo.gonghui_id},function(res){
			console.log(res);
			if(res.code == 200){
				var gonghuiInfo = res.msg;
				var param = {
					"process":'getRoomByPlayerId',
					"player_id":gonghuiInfo.player_id
				};
				pomelo.request(util.getRoomInfoRoute(), param, function(data) {
					//cc.log(JSON.stringify(data));
					if(data.code == 200){
						self.initRoomView(data.msg);
					}else{
						util.show_error_info(data.msg);
					}
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
			var itemCom = item.getComponent('roomItem');
			itemCom.initData(i,data);
			this.roomContent.addChild(item);
			if(i == 0){
				this.lastRoomItem = item;
				//item.getComponent('roomItem').bgSprite.active = true;
				GlobalData.RunTimeParams.RoomData = data;
				//this.initRoomInfo(data);
			}
		}
	},
	initRoomInfo(room_data){
		this.roomNameNode.getComponent(cc.Label).string = room_data.fangzhu_name;
		this.roomNumNode.getComponent(cc.Label).string = room_data.room_num;
		this.modelNode.getComponent(cc.Label).string = GlobalData.GameModel[room_data.game_type];
		this.maxNode.getComponent(cc.Label).string = GlobalData.GameMaxType[room_data.max_type];
		if(room_data.game_type == 1){
			//抢庄
			this.fangkaNode.getComponent(cc.Label).string = '庄家消费房卡';
		}else{
			this.fangkaNode.getComponent(cc.Label).string = '1张/人';
		}
		this.init_room_pos(room_data);
	},
	init_room_pos(room_data){
		console.log('init_room_pos',room_data);
		var self = this;
		for(let i = 0; i < this.choice_sprite.length; i++){
			var item = this.choice_sprite[i].getComponent("player_select");
			if(i == 0){
				if(GlobalData.RunTimeParams.RoomData.game_type == 1){
					this.choice_sprite[i].getChildByName('zhuang').active = true;
				}else{
					this.choice_sprite[i].getChildByName('zhuang').active = false;
				}
			}
			var location = room_data["location" + (i + 1)];
			if(location != null && location != "null"){
				var player_id = location.split("*")[0];
				Servers.userInfoProcess("get_player",{player_id:player_id},function(data){
					if(data.code == 200){
						if(data.msg.head_img_url != null && data.msg.head_img_url.length > 0){
							cc.loader.load({url:data.msg.head_img_url,type:'png'},function (err, texture) {
								var frame = new cc.SpriteFrame(texture);
								self.choice_sprite[i].getComponent("cc.Sprite").spriteFrame = frame;
							});
						}else{
							self.choice_sprite[i].getComponent("cc.Sprite").spriteFrame = GlobalData.assets["headimg"];
						}
					}
				});
				item.set_flag(true);
			}else{
				this.choice_sprite[i].getComponent("cc.Sprite").spriteFrame = GlobalData.assets["wait_" + (i+1)];
				item.set_flag(false);
			}
			if(room_data["player_num"] <= room_data["real_num"]){
				item.set_flag(true);
			}
		}
	},
	scrollFunc(event){
		var self = this;
		this.roomInfo.active = false;
		if(GlobalData.RunTimeParams.RootNode != null){
			if(event.type == null || event.type != false){
				GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
			}
		}
		var data = event.target.getComponent("roomItem").roomInfo;
		var param = {
			"process":'getRoomById',
			"rid":data.rid
		};
		pomelo.request(util.getRoomInfoRoute(), param, function(roomRes) {
			cc.log(JSON.stringify(roomRes));
			if(roomRes.code == 200){
				self.roomInfo.active = true;
				var room_data = roomRes.msg;
				var itemCom = event.target.getComponent("roomItem");
				itemCom.initData(itemCom.idx,room_data);
				if(room_data.rid != GlobalData.RunTimeParams.RoomData.rid){
					
					if(self.enterFlag == true){
						self.leave_room(GlobalData.RunTimeParams.RoomData.rid);
					}
					if(self.lastRoomItem != null){
						self.lastRoomItem.getComponent("roomItem").bgSprite.active = false;
					}
				}
				GlobalData.RunTimeParams.RoomData = room_data;
				self.initRoomInfo(room_data);
				self.lastRoomItem = event.target;
			}
		});
	},
	onUserBroadcast_function(data){
		console.log("onUserBroadcast:"+JSON.stringify(data));
		var msage_scroll_com = this.msage_scroll.getComponent("msage_scroll");
		msage_scroll_com.set_string(data);
	},
	pomelo_on(){
		pomelo.on('onStartGame',this.onStartGame_function.bind(this));
    	pomelo.on('onEnterRoom',this.onEnterRoom_function.bind(this));
		pomelo.on('onLeaveRoom',this.onLeaveRoom_function.bind(this));
		pomelo.on('onActBroadcast',this.onUserBroadcast_function.bind(this));
	},
	onEnterRoom_function(data){
		var self = this;
		cc.log("pomelo on onEnterRoom_function:" + data.location+" is ready" + this.choice_sprite.length);
		var enter_location = data.location;
		this.enter_player = data.player;
		var enter_item = this.choice_sprite[enter_location - 1];
		var item_com = enter_item.getComponent("player_select");
		item_com.set_data(this.enter_player);
		item_com.set_flag(true);
		if(this.enter_player.head_img_url != null && this.enter_player.head_img_url.length > 0){
			cc.loader.load({url:this.enter_player.head_img_url,type:'png'},function (err, texture) {
				var frame = new cc.SpriteFrame(texture);
				enter_item.getComponent("cc.Sprite").spriteFrame = frame;
			});
		}else{
			enter_item.getComponent("cc.Sprite").spriteFrame = GlobalData.assets["headimg"];
		}
		GlobalData.RunTimeParams.RoomData['real_num'] += 1;
		//判断是否是自己，如果是自己则取消点击事件。
		if(self.enter_player.id == GlobalData.MyUserInfo["id"]){
			GlobalData.MyUserInfo["fangka_num"] = self.enter_player.fangka_num;
			for(let i = 0; i < self.choice_sprite.length; i++){
				var item = self.choice_sprite[i].getComponent("player_select");
				item.set_flag(true);
			}
		}
		if(GlobalData.RunTimeParams.RoomData['real_num'] >= GlobalData.RunTimeParams.RoomData["player_num"]){
			for(let i = 0; i < self.choice_sprite.length; i++){
				var item = self.choice_sprite[i].getComponent("player_select");
				item.set_flag(true);
			}
			var popDelayScene = cc.instantiate(GlobalData.assets['PopDelayScene']);
			this.node.addChild(popDelayScene);
			popDelayScene.setPosition(cc.v2(0,0));
			popDelayScene.getComponent('pop_delay_scene').onStart(5,function(){
				popDelayScene.removeFromParent();
				popDelayScene.destroy();
				//最后一个进来的 开始游戏
				if(self.enter_player.id == GlobalData.MyUserInfo["id"]){
					self.start_game();
				}
			});
		}
	},
	onLeaveRoom_function(data){
		console.log(data);
		var location = data.location;
		var room_info = data.data;
		var player_id = data.player_id;
		if(player_id == GlobalData.MyUserInfo.id){
			this.enterFlag = false;
		}else{
			GlobalData.RunTimeParams.RoomData['real_num'] -= 1;
		}
		
		if(location != -1){
			var item = this.choice_sprite[location - 1];
			var item_com = item.getComponent("player_select");
			item.set_data(null);
			item.set_flag(false);
			item.getComponent("cc.Sprite").spriteFrame = GlobalData.assets["wait_" + location];
		}
	},
	onStartGame_function(data){
		cc.log("pomelo on onStartGame_function:" + JSON.stringify(data));
		var self = this;
		var players = data.players;
		GlobalData.RunTimeParams.AllPlayers.splice(0,GlobalData.RunTimeParams.AllPlayers.length);
		for(var i = 0;i < players.length;i++){
			if(players[i] != null && players[i] != "null"){
				GlobalData.RunTimeParams.AllPlayers.push(players[i]);
			}
		}
		var param = {
			"process":'getRoomById',
			"rid":GlobalData.RunTimeParams.RoomData["rid"]
		};
		pomelo.request(util.getRoomInfoRoute(), param, function(data) {
			cc.log(JSON.stringify(data));
			if(data.code == 200){
				for(var key in data.msg) {
					GlobalData.RunTimeParams.RoomData[key] = data.msg[key];
				}
				self.pomelo_removeListener();
				if(GlobalData.RunTimeParams.RoomData['game_type'] == 1){
					cc.director.loadScene("QZRoomScene");
				}else if(GlobalData.RunTimeParams.RoomData['game_type'] == 3){
					cc.director.loadScene("LZRoomScene");
				}else{
					cc.director.loadScene("PJRoomScene");
				}
			}else{
				util.show_error_info(data.msg);
			}
		});
	},
    
	game_back(){
		var self = this;
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		util.show_isok_info(function(flag){
			if(flag == true){
				if(self.enterFlag == true){
					//房主打算退出房间
					self.leave_room(GlobalData.RunTimeParams.RoomData.rid);
				}
				self.pomelo_removeListener();
				cc.director.loadScene("MainScene");
			}
		},"你确定要退出界面吗？");
	},
	start_game(){
		//进入游戏房间，发送公告告诉准备的玩家进入游戏
		var self = this;
		var param = {
			rid:GlobalData.RunTimeParams.RoomData["rid"]
		};
		pomelo.request(util.getStartGameRoute(), param, function(data) {
			cc.log(JSON.stringify(data));
		});
	},
	leave_room(rid){
		var self = this;
		var param = {
			rid:rid,
			player_id:GlobalData.MyUserInfo["id"],
			location:null
		};
		console.log('leave_room',param);
		pomelo.request(util.getLeaveRoomRoute(), param, function(data) {
			cc.log(JSON.stringify(data));
			if(data.code == 200){
				self.enterFlag = false;
			}
		});
	},
	switchRadio(event) {
		var self = this;
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
        var index = event.target.getComponent("player_select").index;
		var type = event.target.getComponent("player_select").type;
		cc.log("switchRadio : index:" + index + " type:" + type);
        for(let i = 0; i < this.choice_sprite.length; i++){
			var item = this.choice_sprite[i].getComponent("player_select");
            if(item.index == index){
				var flag = item.get_flag();
				if(flag == false){
					item.set_flag(true);
					var param = {
						rid:GlobalData.RunTimeParams.RoomData["rid"],
						location:index,
						player_id:GlobalData.MyUserInfo["id"]
					};
					pomelo.request(util.getEnterRoute(), param, function(data) {
						if(data.code == 200){
							self.enterFlag = true;
						}else if(data.code == 201){
							util.show_error_info(data.msg);
							self.scrollFunc({'target':self.lastRoomItem,'type':false});
						}else{
							item.set_flag(false);
							util.show_error_info(data.msg);
						}
						cc.log(JSON.stringify(data));
					});
				}
				break;
            }
        }
    },
	pomelo_removeListener(){
		cc.log("remove listener");
        pomelo.removeListener('onStartGame');
		pomelo.removeListener('onEnterRoom');
        pomelo.removeListener('onLeaveRoom');
		pomelo.removeListener('onActBroadcast');
	},
});
