cc.Class({
    extends: cc.Component,

    properties: {
        index: 0,
        type:0,
        data:null,
        flag:false,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        this.node.on("touchstart", function (event) {
            self.node.dispatchEvent(new cc.Event.EventCustom("pressed", true));
        }, this)
    },
    
    init: function (index,type) {
        this.index = index;
        this.type = type;
    },
    set_data(data){
        this.data = data;
    },
    get_data(){
        return this.data;
    },
    set_flag(flag){
        this.flag = flag;
    },
    get_flag(){
        return this.flag;
    },
});

