"use strict";
cc._RF.push(module, 'c0fa5ATHo9G0KE9WhBUPxdm', 'add_chip');
// Script/chips/add_chip.js

"use strict";

cc.Class({
	extends: cc.Component,

	properties: {
		callback: null
	},
	onLoad: function onLoad() {
		cc.log("start go into pop add chip js");
		var self = this;
		self.node.on("pressed", self.switchRadio, self);
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			// 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
			onTouchBegan: function onTouchBegan(touch, event) {
				return true;
			},
			onTouchMoved: function onTouchMoved(touch, event) {// 触摸移动时触发
			},
			onTouchEnded: function onTouchEnded(touch, event) {
				// 点击事件结束处理
				var target = event.getCurrentTarget();
				var local = target.convertToNodeSpace(touch.getLocation());
				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);
				if (cc.rectContainsPoint(rect, local)) {
					cc.log("ok touch in the region......");
				} else {
					cc.log("touch remove from parent");
					self.node.active = false;
				}
			}
		}, this.node);
	},
	set_callback: function set_callback(callback) {
		this.callback = callback;
	},
	switchRadio: function switchRadio(event) {
		var index = event.target.getComponent("one_choice").index;
		var type = event.target.getComponent("one_choice").type;
		cc.log("switchRadio : index:" + index + " type:" + type);
		this.callback(index);
		this.node.destroy();
	}
});

cc._RF.pop();