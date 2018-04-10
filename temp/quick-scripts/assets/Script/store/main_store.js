(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/store/main_store.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e85ccytqq1ALolP5oCKCRxN', 'main_store', __filename);
// Script/store/main_store.js

"use strict";

cc.Class({
		extends: cc.Component,

		properties: {
				buy_scene: cc.Node
		},
		onLoad: function onLoad() {
				this.index_arr = ["购买房卡", "购买钻石", "包月", "包年"];

				this.node.on("pressed", this.switchRadio, this);
		},
		switchRadio: function switchRadio(event) {
				var index = event.target.getComponent("one_choice").index;
				var type = event.target.getComponent("one_choice").type;
				cc.log("switchRadio : index:" + index + " type:" + type);
				var buy_scene_com = this.buy_scene.getComponent("store_buy");
				var info = new Array();
				info.push(this.index_arr[type]); //tip label info
				info.push(index);
				info.push(type);
				buy_scene_com.show_buy_scene(info);
		},
		call_back: function call_back() {
				cc.director.loadScene("MainScene");
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
        //# sourceMappingURL=main_store.js.map
        