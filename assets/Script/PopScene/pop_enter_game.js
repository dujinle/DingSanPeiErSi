cc.Class({
    extends: cc.Component,

    properties: {
		myindex:-1,
		shuru_kuangs:{
			type:cc.Node,
			default:[],
		},
		choice_radios:{
			type:cc.Node,
			default:[],
		},
		bg_sprite:cc.Node,
    },
    onLoad () {
		cc.log("start go into create game js");
		var self = this;
		self.room_num = new Array();
		self.node.on("pressed", self.switchRadio, self);
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
					self.node.destroy();
				}
			}
         }, this.bg_sprite);
	},
	switchRadio(event) {
        var index = event.target.getComponent("one_choice").index;
		var type = event.target.getComponent("one_choice").type;
		cc.log("switchRadio : index:" + index + " type:" + type);
		if(type == 2){
			//去除一个数字
			if(index == 1){
				if(this.myindex >= 0){
					this.shuru_kuangs[this.myindex].getChildByName("num_label").active = false;
					this.room_num.splice(this.myindex,1);
					this.myindex = this.myindex - 1;
				}
			}else if(index == 2){
			//删除所有的数字
				for(var i = 0;i < this.shuru_kuangs.length;i++){
					this.shuru_kuangs[i].getChildByName("num_label").active = false;
				}
				this.room_num.splice(0,this.room_num.length);
				this.myindex = -1;
			}
		}else if(type == 1){
			if(this.myindex < 5){
				this.myindex = this.myindex + 1;
				var label = this.shuru_kuangs[this.myindex].getChildByName("num_label");
				var label_com = label.getComponent(cc.Label);
				label_com.string = index;
				label.active = true;
				this.room_num.push(index);
				if(this.myindex == 5){
					this.enter_game();
				}
			}else{
				this.enter_game();
			}
		}
		cc.log("room_num:" + JSON.stringify(this.room_num));
    },
	enter_game(){
		this.myindex = -1;
		var roomNum =  this.room_num.join("");
		for(var i = 0;i < this.shuru_kuangs.length;i++){
			this.shuru_kuangs[i].getChildByName("num_label").active = false;
		}
		this.room_num.splice(0,this.room_num.length);
		
		var param = {
			player_id:g_user.id,
			room_num: roomNum,
			rid: null
		};
		enter_wait_room(param,this);
	},
	close_scene(){
		this.node.active = false;
		this.node.destroy();
	},
});
