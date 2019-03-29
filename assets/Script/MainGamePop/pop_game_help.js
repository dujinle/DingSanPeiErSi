cc.Class({
    extends: cc.Component,

    properties: {
    },

	onClose(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		this.node.active = false;
		this.node.destroy();
	},
    onLoad () {
		this.node.on(cc.Node.EventType.TOUCH_START,function(e){
			e.stopPropagation();
		})
	},

    start () {

    },

    // update (dt) {},
});
