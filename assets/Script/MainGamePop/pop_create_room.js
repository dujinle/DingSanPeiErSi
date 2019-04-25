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
		
		if(GlobalData.MyUserInfo.gonghui_id == null){
			util.show_error_info("您不是公会会长，无法进行房间的创建！");
		}else{
			var p = {
				process:'checkGongHuiZhang',
				player_id:GlobalData.MyUserInfo.id,
				gonghui_id:GlobalData.MyUserInfo.gonghui_id
			};
			Servers.request('gonghuiRouter',p,function(res){
				var param = {
					process:null,
					renshu:self.renshu,
					room_type:self.game_type,
					player_id:GlobalData.MyUserInfo.id,
					max_type:self.max_type
				};
				Servers.request('createRoomRouter', param, function(data) {
					cc.log(JSON.stringify(data));
					util.show_error_info(data.msg);
					GlobalData.MyUserInfo.fangka_num = GlobalData.MyUserInfo.fangka_num - 1;
					self.close_scene();
				});
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
