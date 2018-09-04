// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
                var target = self.bg_sprite;//event.getCurrentTarget();
                var local=target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, local)){
                    cc.log("ok touch in the region......");
                }else{
                    cc.log("touch remove from parent");
                    self.node.active = false;
                }
            }
        }, self.bg_sprite);
		this.time_node.string = "(" + this.left_time + "s)";
		this.schedule(this.hidde_time,1);
		Servers.gongGaoProcess("get_gonggao",{"type":1},function(data){
			cc.log(JSON.stringify(data));
			if(data.code == 200){
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
			this.node.active = false;
			this.node.destroy();
		}
	},
});
