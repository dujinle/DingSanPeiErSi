cc.Class({
    extends: cc.Component,

    properties: {
        bg_sprite:cc.Node,
		time_node:cc.Label,
		content_node:cc.Node,
		left_time:4,
    },
    onLoad() {
        cc.log("start go into pop game gonggao js");
        var self = this;
		this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
		this.time_node.string = "(" + this.left_time + "s)";
		this.schedule(this.hidde_time,1);
		Servers.request('gongGaoRouter',{"type":1,process:'get_gonggao'},function(data){
			cc.log(JSON.stringify(data));
			if(self.node && self.node.isValid){
				var rich_text = self.content_node.getComponent(cc.RichText);
				rich_text.string = data.msg;
			}
		});
    },
	hidde_time(){
		this.left_time = this.left_time - 1;
		this.time_node.string = "(" + this.left_time + "s)";
		if(this.left_time <= 0){
			this.unschedule(this.hidde_time);
			this.node.removeFromParent();
			this.node.destroy();
		}
	},
	touchStart(event){
		var touch = event.getLocation()
		var target = this.bg_sprite;//event.getCurrentTarget();
		var local=target.convertToNodeSpace(touch);
		var s = target.getContentSize();
		var rect = cc.rect(0, 0, s.width, s.height);
		if (rect.contains(local)){
			cc.log("ok touch in the region......");
		}else{
			cc.log("touch remove from parent");
			this.left_time = 0;
		}
	}
});
