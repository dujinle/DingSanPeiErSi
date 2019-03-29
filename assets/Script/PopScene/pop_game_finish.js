cc.Class({
    extends: cc.Component,

    properties: {
		game_sprite:cc.Node,
		items:{
			type:cc.Node,
			default:[]
		},
    },
    onLoad () {
		cc.log("start go into pop game finish js");
		this.node.on(cc.Node.EventType.TOUCH_START,function(e){
			e.stopPropagation();
		})
		for(var i = 0;i < this.items.length;i++){
			var item = this.items[i];
			item.active = false;
		}
	},
	init_info(players,cb){
		this.cb = cb;
		cc.log("pop game finish:" + JSON.stringify(players));
		for(var i = 0;i < players.length;i++){
			var player = players[i];
			var item = this.items[i];
			this.set_item_info(item,player);
			item.active = true;
		}
	},
	set_item_info(item,player_com){
		var user_layout = item.getChildByName("user_layout");
		var user_sprite = user_layout.getChildByName("user_sprite").getComponent("cc.Sprite");
		var user_label = user_layout.getChildByName("user_label").getComponent("cc.Label");
		var slabel = item.getChildByName("slabel").getComponent("cc.Label");
		var elabel = item.getChildByName("elabel").getComponent("cc.Label");
		var dlabel = item.getChildByName("dlabel").getComponent("cc.Label");
		user_label.string = player_com[0];
		if(player_com[1] != null){
			cc.loader.load({url:player_com[1],type:'png'},function (err, texture) {
				var frame = new cc.SpriteFrame(texture);
				user_sprite.spriteFrame = frame;
			});
		}
		slabel.string = player_com[2];
		elabel.string = player_com[3];
		dlabel.string = player_com[3] - player_com[2];
	},
	callback_tuichu(){
		var self = this;
		var param = {
			rid:GlobalData.RunTimeParams.RoomData["rid"],
			player_id:GlobalData.MyUserInfo["id"],
			location:null
		};
		pomelo.request(util.getLeaveRoomRoute(), param, function(data) {
			cc.log(JSON.stringify(data));
			self.cb();
			cc.director.loadScene("MainScene");
		});
	},
});
