cc.Class({
    extends: cc.Component,

    properties: {
		game_sprite:cc.Node,
		roomNum:cc.Node,
		timeNum:cc.Node,
		items:{
			type:cc.Node,
			default:[]
		},
    },
    onLoad () {
		cc.log("start go into pop game finish js");
		this.node.on(cc.Node.EventType.TOUCH_START,function(e){
			e.stopPropagation();
		})
		for(var i = 0;i < this.items.length;i++){
			var item = this.items[i];
			item.active = false;
		}
	},
	init_info(players,cb){
		this.cb = cb;
		cc.log("pop game finish:" + JSON.stringify(players));
		var date = new Date();
		this.roomNum.getComponent(cc.Label).string = GlobalData.RunTimeParams.RoomData['roomNum'];
		this.timeNum.getComponent(cc.Label).string = util.dateftt(date.getTime(),"yyyy-MM-dd h:m:s");
		var fetchArr = [];
		for(var i = 0;i < players.length;i++){
			let player = players[i];
			let score = player[3] - player[2];
			fetchArr.push([player[0],player[1],score]);
		}
		var sortFunc = function(a,b){
			return b[2] - a[2];
		};
		fetchArr.sort(sortFunc);
		for(let i = 0;i < fetchArr.length;i++){
			let player = fetchArr[i];
			let item = this.items[i];
			this.set_item_info(item,player);
			item.active = true;
		}
	},
	set_item_info(item,player_com){
		var user_sprite = item.getChildByName("atvar").getChildByName('mask').getChildByName('sprite').getComponent(cc.Sprite);
		var user_label = item.getChildByName("user_name").getComponent(cc.Label);
		var dlabel = item.getChildByName("user_score").getComponent(cc.Label);
		user_label.string = player_com[0];
		/*修改玩家没有头像的问题*/
		if(player_com[1] != null && player_com[1].length > 0){
			cc.loader.load({url:player_com[1],type:'png'},function (err, texture) {
				var frame = new cc.SpriteFrame(texture);
				user_sprite.spriteFrame = frame;
			});
		}else{
			user_sprite.spriteFrame = GlobalData.assets["man"];
		}
		dlabel.string = player_com[2];
	},
	callback_tuichu(){
		var self = this;
		var param = {
			process:null,
			rid:GlobalData.RunTimeParams.RoomData["rid"],
			player_id:GlobalData.MyUserInfo["id"],
			location:null
		};
		if(GlobalData.RoomInfos.LunZhuangFlag == true){
			this.node.removeFromParent();
			this.node.destroy();
			this.cb();
		}else{
			Servers.request('leaveRoomRouter', param, function(data) {
				cc.log(JSON.stringify(data));
				self.cb();
				cc.director.loadScene("MainScene");
			});
		}
	},
});
