cc.Class({
    extends: cc.Component,

    properties: {
		room_num_node:cc.Node,
		fangzhu_node:cc.Node,
		max_pai_node:cc.Node,
		renshu_node:cc.Node,
		wait_time_node:cc.Node,
		fangzhu_fangka_node:cc.Node,
		wanjia_fangka_node:cc.Node,
		choice_sprite:{
			type:cc.Node,
			default:[]
		},
		left_time_node:cc.Node,
		player_num:0,
		
    },

    onLoad () {
		this.node.on("pressed", this.switchRadio, this);
		this.wait_flag = true;
		this.player_num = g_room_data["real_num"];
		this.init_data();
		this.init_room_pos();
		this.left_time = parseInt(g_room_data["wait_time"]) * 60;
		this.pomelo_on();
		this.schedule(this.wait_time_cb,1);
	},
	share_button_cb(){
		if(cc.sys.os == cc.sys.OS_ANDROID){
			jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "WxShare", "(Ljava/lang/String;Ljava/lang/String;I)V",g_room_data["room_num"],g_room_data["fangzhu_name"],g_room_data["rid"]);
		}
	},
	pomelo_on(){
    	pomelo.on('onEnterRoom',this.onEnterRoom_function.bind(this));
	},
	onEnterRoom_function(data){
		var self = this;
		cc.log("pomelo on Ready:" + data.location+" is ready");
		var player = data.player;
		var location = data.location;
		var item = this.choice_sprite[location - 1];
		var item_com = item.getComponent("player_select");
		item_com.set_data(player);
		Servers.userInfoProcess("get_player",{id:player.id},function(data){
			if(data.code == 200){
				cc.loader.load({url:data.msg.headimgurl,type:'png'},function (err, texture) {
					var frame = new cc.SpriteFrame(texture);
					item.getComponent("cc.Sprite").spriteFrame = frame;
					self.player_num = self.player_num + 1;
				});
			}
		});
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
		this.renshu_node.getComponent("cc.Label").string = g_room_data["player_num"];
		this.wait_time_node.getComponent("cc.Label").string = g_room_data["wait_time"];
		if(g_room_data["fangka_type"] == 1){
			this.fangzhu_fangka_node.getComponent("cc.Label").string = "消费1张";
			this.wanjia_fangka_node.getComponent("cc.Label").string = "消费1张";
		}else if(g_room_data["fangka_type"] == 2){
			this.fangzhu_fangka_node.getComponent("cc.Label").string = "消费" + g_room_data["fangka_num"] + "张";
			this.wanjia_fangka_node.getComponent("cc.Label").string = "消费0张";
		}
	},
	init_room_pos(){
		var self = this;
		for(let i = 0; i < this.choice_sprite.length; i++){
			var item = this.choice_sprite[i].getComponent("player_select");
			var location = g_room_data["location" + (i + 1)];
			if(location != null){
				var player_id = location.split("*")[0];
				Servers.userInfoProcess("get_player",{id:player.id},function(data){
					if(data.code == 200){
						cc.loader.load({url:data.msg.headimgurl,type:'png'},function (err, texture) {
							var frame = new cc.SpriteFrame(texture);
							self.choice_sprite[i].getComponent("cc.Sprite").spriteFrame = frame;
							item.set_flag(true);
						});
					}
				});
			}
		}
	},
    game_back(){
		cc.director.loadScene("MainScene");
	},
	
	wait_time_cb(){
		var self = this;
		if(this.wait_flag == true){
			this.left_time = this.left_time - 1;
			this.left_time_node.getComponent("cc.Label").string = this.left_time;
			if(this.left_time <= 0){
				this.wait_flag == flase;
				if(this.player_num >= 2){
					util.show_isok_info(this,function(pthis,flag){
						if(flag == false){
							self.start_game();
						}else{
							self.left_time = g_room_data["wait_time"];
							self.wait_flag = true;
						}
					},"是否进行延迟等待，点击确定延迟等待，点击取消则进入游戏。");
				}else{
					util.show_isok_info(this,function(pthis,flag){
						if(flag == false){
							self.goout_game();
						}else{
							self.left_time = g_room_data["wait_time"];
							self.wait_flag = true;
						}
					},"是否进行延迟等待，点击确定延迟等待，点击取消则退出游戏。");
				}
			}
		}
	},
	start_game(){

	},
	goout_game(){

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
						cc.log(JSON.stringify(data));
						
					});
				}
				break;
            }
        }
    },
});
