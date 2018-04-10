(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/button/one_choice.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd1a018PC3BH/bIuqlMswyHX', 'one_choice', __filename);
// Script/button/one_choice.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        index: 0,
        type: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        this.node.on("touchstart", function (event) {
            self.node.dispatchEvent(new cc.Event.EventCustom("pressed", true));
        }, this);
    },

    init: function init(index, type) {
        this.index = index;
        this.type = type;
    },

    pitchOn: function pitchOn() {
        this.node.getChildByName("choiced").active = true;
        this.node.getChildByName("choice").active = false;
    },

    lifeUp: function lifeUp() {
        this.node.getChildByName("choice").active = true;
        this.node.getChildByName("choiced").active = false;
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
        //# sourceMappingURL=one_choice.js.map
        