cc.Class({
    extends: cc.Component,

    properties: {
		sumBet:100,
		count:0,
		fapai_count:0,
		roomNum:0,
		roomState:0,
		master_name:null,
		zhuang_serverPosition:0,
		left_cards:null,
		qieguo:0,
		//head label info
		pai_back_sprite:cc.Sprite,
		suiji_qiangzhuang:cc.Node,
		master_label:cc.Label,
		room_num_label:cc.Label,
		//zhuang_label:cc.Label,
		huihe_label:cc.Label,
		//msage_scroll:cc.Node,
		left_card_layout:cc.Node,
		//buttons for game
		button_layout:cc.Node,
		zhunbei_button:cc.Node,
		xiazhu_button:cc.Node,
		queding_button:cc.Node,
		peipai_button:cc.Node,
		kaipai_button:cc.Node,
		qieguo_button:cc.Node,
		buqie_button:cc.Node,
		
		players:{
			type:cc.Node,
			default:[],
		},
    },

    onLoad () {
		console.log("go into pj game room scene onload");
		GlobalData.RunTimeParams.CurrentScene = GlobalData.SCENE_TAG.ROOM;
		this.sumBet = GlobalData.RunTimeParams.RoomData["zhuang_score"];
		this.count = GlobalData.RunTimeParams.RoomData["round"];
		this.qieguo = GlobalData.RunTimeParams.RoomData["qieguo"];
		this.roomNum = GlobalData.RunTimeParams.RoomData["room_num"];
        this.roomState = GlobalData.RunTimeParams.RoomData["is_gaming"];
		this.master_name = GlobalData.RunTimeParams.RoomData["fangzhu_name"];
		this.startDealCardPosition = GlobalData.RunTimeParams.RoomData["first_fapai"];
		this.zhuang_serverPosition = GlobalData.RunTimeParams.RoomData["zhuang_location"];
		this.cur_turn = GlobalData.RunTimeParams.RoomData["cur_turn"];
		this.myselfCards = new Array();
		this.left_cards = new Array();
		this.betPhotoArray = new Array();
		this.suiji_qiangzhuang.active = false;
		this.init_head_info();
		this.initPlayersAndPlayer_noPower();
		this.schedule(this.showRoomMessageUpdate,1.0/60,cc.REPEAT_FOREVER,0);
		this.node.on("pressed", this.switchRadio, this);
	},

	start(){
		console.log("go into pj game room scene start");
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').playBg(GlobalData.AudioIdx.GameAudioBg);
		}
		this.pomelo_on();
		this.initButtonEnableAfterComeInRoom();
	},
	init_head_info(){
		var size = cc.winSize;
		var lmaster = this.master_label.getComponent(cc.Label);
		lmaster.string = this.master_name;
		
		var lroom_num = this.room_num_label.getComponent(cc.Label);
		lroom_num.string = this.roomNum;
		
		//var lzongzhu = this.zhuang_label.getComponent(cc.Label);
		//lzongzhu.string = this.sumBet;
		
		var lhuihe = this.huihe_label.getComponent(cc.Label);
		lhuihe.string = this.count;
	},
	initButtonEnableAfterComeInRoom(){
		this.get_one_button(null);
		for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player_com = GlobalData.RoomInfos.TotalPlayers[i].getComponent("tdk_player");
			if(GlobalData.RoomInfos.StartLocation == player_com.position_server){
				if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
					this.get_one_button("ready",true);
				}
				player_com.start_timer();
			}
		}
		this.qieguo_button.active = false;
		this.buqie_button.active = false;
    },
	reConnect(){
		//玩家断线重连需要恢复当时的状态
		var self = this;
		this.get_one_button(null,false);
		var param = {
			'process':null,
			"rid":GlobalData.RunTimeParams.RoomData["rid"],
			"player_id":GlobalData.MyUserInfo["id"],
			"uuid":GlobalData.RoomInfos.MsgUuid
		};
		Servers.request('repairEnterRoom', param, function(data) {
			if(data.type != null && data.type == 'exit'){
				self.onExit();
				cc.director.loadScene("MainScene");
			}
			console.log(data);
		});
	},
	
	initPlayersAndPlayer_noPower(){
		console.log("initPlayersAndPlayer_noPower",JSON.stringify(GlobalData.RunTimeParams.AllPlayers));
		GlobalData.RoomInfos.TotalPlayers.splice(0,GlobalData.RoomInfos.TotalPlayers.length);
		for(var i = 0;i < GlobalData.RunTimeParams.AllPlayers.length;i++){
			if(GlobalData.RunTimeParams.AllPlayers[i].id == GlobalData.MyUserInfo["id"]){
				GlobalData.RoomInfos.MySelfPlayerLocation = GlobalData.RunTimeParams.AllPlayers[i].location;
				break;
			}
		}

		var position = new Array();
		//寻找玩家自己，确定自己的服务器位置和客户端位置
		for(var i = 0;i < GlobalData.RunTimeParams.AllPlayers.length;i++){
			var idx = -1;
			var player_stc = GlobalData.RunTimeParams.AllPlayers[i];
			if(player_stc.location == GlobalData.RoomInfos.MySelfPlayerLocation){
				idx = 0;
			}else if(player_stc.location > GlobalData.RoomInfos.MySelfPlayerLocation){
				var idx = player_stc.location - GlobalData.RoomInfos.MySelfPlayerLocation;
			}else if(player_stc.location < GlobalData.RoomInfos.MySelfPlayerLocation){
				var idx = this.players.length - GlobalData.RoomInfos.MySelfPlayerLocation + player_stc.location;
			}
			if(idx >= 0){
				position[idx] = player_stc;
			}
		}
		var left_local = 1;
		for(var i = 0; i < this.players.length;i++){
			var player = this.players[i];
			var player_com = player.getComponent("tdk_player");
			var player_stc = position[i];
			player.active = true;
			if(player_stc == null){
				left_local = (left_local + 1) % 4;
				if(left_local == 0){
					left_local = 4;
				}
				player_com.player_position = i + 1;
				player_com.position_server = left_local;
				player_com.setInvalid();
				continue;
			}
			left_local = player_stc.location;
			player_stc["is_power"] = GlobalData.RunTimeParams.RoomData["is_game_" + player_stc.location];
			player_stc["my_gold"] = GlobalData.RunTimeParams.RoomData["left_score_" + player_stc.location];
			player_com.init(player_stc);
			player_com.player_position = i + 1;
			console.log("set player_com: player_position:" + player_com.player_position + " position_server:" + player_com.position_server);
			console.log("player_com: is_power:" + player_com.is_power);
			GlobalData.RoomInfos.TotalPlayers.push(player);
		}
	},
    
	init_count_timer(){
		console.log("RoomInfos.TotalPlayers:" + GlobalData.RoomInfos.TotalPlayers.length);
    	for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player_com = GlobalData.RoomInfos.TotalPlayers[i].getComponent("tdk_player");
			if(GlobalData.RoomInfos.StartLocation == player_com.position_server){
				player_com.start_timer();
			}
    	}
    },
	
	get_one_button(status,flag,active = true){
		this.button_layout.active = true;
		this.zhunbei_button.active = false;
		this.peipai_button.active = false;
		this.kaipai_button.active = false;
		this.queding_button.active = false;
		this.xiazhu_button.active = false;
		var my_button = null;
		
		if(status == "ready"){
			my_button = this.zhunbei_button;
		}else if(status == "peipai"){
			my_button = this.peipai_button;
		}else if(status == "kaipai"){
			my_button = this.kaipai_button;
		}else if(status == "queding"){
			my_button = this.queding_button;
		}else if(status == "xiazhu"){
			my_button = this.xiazhu_button;
		}
		if(my_button != null){
			my_button.active = active;
			my_button.getComponent(cc.Button).interactable = flag;
		}
	},

	//按钮回调函数
	callback_zhunbei(){
		this.zhunbei_button.active = false;
		Servers.request('gameRouter',{
			process:"ready",
			lun_zhuang_flag:GlobalData.RoomInfos.LunZhuangFlag,
			game_type:GlobalData.RunTimeParams.RoomData.game_type,
			location:GlobalData.RoomInfos.MySelfPlayerLocation
		},function(data){
			console.log(data.msg);
		});
    },

	callback_xiazhu(){
		this.xiazhu_button.getComponent(cc.Button).interactable = false;
		//find myself player
		this.chip_layout = cc.instantiate(GlobalData.assets["PopAddChip"]);
		var chip_layout_com = this.chip_layout.getComponent("pop_add_chip");
		chip_layout_com.init_callback(this,this.sumBet,this.silder_callback);
		this.node.addChild(this.chip_layout);
		
		for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player = GlobalData.RoomInfos.TotalPlayers[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
				var x = 0;
				var y = this.button_layout.y + this.button_layout.getContentSize().height/2 + 10 + this.chip_layout.getContentSize().height/2;
				this.chip_layout.setPosition(cc.v2(x,y));
				break;
			}
		}
		this.get_one_button("queding",false);
    },

	callback_queding(){
		this.chip_layout.active = false;
		this.chip_layout.destroy();
		this.queding_button.getComponent(cc.Button).interactable = false;
		this.queding_button.active = false;
		for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player = GlobalData.RoomInfos.TotalPlayers[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
				var chip1 = player_com.my_chip1;
				var chip2 = player_com.my_chip2;
				Servers.request('gameRouter',{
					process:"xiazhu",
					chips:[chip1,chip2],
					game_type:GlobalData.RunTimeParams.RoomData.game_type,
					location:GlobalData.RoomInfos.MySelfPlayerLocation
				},function(data){
					console.log(data.msg);
				});
				break;
			}
		}
    },

	callback_peipai(){
		this.peipai_button.active = false;
		var size = cc.winSize;
		var playerPosition = -1;
		for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player = GlobalData.RoomInfos.TotalPlayers[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
				playerPosition = i;
				break;
			}
		}
		var player = GlobalData.RoomInfos.TotalPlayers[playerPosition];
		var player_com = player.getComponent("tdk_player");
		var selectCards = player_com.selected_cards;
		if(selectCards.length == 2){
			this.peipai_button.active = false;
			for(var i = 0;i < 4;i++){
				var card_com = player_com.my_cards[i].getComponent("pj_card");
				card_com.uninstallTouch();
			}
			var mark = [];
			var select = [];
			for(var i = 0;i < selectCards.length;i++){
				var card_com = selectCards[i].getComponent("pj_card");
				mark.push(card_com.num);
				select.push(card_com.id);
			}
			Servers.request('gameRouter',{
				process:"peipai",
				peipai:mark,
				select:select,
				game_type:GlobalData.RunTimeParams.RoomData.game_type,
				location:GlobalData.RoomInfos.MySelfPlayerLocation
			},function(data){
				console.log(data.msg);
			});
		}else{
			util.show_error_info("只能选择两张牌");
			this.peipai_button.active = true;
			return;
		}
	},

	callback_kaipai(){
		this.kaipai_button.active = false;
		Servers.request('gameRouter',{
			process:"open",
			game_type:GlobalData.RunTimeParams.RoomData.game_type,
			location:GlobalData.RoomInfos.MySelfPlayerLocation
		},function(data){
			console.log(data.msg);
		});
	},

	callback_qieguo(){
		this.qieguo_button.active = false;
		this.buqie_button.active = false;
		Servers.request('gameRouter',{
			process:"qieguo",
			game_type:GlobalData.RunTimeParams.RoomData.game_type,
			location:GlobalData.RoomInfos.MySelfPlayerLocation,
			flag:true
		},function(data){
			console.log(data.msg);
		});
	},

	callback_buqie(){
		this.qieguo_button.active = false;
		this.buqie_button.active = false;
		Servers.request('gameRouter',{
			process:"qieguo",
			game_type:GlobalData.RunTimeParams.RoomData.game_type,
			location:GlobalData.RoomInfos.MySelfPlayerLocation,
			flag:false
		},function(data){
			console.log(data.msg);
		});
	},

	callback_setting(){
		var self = this;
		var size = cc.winSize;
		var pop_setting = cc.instantiate(GlobalData.assets["PopSettingScene"]);
		var pop_setting_com = pop_setting.getComponent("pop_game_setting");
		
		pop_setting_com.set_callback(function(index){
			if(index == 0){
				if(GlobalData.AudioParams.MUSIC_KEY == 0){
					GlobalData.RunTimeParams.RootNode.getComponent('root_node').stopBg();
				}else if(GlobalData.AudioParams.MUSIC_KEY == 1){
					GlobalData.RunTimeParams.RootNode.getComponent('root_node').playBg(GlobalData.AudioIdx.GameAudioBg);
				}
			}
		});
		
		var x = size.width/2;
		var y = size.height/2;
		this.node.addChild(pop_setting);
		pop_setting.setPosition(this.node.convertToNodeSpaceAR(cc.v2(x,y)));
	},

	callback_gameback(){
		return;
		this.onExit();
        cc.director.loadScene("MainScene");
	},

	callback_uinfo(event,id){
		var player = this.players[id];
		var player_com = player.getComponent("tdk_player");
		Servers.request('gameRouter',{
            process : 'get_user_info',
			send_from:GlobalData.RoomInfos.MySelfPlayerLocation,
			game_type:GlobalData.RunTimeParams.RoomData.game_type,
			location:player_com.position_server
        },function(data){
            console.log("-----quit------"+JSON.stringify(data));
        })
	},

	showRoomMessageUpdate(){
		//this.zhuang_label.string = this.sumBet;
		this.huihe_label.string = this.count;
	},

	pomelo_on(){
    	pomelo.on('onReady',this.onReady_function.bind(this));
		pomelo.on('onGetZhuang',this.onGetZhuang_function.bind(this));
		pomelo.on('onXiazhu',this.onXiazhu_function.bind(this));
		pomelo.on('onPeiPai',this.onPeiPai_function.bind(this));
		pomelo.on('onPeiPaiFinish',this.onPeiPaiFinish_function.bind(this));
		pomelo.on('onFapai',this.onFapai_function.bind(this));
		pomelo.on('onGetUinfo',this.onGetUinfo_function.bind(this));
		pomelo.on('onShoupai',this.onShoupai_function.bind(this));
		pomelo.on('onSendGift',this.onSendGift_function.bind(this));
		pomelo.on('onOpen',this.onOpen_function.bind(this));
		pomelo.on('onQieguo',this.onQieguo_function.bind(this));
		pomelo.on('onEnd',this.onEnd_function.bind(this));
		//pomelo.on('onActBroadcast',this.onUserBroadcast_function.bind(this));
		pomelo.on('onKick',this.onKick_function.bind(this));
		pomelo.on('onQuit',this.onQuit_function.bind(this));
		pomelo.on('onChangePlayer',this.onChangePlayer_function.bind(this));
		pomelo.on('onRepairEnterRoom',this.onRepairEnterRoom_function.bind(this));
    },

	onReady_function(data){
		console.log("pomelo on Ready:",JSON.stringify(data));
		//如果玩家进来时正在游戏中则准备后 放入RoomInfos.TotalPlayers中
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player = GlobalData.RoomInfos.TotalPlayers[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == data.location){
				if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
					this.zhunbei_button.active = false;
				}
				player_com.setSpriteStatus("yizhunbei");
				player_com.stop_timer();
				player_com.hide_game_sprite();
				//准备状态表示
				break;
			}
		}
	},
	
	onChangePlayer_function(data){
		console.log('onChangePlayer_function',data);
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		GlobalData.RoomInfos.PeiPaiTip = data.tip;
		for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player = GlobalData.RoomInfos.TotalPlayers[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == data.location){
				player_com.start_timer();
				if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
					if(data.status == 1){
						this.get_one_button("ready",true);
					}else if(data.status == 3){
						this.get_one_button("xiazhu",true);
					}else if(data.status == 5){
						this.get_one_button("peipai",true);
						//进行配牌提示
						for(var j = 0;j < 4;j++){
							var card = player_com.my_cards[j].getComponent("pj_card");
							if(GlobalData.RoomInfos.PeiPaiTip != null){
								if(j + 1 == GlobalData.RoomInfos.PeiPaiTip[0]){
									card.touch_call(null);
								}
								if(j + 1 == GlobalData.RoomInfos.PeiPaiTip[1]){
									card.touch_call(null);
								}
							}
						}
					}
				}
				break;
			}
		}
	},
	
	onGetZhuang_function(data){
		console.log("pomelo onGetzhuang_function:",JSON.stringify(data),GlobalData.RoomInfos.LunZhuangFlag);
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		var size = cc.winSize;
		GlobalData.RoomInfos.StartLocation = data.location;
		this.zhuang_serverPosition = data.zhuang_local;
		var scores = data.scores;
		for(var i = 0;i < this.players.length;i++){
			var player = this.players[i];
			var player_com = player.getComponent("tdk_player");
			player_com.resetMoneyLabel(scores[player_com.position_server - 1]);
			if(player_com.position_server == this.zhuang_serverPosition){
				this.sumBet = scores[player_com.position_server - 1];
			}
		}
		if(GlobalData.RoomInfos.LunZhuangFlag == false){
			var num1 = data.nums[0];
			var num2 = data.nums[1];
			for(var i = 0;i < this.players.length;i++){
				var player = this.players[i];
				var player_com = player.getComponent("tdk_player");
				if(player_com.position_server == this.zhuang_serverPosition){
					this.suiji_qiangzhuang.active = true;
					var yao_shaizi = cc.instantiate(GlobalData.assets["yaoshaizi"]);
					var yao_shaizi_com = yao_shaizi.getComponent("shai_zhong_active");
					var movePos = player.getPosition();
					yao_shaizi_com.init_start(null,num1,num2,movePos);
					this.node.addChild(yao_shaizi);
					yao_shaizi.setPosition(this.node.convertToNodeSpaceAR(cc.v2(size.width/2,size.height/4*1.8)));
					var call_back_function = cc.callFunc(this.getzhuang_callback,this);
					this.node.runAction(cc.sequence(cc.delayTime(4),call_back_function));
					break;
				}
			}
		}else{
			/*轮庄 清空上一次的玩家牌*/
			for(var i = 0;i < this.left_cards.length;i++){
				var card = this.left_cards[i];
				card.removeFromParent();
			}
			this.left_cards.splice(0,this.left_cards.length);
			this.getzhuang_callback();
		}
	},
	
	onXiazhu_function(data){
		console.log("onXiazhu_function:",JSON.stringify(data));
		var location = data.location;
		var chips = data.chips;
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player = GlobalData.RoomInfos.TotalPlayers[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == data.location){
				if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
					this.get_one_button(null,false);
				}
				player_com.stop_timer();
				player_com.set_chips(1,chips[0]);
				player_com.set_chips(2,chips[1]);
				break;
			}
		}
	},

	onFapai_function(data){
		console.log("onFapai",JSON.stringify(data));
		var size = cc.winSize;
		this.cur_turn = data["cur_turn"];
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		GlobalData.RunTimeParams.RoomData['mingpai'] = data.mingpai;
		//如果是第一次发牌则清空已经用过的牌
		//更新房间状态和玩家信息
		if(this.cur_turn == 0){
			for(var i = 0;i < this.left_cards.length;i++){
				var card = this.left_cards[i];
				card.removeFromParent();
			}
			this.left_cards.splice(0,this.left_cards.length);
		}

		this.startDealCardPosition = data["location"];
		for(var i = 0;i < this.betPhotoArray.length;i++){
			this.betPhotoArray[i].removeFromParent();
		}
		this.betPhotoArray.splice(0,this.betPhotoArray.length);

		//更新玩家信息
		for(var i = 0;i < this.players.length;i++){
			//清除玩家手中上一局的牌，
			var player_com = this.players[i].getComponent("tdk_player");
			player_com.remove_cards();
			player_com.remove_select_cards();
		}
		this.sumBet = data["all_chip"];

		//初始化玩家手中的牌（背面），权限isPower,开牌checkCard弃牌abandon,失败提示精灵loserSprite
		for(var i=0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player_com = GlobalData.RoomInfos.TotalPlayers[i].getComponent("tdk_player");
			player_com.hide_game_sprite();
		}
		//摇色子动作 并显示发牌开始玩家
		for(var i = 0;i < this.players.length;i++){
			//清除玩家手中上一局的牌，
			var player = this.players[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == this.startDealCardPosition){
				var shaizi_1 = data["nums"][0];
				var shaizi_2 = data["nums"][1];
				var yao_shaizi = cc.instantiate(GlobalData.assets["yaoshaizi"]);
				var yao_shaizi_com = yao_shaizi.getComponent("shai_zhong_active");
				var pPos = player.getPosition();
				var labelPos = player_com.chips_label[0].getPosition();
				var movePos = cc.v2(pPos.x + labelPos.x,pPos.y + labelPos.y);
				yao_shaizi_com.init_start(null,shaizi_1,shaizi_2,movePos);
				this.node.addChild(yao_shaizi);
				yao_shaizi.setPosition(this.node.convertToNodeSpaceAR(cc.v2(size.width/2,size.height/4*1.8)));
				break;
			}
		}
	},

	onShoupai_function(data){
		console.log("onShoupai:",JSON.stringify(data));
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		GlobalData.RoomInfos.StartLocation = data.location;
		GlobalData.RoomInfos.PeiPaiTip = data.tip;
		//初始化myselfCards数组
		this.myselfCards.splice(0,this.myselfCards.length);
		this.count = data["round"];
		var cardType = data["paixing"];
		for(var i = 0;i < cardType.length;i++){
			this.myselfCards.push(cardType[i]);
		}
		console.log("myselfCards:" + JSON.stringify(this.myselfCards));
		this.myselfCardsReach = true;
		var fapai_order = new Array();
    	//开始调整发牌顺序并加入堆栈中
		var fapai_l = this.startDealCardPosition;
		for(var i = 0;i < 4;i++){
			var idx = fapai_l % 4;
			if(idx == 0){
				idx = 4;
			}
			fapai_order.push(idx);
			fapai_l = fapai_l + 1;
		}
		console.log("fapai_order:" + JSON.stringify(fapai_order));
		this.actionFaPai(this,fapai_order);
	},

	onPeiPai_function(data){
		console.log("onPeipai_function:",JSON.stringify(data));
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		var player_position = data.location;
		var card_select_ids = data.select;
		var head_flag = data.flag;
		for(var m = 0;m < GlobalData.RoomInfos.TotalPlayers.length;m++){
			var player = GlobalData.RoomInfos.TotalPlayers[m];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == player_position){
				//如果是自己则执行配牌动作
				if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
					this.get_one_button(null,false);
				}
				var all_cards = player_com.my_cards;
				var unselect_cards = new Array();
				var select_cards = new Array();
				for(var j = 0;j < all_cards.length;j++){
					var flag = false;
					var card_item = all_cards[j];
					var card_item_com = card_item.getComponent("pj_card");
					card_item_com.uninstallTouch();
					console.log("card_item_com id:",card_item_com.id," selected_cards:",player_com.selected_cards.length);
					for(var i = 0;i < card_select_ids.length;i++){
						if(card_item_com.id == card_select_ids[i]){
							flag = true;
							break;
						}
					}
					if(flag == false){
						unselect_cards.push(card_item);
					}else{
						select_cards.push(card_item);
					}
				}
				//选择的牌放在前面更新ID
				if(head_flag == true){
					for(var i = 0; i < select_cards.length;i++){
						var card = select_cards[i];
						var card_com = card.getComponent("pj_card");
						card_com.id = i;
					}
					for(var i = 0; i < unselect_cards.length;i++){
						var card = unselect_cards[i];
						var card_com = card.getComponent("pj_card");
						card_com.id = i + 2;
					}
					player_com.set_card_head(select_cards,this.zhuang_serverPosition);
					player_com.set_card_tail(unselect_cards,this.zhuang_serverPosition);
				}else{
					for(var i = 0; i < select_cards.length;i++){
						var card = select_cards[i];
						var card_com = card.getComponent("pj_card");
						card_com.id = i + 2;
					}
					for(var i = 0; i < unselect_cards.length;i++){
						var card = unselect_cards[i];
						var card_com = card.getComponent("pj_card");
						card_com.id = i;
					}
					player_com.set_card_head(unselect_cards,this.zhuang_serverPosition);
					player_com.set_card_tail(select_cards,this.zhuang_serverPosition);
				}
				player_com.stop_timer();
				break;
			}
		}
	},

	onPeiPaiFinish_function(data){
		console.log('onPeiPaiFinish_function',data);
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		for(var m = 0;m < GlobalData.RoomInfos.TotalPlayers.length;m++){
			var player = GlobalData.RoomInfos.TotalPlayers[m];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == this.zhuang_serverPosition){
				player_com.start_timer();
				if(GlobalData.RoomInfos.MySelfPlayerLocation == this.zhuang_serverPosition){
					this.get_one_button("kaipai",true);
				}
				break;
			}
		}
	},
	
	onEnd_function(data){
		console.log("onEnd:",JSON.stringify(data));
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		//获胜者的牌型
		var scores = data["scores"];
		this.qieguo = data["isqie"];
		this.sumBet = this.sumBet + scores[this.zhuang_serverPosition - 1];
		for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player = GlobalData.RoomInfos.TotalPlayers[i];
			var player_com = player.getComponent("tdk_player");
			player_com.resetMoneyLabel(player_com.my_gold + scores[player_com.position_server - 1]);
			if(player_com.position_server != this.zhuang_serverPosition){
				if(scores[player_com.position_server - 1] > 0){
					player_com.setGameStatus("winner");
					this.actionWinnerGetBet(this.zhuang_serverPosition,player_com.position_server,true);
				}else if(scores[player_com.position_server - 1] < 0){
					player_com.setGameStatus("loser");
					this.actionWinnerGetBet(player_com.position_server,this.zhuang_serverPosition,true);
				}else{
					player_com.setGameStatus("equal");
					this.actionWinnerGetBet(0,0,false);
				}
			}
		}
		var callback = cc.callFunc(this.ready_next_turn,this);
		this.node.runAction(cc.sequence(cc.delayTime(2),callback));
	},

	onQieguo_function(data){
		console.log("onQieguo_function:",JSON.stringify(data));
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		var size = cc.winSize;
		var flag = data.flag;
		GlobalData.RoomInfos.LunZhuangFlag = data.lun_zhuang;
		GlobalData.RoomInfos.StartLocation = data.location;
		this.get_one_button(null,false);
		if(flag == false){
			for(var i = 0;i < this.players.length;i++){
				var player = this.players[i];
				var player_com = player.getComponent("tdk_player");
				if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
					if(player_com.position_server == GlobalData.RoomInfos.StartLocation){
						this.get_one_button("xiazhu",true);
					}
					if(player_com.position_server != this.zhuang_serverPosition){
						player_com.set_chips(1,0);
						player_com.set_chips(2,0);
					}
				}
				if(player_com.position_server == GlobalData.RoomInfos.StartLocation){
					player_com.start_timer();
				}
				if(player_com.position_server == this.zhuang_serverPosition){
					player_com.stop_timer();
				}
			}
		}else{
			var scores = data.scores;
			var results = new Array();
			for(var i = 0;i < this.players.length;i++){
				var player = this.players[i];
				var player_com = player.getComponent("tdk_player");
				if(player_com.position_server == this.zhuang_serverPosition){
					player_com.stop_timer();
					break;
				}
			}
			for(var i = 0;i < GlobalData.RunTimeParams.AllPlayers.length;i++){
				var player_item = GlobalData.RunTimeParams.AllPlayers[i];
				if(player_item != null && player_item != "null"){
					var item = new Array();
					item.push(player_item.nick_name);
					item.push(player_item.head_img_url);
					if(player_item.location == this.zhuang_serverPosition){
						item.push(GlobalData.RunTimeParams.RoomData["zhuang_score"]);
					}else{
						item.push(0);
					}
					item.push(scores[player_item.location - 1]);
					results.push(item);
				}
			}
			var self = this;
			var x = size.width/2;
			var y = size.height/2;
			var pop_game_finish = cc.instantiate(GlobalData.assets["PopGameFinish"]);
			var pop_game_finish_com = pop_game_finish.getComponent("pop_game_finish");
			this.node.addChild(pop_game_finish);
			pop_game_finish_com.init_info(results,function(){
				if(GlobalData.RoomInfos.LunZhuangFlag == true){
					self.initButtonEnableAfterComeInRoom();
					util.show_error_info('更换庄家！');
				}else{
					self.onExit();
				}
			});
			pop_game_finish.setPosition(this.node.convertToNodeSpaceAR(cc.v2(x,y)));
		}
	},
	
	onOpen_function(data){
		console.log("onOpen_function:",JSON.stringify(data));
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		var paixing = data.all_pai;
		for(var i = 0; i < this.players.length; i++){
			var player = this.players[i];
			var player_com = player.getComponent("tdk_player");
			var cardString = paixing[player_com.position_server - 1];
			player_com.stop_timer();
			if(GlobalData.RunTimeParams.RoomData['mingpai'] == 1 && player_com.position_server == this.zhuang_serverPosition){
				continue;
			}
			if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
				this.get_one_button(null,false);
				continue;
			}
				
			for(var m = 0;m < 4;m++){
				var card = player_com.my_cards[m].getComponent("pj_card");
				card.initCardSprite(cardString[card.id]);
				var backCardSeq = cc.sequence(cc.delayTime(0.45),cc.hide());
				var backCamera = cc.rotateBy(0.45,0,-90);
				var backSpawn = cc.spawn(backCardSeq,backCamera);
				var frontSeq = cc.sequence(cc.delayTime(0.45),cc.show());
				var frontCamera = cc.rotateBy(0.6,0,-360);
				var frontSpawn = cc.spawn(frontSeq,frontCamera);
				card.sprite_back.node.runAction(backSpawn);
				card.sprite.runAction(frontSpawn);
			}
		}
	},
	
	onUserBroadcast_function(data){
		console.log("onUserBroadcast:"+JSON.stringify(data));
		var msage_scroll_com = this.msage_scroll.getComponent("msage_scroll");
		msage_scroll_com.set_string(data);
	},

	onGetUinfo_function(data){
		console.log("onGetUinfo_function:",JSON.stringify(data));
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		var size = cc.winSize;
		//显示玩家信息
		if(data["send_from"] == GlobalData.RoomInfos.MySelfPlayerLocation){
			this.uinfo = cc.instantiate(GlobalData.assets["PopGameUser"]);
			var uinfo_com = this.uinfo.getComponent("pop_game_user_info");
			
			uinfo_com.init_info(data,this.actionSendGift);
			this.node.addChild(this.uinfo);
			this.uinfo.setPosition(this.node.convertToNodeSpaceAR(cc.v2(size.width/2,size.height/2)));
		}
	},
	
	onSendGift_function(data){
		console.log("onSendGift_function",JSON.stringify(data));
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		var s_player = null;
		var e_player = null;
		var type = data["type"];
		var send_from = data["send_from"];
		var send_to = data["send_to"];
		if(send_from == send_to){
			return false;
		}
		for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player_com = GlobalData.RoomInfos.TotalPlayers[i].getComponent("tdk_player");
			if(player_com.position_server == send_from){
				s_player = GlobalData.RoomInfos.TotalPlayers[i];
			}
			if(player_com.position_server == send_to){
				e_player = GlobalData.RoomInfos.TotalPlayers[i];
			}
		}
		var active = null;
		var active_name = null;
		//送鸡蛋
		if(type == 1){
			active = cc.instantiate(GlobalData.assets["shoe_active"]);
			active_name = "shoe_active";
		}else if(type == 2){
			active = cc.instantiate(GlobalData.assets["egg_active"]);
			active_name = "egg_active";
		}else if(type == 3){
			active = cc.instantiate(GlobalData.assets["bomb_active"]);
			active_name = "bomb_active";
		}else if(type == 4){
			active = cc.instantiate(GlobalData.assets["kiss_active"]);
			active_name = "kiss_active";
		}else if(type == 5){
			active = cc.instantiate(GlobalData.assets["flower_active"]);
			active_name = "flower_active";
		}else if(type == 6){
			active = cc.instantiate(GlobalData.assets["cheers_active"]);
			active_name = "cheers_active";
		}
		this.node.addChild(active);
		active.setPosition(s_player.getPosition());
		
		var move = cc.moveTo(0.5,e_player.getPosition());
		var rotation = cc.rotateBy(0.5,360);
		var spawn = cc.spawn(move,rotation);
		var self = this;
		var sendAction = cc.callFunc(function(){
			var	active_com = active.getComponent("bomb_action");
			active_com.play(active_name);
		});
		active.runAction(cc.sequence(spawn,sendAction));
	},
	
	onKick_function(data){
		console.log("onKick_function:",JSON.stringify(data));
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player = GlobalData.RoomInfos.TotalPlayers[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == data.location){
				var popDelayScene = cc.instantiate(GlobalData.assets['PopDelayScene']);
				this.node.addChild(popDelayScene);
				popDelayScene.setPosition(cc.v2(0,0));
				var popDelaySceneCom = popDelayScene.getComponent('pop_delay_scene');
				popDelaySceneCom.setMsg("玩家 <" + player_com.nick_name + "> 断线了，请等待玩家重连");
				popDelayScene.getComponent('pop_delay_scene').onStart(data.delay_time,function(){
					popDelayScene.removeFromParent();
					popDelayScene.destroy();
				});
				break;
			}
		}
	},
	
	onQuit_function(data){
		console.log("onQuit_function:",JSON.stringify(data));
		GlobalData.RoomInfos.MsgUuid = data.uuid;
		var popDelayScene = this.node.getChildByName('PopDelayScene');
		if(popDelayScene != null){
			popDelayScene.removeFromParent();
			popDelayScene.destroy();
		}
		var self = this;
		for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player = GlobalData.RoomInfos.TotalPlayers[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == data.location){
				var popDelayScene = cc.instantiate(GlobalData.assets['PopDelayScene']);
				this.node.addChild(popDelayScene);
				popDelayScene.setPosition(cc.v2(0,0));
				var popDelaySceneCom = popDelayScene.getComponent('pop_delay_scene');
				popDelaySceneCom.setMsg("玩家 <" + player_com.nick_name + "> 断线超时，游戏被迫取消,望大家谅解!");
				popDelayScene.getComponent('pop_delay_scene').onStart(5,function(){
					popDelayScene.removeFromParent();
					popDelayScene.destroy();
					self.onExit();
					cc.director.loadScene("MainScene");
				});
				break;
			}
		}
	},
	
	onRepairEnterRoom_function(data){
		console.log("onRepairEnterRoom_function:",JSON.stringify(data));
		var popDelayScene = this.node.getChildByName('PopDelayScene');
		if(popDelayScene != null){
			popDelayScene.removeFromParent();
			popDelayScene.destroy();
		}
	},
	
	actionSendGift(type,send_from,send_to){
		Servers.request('gameRouter',{
            process : 'send_gift',
			game_type:GlobalData.RunTimeParams.RoomData.game_type,
			"send_from":send_from,
			"send_to":send_to,
			"type":type
        },function(data){
            console.log("-----quit------"+JSON.stringify(data));
        })
	},
	
	actionFaPai(pthis,fapai_order){
		console.log("actionFaPai:" , JSON.stringify(fapai_order));
    	var size = cc.winSize;
		var local = fapai_order.shift();
		for(var i = 0;i < this.players.length;i++){
			var player = this.players[i];
			var player_com = player.getComponent("tdk_player");
			var card_type = this.myselfCards[local - 1];
			console.log("actionFaPai card_type:" + JSON.stringify(card_type) + " position_server:" + player_com.position_server + " local:" + local);
			if(player_com.position_server == local){
				var pai_back_size = this.pai_back_sprite.node.getContentSize();
				if(GlobalData.RunTimeParams.RootNode != null){
					GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.GameFaPai);
				}
				for(var j = 0;j < 4;j++){
					var card = player_com.addPlayerCard();
					var card_com = card.getComponent("pj_card");
					if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
						card_com.installTouch();
						player_com.set_card_sprite(j,card_type[j]);
					}
					//如果明牌了 则接收庄家的牌信息
					if(GlobalData.RunTimeParams.RoomData['mingpai'] == 1 && player_com.position_server == this.zhuang_serverPosition){
						player_com.set_card_sprite(j,card_type[j]);
					}
					player_com.set_card_position(card,this.zhuang_serverPosition,j,pai_back_size);
					
				}
				break;
			}
		}
		if(fapai_order.length == 0){
    		var finish_callback = cc.callFunc(this.fapai_finish,this);
    		this.node.runAction(cc.sequence(cc.delayTime(1),finish_callback));
			return;
		}
    
		var callFunc = cc.callFunc(this.actionFaPai,this,fapai_order);
		this.node.runAction(cc.sequence(cc.delayTime(0.45),callFunc));
    },

	fapai_finish(){
		//打开自己的牌开始配牌
		for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player = GlobalData.RoomInfos.TotalPlayers[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
				for(var j = 0;j < 4;j++){
					var backCardSeq = cc.sequence(cc.delayTime(0.45),cc.hide());
					var backCamera = cc.rotateBy(0.45,0,-90);
					var backSpawn = cc.spawn(backCardSeq,backCamera);
					var frontSeq = cc.sequence(cc.delayTime(0.45),cc.show());
					var frontCamera = cc.rotateBy(0.6,0,-360);
					var frontSpawn = cc.spawn(frontSeq,frontCamera);
					var card = player_com.my_cards[j].getComponent("pj_card");
					card.sprite_back.node.runAction(backSpawn);
					card.sprite.runAction(frontSpawn);
					if(GlobalData.RoomInfos.PeiPaiTip != null && GlobalData.RoomInfos.StartLocation == player_com.position_server){
						if(j + 1 == GlobalData.RoomInfos.PeiPaiTip[0]){
							card.touch_call(null);
						}
						if(j + 1 == GlobalData.RoomInfos.PeiPaiTip[1]){
							card.touch_call(null);
						}
					}
                }
            }
			//如果玩家下注满了则庄家明牌
			if(player_com.position_server == this.zhuang_serverPosition && GlobalData.RunTimeParams.RoomData['mingpai'] == 1){
				for(var j = 0;j < 4;j++){
					var backCardSeq = cc.sequence(cc.delayTime(0.45),cc.hide());
					var backCamera = cc.rotateBy(0.45,0,-90);
					var backSpawn = cc.spawn(backCardSeq,backCamera);
					var frontSeq = cc.sequence(cc.delayTime(0.45),cc.show());
					var frontCamera = cc.rotateBy(0.6,0,-360);
					var frontSpawn = cc.spawn(frontSeq,frontCamera);
					var card = player_com.my_cards[j].getComponent("pj_card");
					card.sprite_back.node.runAction(backSpawn);
					card.sprite.runAction(frontSpawn);
                }
				if(player_com.id == GlobalData.MyUserInfo["id"]){
					util.show_error_info("注意玩家下注满，你已经明牌，注意等玩家配完牌在配牌！");
				}
			}
			if(GlobalData.RoomInfos.StartLocation == player_com.position_server){
				player_com.start_timer();
			}
			if(GlobalData.RoomInfos.StartLocation == player_com.position_server
				&& player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
				this.get_one_button("peipai",true);
			}
        }
		//如果玩家下注满了则庄家明牌 并对庄家进行提示 避免发忘记 从而配牌太早
	},

	switchRadio(event) {
		var card_com = event.target.getComponent("pj_card");
        var suit = event.target.getComponent("pj_card").suit;
		var rank = event.target.getComponent("pj_card").rank;
		console.log("switchRadio : suit:" + suit + " rank:" + rank);
		var player_com = null;
		for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player = GlobalData.RoomInfos.TotalPlayers[i];
			var player_com = player.getComponent("tdk_player");
    		if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
    			break;
    		}
    	}
		if(player_com == null){
			return false;
		}
		if(card_com.touch_tag == true){
			player_com.selected_cards.push(event.target);
		}else{
			for(var i = 0;i < player_com.selected_cards.length;i++){
				var card_t = player_com.selected_cards[i];
				if(card_t == event.target){
					player_com.selected_cards.splice(i,1);
					break;
				}
			}
		}
    },
	
	actionWinnerGetBet(location_from,location_end,flag){
		if(flag == true){
			var player_from = null;
			var player_end = null;
			for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
				var player = GlobalData.RoomInfos.TotalPlayers[i];
				var player_com = player.getComponent("tdk_player");
				if(player_com.position_server == location_from){
					player_from = player;
				}else if(player_com.position_server == location_end){
					player_end = player;
				}
			}
			
			var chip = cc.instantiate(GlobalData.assets["chip"]);
			this.node.addChild(chip);
			this.betPhotoArray.push(chip);
			chip.setPosition(player_from.getPosition());
			var moveBet = cc.moveTo(0.5,player_end.getPosition());
			chip.runAction(cc.sequence(moveBet,cc.hide()));
			if(GlobalData.RunTimeParams.RootNode != null){
				GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.JinBiMove);
			}
		}
    },

	ready_next_turn(){
		if(this.cur_turn == 0){
			for(var i = 0;i < this.myselfCards.length;i++){
				var item = this.myselfCards[i];
				for(var j = 0;j < item.length;j++){
					var card = cc.instantiate(GlobalData.assets["pj_card"]);
					var card_com = card.getComponent("pj_card");
					card_com.initCardSprite(item[j]);
					card_com.sprite.runAction(cc.show());
					card_com.sprite_back.node.runAction(cc.hide());
					this.left_card_layout.addChild(card);
					this.left_cards.push(card);
				}
			}
		}
		for(var i = 0;i < this.players.length;i++){
		//清除玩家手中上一局的牌，
			var player_com = this.players[i].getComponent("tdk_player");
			player_com.remove_cards();
			player_com.remove_select_cards();
			if(player_com.position_server == this.zhuang_serverPosition && this.qieguo != 0){
				player_com.start_timer();
			}
		}
		if(GlobalData.RoomInfos.MySelfPlayerLocation == this.zhuang_serverPosition){
			if(this.qieguo == 1){
				this.qieguo_button.active = true;
				this.buqie_button.active = true;
				this.qieguo_button.getComponent("cc.Button").interactable = true;
				this.buqie_button.getComponent("cc.Button").interactable = true;
			}else if(this.qieguo == 2){
				this.qieguo_button.active = true;
				this.buqie_button.active = true;
				this.qieguo_button.getComponent("cc.Button").interactable = true;
				this.buqie_button.getComponent("cc.Button").interactable = false;
			}
		}
		if(this.qieguo == 0){
			for(var i = 0;i < this.players.length;i++){
				var player = this.players[i];
				var player_com = player.getComponent("tdk_player");
				if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
					if(player_com.position_server == GlobalData.RoomInfos.StartLocation){
						this.get_one_button("xiazhu",true);
					}
					if(player_com.position_server != this.zhuang_serverPosition){
						player_com.set_chips(1,0);
						player_com.set_chips(2,0);
					}
				}
				if(player_com.position_server == GlobalData.RoomInfos.StartLocation){
					player_com.start_timer();
				}
			}
		}
	},
	
	getzhuang_callback(){
		console.log("getzhuang_callback");
		this.suiji_qiangzhuang.active = false;
		var mens = ["zhuang","chumen","tianmen","momen"];
		for(var i = 0;i < this.players.length;i++){
			var player = this.players[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == this.zhuang_serverPosition){
				//player_com.setSpriteStatus(mens[0]);
				player_com.hide_status_sprite();
				player_com.resetMoneyLabel(this.sumBet);
				player_com.install_chip_label(true);
			}else{
				var men_idx = 0;
				console.log("position_server:" + player_com.position_server + " zhuang_serverPosition:" + this.zhuang_serverPosition);
				if(player_com.position_server > this.zhuang_serverPosition){
					men_idx = player_com.position_server - this.zhuang_serverPosition;
				}else if(player_com.position_server < this.zhuang_serverPosition){
					men_idx = player_com.position_server - this.zhuang_serverPosition + 4;
				}
				player_com.hide_status_sprite();
				//player_com.setSpriteStatus(mens[men_idx]);
				player_com.install_chip_label(false);
			}
		}
		for(var i = 0;i < this.players.length;i++){
			var player = this.players[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
				if(player_com.position_server == GlobalData.RoomInfos.StartLocation){
					this.get_one_button("xiazhu",true);
				}
				if(player_com.position_server != this.zhuang_serverPosition){
					player_com.set_chips(1,0);
					player_com.set_chips(2,0);
				}
			}
			if(player_com.position_server == GlobalData.RoomInfos.StartLocation){
				player_com.start_timer();
			}
		}
		this.zhunbei_button.getComponent(cc.Button).interactable = false;
		this.zhunbei_button.active = false;
	},
	
	silder_callback(pthis,idx,silder_progress){
		console.log("pj_game_scene silder1:" + silder_progress);
		for(var i = 0;i < GlobalData.RoomInfos.TotalPlayers.length;i++){
			var player = GlobalData.RoomInfos.TotalPlayers[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == GlobalData.RoomInfos.MySelfPlayerLocation){
				if(player_com.position_server != pthis.zhuang_serverPosition){
					player_com.set_chips(idx,silder_progress);
					break;
				}
			}
		}
		pthis.get_one_button("queding",true);
	},
	
	pomelo_removeListener(){
		console.log("remove listener");
        pomelo.removeListener('onReady');
		pomelo.removeListener('onGetZhuang');
		pomelo.removeListener('onXiazhu');
		pomelo.removeListener('onPeiPai');
		pomelo.removeListener('onPeiPaiFinish');
		pomelo.removeListener('onFapai');
		pomelo.removeListener('onGetUinfo');
		pomelo.removeListener('onShoupai');
		pomelo.removeListener('onSendGift');
        pomelo.removeListener('onOpen');
        pomelo.removeListener('onQieguo');
        pomelo.removeListener('onEnd');
		//pomelo.removeListener('onActBroadcast');
		pomelo.removeListener('onKick');
		pomelo.removeListener('onQuit');
		pomelo.removeListener('onChangePlayer');
		pomelo.removeListener('onRepairEnterRoom');
    },

	onExit(){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').playBg(GlobalData.AudioIdx.GameAudioBg);
		}
        GlobalData.RunTimeParams.AllPlayers.splice(0,GlobalData.RunTimeParams.AllPlayers.length);
		GlobalData.RunTimeParams.RoomData = null;
		GlobalData.RoomInfos.TotalPlayers.splice(0,GlobalData.RoomInfos.TotalPlayers.length);
		GlobalData.RoomInfos.LunZhuangFlag = false;
		GlobalData.RoomInfos.ZhuangServerLocaltion = 0;
		GlobalData.RoomInfos.MySelfPlayerLocation = -1;
		console.log("exit from the room......");
        //释放资源
        //this.releaseMember();

        //注销监听接口
        this.pomelo_removeListener();
    },
});
