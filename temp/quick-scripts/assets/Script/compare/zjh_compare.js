(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/compare/zjh_compare.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3583bFm+c5C86nHjWxeFmm6', 'zjh_compare', __filename);
// Script/compare/zjh_compare.js

"use strict";

cc.Class({
	extends: cc.Component,

	properties: {
		bg_sprite: cc.Sprite,
		left_name_label: cc.Label,
		right_name_label: cc.Label,
		left_cards: {
			type: cc.Sprite,
			default: []
		},
		right_cards: {
			type: cc.Sprite,
			default: []
		},
		dianshan: cc.Sprite,
		is_finish: false,
		is_start: false,
		anim: null,
		animStatus: null,
		duration: 0
	},
	onLoad: function onLoad() {
		cc.log("load dianji class");
		this.is_finish = false;
		this.anim = this.bg_sprite.getComponent(cc.Animation);
		this.anim.on('finished', this.onFinished, this);
		//this.test();
	},
	init_info: function init_info(left_name, right_name) {
		this.left_name_label.string = left_name;
		this.right_name_label.string = right_name;
	},
	bipai_start: function bipai_start(time) {
		var self = this;
		self.is_finish = false;
		setTimeout(function () {
			self.animStatus = self.anim.play("dianshan");
			self.is_start = true;
			// 设置循环模式为 Normal
			self.animStatus.wrapMode = cc.WrapMode.Normal;
			// 设置循环模式为 Loop
			self.animStatus.wrapMode = cc.WrapMode.Loop;
			// 设置动画循环次数为2次
			self.animStatus.repeatCount = 3;
		}, time * 1000);
	},
	onFinished: function onFinished() {
		cc.log("zjh compare finish", this.isValid);
		this.is_finish = true;
		this.is_start = false;
		this.node.parent = null;
		this.node.destroy();
	},
	get_cur_time: function get_cur_time() {
		if (this.is_start == true) {
			return this.animStatus.time / this.animStatus.speed * 3;
		} else {
			return this.animStatus.duration / this.animStatus.speed * 3;
		}
	},
	get_card_position: function get_card_position(card) {
		//计算节点相对于顶级节点的位置
		var cur_node = card;
		if (cur_node.__cid__ == "cc.Sprite") {
			cur_node = cur_node.node;
		}
		var position = cc.p(cur_node.getPosition());
		while (cur_node.parent != null) {
			if (cur_node.__cid__ == "cc.Sprite") {
				cur_node = cur_node.node;
			}
			if (cur_node == this.node) {
				break;
			}
			var cur_parent = cur_node.parent;
			var cur_parent_pos = cur_parent.getPosition();
			position.x = cur_parent_pos.x + position.x;
			position.y = cur_parent_pos.y + position.y;
			cur_node = cur_parent;
		}
		return position;
	},
	test: function test() {
		this.bipai_start(1.5);
		var self = this;
		setTimeout(function () {
			cc.log(self.animStatus.duration, self.animStatus.time, self.animStatus.speed);
		}, 2000);
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
        //# sourceMappingURL=zjh_compare.js.map
        