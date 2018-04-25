cc.Class({
    extends: cc.Component,

    properties: {
		gonghui_name_node:cc.Node,
		phone_node:cc.Node,
		tip_node:cc.Node,
		phone_num:null,
		gonghui_name:null,
		level:1,
		default_tip:null,
		pthis:null,
		choice_radios:{
			type:cc.Node,
			default:[]
		}
    },
	init(pthis){
		this.pthis = pthis;
	},
	onChangePhone(){
		this.phone_num = this.phone_node.getComponent("cc.EditBox").string;
	},
	onEndPhone(){
		this.phone_num = this.phone_node.getComponent("cc.EditBox").string;
	},
	onChangeName(){
		this.gonghui_name = this.gonghui_name_node.getComponent("cc.EditBox").string;
	},
	onEndName(){
		this.gonghui_name = this.gonghui_name_node.getComponent("cc.EditBox").string;
	},
	shenqing_cb(){
		var self = this;
		var size = cc.director.getWinSize();
		if(this.phone_num == null || this.gonghui_name == null){
			util.show_error_info(self.pthis,size,"请完善信息在次提交");
			return;
		}
		var param = {
			"player_id":g_user["id"],
			"player_name":g_user["nickname"],
			"gonghui_name":this.gonghui_name,
			"telphone":this.phone_num,
			"level":this.level
		};
		Servers.gonghuiProcess("shenqing",param,function(data){
			if(data.code == 200){
				self.node.active = false;
				self.pthis.add_gonghui_button_cb();
			}else{
				util.show_error_info(self.pthis,size,data.msg);
			}
		});
	},
    onLoad () {
		var self = this;
		self.node.on("pressed", self.switchRadio, self);
		this.default_tip = this.tip_node.getComponent("cc.Label").string;
	},
	switchRadio(event) {
        var index = event.target.getComponent("one_choice").index;
		var type = event.target.getComponent("one_choice").type;
		cc.log("switchRadio : index:" + index + " type:" + type);
        for(let i = 0; i < this.choice_radios.length; i++){
			var item = this.choice_radios[i].getComponent("one_choice");
            if(item.type == type){
				this.level = index;
            	if(item.index == index){
            		item.pitchOn();
            	}else{
            		item.lifeUp();
            	}
            }
        }
		cc.log("select level" + this.level);
    },
});
