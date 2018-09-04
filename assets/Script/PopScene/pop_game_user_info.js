cc.Class({
    extends: cc.Component,

    properties: {
        /*player layer 里面的参数设置*/
		bg_sprite:cc.Node,
		touxiang:cc.Sprite,
		shoe_node:cc.Node,
		egg_node:cc.Node,
		bomb_node:cc.Node,
		kiss_node:cc.Node,
		flower_node:cc.Node,
		cheer_node:cc.Node,
        vnickname_lable:cc.Label,
        vfangka_label:cc.Label,
        vsex_label:cc.Label,
		call_back:null,
		location:null,
    },

    onLoad() {
        cc.log("start go into pop game player js");
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
    },
	init_info(data,call_back){
		var self = this;
		this.vnickname_lable.string = data["player"].nick_name;
		this.vfangka_label.string = data["player"].fangka_num;
		if(data["player"].gender == 1){
			this.vsex_label.string = "男";
		}else{
			this.vsex_label.string = "女";
		}
		if(data["player"].head_img_url != null){
			cc.loader.load({url:data["player"].head_img_url,type:'png'},function (err, texture) {
				var frame = new cc.SpriteFrame(texture);
				self.touxiang.spriteFrame = frame;
			});
		}
		this.node.active = true;
		this.call_back = call_back;
		this.location = data["location"];
		this.send_from = data["send_from"];
	},
	hide(){
		this.node.active = false;
	},
	button_call(event,type){
		cc.log("button call",type);
		this.node.active = false;
		this.node.destroy();
		this.call_back(type,this.send_from,this.location);
	},
});
