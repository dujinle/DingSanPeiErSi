cc.Class({
    extends: cc.Component,

    properties: {
		fangka_num:0,
		danjia:2,
		zongjia:0,
		game_sprite:cc.Node,
		tip_label:cc.Label,
		num_label:cc.Node,
		danjia_label:cc.Label,
		zongjia_label:cc.Label,
		buy_button:cc.Node,
    },
	onLoad(){
		cc.log("on load store buy");
		var self = this;
		this.node.on("pressed", this.switchRadio, this);
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
		 this.init();
	},
	init(){
		var self = this;
		if(g_user.gonghui_id == null){
			this.tip_label.string = "您还没有公会信息，请先加入公会再来购买。";
			this.buy_button.getComponent("cc.Button").interactable = false;
		}else{
			Servers.gonghuiProcess("getGonghui",{"gonghui_id":g_user.gonghui_id},function(data){
				if(data.code == 200){
					self.danjia = data.msg["danjia"];
					this.danjia_label.string = this.danjia + "元";
				}else{
					this.tip_label.string = data.msg;
					this.buy_button.getComponent("cc.Button").interactable = false;
				}
			});
		}
	},
	button_cb(){
		var self = this;
		var size = cc.director.getWinSize();
		var param = {
			"player_id":g_user["id"],
			"fangka_num":this.fangka_num,
			"danjia":this.danjia,
			"zongjia":this.zongjia
		};
		Servers.storeProcess("creatOrder",param,function(data){
			if(data.code == 200){
				self.node.active = false;
				self.node.destroy();
				
				var pop_order = cc.instantiate(g_assets["PopBuyOrderScene"]);
				var pop_order_com = pop_order.getComponent("buy_order");
				pop_order_com.init(data.data);
				self.parent.node.addChild(pop_order);
				pop_order.setPosition(self.parent.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
			}
		});
	},
	onEditDidBegan: function(editbox, customEventData) {
        //这里 editbox 是一个 cc.EditBox 对象
        //这里的 customEventData 参数就等于你之前设置的 "foobar"
    },
    //假设这个回调是给 editingDidEnded 事件的
    onEditDidEnded: function(editbox, customEventData) {
		this.fangka_num = editbox.string;
		this.zongjia = this.danjia * this.fangka_num;
		this.zongjia_label.string = this.zongjia + "元";
		cc.log("fangka_num:" + this.fangka_num);
        //这里 editbox 是一个 cc.EditBox 对象
        //这里的 customEventData 参数就等于你之前设置的 "foobar"
    },
    //假设这个回调是给 textChanged 事件的
    onTextChanged: function(text, editbox, customEventData) {
		this.fangka_num = editbox.string;
		this.zongjia = this.danjia * this.fangka_num;
		this.zongjia_label.string = this.zongjia + "元";
		cc.log("fangka_num:" + this.fangka_num);
    },
    //假设这个回调是给 editingReturn 事件的
    onEditingReturn: function(editbox,  customEventData) {
        //这里 editbox 是一个 cc.EditBox 对象
        //这里的 customEventData 参数就等于你之前设置的 "foobar"
    },
	close_scene(){
		this.node.active = false;
		this.node.destroy();
	},
	switchRadio(event){
		var index = event.target.getComponent("one_choice").index;
		var type = event.target.getComponent("one_choice").type;
		if(type == 2 && index == 0){
			this.fangka_num = parseInt(this.fangka_num) + 1;	
			this.num_label.getComponent("cc.EditBox").string = this.fangka_num;
			this.zongjia = this.danjia * this.fangka_num;
			this.zongjia_label.string = this.zongjia + "元";
		}
	},
    // update (dt) {},
});
