
cc.Class({
    extends: cc.Component,

    properties: {
        message:cc.Label,
        callback:null,
		flag:false,
    },
    onLoad () {
		this.node.on(cc.Node.EventType.TOUCH_START,function(e){
			e.stopPropagation();
		})
    },
	show_error_info(message){
		this.message.string = message;
		var call_back_function = cc.callFunc(this.button_no,this);
		this.node.runAction(cc.sequence(cc.fadeOut(20),call_back_function));
	},
	init(cb){
		this.callback = cb;
	},
	button_ok(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		this.flag = true;
		this.callback(this.flag);
		this.node.destroy();
	},
	button_no(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		this.flag = false;
		this.callback(this.flag);
		this.node.destroy();
	},
});
