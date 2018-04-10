"use strict";
cc._RF.push(module, 'b13ed8BnidJ64JY/eb8+mGs', 'msage_scroll');
// Script/msage_scroll/msage_scroll.js

"use strict";

cc.Class({
	extends: cc.Component,

	properties: {
		scroll_label: cc.Label,
		scroll_parent: cc.Node
	},

	onLoad: function onLoad() {
		//this.set_string("今天天气不错");
	},
	set_string: function set_string(string) {
		this.scroll_label.node.active = false;
		this.scroll_label.node.stopAllActions();
		this.scroll_label.string = string;
		this.scroll_label.node.x = this.scroll_parent.getContentSize().width / 2 + this.scroll_parent.getPositionX() + this.scroll_label.node.getContentSize().width;
		this.start_scroll();
	},
	start_scroll: function start_scroll() {
		this.scroll_label.node.active = true;
		var self = this;
		this.scroll_label.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.001, 0, 0), cc.callFunc(function () {
			var cnode = self.scroll_label.node;
			cnode.x = cnode.x - 2.5;
			var left_x = self.scroll_parent.getContentSize().width / 2 + cnode.getContentSize().width;
			if (cnode.x <= -left_x + self.scroll_parent.x) {
				cnode.stopAllActions();
			}
		}.bind(this)))));
	}
});

cc._RF.pop();