cc.Class({
    extends: cc.Component,

    properties: {
		my_gonghui_button:cc.Node,
		add_gonghui_button:cc.Node,
		join_gonghui_button:cc.Node,
		game_sprite:cc.Node,
		my_gonghui_node:cc.Node,
		my_gonghui_zhang_node:cc.Node,
		add_gonghui_node:cc.Node,
		join_gonghui_node:cc.Node,
		empty_node:cc.Node,
    },

	my_gonghui_button_cb(){
		this.my_gonghui_button.getComponent("cc.Button").interactable = false;
		this.add_gonghui_button.getComponent("cc.Button").interactable = true;
		this.join_gonghui_button.getComponent("cc.Button").interactable = true;
		if(g_gonghui_data["is_huizhang"] == 0){
			var my_gonghui_com = this.my_gonghui_node.getComponent("gonghui_yuan");
			my_gonghui_com.init(g_gonghui_data);
			this.my_gonghui_node.active = true;
			this.my_gonghui_zhang_node.active = false;
		}else if(g_gonghui_data["is_huizhang"] == 1){
			var my_gonghui_com = this.my_gonghui_node.getComponent("gonghui_zhang");
			my_gonghui_com.init(g_gonghui_data);
			this.my_gonghui_node.active = false;
			this.my_gonghui_zhang_node.active = true;
		}
		this.empty_node.active = false;
		this.add_gonghui_node.active = false;
		this.join_gonghui_node.active = false;
		cc.log("my_gonghui_button_cb");
	},
	add_gonghui_button_cb(){
		this.my_gonghui_button.getComponent("cc.Button").interactable = true;
		this.add_gonghui_button.getComponent("cc.Button").interactable = false;
		this.join_gonghui_button.getComponent("cc.Button").interactable = true;
		this.my_gonghui_node.active = false;
		this.my_gonghui_zhang_node.active = false;
		this.add_gonghui_node.active = true;
		this.join_gonghui_node.active = false;
		this.empty_node.active = false;
		cc.log("add_gonghui_button_cb");
	},
	join_gonghui_button_cb(){
		this.my_gonghui_button.getComponent("cc.Button").interactable = true;
		this.add_gonghui_button.getComponent("cc.Button").interactable = true;
		this.join_gonghui_button.getComponent("cc.Button").interactable = false;
		this.my_gonghui_node.active = false;
		this.my_gonghui_zhang_node.active = false;
		this.add_gonghui_node.active = false;
		this.join_gonghui_node.active = true;
		this.empty_node.active = false;
		cc.log("join_gonghui_button_cb");
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
		 this.my_gonghui_button_cb();
	},

    start () {

    },

    // update (dt) {},
});
