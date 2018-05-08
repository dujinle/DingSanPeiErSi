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
		pthis:null,
    },
	init(data,pthis){
		this.pthis = pthis;
		this.gonghui_id.getComponent("cc.Label").string = data["gonghui_id"];
		this.gonghui_name.getComponent("cc.Label").string = data["gonghui_name"];
		this.gonghui_zhang.getComponent("cc.Label").string = data["player_name"];
		this.fangka_num.getComponent("cc.Label").string = data["fangka_num"];
		this.renshu.getComponent("cc.Label").string = data["renshu"];
		this.danjia.getComponent("cc.Label").string = data["danjia"];
		this.xuanyan.getComponent("cc.Label").string = data["xuanyan"];
		this.gonggao.getComponent("cc.Label").string = data["gonggao"];
	},
	tuichu_cb(){
		
	},
    onLoad () {
		
	},

    start () {

    },

    // update (dt) {},
});
