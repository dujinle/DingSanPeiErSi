(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/LoadGame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0c295vrLU5GMYLULq/2SF+x', 'LoadGame', __filename);
// Script/LoadGame.js

"use strict";

cc.Class({
	extends: cc.Component,

	properties: {
		loadBar: cc.ProgressBar,
		precent: cc.Label,
		rate: 0,
		source_leng: 58
	},
	onLoad: function onLoad() {
		this.source_leng = 109;
		this.load_res();
		this.schedule(this.load_update, 0.5);
	},
	load_update: function load_update() {
		this.loadBar.progress = this.rate / this.source_leng * 100;
		this.precent.string = this.loadBar.progress + "%";
		cc.log("this.rate:" + this.rate);
		if (this.rate >= this.source_leng) {
			this.unschedule(this.load_update);
			cc.director.loadScene("LoginScene");
		}
	},
	load_res: function load_res() {
		var self = this;
		cc.loader.loadResDir("", cc.SpriteFrame, function (err, assets) {
			for (var i = 0; i < assets.length; i++) {
				g_assets[assets[i].name] = assets[i];
				self.rate = self.rate + 1;
				cc.log("load res :" + assets[i].name);
			}
		});
		cc.loader.loadResDir("prefab", function (err, assets) {
			for (var i = 0; i < assets.length; i++) {
				g_assets[assets[i].name] = assets[i];
				self.rate = self.rate + 1;
				cc.log("load res :" + assets[i].name);
			}
		});
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
        //# sourceMappingURL=LoadGame.js.map
        