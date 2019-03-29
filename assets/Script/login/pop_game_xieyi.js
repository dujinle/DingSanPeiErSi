cc.Class({
    extends: cc.Component,
	
    properties: {
		content:cc.Node,
    },

	onClose(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		this.node.active = false;
		this.node.destroy();
	},
    onLoad () {
		for(var i = 1;i< 21;i++){
			var node = new cc.Node();
			var sprite = node.addComponent(cc.Sprite);
			sprite.spriteFrame = GlobalData.assets["xieyi_text_" + i];
			this.content.addChild(node);
		}
		this.node.on(cc.Node.EventType.TOUCH_START,function(e){
			e.stopPropagation();
		})
	},

    start () {

    },
});
