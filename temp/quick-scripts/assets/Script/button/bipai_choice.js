(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/button/bipai_choice.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dd767pT3yVM6IqdabBmQWEl', 'bipai_choice', __filename);
// Script/button/bipai_choice.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        index: 0,
        type: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.log("go into bipai choice");
        var self = this;
        this.node.on("touchstart", function (event) {
            self.node.dispatchEvent(new cc.Event.EventCustom("pressed", true));
        }, self);
    },
    start: function start() {
        var ringSmallAction = cc.scaleTo(0.5, 0.5, 0.5);
        var ringBigAction = cc.scaleTo(0.5, 2, 2);
        var ringSeqAction = cc.sequence(ringSmallAction, ringBigAction);
        var ringRepeatAction = cc.repeatForever(ringSeqAction);
        this.node.runAction(ringRepeatAction);
        cc.log("baipai choice index:", this.node.getSiblingIndex());
    },

    init: function init(index, type) {
        this.index = index;
        this.type = type;
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
        //# sourceMappingURL=bipai_choice.js.map
        