
cc.Class({
    extends: cc.Component,

    properties: {
        message:cc.Label,
        error_sprite:cc.Sprite,
    },
    onLoad () {
		this.node.on(cc.Node.EventType.TOUCH_START,function(e){
			e.stopPropagation();
		})
    },
	show_error_info(message){
		var self = this;
		this.message.string = message;
		var finish = cc.callFunc(function(){
			self.node.removeFromParent();
			self.node.destroy();
		},this);
		this.node.runAction(cc.sequence(cc.fadeOut(3),finish));
	},
});
