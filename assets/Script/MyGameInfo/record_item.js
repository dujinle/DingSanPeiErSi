cc.Class({
    extends: cc.Component,

    properties: {
       order_id:cc.Node,
	   fangka_num:cc.Node,
	   money:cc.Node,
	   gold:cc.Node,
	   creat_time:cc.Node,
	   itemID:null,
	   pthis:null,
	   data:null,
    },
	init(id,data,pthis){
		this.itemID = id;
		this.pthis = pthis;
		this.data = data;
		this.order_id.getComponent("cc.Label").string = data["order_id"];
		this.fangka_num.getComponent("cc.Label").string = data["fangka_num"];
		this.money.getComponent("cc.Label").string = data["zongjia"];
		this.gold.getComponent("cc.Label").string = data['gold'];
		var date_str = util.dateftt(data["creat_time"],"yyyy-MM-dd h:m:s");
		this.creat_time.getComponent("cc.Label").string = date_str;
	},
	button_callback(){
		this.pthis.node.active = false;
		this.pthis.node.destroy();
		var pop_order = cc.instantiate(GlobalData.assets["PopBuyOrderScene"]);
		var pop_order_com = pop_order.getComponent("buy_order");
		pop_order_com.init(this.data);
		pthis.parent.node.addChild(pop_order);
		pop_order.setPosition(pthis.parent.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
	},
});
