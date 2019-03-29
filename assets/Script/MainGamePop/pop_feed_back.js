cc.Class({
    extends: cc.Component,

    properties: {
       game_sprite:cc.Node,
    },
    onLoad () {
		cc.log("on load feed back");
		this.node.on(cc.Node.EventType.TOUCH_START,function(e){
			e.stopPropagation();
		})
	},
	onClose(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		this.node.active = false;
		this.node.destroy();
	},
	onSend(){
		util.show_error_info("信息反馈成功！");
	}
});
