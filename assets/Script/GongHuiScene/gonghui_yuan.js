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
		data:null,
    },
	init(data){
		this.data = data;
		if(this.data != null){
			this.gonghui_id.getComponent("cc.Label").string = this.data["gonghui_id"];
			this.gonghui_name.getComponent("cc.Label").string = this.data["gonghui_name"];
			this.gonghui_zhang.getComponent("cc.Label").string = this.data["player_name"];
			this.fangka_num.getComponent("cc.Label").string = this.data["fangka_num"];
			this.renshu.getComponent("cc.Label").string = this.data["renshu"];
			this.danjia.getComponent("cc.Label").string = this.data["danjia"];
			this.xuanyan.getComponent("cc.Label").string = this.data["gonggao"];
		}
	},
	tuichu_cb(){
		
	},
});
