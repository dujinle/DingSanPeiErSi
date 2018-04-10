(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/store/store_buy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f17ad/xS8pCFYLrpj3LLpjZ', 'store_buy', __filename);
// Script/store/store_buy.js

"use strict";

cc.Class({
	extends: cc.Component,

	properties: {
		tip_label: cc.Label,
		thing_sprite: cc.Sprite,
		num_label: cc.Label,
		money_label: cc.Label,
		content_label: cc.Label
	},
	onLoad: function onLoad() {
		cc.log("on load store buy");
		var self = this;
		var bg_sprite = self.node.getChildByName("bg_sprite");
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
		}, bg_sprite);
	},
	show_buy_scene: function show_buy_scene(info) {
		this.tip_label.string = info[0];
		this.num_label.string = info[1] + "个";
		this.money_label.string = info[1] * 2 + "元";
		this.node.active = true;
	},
	weixin_callback: function weixin_callback() {},
	zfb_callback: function zfb_callback() {}
}
// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=store_buy.js.map
        