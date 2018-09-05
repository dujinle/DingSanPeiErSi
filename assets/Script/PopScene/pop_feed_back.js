cc.Class({
    extends: cc.Component,

    properties: {
       game_sprite:cc.Node,
    },
    onLoad () {
		cc.log("on load feed back");
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
				var target = self.game_sprite;//event.getCurrentTarget();
				var local = target.convertToNodeSpace(touch.getLocation());
				//var local = touch.getLocation();
				var s = target.getContentSize();
				cc.log("target" +target.name + "width:" + s.width + " height:" + s.height);
				cc.log("touch: x:" + local.x + " y:" + local.y);
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
	},
	onClose(){
		this.node.active = false;
		this.node.destroy();
	},
	onSend(){
		util.show_error_info("信息反馈成功！");
	}
});
