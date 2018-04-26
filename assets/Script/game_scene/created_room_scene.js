cc.Class({
    extends: cc.Component,

    properties: {
		room_num_node:cc.Node,
		fangzhu_node:cc.Node,
		max_pai_node:cc.Node,
		renshu_node:cc.Node,
		wait_time_node:cc.Node,
		fangzhu_fangka_node:cc.Node,
		wanjia_fangka_node:cc.Node,
		choice_sprite:{
			type:cc.Node,
			default:[]
		}
    },

    onLoad () {
		this.node.on("pressed", this.switchRadio, this);
		this.init_data();
	},
	share_button_cb(){
		jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "WxShare", "(Ljava/lang/String;Ljava/lang/String;I)V",g_room_data["room_num"],g_room_data["fangzhu_name"],g_room_data["rid"]);
	},

	init_data(){
		this.room_num_node.getComponent("cc.Label").string = g_room_data["room_num"];
		this.fangzhu_node.getComponent("cc.Label").string = g_room_data["fangzhu_name"];
		if(g_room_data["max_type"] == 1){
			this.max_pai_node.getComponent("cc.Label").string = "鬼大";
		}else if(g_room_data["max_type"] == 2){
			this.max_pai_node.getComponent("cc.Label").string = "玄大";
		}else if(g_room_data["max_type"] == 3){
			this.max_pai_node.getComponent("cc.Label").string = "皇上大";
		}
		this.renshu_node.getComponent("cc.Label").string = g_room_data["player_num"];
		this.wait_time_node.getComponent("cc.Label").string = g_room_data["wait_time"];
		if(g_room_data["fangka_type"] == 1){
			this.fangzhu_fangka_node.getComponent("cc.Label").string = "消费1张";
			this.wanjia_fangka_node.getComponent("cc.Label").string = "消费1张";
		}else if(g_room_data["fangka_type"] == 2){
			this.fangzhu_fangka_node.getComponent("cc.Label").string = "消费" + g_room_data["fangka_num"] + "张";
			this.wanjia_fangka_node.getComponent("cc.Label").string = "消费0张";
		}
	},
    
	switchRadio(event) {
        var index = event.target.getComponent("one_choice").index;
		var type = event.target.getComponent("one_choice").type;
		cc.log("switchRadio : index:" + index + " type:" + type);
        for(let i = 0; i < this.choice_sprite.length; i++){
			var item = this.choice_sprite[i].getComponent("one_choice");
            if(item.index == index){
				break;
            }
        }
    },
	// update (dt) {},
});
