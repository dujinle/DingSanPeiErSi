"use strict";
cc._RF.push(module, 'd1a018PC3BH/bIuqlMswyHX', 'one_choice');
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