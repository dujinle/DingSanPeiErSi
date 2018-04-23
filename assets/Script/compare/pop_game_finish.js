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
		var self = this;
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
				var target=event.getCurrentTarget();
				var local=target.convertToNodeSpace(touch.getLocation());
				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);
				if (cc.rectContainsPoint(rect, local)){
					cc.log("ok touch in the region......");
				}else{
					cc.log("touch remove from parent");
					self.node.active = false;
					self.destroy();
				}
			}
         }, self.game_sprite);
	},
	init_info(players){
		for(var i = 0;i < players.length;i++){
			var player = players[i];
			var player_com = player.getComponent("tdk_player");
			var item = this.items[i];
			this.set_item_info(item,player_com);
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
		slabel.string = player_com.start_gold;
		elabel.string = player_com.my_gold;
		dlabel.string = player_com.my_gold - player_com.start_gold;
		user_label.string = player_com.nick_name;
		user_sprite.SpriteFrame = player_com.mobile_sprite.getChildByName("man").SpriteFrame;
	},
});
