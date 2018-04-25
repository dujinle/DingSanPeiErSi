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
		var size = cc.director.getWinSize();
		if(this.gid == null || this.gid.length < 4){
			util.show_error_info(self.pthis,size,"输入正确的公会ID");
		}
		var param = {
			"player_id":g_user["id"],
			"gonghui_id":this.gid
		};
		Servers.gonghuiProcess("join_gonghui",param,function(data){
			if(data.code == 200){
				self.node.active = false;
				g_user["gonghui_id"] = data.msg["gonghui_id"];
				self.pthis.my_gonghui_button_cb();
			}else{
				util.show_error_info(self.pthis,size,"没有找到对应的公会信息");
			}
		});
	},
});
