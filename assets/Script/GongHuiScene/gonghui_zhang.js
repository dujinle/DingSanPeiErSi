cc.Class({
    extends: cc.Component,

    properties: {
		gonghui_id:cc.Node,
		gonghui_name:cc.Node,
		gonghui_zhang:cc.Node,
		gonghui_zhiwu:cc.Node,
		fangka_num:cc.Node,
		renshu:cc.Node,
		danjia:cc.Node,
		xuanyan:cc.Node,
		danjia_str:null,
		xuanyan_str:null,
		xuka_status:null,
		data:null,
    },
	init(data){
		this.data = data;
		if(this.data != null){
			this.gonghui_id.getComponent("cc.Label").string = this.data["gonghui_id"];
			this.gonghui_name.getComponent("cc.Label").string = this.data["gonghui_name"];
			this.fangka_num.getComponent("cc.Label").string = this.data["fangka_num"];
			this.renshu.getComponent("cc.Label").string = this.data["renshu"];
			this.danjia.getComponent("cc.EditBox").string = this.data["danjia"];
			this.xuanyan.getComponent("cc.EditBox").string = this.data["xuanyan"];
			this.gonghui_zhang.getComponent("cc.Label").string = this.data["player_name"];
			this.xuka_status = this.data["xuka_status"];
			this.xuanyan_str = this.data["xuanyan"];
			this.danjia_str = this.data["danjia"];
		}
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
		var size = cc.winSize;
		var self = this;
		var param = {
			'process':'xuka',
			"gonghui_id":this.data["id"],
			"player_id":GlobalData.MyUserInfo["id"],
			"player_name":GlobalData.MyUserInfo["nickname"],
			"telphone":this.data["telphone"]
		};
		Servers.request('gonghuiRouter',param,function(data){
			util.show_error_info(data.msg);
		});
	},
	onTijiao(){
		var self = this;
		var param = {
			'process':'update_gonghui',
			"id":this.data["id"],
			"danjia":this.danjia_str,
			"xuanyan":this.xuanyan_str
		};
		Servers.request('gonghuiRouter',param,function(data){
			util.show_error_info(data.msg);
		});
	},
});
