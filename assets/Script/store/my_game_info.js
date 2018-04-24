cc.Class({
    extends: cc.Component,

    properties: {
      game_sprite:cc.Node,
	  //zhanji params
	  zhanji_node:cc.Node,
	  zhanji_button:cc.Node,
	  zhanji_list_node:cc.Node,
	  
	  jushu_node:cc.Node,
	  fenshu_node:cc.Node,
	  win_node:cc.Node,
	  lose_node:cc.Node,
	  equal_node:cc.Node,
	  
	  //record params
	  record_button:cc.Node,
	  record_node:cc.Node,
	  record_list_node:cc.Node,
	  
	  all_num_node:cc.Node,
	  use_num_node:cc.Node,
	  left_num_node:cc.Node,
	  invalid_num_node:cc.Node,
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
		cc.loader.loadResDir("",cc.SpriteFrame,function (err, assets) {
			for(var i = 0;i < assets.length;i++){
				g_assets[assets[i].name] = assets[i];
				self.rate = self.rate + 1;
				cc.log("load res :" + assets[i].name);
			}
		});
		cc.loader.loadResDir("prefab",function (err, assets) {
			for(var i = 0;i < assets.length;i++){
				g_assets[assets[i].name] = assets[i];
				self.rate = self.rate + 1;
				cc.log("load res :" + assets[i].name);
			}
		});
		//this.zhanji_button_cb();
		this.zhanji_node.active = false;
		this.record_node.active = false;
	},
	zhanji_button_cb(){
		this.zhanji_button.getComponent("cc.Button").interactable = false;
		this.record_button.getComponent("cc.Button").interactable = true;
		this.zhanji_node.active = true;
		this.record_node.active = false;
		//init zhanji info
		this.init_zhanji_info(g_zhanji_light_data);
		this.init_zhanji_list(g_zhanji_data);
		cc.log("zhanji_button_cb");
	},
	record_button_cb(){
		this.record_button.getComponent("cc.Button").interactable = false;
		this.zhanji_button.getComponent("cc.Button").interactable = true;
		this.zhanji_node.active = false;
		this.record_node.active = true;
		this.init_record_info(g_record_light_data);
		this.init_record_list(g_record_data);
		cc.log("record_button_cb");
	},
	init_zhanji_info(data){
		this.jushu_node.getComponent("cc.Label").string = data["jushu"];
		this.fenshu_node.getComponent("cc.Label").string = data["fenshu"];
		this.win_node.getComponent("cc.Label").string = data["win"];
		this.lose_node.getComponent("cc.Label").string = data["lose"];
		this.equal_node.getComponent("cc.Label").string = data["equal"];
	},
	init_zhanji_list(data){
		var scroll_view = this.zhanji_list_node.getComponent("cc.ScrollView");
		var content = scroll_view.content;
		for(var i = 0;i < data.length;i++){
			var zhanji_item = cc.instantiate(g_assets["game_history_item_layout"]);
			var zhanji_item_com = zhanji_item.getComponent("game_history_item");
			zhanji_item_com.init(data[i],this);
			content.addChild(zhanji_item);
		}
	},
	init_record_info(data){
		this.all_num_node.getComponent("cc.Label").string = data["all_num"];
		this.use_num_node.getComponent("cc.Label").string = data["use_num"];
		this.left_num_node.getComponent("cc.Label").string = data["left_num"];
		this.invalid_num_node.getComponent("cc.Label").string = data["invalid_num"];
	},
	init_record_list(data){
		var scroll_view = this.record_list_node.getComponent("cc.ScrollView");
		var content = scroll_view.content;
		for(var i = 0;i < data.length;i++){
			var record_item = cc.instantiate(g_assets["record_item_layout"]);
			var record_item_com = record_item.getComponent("record_item");
			record_item_com.init(data[i],this);
			content.addChild(record_item);
		}
	},

    // update (dt) {},
});
