cc.Class({
    extends: cc.Component,

    properties: {
      game_sprite:cc.Node,
	  //zhanji params
	  zhanji_node:cc.Node,
	  zhanji_button:cc.Node,
	  //record params
	  record_button:cc.Node,
	  record_node:cc.Node, 
    },
    onLoad () {
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
					self.node.destroy();
				}
			}
        }, self.game_sprite);
		this.zhanji_button_cb();
	},
	zhanji_button_cb(){
		this.zhanji_button.getComponent("cc.Button").interactable = false;
		this.record_button.getComponent("cc.Button").interactable = true;
		//init zhanji info
		var zhanji_node_com = this.zhanji_node.getComponent("my_game_zhanji");
		zhanji_node_com.init_zhanji_info(g_zhanji_light_data,g_zhanji_data);
		
		this.zhanji_node.active = true;
		this.record_node.active = false;
		cc.log("zhanji_button_cb");
	},
	record_button_cb(){
		this.record_button.getComponent("cc.Button").interactable = false;
		this.zhanji_button.getComponent("cc.Button").interactable = true;
		var record_node_com = this.record_node.getComponent("my_game_record");
		record_node_com.init_record_info(g_record_light_data,g_record_data);
		
		this.zhanji_node.active = false;
		this.record_node.active = true;
		cc.log("record_button_cb");
	},
    // update (dt) {},
});
