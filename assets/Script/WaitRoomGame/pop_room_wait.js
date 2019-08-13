cc.Class({
    extends: cc.Component,

    properties: {
		roomNameLabel:cc.Label,
		roomNumLabel:cc.Label,
		fangkaLabel:cc.Label,
		modelLabel:cc.Label,
		maxNodeLabel:cc.Label,
		choice_sprite:{
			type:cc.Node,
			default:[]
		},
		playerData:null,
		enterFlag:false,
		touchFlag:false,
		callback:null,
    },

    onLoad () {
		this.node.on(cc.Node.EventType.TOUCH_START,function(e){
			e.stopPropagation();
		})
	},
	
	initData(room_data,cb){
		this.enterFlag = false;
		this.enterLocation = -1;
		this.callback = cb;
		this.pomelo_on();
		GlobalData.RunTimeParams.RoomData = room_data;
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
		this.touchFlag = false;
		this.playerData = [null,null,null,null];
		for(let i = 0; i < this.choice_sprite.length; i++){
			var item = this.choice_sprite[i];
			item.getComponent(cc.Button).interactable = false;
		}
		this.init_room_pos(room_data);
	},
	
	game_refresh(room_data){
		var self = this;
		var param = {
			"process":'getRoomById',
			"rid":room_data.rid
		};
		Servers.request('roomInfoRouter', param, function(roomRes) {
			cc.log(JSON.stringify(roomRes));
			var tmp_data = roomRes.msg;
			if(tmp_data != null){
				for(var key in tmp_data) {
					GlobalData.RunTimeParams.RoomData[key] = tmp_data[key];
				}
				self.initData(GlobalData.RunTimeParams.RoomData,self.callback);
			}
		});
	},
	
	game_back(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		if(this.enterFlag == true){
			//房主打算退出房间
			this.game_releve(GlobalData.RunTimeParams.RoomData.rid);
		}
		this.pomelo_removeListener();
		this.node.removeFromParent();
		this.node.destroy();
	},
	
	game_releve(rid){
		var self = this;
		if(this.enterLocation == -1){
			return;
		}
		var param = {
			process:null,
			rid:rid,
			player_id:GlobalData.MyUserInfo["id"],
			location:this.enterLocation
		};
		console.log('leave_room',param);
		Servers.request('leaveRoomRouter', param, function(data) {
			cc.log(JSON.stringify(data));
		});
	},
	
	game_start(){
		//进入游戏房间，发送公告告诉准备的玩家进入游戏
		var self = this;
		var param = {
			process:null,
			rid:GlobalData.RunTimeParams.RoomData.rid
		};
		Servers.request('startGameRouter', param, function(data) {
			cc.log(JSON.stringify(data));
		});
	},
	
	init_room_pos(room_data){
		console.log('init_room_pos',room_data);
		var fitem = this.choice_sprite[0];
		var child_sprite = fitem.getChildByName('player_sprite');
		if(GlobalData.RunTimeParams.RoomData.game_type == 1){
			child_sprite.getChildByName('zhuang').active = true;
		}else{
			child_sprite.getChildByName('zhuang').active = false;
		}
		if(room_data["location1"] != null && room_data["location1"] != 'null'){
			this.init_player_pos(this.choice_sprite[0],0,room_data["location1"].split('*')[0]);
		}else{
			this.init_player_pos(this.choice_sprite[0],0,null);
		}
		
		if(room_data["location2"] != null && room_data["location2"] != 'null'){
			this.init_player_pos(this.choice_sprite[1],1,room_data["location2"].split('*')[0]);
		}else{
			this.init_player_pos(this.choice_sprite[1],1,null);
		}
		
		if(room_data["location3"] != null && room_data["location3"] != 'null'){
			this.init_player_pos(this.choice_sprite[2],2,room_data["location3"].split('*')[0]);
		}else{
			this.init_player_pos(this.choice_sprite[2],2,null);
		}
		
		if(room_data["location4"] != null && room_data["location4"] != 'null'){
			this.init_player_pos(this.choice_sprite[3],3,room_data["location4"].split('*')[0]);
		}else{
			this.init_player_pos(this.choice_sprite[3],3,null);
		}
	},
	
	init_player_pos(item,id,player_id){
		console.log('init_player_pos',item,id,player_id);
		var self = this;
		var child_sprite = item.getChildByName('player_sprite');
		if(player_id != null && player_id != "null"){
			var param = {
				process:'get_player',
				player_id:player_id
			};
			Servers.request('userInfoRouter',param,function(data){
				if(data.msg != null && data.msg.head_img_url != null && data.msg.head_img_url.length > 0){
					cc.loader.load({url:data.msg.head_img_url,type:'png'},function (err, texture) {
						var frame = new cc.SpriteFrame(texture);
						child_sprite.getComponent("cc.Sprite").spriteFrame = frame;
					});
				}else{
					child_sprite.getComponent("cc.Sprite").spriteFrame = GlobalData.assets["man"];
				}
				self.playerData[id] = data;
			});
			item.getComponent(cc.Button).interactable = false;
		}else{
			child_sprite.getComponent("cc.Sprite").spriteFrame = GlobalData.assets["wait_" + (id+1)];
			item.getComponent(cc.Button).interactable = true;
			this.playerData[id] = null;
		}
	},
	
	onEnterRoom_function(data){
		var self = this;
		cc.log("pomelo on onEnterRoom_function:" + data.location+" is ready" + this.choice_sprite.length);
		this.enterLocation = data.location;
		var last_enter_player_id = data.player[data.location - 1];
		
		if(data.player[0] != null){
			this.init_player_pos(this.choice_sprite[0],0,data.player[0]);
		}else{
			this.init_player_pos(this.choice_sprite[0],0,null);
		}
		
		if(data.player[1] != null){
			this.init_player_pos(this.choice_sprite[1],1,data.player[1]);
		}else{
			this.init_player_pos(this.choice_sprite[1],1,null);
		}
		
		if(data.player[2] != null){
			this.init_player_pos(this.choice_sprite[2],2,data.player[2]);
		}else{
			this.init_player_pos(this.choice_sprite[2],2,null);
		}
		
		if(data.player[3] != null){
			this.init_player_pos(this.choice_sprite[3],3,data.player[3]);
		}else{
			this.init_player_pos(this.choice_sprite[3],3,null);
		}
		
		GlobalData.RunTimeParams.RoomData['real_num'] = data.real_num;
		//判断是否是自己，如果是自己则取消点击事件。
		if(last_enter_player_id == GlobalData.MyUserInfo["id"]){
			for(let i = 0; i < this.choice_sprite.length; i++){
				var item = this.choice_sprite[i];
				item.getComponent(cc.Button).interactable = false;
			}
		}
		//如果人数达到上限则 开始游戏
		if(GlobalData.RunTimeParams.RoomData['real_num'] >= GlobalData.RunTimeParams.RoomData["player_num"]){
			for(let i = 0; i < this.choice_sprite.length; i++){
				var item = this.choice_sprite[i];
				item.getComponent(cc.Button).interactable = false;
			}
			this.popDelayScene = cc.instantiate(GlobalData.assets['PopDelayScene']);
			this.node.addChild(this.popDelayScene);
			this.popDelayScene.setPosition(cc.v2(0,0));
			this.popDelayScene.getComponent('pop_delay_scene').onStart(5,function(){
				self.popDelayScene.removeFromParent();
				self.popDelayScene.destroy();
				self.popDelayScene = null;
				//最后一个进来的 开始游戏
				if(last_enter_player_id == GlobalData.MyUserInfo["id"]){
					self.game_start();
				}
			});
		}
	},
	
	onLeaveRoom_function(data){
		console.log(data);
		var location = data.location;
		var player_id = data.player_id;
		GlobalData.RunTimeParams.RoomData['real_num'] = data.real_num;
		if(player_id == GlobalData.MyUserInfo.id){
			this.enterFlag = false;
		}
		if(location != null){
			var item = this.choice_sprite[location - 1];
			var child_sprite = item.getChildByName('player_sprite');
			this.playerData[location - 1] = null;
			child_sprite.getComponent("cc.Sprite").spriteFrame = GlobalData.assets["wait_" + location];
			item.getComponent(cc.Button).interactable = true;
		}
	},
	
	onStartGame_function(data){
		cc.log("pomelo on onStartGame_function:" + JSON.stringify(data));
		var self = this;
		var players = data.players;
		GlobalData.RoomInfos.StartLocation = data.location;
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
			self.pomelo_removeListener();
			self.callback();
			for(var key in data.msg) {
				GlobalData.RunTimeParams.RoomData[key] = data.msg[key];
			}
			if(GlobalData.RunTimeParams.RoomData['game_type'] == 1){
				cc.director.loadScene("QZRoomScene");
			}else if(GlobalData.RunTimeParams.RoomData['game_type'] == 3){
				cc.director.loadScene("LZRoomScene");
			}else{
				cc.director.loadScene("SJRoomScene");
			}
		});
	},
	
	onStartFail_function(data){
		console.log(data);
		util.show_error_info(data.msg);
	},
	
	switchRadio(event,customData) {
		var self = this;
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		//屏蔽所有的点击事件 防止 玩家多次点击 产生误操作
		if(this.touchFlag == true){
			return;
		}
		var item = event.target;
		var index = parseInt(customData);
		if(this.enterFlag != true){
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
					self.game_refresh(GlobalData.RunTimeParams.RoomData);
				}else{
					util.show_error_info(data.msg);
					self.game_refresh(GlobalData.RunTimeParams.RoomData);
				}
				self.touchFlag = false;
			});
		}
    },
	
	pomelo_on(){
		try{
			console.log('pomelo_on');
			pomelo.on('onStartGame',this.onStartGame_function.bind(this));
			pomelo.on('onEnterRoom',this.onEnterRoom_function.bind(this));
			pomelo.on('onLeaveRoom',this.onLeaveRoom_function.bind(this));
			pomelo.on('onStartFail',this.onStartFail_function.bind(this));
		}catch(err){
			console.log(err);
		}
	},
	
	pomelo_removeListener(){
		cc.log("remove listener");
        pomelo.removeListener('onStartGame');
		pomelo.removeListener('onEnterRoom');
        pomelo.removeListener('onLeaveRoom');
		pomelo.removeListener('onStartFail');
	},
    // update (dt) {},
});
