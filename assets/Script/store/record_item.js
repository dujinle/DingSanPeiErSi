cc.Class({
    extends: cc.Component,

    properties: {
       order_id:cc.Node,
	   fangka_num:cc.Node,
	   money:cc.Node,
	   creat_time:cc.Node,
	   sbutton:cc.Node,
	   itemID:null,
    },
	init(id,data){
		this.itemID = id;
		this.order_id.getComponent("cc.Label").string = data["order_id"];
		this.fangka_num.getComponent("cc.Label").string = data["fangka_num"];
		this.money.getComponent("cc.Label").string = data["money"];
		this.creat_time.getComponent("cc.Label").string = data["creat_time"];
		if(data["status"] == 0){
			this.sbutton.getComponent("cc.Button").interactable = false;
			this.sbutton.getChildByName("label").getComponent("cc.Label").string = "完成";
		}
		if(data["status"] == 1){
			this.sbutton.getComponent("cc.Button").interactable = true;
			this.sbutton.getChildByName("label").getComponent("cc.Label").string = "去完成";
		}
	},
	button_callback(){
		
	},
});
