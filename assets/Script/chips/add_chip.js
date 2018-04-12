cc.Class({
    extends: cc.Component,

    properties: {
		silder_num1:0,
		silder_num2:0,
    },
    onLoad () {
		cc.log("start go into pop add chip js");
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
				}
			}
         }, this.node);
	},
	silder1_callback(slider, customEventData){
		this.silder_num1 = slider.progress;
		cc.log("silder1:" + this.silder_num1);
	},
	silder2_callback(slider, customEventData){
		this.silder_num2 = slider.progress;
		cc.log("silder1:" + this.silder_num2);
	},
});
