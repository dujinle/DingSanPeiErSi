cc.Class({
    extends: cc.Component,

    properties: {
		fangka_label:cc.Label,
		room_num_node:cc.Node,
		fangzhu_node:cc.Node,
		max_pai_node:cc.Node,
		renshu_node:cc.Node,
		wait_time_node:cc.Node,
		fangzhu_fangka_node:cc.Node,
		wanjia_fangka_node:cc.Node,
		start_button:cc.Node,
		debug_label:cc.Label,
		choice_sprite:{
			type:cc.Node,
			default:[]
		},
		left_time_node:cc.Node,
		player_num:0,
		
    },

    onLoad () {
		this.pomelo_removeListener();
		cc.log("created_room_scene","start gointo created room scene......");
		g_current_scene = SCENE_TAG.WAITROOM;
		this.node.on("pressed", this.switchRadio, this);
		this.wait_flag = true;
		this.player_num = g_room_data["real_num"];
		this.fangka_label.string = g_user["fangka_num"];
		this.init_data();
		this.init_room_pos();
		var now_time = Date.now();
		var cost_time = parseInt((now_time - g_room_data["creat_time"])/1000);
		this.left_time = parseInt(g_room_data["wait_time"]) * 60 - cost_time;
		this.pomelo_on();
		cc.log("created_room_scene","this.choice_sprite:" + this.choice_sprite.length);
		this.schedule(this.wait_time_cb,1);
	},
	init_data(){
		this.room_num_node.getComponent("cc.Label").string = g_room_data["room_num"];
		this.fangzhu_node.getComponent("cc.Label").string = g_room_data["fangzhu_name"];
		if(g_room_data["max_type"] == 1){
			this.max_pai_node.getComponent("cc.Label").string = "鬼大";
		}else if(g_room_data["max_type"] == 2){
			this.max_pai_node.getComponent("cc.Label").string = "玄大";
		}else if(g_room_data["max_type"] == 3){
			this.max_pai_node.getComponent("cc.Label").string = "皇上大";
		}
		this.renshu_node.getComponent("cc.Label").string = g_room_data["player_num"] + "人";
		this.wait_time_node.getComponent("cc.Label").string = g_room_data["wait_time"] + "分钟";
		if(g_room_data["fangka_type"] == 1){
			this.fangzhu_fangka_node.getComponent("cc.Label").string = "消费1张";
			this.wanjia_fangka_node.getComponent("cc.Label").string = "消费1张";
		}else if(g_room_data["fangka_type"] == 2){
			this.fangzhu_fangka_node.getComponent("cc.Label").string = "消费" + g_room_data["fangka_num"] + "张";
			this.wanjia_fangka_node.getComponent("cc.Label").string = "消费0张";
		}
		if(g_room_data["fangzhu_id"] != g_user["id"]){
			this.start_button.getComponent("cc.Button").interactable = false;
		}
	},
	init_room_pos(){
		var self = this;
		for(let i = 0; i < this.choice_sprite.length; i++){
			var item = this.choice_sprite[i].getComponent("player_select");
			var location = g_room_data["location" + (i + 1)];
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
							self.choice_sprite[i].getComponent("cc.Sprite").spriteFrame = g_assets["headimg"];
						}
					}
				});
				item.set_flag(true);
			}
			if(g_room_data["player_num"] <= g_room_data["real_num"]){
				item.set_flag(true);
			}
		}
	},
	share_button_cb(){
		if(cc.sys.os == cc.sys.OS_ANDROID){
			jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "WxShare", "(Ljava/lang/String;Ljava/lang/String;I)V",g_room_data["room_num"],g_room_data["fangzhu_name"],g_room_data["rid"]);
		}else if(cc.sys.os == cc.sys.OS_IOS){
			jsb.reflection.callStaticMethod("NativeOcClass", "WxShare:",g_room_data["room_num"],g_room_data["fangzhu_name"],g_room_data["rid"]);
		}
	},
	pomelo_on(){
		pomelo.on('onStartGame',this.onStartGame_function.bind(this));
    	pomelo.on('onEnterRoom',this.onEnterRoom_function.bind(this));
		pomelo.on('onDelayWaitTime',this.onDelayWaitTime_function.bind(this));
		pomelo.on('onDissolveRoom',this.onDissolveRoom_function.bind(this));
		pomelo.on('onLeaveRoom',this.onLeaveRoom_function.bind(this));
	},
	onEnterRoom_function(data){
		var self = this;
		cc.log("pomelo on onEnterRoom_function:" + data.location+" is ready" + this.choice_sprite.length);
		var enter_location = data.location;
		this.enter_player = data.player;
		this.enter_item = this.choice_sprite[enter_location - 1];
		var item_com = this.enter_item.getComponent("player_select");
		item_com.set_data(this.enter_player);
		item_com.set_flag(true);
		if(this.enter_player.head_img_url != null && this.enter_player.head_img_url.length > 0){
			cc.loader.load({url:this.enter_player.head_img_url,type:'png'},function (err, texture) {
				var frame = new cc.SpriteFrame(texture);
				self.enter_item.getComponent("cc.Sprite").spriteFrame = frame;
			});
		}else{
			self.enter_item.getComponent("cc.Sprite").spriteFrame = g_assets["headimg"];
		}
		self.player_num = self.player_num + 1;
		//判断是否是自己，如果是自己则取消点击事件。
		if(self.enter_player.id == g_user["id"]){
			g_user["fangka_num"] = self.enter_player.fangka_num;
			for(let i = 0; i < self.choice_sprite.length; i++){
				var item = self.choice_sprite[i].getComponent("player_select");
				item.set_flag(true);
			}
		}
		if(self.player_num >= g_room_data["player_num"]){
			for(let i = 0; i < self.choice_sprite.length; i++){
				var item = self.choice_sprite[i].getComponent("player_select");
				item.set_flag(true);
			}
			if(self.enter_player.id == g_user["id"]){
				util.show_error_info(null,null,"房间人员已经到齐，请点击开始游戏，进入游戏！");
			}else{
				util.show_error_info(null,null,"房间人员已经到齐，请等待房主开始游戏，进入游戏！");
			}
		}
	},
	onDelayWaitTime_function(data){
		cc.log("pomelo on onDelayWaitTime_function:" + JSON.stringify(data) + " is ready");
		//房主延长了等待时间则继续等待 this.wait_flag = true;
		var wait_time = data.wait_time;
		if(g_room_data["fangzhu_id"] == g_user["id"]){
			g_room_data["wait_time"] = wait_time;
			var now_time = Date.now();
			var cost_time = parseInt((now_time - g_room_data["creat_time"])/1000);
			this.left_time = parseInt(g_room_data["wait_time"]) * 60 - cost_time;
		}else{
			this.left_time = 2 * 60;
		}
		this.wait_flag = true;
	},
	onDissolveRoom_function(data){
		this.pomelo_removeListener();
		util.show_error_info(null,null,"房主已经解散了该房间,所有玩家退出房间！");
		g_room_data = null;
		cc.director.loadScene("MainScene");
	},
	onLeaveRoom_function(data){
		var location = data.location;
		var room_info = data.data;
		var player_id = data.player_id;
		if(location != -1){
			var item = this.choice_sprite[location - 1];
			var item_com = item.getComponent("player_select");
			this.player_num = this.player_num - 1;
			item.set_data(null);
			item.set_flag(false);
			item.getComponent("cc.Sprite").spriteFrame = g_assets["wait_" + location];
		}
	},
	onStartGame_function(data){
		cc.log("pomelo on onStartGame_function:" + JSON.stringify(data));
		var self = this;
		var players = data.players;
		g_players_data.splice(0,g_players_data.length);
		for(var i = 0;i < players.length;i++){
			if(players[i] != null && players[i] != "null"){
				g_players_data.push(players[i]);
			}
		}
		var param = {
			"rid":g_room_data["rid"]
		};
		pomelo.request(util.getRoomInfoRoute(), param, function(data) {
			cc.log(JSON.stringify(data));
			if(data.code == 200){
				for(var key in data.msg) {
					g_room_data[key] = data.msg[key];
				}
				self.pomelo_removeListener();
				cc.director.loadScene("PJRoomScene");
			}else{
				util.show_error_info(null,null,data.msg);
			}
		});
	},
    
	game_back(){
		var self = this;
		util.show_isok_info(function(flag){
			if(flag == true){
				if(g_room_data["fangzhu_id"] == g_user["id"]){
					//房主打算退出房间
					self.goout_game();
				}else{
					self.leave_room();
				}
			}
		},"你确定要解散房间吗？如果已经消费房卡，则消费的房卡不会退回，请稍安勿躁！");
	},
	
	wait_time_cb(){
		this.fangka_label.string = g_user["fangka_num"];
		var self = this;
		this.wait_flag = false;
		if(this.wait_flag == true){
			if(this.left_time > 0){
				this.left_time = this.left_time - 1;
			}
			this.left_time_node.getComponent("cc.Label").string = this.left_time;
			if(this.left_time <= 0){
				this.wait_flag = false;
				//this.debug_label.string = "时间已经消耗完毕，请继续操作，增加时间";
				if(g_room_data["fangzhu_id"] == g_user["id"]){
					if(this.player_num >= 2){
						util.show_isok_info(function(flag){
							if(flag == false){
								self.start_game();
							}else{
								self.delay_wait_time();
							}
						},"是否进行延迟等待，点击确定延迟等待，点击取消则进入游戏。");
					}else{
						util.show_isok_info(function(flag){
							if(flag == false){
								self.goout_game();
							}else{
								self.delay_wait_time();
							}
						},"是否进行延迟等待，点击确定延迟等待，点击取消则退出游戏。");
					}
				}
			}
		}
	},
	start_game(){
		//进入游戏房间，发送公告告诉准备的玩家进入游戏
		this.start_button.getComponent("cc.Button").interactable = false;
		if(this.player_num >= 2){
			var param = {
				rid:g_room_data["rid"],
				player_id:g_room_data["fangzhu_id"]
			};
			pomelo.request(util.getStartGameRoute(), param, function(data) {
				cc.log(JSON.stringify(data));
			});
		}else{
			this.start_button.getComponent("cc.Button").interactable = true;
			util.show_error_info(null,null,"人员不够，无法开始游戏，请等待玩家加入！");
		}
	},
	goout_game(){
		//解散游戏取消channel 并且清除房间数据
		this.pomelo_removeListener();
		var param = {
			rid:g_room_data["rid"],
			player_id:g_user["id"]
		};
		pomelo.request(util.getDissolveRoomRoute(), param, function(data) {
			cc.log(JSON.stringify(data));
			cc.director.loadScene("MainScene");
		});
	},
	leave_room(){
		//离开游戏房间
		this.pomelo_removeListener();
		for(let i = 0; i < this.choice_sprite.length; i++){
			var item = this.choice_sprite[i].getComponent("player_select");
			var player = item.get_data();
			if(player != null && player.id == g_user["id"]){
				var param = {
					rid:g_room_data["rid"],
					player_id:g_user["id"],
					location:i + 1
				};
				pomelo.request(util.getLeaveRoomRoute(), param, function(data) {
					cc.log(JSON.stringify(data));
					cc.director.loadScene("MainScene");
				});
				return true;
			}
		}
		var param = {
			rid:g_room_data["rid"],
			player_id:g_user["id"],
			location:null
		};
		pomelo.request(util.getLeaveRoomRoute(), param, function(data) {
			cc.log(JSON.stringify(data));
			cc.director.loadScene("MainScene");
		});
	},
	
	delay_wait_time(){
		var self = this;
		var param = {
			rid:g_room_data["rid"],
			player_id:g_user["id"]
		};
		pomelo.request(util.getDelayWaitTimeRoute(), param, function(data) {
			cc.log(JSON.stringify(data));
		});
	},
	
	switchRadio(event) {
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
						rid:g_room_data["rid"],
						location:index,
						player_id:g_user["id"]
					};
					pomelo.request(util.getEnterRoute(), param, function(data) {
						if(data.code == 200){
							g_user["fangka_num"] = data.fangka_num;
						}else{
							item.set_flag(false);
							util.show_error_info(null,null,data.msg);
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
        pomelo.removeListener('onDelayWaitTime');
        pomelo.removeListener('onDissolveRoom');
        pomelo.removeListener('onLeaveRoom');
	},
});
