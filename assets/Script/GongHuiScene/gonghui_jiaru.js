cc.Class({
    extends: cc.Component,

    properties: {
		gonghui_id:cc.Node,
		pthis:null,
		gid:null,
    },
	init(pthis){
		this.pthis = pthis;
	},
	onChangeEdit(){
		this.gid = this.gonghui_id.getComponent("cc.EditBox").string;
	},
	onEndEdit(){
		this.gid = this.gonghui_id.getComponent("cc.EditBox").string;
	},
	jiaru_cb(){
		var self = this;
		var size = cc.winSize;
		if(this.gid == null || this.gid.length < 4){
			util.show_error_info("输入正确的公会ID");
		}
		var param = {
			"player_id":GlobalData.MyUserInfo["id"],
			"gonghui_id":this.gid
		};
		Servers.gonghuiProcess("join_gonghui",param,function(data){
			if(data.code == 200){
				self.node.active = false;
				GlobalData.MyUserInfo["gonghui_id"] = data.msg["gonghui_id"];
				self.pthis.my_gonghui_button_cb();
			}else{
				util.show_error_info("没有找到对应的公会信息");
			}
		});
	},
});
