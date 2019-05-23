cc.Class({
    extends: cc.Component,

    properties: {
      game_sprite:cc.Node,
	  //zhanji params
	  zhanji_node:cc.Node,
	  zhanji_button:cc.Node,
	  //record params
	  record_button:cc.Node,
	  record_node:cc.Node,
    },
    onLoad () {
		var self = this;
		GlobalData.RunTimeParams.CurrentScene = GlobalData.SCENE_TAG.GAMEINFO;
		var param = {
			player_id:GlobalData.MyUserInfo["id"],
			process:'get_player'
		};
		Servers.request('userInfoRouter',param,function(data){
			for(var key in data.msg) {
				GlobalData.MyUserInfo[key] = data.msg[key];
			}
			self.zhanji_button_cb();
		});
	},
	zhanji_button_cb(){
		this.zhanji_button.getComponent("cc.Button").interactable = false;
		this.record_button.getComponent("cc.Button").interactable = true;
		//init zhanji info
		var zhanji_node_com = this.zhanji_node.getComponent("my_game_zhanji");
		zhanji_node_com.init_zhanji_info(GlobalData.MyUserInfo,this);
		this.zhanji_node.active = true;
		//清空隐藏node的数据
		var record_node_com = this.record_node.getComponent("my_game_record");
		record_node_com.clear_scroll_data();
		this.record_node.active = false;
		cc.log("zhanji_button_cb");
	},
	record_button_cb(){
		this.record_button.getComponent("cc.Button").interactable = false;
		this.zhanji_button.getComponent("cc.Button").interactable = true;
		var record_node_com = this.record_node.getComponent("my_game_record");
		record_node_com.init_record_info(GlobalData.MyUserInfo,this);
		this.record_node.active = true;
		
		var zhanji_node_com = this.zhanji_node.getComponent("my_game_zhanji");
		zhanji_node_com.clear_scroll_data();
		this.zhanji_node.active = false;

		cc.log("record_button_cb");
	},
	close_scene(){
		cc.director.loadScene("MainScene");
	},
    // update (dt) {},
});
