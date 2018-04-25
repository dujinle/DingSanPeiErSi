cc.Class({
    extends: cc.Component,

    properties: {
       order_id:cc.Node,
	   fangka_num:cc.Node,
	   renshu:cc.Node,
	   creat_time:cc.Node,
	   game_status:cc.Node,
	   itemID:0,
	   pthis:null,
    },
	init(id,data,pthis){
		this.itemID = id;
		this.pthis = pthis;
		this.order_id.getComponent("cc.Label").string = data["order_id"];
		this.fangka_num.getComponent("cc.Label").string = data["fangka_num"];
		this.renshu.getComponent("cc.Label").string = data["renshu"];
		this.creat_time.getComponent("cc.Label").string = data["creat_time"];
		this.game_status.getComponent("cc.Label").string = data["game_status"];
	},
});
