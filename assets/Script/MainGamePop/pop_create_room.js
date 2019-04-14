cc.Class({
    extends: cc.Component,

    properties: {
    	game_bg:cc.Node,
		tip_label:cc.Label,
    	max_type:1,
		fangka:1,
		renshu:2,
		game_type:1,
		button_node:cc.Node,
		choice_radios:{
			type:cc.Node,
			default:[],
		},
		room_bg:cc.Node,
    },
    onLoad () {
		cc.log("start go into create game js");
		var self = this;
		self.max_type = 1;
		self.game_type = 1;
		cc.log("select renshu" + this.renshu + " game_type:" + this.game_type + " zuida:" + this.max_type);
		self.node.on("pressed", self.switchRadio, self);
		this.node.on(cc.Node.EventType.TOUCH_START,function(e){
			e.stopPropagation();
		})
	},
	switchRadio(event) {
        var index = event.target.getComponent("one_choice").index;
		var type = event.target.getComponent("one_choice").type;
		cc.log("switchRadio : index:" + index + " type:" + type);
        for(let i = 0; i < this.choice_radios.length; i++){
			var item = this.choice_radios[i].getComponent("one_choice");
            if(item.type == type){
            	if(type == 0){
            		this.renshu = index;
            	}else if(type == 1){
            		this.max_type = index;
            	}else if(type == 2){
            		this.game_type = index;
            	}
            	if(item.index == index){
            		item.pitchOn();
            	}else{
            		item.lifeUp();
            	}
            }
        }
		cc.log("select renshu" + this.renshu + " game_type:" + this.game_type + " zuida:" + this.max_type);
    },
	create_game(){
		var self = this;
		this.button_node.getComponent("cc.Button").interactable = false;
		var param = {
			renshu:this.renshu,
			room_type:this.game_type,
			player_id:GlobalData.MyUserInfo.id,
			max_type:this.max_type
		};
		if(GlobalData.MyUserInfo.gonghui_id == null){
			util.show_error_info("您不是公会会长，无法进行房间的创建！");
		}else{
			Servers.gonghuiProcess('getGonghuiGongHuiId',{gonghui_id:GlobalData.MyUserInfo.gonghui_id},function(res){
				if(res.code == 200){
					var gonghuiInfo = res.msg;
					if(gonghuiInfo.player_id != GlobalData.MyUserInfo.id){
						util.show_error_info("您不是公会会长，无法进行房间的创建！");
					}else{
						pomelo.request(util.getCreateRoomRoute(), param, function(data) {
							cc.log(JSON.stringify(data));
							if(data.code != 200){
								util.show_error_info(data.msg);
							}else{
								util.show_error_info("创建房间成功!");
								GlobalData.MyUserInfo.fangka_num = GlobalData.MyUserInfo.fangka_num - 1;
								self.close_scene();
								return ;
							}
						});
					}
				}else{
					util.show_error_info("您不是公会会长，无法进行房间的创建！");
				}
			});
		}
	},
	close_scene(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		this.node.removeFromParent();
		this.node.destroy();
	}
    // update (dt) {},
});
