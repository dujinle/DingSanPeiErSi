(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/compare/select_compare.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e1efdlK4kpDhaXtMJGLPm0j', 'select_compare', __filename);
// Script/compare/select_compare.js

"use strict";

cc.Class({
	extends: cc.Component,

	properties: {
		my_selects: {
			type: cc.Node,
			default: []
		},
		callback: null
	},
	onLoad: function onLoad() {
		cc.log("start go into select comparejs");
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
		}, self.node);
	},
	set_which_select: function set_which_select(which) {
		cc.log(JSON.stringify(which));
		for (var i = 0; i < which.length; i++) {
			var idx = which[i] - 1;
			this.my_selects[idx].active = true;
		}
	},
	set_callback: function set_callback(callback) {
		this.callback = callback;
	},
	switchRadio: function switchRadio(event) {
		var index = event.target.getComponent("bipai_choice").index;
		var type = event.target.getComponent("bipai_choice").type;
		cc.log("switchRadio : index:" + index + " type:" + type);
		this.callback(index);
		this.node.destroy();
	}
});

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
        //# sourceMappingURL=select_compare.js.map
        