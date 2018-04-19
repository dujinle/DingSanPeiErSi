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
				var target=event.getCurrentTarget();
				var local=target.convertToNodeSpace(touch.getLocation());
				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);
				if (cc.rectContainsPoint(rect, local)){
					cc.log("ok touch in the region......");
				}else{
					cc.log("touch remove from parent");
					self.node.active = false;
				}
			}
         }, this.game_sprite);
		 this.init({"danjia":2});
	},
	init(data){
		this.danjia = data["danjia"];
		this.danjia_label.string = this.danjia + "元";
		this.zongjia = this.danjia * this.fangka_num;
		this.zongjia_label.string = this.zongjia + "元";
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
	switchRadio(){
		this.fangka_num = parseInt(this.fangka_num) + 1;	
		this.num_label.getComponent("cc.EditBox").string = this.fangka_num;
		this.zongjia = this.danjia * this.fangka_num;
		this.zongjia_label.string = this.zongjia + "元";
	},
    // update (dt) {},
});
