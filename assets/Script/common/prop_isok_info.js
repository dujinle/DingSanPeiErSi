
cc.Class({
    extends: cc.Component,

    properties: {
        message:cc.Label,
        callback:null,
		flag:false,
    },
    onLoad () {
		var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchMoved: function (touch, event) {            // 触摸移动时触发
            },
            onTouchEnded: function (touch, event) {            // 点击事件结束处理
			}
         }, this.node);
    },
	show_error_info(message){
		this.message.string = message;
		var call_back_function = cc.callFunc(this.button_no,this);
		this.node.runAction(cc.sequence(cc.fadeOut(5),call_back_function));
	},
	init(pthis,cb){
		this.callback = cb;
	},
	button_ok(){
		this.flag = true;
		this.callback(pthis,this.flag);
		this.node.destroy();
	},
	button_no(){
		this.flag = false;
		this.callback(pthis,this.flag);
		this.node.destroy();
	},
});
