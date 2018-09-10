cc.Class({
    extends: cc.Component,

    properties: {
		order_id:null,
		fangka_num:0,
		danjia:2,
		zongjia:0,
		game_sprite:cc.Node,
		tip_label:cc.Label,
		num_label:cc.Node,
		danjia_label:cc.Label,
		zongjia_label:cc.Label,
		orderid_label:cc.Label,
		buy_button:cc.Node,
    },
	onLoad(){
		cc.log("on load store buy");
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
			}
         }, this.node);
	},
	init(data){
		this.fangka_num = data["fangka_num"];
		this.danjia = data["danjia"];
		this.zongjia = data["zongjia"];
		this.order_id = data["order_id"];
		this.num_label.string = data["fangka_num"] + "张";
		this.danjia_label.string = data["danjia"] + "元";
		this.zongjia_label.string = data["zongjia"] + "元";
		this.orderid_label.string = data["order_id"];
	},
	button_cb(){
		var self = this;
		Servers.storeProcess("payOrder",{order_id:order_id},function(data){
			if(data.code == 200){
				self.node.active = false;
				self.node.destroy();
				g_user["fangka_num"] = data["fangka_num"];
				cc.director.loadScene("MainScene");
			}
		});
	},
	close_scene(){
		this.node.active = false;
		this.node.destroy();
	},
});
