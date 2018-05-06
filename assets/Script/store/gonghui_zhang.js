cc.Class({
    extends: cc.Component,

    properties: {
		gonghui_id:cc.Node,
		gonghui_name:cc.Node,
		gonghui_zhang:cc.Node,
		fangka_num:cc.Node,
		renshu:cc.Node,
		danjia:cc.Node,
		xuanyan:cc.Node,
		danjia_str:null,
		xuanyan_str:null,
		xuka_status:null,
		data:null,
		pthis:null,
    },
	init(data,pthis){
		this.pthis = pthis;
		this.data = data;
		this.gonghui_id.getComponent("cc.Label").string = data["gonghui_id"];
		this.gonghui_name.getComponent("cc.Label").string = data["gonghui_name"];
		this.fangka_num.getComponent("cc.Label").string = data["fangka_num"];
		this.renshu.getComponent("cc.Label").string = data["renshu"];
		this.danjia.getComponent("cc.EditBox").string = data["danjia"];
		this.xuanyan.getComponent("cc.EditBox").string = data["xuanyan"];
		this.gonghui_zhang.getComponent("cc.Label").string = data["player_name"];
		this.xuka_status = data["xuka_status"];
		this.xuanyan_str = data["xuanyan"];
		this.danjia_str = data["danjia"];
	},
	onChangeDanjia(){
		this.danjia_str = this.danjia.getComponent("cc.EditBox").string;
	},
	onEndDanjia(){
		this.danjia_str = this.danjia.getComponent("cc.EditBox").string;
	},
	onChangeXuanyan(){
		this.xuanyan_str = this.xuanyan.getComponent("cc.EditBox").string;
	},
	onEndXuanyan(){
		this.xuanyan_str = this.xuanyan.getComponent("cc.EditBox").string;
	},
	onXuka(){
		var size = cc.director.getWinSize();
		var self = this;
		var param = {
			"gonghui_id":this.data["id"],
			"player_id":g_user["id"],
			"player_name":g_user["nickname"],
			"telphone":this.data["telphone"]
		};
		Servers.gonghuiProcess("xuka",param,function(data){
			if(data.code == 200){
				util.show_error_info(self.parent,size,"申请续卡已经提交，等待工作人员确认信息。");
			}else{
				util.show_error_info(self.parent,size,data.msg);
			}
		});
	},
	onTijiao(){
		var self = this;
		var param = {
			"id":this.data["id"],
			"danjia":this.danjia,
			"xuanyan":this.xuanyan_str,
			"gonggao":this.gonggao_str
		};
		Servers.gonghuiProcess("update_gonghui",param,function(data){
			if(data.code == 200){
				util.show_error_info(self.parent,size,"公会信息更新完成");
				self.init(data.msg);
			}else{
				util.show_error_info(self.parent,size,data.msg);
			}
		});
	},
});
