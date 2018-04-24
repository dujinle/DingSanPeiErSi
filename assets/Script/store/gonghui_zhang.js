cc.Class({
    extends: cc.Component,

    properties: {
		gonghui_id:cc.Node,
		gonghui_name:cc.Node,
		fangka_num:cc.Node,
		renshu:cc.Node,
		danjia:cc.Node,
		xuanyan:cc.Node,
		gonggao:cc.Node,
		danjia_str:null,
		xuanyan_str:null,
		gonggao_str:null,
		xuka_status:null,
    },
	init(data){
		this.gonghui_id.getComponent("cc.Label").string = data["gonghui_id"];
		this.gonghui_name.getComponent("cc.Label").string = data["gonghui_name"];
		this.fangka_num.getComponent("cc.Label").string = data["fangka_num"];
		this.renshu.getComponent("cc.Label").string = data["renshu"];
		this.danjia.getComponent("cc.EditBox").string = data["danjia"];
		this.xuanyan.getComponent("cc.EditBox").string = data["xuanyan"];
		this.gonggao.getComponent("cc.EditBox").string = data["gonggao"];
		this.xuka_status = data["xuka_status"];
		this.xuanyan_str = data["xuanyan"];
		this.gonggao_str = data["gonggao"];
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
	onChangeGonggao(){
		this.gonggao_str = this.gonggao.getComponent("cc.EditBox").string;
	},
	onEndGonggao(){
		this.gonggao_str = this.gonggao.getComponent("cc.EditBox").string;
	},
	onXuka(){
		
	},
	onTijiao(){
		
	},
    onLoad () {
		
	},

    start () {

    },

    // update (dt) {},
});
