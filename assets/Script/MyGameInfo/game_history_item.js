cc.Class({
    extends: cc.Component,

    properties: {
       order_id:cc.Node,
	   creat_time:cc.Node,
	   itemID:0,
	   itemLayout:cc.Node,
	   item_cell:cc.Node,
	   pthis:null,
    },
	init(id,data,pthis){
		this.itemID = id;
		this.pthis = pthis;
		this.order_id.getComponent("cc.Label").string = data["room_num"];
		for(var i = 0;i < parseInt(data["renshu"]);i++){
			if(data['location' + (i + 1)] != -1){
				let itemNode = cc.instantiate(this.item_cell);
				itemNode.getChildByName('name').getComponent(cc.Label).string = '';
				itemNode.getChildByName('score').getComponent(cc.Label).string = data['score' + (i + 1)];
				this.itemLayout.addChild(itemNode);
				var param = {
					process:'get_player',
					player_id:data['location' + (i + 1)]
				};
				Servers.request('userInfoRouter',param,function(data){
					itemNode.getChildByName('name').getComponent(cc.Label).string = data.nickname;
				});
			}
		}
		var date_str = util.dateftt(data["creat_time"],"yyyy-MM-dd h:m:s");
		this.creat_time.getComponent("cc.Label").string = date_str;
	},
});
