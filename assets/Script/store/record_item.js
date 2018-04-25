cc.Class({
    extends: cc.Component,

    properties: {
       order_id:cc.Node,
	   fangka_num:cc.Node,
	   money:cc.Node,
	   creat_time:cc.Node,
	   sbutton:cc.Node,
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
		this.creat_time.getComponent("cc.Label").string = data["creat_time"];
		if(data["status"] == 1){
			this.sbutton.getComponent("cc.Button").interactable = false;
			this.sbutton.getChildByName("label").getComponent("cc.Label").string = "完成";
		}
		if(data["status"] == 0){
			this.sbutton.getComponent("cc.Button").interactable = true;
			this.sbutton.getChildByName("label").getComponent("cc.Label").string = "去完成";
		}
	},
	button_callback(){
		this.pthis.node.active = false;
		this.pthis.node.destroy();
		var pop_order = cc.instantiate(g_assets["PopBuyOrderScene"]);
		var pop_order_com = pop_order.getComponent("buy_order");
		pop_order_com.init(this.data);
		pthis.parent.node.addChild(pop_order);
		pop_order.setPosition(pthis.parent.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
	},
});
