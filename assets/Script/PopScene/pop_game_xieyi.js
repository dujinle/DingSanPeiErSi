cc.Class({
    extends: cc.Component,
	
    properties: {
		content:cc.Node,
    },

	onClose(){
		this.node.active = false;
		this.node.destroy();
	},
    onLoad () {
		for(var i = 1;i< 21;i++){
			var node = new cc.Node();
			var sprite = node.addComponent(cc.Sprite);
			sprite.spriteFrame = g_assets["xieyi_text_" + i];
			this.content.addChild(node);
		}
	},

    start () {

    },
});
