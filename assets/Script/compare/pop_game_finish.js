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
		for(var i = 0;i < this.items.length;i++){
			var item = this.items[i];
			item.active = false;
		}
		cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchMoved: function (touch, event) {            // 触摸移动时触发
            },
            onTouchEnded: function (touch, event) {            // 点击事件结束处理
			}
         }, this.node);
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
		var user_sprite = user_layout.getChildByName("user_sprite");
		var user_label = user_layout.getChildByName("user_label");
		var slabel = item.getChildByName("slabel");
		var elabel = item.getChildByName("elabel");
		var dlabel = item.getChildByName("dlabel");
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
			rid:g_room_data["rid"],
			player_id:g_user["id"],
			location:null
		};
		pomelo.request(util.getLeaveRoomRoute(), param, function(data) {
			cc.log(JSON.stringify(data));
			self.node.active = false;
			self.cb();
			cc.director.loadScene("MainScene");
		});
	},
});
