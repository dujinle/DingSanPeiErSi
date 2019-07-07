cc.Class({
    extends: cc.Component,

    properties: {
		gonghui_name_node:cc.Node,
		phone_node:cc.Node,
		phone_num:null,
		gonghui_name:null,
		level:1,
		default_tip:null,
		pthis:null,
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
			util.show_error_info("请完善信息在次提交");
			return;
		}
		var param = {
			'process':'shenqing',
			"player_id":GlobalData.MyUserInfo["id"],
			"player_name":GlobalData.MyUserInfo["nickname"],
			"gonghui_name":this.gonghui_name,
			"telphone":this.phone_num,
			"level":this.level
		};
		Servers.request('gonghuiRouter',param,function(data){
			self.node.active = false;
			self.pthis.add_gonghui_button_cb();
		});
	},
    onLoad () {
		var self = this;
		//self.node.on("pressed", self.switchRadio, self);
		//this.default_tip = 
	},
});
