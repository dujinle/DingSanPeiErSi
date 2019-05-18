cc.Class({
    extends: cc.Component,

    properties: {
		roomInfo:null,
		roomNameLabel:cc.Label,
		roomNumLabel:cc.Label,
		fangkaLabel:cc.Label,
		modelLabel:cc.Label,
		maxNodeLabel:cc.Label,
		tipsLabel:cc.Label,
		choice_sprite:{
			type:cc.Node,
			default:[]
		},
		enterFlag:false,
    },

    onLoad () {
		this.enterFlag = false;
		this.node.on(cc.Node.EventType.TOUCH_START,function(e){
			e.stopPropagation();
		})
		this.node.on("pressed", this.switchRadio, this);
	},
	initData(room_data){
		this.roomInfo = room_data;
		this.roomNameLabel.string = room_data.fangzhu_name;
		this.roomNumLabel.string = room_data.room_num;
		this.modelLabel.string = GlobalData.GameModel[room_data.game_type];
		this.maxNodeLabel.string = GlobalData.GameMaxType[room_data.max_type];
		if(room_data.game_type == 1){
			//抢庄
			this.fangkaLabel.string = '庄家消费房卡';
		}else{
			this.fangkaLabel.string = '1张/人';
		}
		this.init_room_pos(room_data);
	},
	
	game_back(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		if(this.enterFlag == true){
			//房主打算退出房间
			this.leave_room(this.roomInfo.rid);
		}
		this.pomelo_removeListener();
		this.node.removeFromParent();
		this.node.destroy();
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
				var param = {
					process:'get_player',
					player_id:player_id
				};
				Servers.request('userInfoRouter',param,function(data){
					if(data.msg != null && data.msg.head_img_url != null && data.msg.head_img_url.length > 0){
						cc.loader.load({url:data.msg.head_img_url,type:'png'},function (err, texture) {
							var frame = new cc.SpriteFrame(texture);
							self.choice_sprite[i].getComponent("cc.Sprite").spriteFrame = frame;
						});
					}else{
						self.choice_sprite[i].getComponent("cc.Sprite").spriteFrame = GlobalData.assets["man"];
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
	
	onEnterRoom_function(data){
		var self = this;
		cc.log("pomelo on onEnterRoom_function:" + data.location+" is ready" + this.choice_sprite.length);
		this.enterLocation = data.location;
		var last_enter_player_id = data.player[data.location - 1];
		var param = {
			process:'get_player'
		};
		if(data.player[0] != null){
			param['player_id'] = data.player[0];
			Servers.request('userInfoRouter',param,function(data){
				let enter_player = data.msg;
				let enter_item = self.choice_sprite[0];
				let item_com = enter_item.getComponent("player_select");
				item_com.set_data(enter_player);
				item_com.set_flag(true);
				if(enter_player.head_img_url != null && enter_player.head_img_url.length > 0){
					cc.loader.load({url:enter_player.head_img_url,type:'png'},function (err, texture) {
						var frame = new cc.SpriteFrame(texture);
						enter_item.getComponent("cc.Sprite").spriteFrame = frame;
					});
				}else{
					enter_item.getComponent("cc.Sprite").spriteFrame = GlobalData.assets["man"];
				}
			});
		}
		
		if(data.player[1] != null){
			param['player_id'] = data.player[1];
			Servers.request('userInfoRouter',param,function(data){
				let enter_player = data.msg;
				let enter_item = self.choice_sprite[1];
				let item_com = enter_item.getComponent("player_select");
				item_com.set_data(enter_player);
				item_com.set_flag(true);
				if(enter_player.head_img_url != null && enter_player.head_img_url.length > 0){
					cc.loader.load({url:enter_player.head_img_url,type:'png'},function (err, texture) {
						var frame = new cc.SpriteFrame(texture);
						enter_item.getComponent("cc.Sprite").spriteFrame = frame;
					});
				}else{
					enter_item.getComponent("cc.Sprite").spriteFrame = GlobalData.assets["man"];
				}
			});
		}
		
		if(data.player[2] != null){
			param['player_id'] = data.player[2];
			Servers.request('userInfoRouter',param,function(data){
				let enter_player = data.msg;
				let enter_item = self.choice_sprite[2];
				let item_com = enter_item.getComponent("player_select");
				item_com.set_data(enter_player);
				item_com.set_flag(true);
				if(enter_player.head_img_url != null && enter_player.head_img_url.length > 0){
					cc.loader.load({url:enter_player.head_img_url,type:'png'},function (err, texture) {
						var frame = new cc.SpriteFrame(texture);
						enter_item.getComponent("cc.Sprite").spriteFrame = frame;
					});
				}else{
					enter_item.getComponent("cc.Sprite").spriteFrame = GlobalData.assets["man"];
				}
			});
		}
		
		if(data.player[3] != null){
			param['player_id'] = data.player[3];
			Servers.request('userInfoRouter',param,function(data){
				let enter_player = data.msg;
				let enter_item = self.choice_sprite[3];
				let item_com = enter_item.getComponent("player_select");
				item_com.set_data(enter_player);
				item_com.set_flag(true);
				if(enter_player.head_img_url != null && enter_player.head_img_url.length > 0){
					cc.loader.load({url:enter_player.head_img_url,type:'png'},function (err, texture) {
						var frame = new cc.SpriteFrame(texture);
						enter_item.getComponent("cc.Sprite").spriteFrame = frame;
					});
				}else{
					enter_item.getComponent("cc.Sprite").spriteFrame = GlobalData.assets["man"];
				}
			});
		}
		
		GlobalData.RunTimeParams.RoomData['real_num'] = data.real_num;
		//判断是否是自己，如果是自己则取消点击事件。
		if(last_enter_player_id == GlobalData.MyUserInfo["id"]){
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
				if(last_enter_player_id == GlobalData.MyUserInfo["id"]){
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
		GlobalData.RunTimeParams.RoomData['real_num'] = data.real_num;
		if(player_id == GlobalData.MyUserInfo.id){
			this.enterFlag = false;
		}
		
		if(location != null){
			var item = this.choice_sprite[location - 1];
			var item_com = item.getComponent("player_select");
			item.getComponent("cc.Sprite").spriteFrame = GlobalData.assets["wait_" + location];
			item_com.set_data(null);
			item_com.set_flag(false);
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
		Servers.request('roomInfoRouter', param, function(data) {
			cc.log(JSON.stringify(data));
			for(var key in data.msg) {
				GlobalData.RunTimeParams.RoomData[key] = data.msg[key];
			}
			self.pomelo_removeListener();
			if(GlobalData.RunTimeParams.RoomData['game_type'] == 1){
				cc.director.loadScene("QZRoomScene");
			}else if(GlobalData.RunTimeParams.RoomData['game_type'] == 3){
				cc.director.loadScene("LZRoomScene");
			}else{
				cc.director.loadScene("SJRoomScene");
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
						process:null,
						rid:GlobalData.RunTimeParams.RoomData["rid"],
						location:index,
						player_id:GlobalData.MyUserInfo["id"]
					};
					pomelo.request(routerMap['enterRoomRouter'], param, function(data) {
						cc.log(JSON.stringify(data));
						if(data.code == 200){
							self.enterFlag = true;
						}else if(data.code == 500){
							util.show_error_info(data.msg);
							self.scrollFunc({'target':self.lastRoomItem,'type':false});
						}else{
							item.set_flag(false);
							util.show_error_info(data.msg);
							self.scrollFunc({'target':self.lastRoomItem,'type':false});
						}
					});
				}
				break;
            }
        }
    },
	
	pomelo_on(){
		pomelo.on('onStartGame',this.onStartGame_function.bind(this));
    	pomelo.on('onEnterRoom',this.onEnterRoom_function.bind(this));
		pomelo.on('onLeaveRoom',this.onLeaveRoom_function.bind(this));
	},
	
	pomelo_removeListener(){
		cc.log("remove listener");
        pomelo.removeListener('onStartGame');
		pomelo.removeListener('onEnterRoom');
        pomelo.removeListener('onLeaveRoom');
	},
    // update (dt) {},
});
