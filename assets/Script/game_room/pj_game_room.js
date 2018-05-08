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
		master_label:cc.Label,
		room_num_label:cc.Label,
		zhuang_label:cc.Label,
		huihe_label:cc.Label,
		msage_scroll:cc.Node,
		left_card_layout:cc.Node,
		//buttons for game
		button_layout:cc.Node,
		zhunbei_button:cc.Node,
		qiangzhang_button:cc.Node,
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
		audio:{
            url: cc.AudioClip,
            default: null
        }
    },

    onLoad () {
		this.sumBet = 100;
		this.count = 0;
		this.qieguo = 0;
		this.roomNum = g_room_data["room_num"];
        this.roomState = g_room_data["is_gaming"];
		this.master_name = g_room_data["fangzhu_name"];
		this.startDealCardPosition = 0;
		this.myselfCards = new Array();
		this.left_cards = new Array();
		this.betPhotoArray = new Array();
		this.init_head_info();
		this.initButtonEnableAfterComeInRoom();
		this.initPlayersAndPlayer_noPower();
		this.schedule(this.showRoomMessageUpdate,1.0/60,cc.REPEAT_FOREVER,0);
		this.node.on("pressed", this.switchRadio, this);
	},
	start(){
		cc.log("go into pj game room scene start");
		g_music_key = cc.sys.localStorage.getItem(MUSIC_KEY);
		if(g_music_key == null || g_music_key == BOOL.YES){
			this.current = cc.audioEngine.play(this.audio, true, 1);
		}
		this.init_count_timer();
		this.pomelo_on();
	},
	init_head_info(){
		var size = cc.director.getWinSize();
		var lmaster = this.master_label.getComponent(cc.Label);
		lmaster.string = this.master_name;
		
		var lroom_num = this.room_num_label.getComponent(cc.Label);
		lroom_num.string = this.roomNum;
		
		var lzongzhu = this.zhuang_label.getComponent(cc.Label);
		lzongzhu.string = 100;
		
		var lhuihe = this.huihe_label.getComponent(cc.Label);
		lhuihe.string = this.count;
	},
	initButtonEnableAfterComeInRoom(){
		if(g_room_data["fangka_type"] == 1){
			this.get_one_button("qiang",true);
			var call_back_function = cc.callFunc(this.auto_qiangzhuang,this);
			this.qiangzhang_button.runAction(cc.sequence(cc.fadeOut(20),call_back_function));
		}
		this.qieguo_button.active = false;
		this.buqie_button.active = false;
    },
	auto_qiangzhuang(){
		if(this.game_status != "qianged"){
			this.qiangzhang_button.active = false;
			pomelo.request(util.getGameRoute(),{
				process:"qiang",
				flag:false,
				location:g_myselfPlayerPos
			},function(data){
				cc.log(data.msg);
			});
		}
	},
    
	initPlayersAndPlayer_noPower(){
		cc.log("initPlayersAndPlayer_noPower" + JSON.stringify(g_players_data));
		for(var i = 0;i < g_players_data.length;i++){
			if(g_players_data[i].id == g_user["id"]){
				g_myselfPlayerPos = g_players_data[i].location;
				break;
			}
		}

		var position = new Array();
		//寻找玩家自己，确定自己的服务器位置和客户端位置
		for(var i = 0;i < g_players_data.length;i++){
			var idx = -1;
			var player_stc = g_players_data[i];
			if(player_stc.location == g_myselfPlayerPos){
				idx = 0;
			}else if(player_stc.location > g_myselfPlayerPos){
				var idx = player_stc.location - g_myselfPlayerPos;
			}else if(player_stc.location < g_myselfPlayerPos){
				var idx = this.players.length - g_myselfPlayerPos + player_stc.location;
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
			
			if(player_stc == null){
				left_local = (left_local + 1) % 4;
				if(left_local == 0){
					left_local = 4;
				}
				player_com.player_position = i + 1;
				player_com.position_server = left_local;
				player.active = false;
				continue;
			}
			left_local = player_stc.location;
			player_com.init(player_stc);
			player_com.player_position = i + 1;
			cc.log("set player_com: player_position:" + player_com.player_position + " position_server:" + player_com.position_server);
			g_players.push(player);
			player.active = true;
		}
	},
    init_count_timer(){
		var tmp_allplayers = g_players_noPower.concat(g_players);
    	for(var i = 0;i < tmp_allplayers.length;i++){
			var player_com = tmp_allplayers[i].getComponent("tdk_player");
			if(player_com.position_server == g_myselfPlayerPos){
				player_com.start_timer();
    			break;
    		}
    	}
    },
	initPlayerCardsPosition(){
        for(var i=0;i < g_players.length;i++){
			var player = g_players[i];
			var player_com = player.getComponent("tdk_player");
            if(player_com.is_power == 2){
				for(var m = 0;m < 3;m++){
					var position = this.calc_player_card_position(player,m);
					player_com.my_cards[m].setPosition(position);
				}
			}
        }
	},
	
	get_one_button(status,flag = false){
		this.button_layout.active = true;
		this.zhunbei_button.active = false;
		this.qiangzhang_button.active = false;
		this.peipai_button.active = false;
		this.kaipai_button.active = false;
		this.queding_button.active = false;
		this.xiazhu_button.active = false;
		var my_button = this.zhunbei_button;
		
		if(status == "ready"){
			my_button = this.zhunbei_button;
		}else if(status == "qiang"){
			my_button = this.qiangzhang_button;
		}else if(status == "peipai"){
			my_button = this.peipai_button;
		}else if(status == "kaipai"){
			my_button = this.kaipai_button;
		}else if(status == "queding"){
			my_button = this.queding_button;
		}else if(status == "xiazhu"){
			my_button = this.xiazhu_button;
		}
		
		my_button.active = true;
		my_button.getComponent(cc.Button).interactable = flag;
	},
	//按钮回调函数
	callback_zhunbei(){
		this.zhunbei_button.active = false;
		/*
		pomelo.request(util.getGameRoute(),{
			process:"ready",
			location:g_myselfPlayerPos
		},function(data){
			cc.log(data.msg);
		});
		*/
		//for test
		var self = this;
		self.onReady_function({'location':g_myselfPlayerPos});
		self.node.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
			for(var i = 1;i < 4;i++){
				self.onReady_function({'location':i + 1});
			}
			self.get_one_button("qiang",true);
		})));
    },
	
	callback_qiangzhuang(){
		this.qiangzhang_button.stopAllActions();
		this.game_status = "qianged";
		this.qiangzhang_button.active = false;
		pomelo.request(util.getGameRoute(),{
			process:"qiang",
			flag:true,
			location:g_myselfPlayerPos
		},function(data){
			cc.log(data.msg);
		});
    },
	callback_xiazhu(){
		this.xiazhu_button.getComponent(cc.Button).interactable = false;
		//find myself player
		this.chip_layout = cc.instantiate(g_assets["pop_add_chip"]);
		var chip_layout_com = this.chip_layout.getComponent("add_chip");
		chip_layout_com.init_callback(this,this.sumBet,this.silder_callback);
		this.node.addChild(this.chip_layout);
		
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == g_myselfPlayerPos){
				var x = 0;
				var y = this.button_layout.getPositionY() + this.button_layout.getContentSize().height/2 + 10 + this.chip_layout.getContentSize().height/2;
				this.chip_layout.setPosition(cc.p(x,y));
				break;
			}
		}
		this.get_one_button("queding",false);
    },
	callback_queding(){
		this.chip_layout.active = false;
		this.chip_layout.destroy();
		this.queding_button.active = false;
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == g_myselfPlayerPos){
				var chip1 = player_com.my_chip1;
				var chip2 = player_com.my_chip2;
				pomelo.request(util.getGameRoute(),{
					process:"xiazhu",
					chips:[chip1,chip2],
					location:g_myselfPlayerPos
				},function(data){
					cc.log(data.msg);
				});
				break;
			}
		}
    },
	callback_peipai(){
		this.peipai_button.active = false;
		var size = cc.director.getVisibleSize();
		var playerPosition = -1;
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == g_myselfPlayerPos){
				playerPosition = i;
				break;
			}
		}
		var player = g_players[playerPosition];
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
			pomelo.request(util.getGameRoute(),{
				process:"peipai",
				peipai:mark,
				select:select,
				location:g_myselfPlayerPos
			},function(data){
				console.log(data.msg);
			});
		}else{
			util.show_error_info(this,size,"只能选择两张牌");
			this.peipai_button.active = true;
			return;
		}
	},
	callback_kaipai(){
		this.kaipai_button.active = false;
		pomelo.request(util.getGameRoute(),{
			process:"open",
			location:g_myselfPlayerPos
		},function(data){
			cc.log(data.msg);
		});
	},
	callback_qieguo(){
		this.qieguo_button.active = false;
		this.buqie_button.active = false;
		pomelo.request(util.getGameRoute(),{
			process:"qieguo",
			location:g_myselfPlayerPos,
			flag:true
		},function(data){
			cc.log(data.msg);
		});
	},
	callback_buqie(){
		this.qieguo_button.active = false;
		this.buqie_button.active = false;
		pomelo.request(util.getGameRoute(),{
			process:"qieguo",
			location:g_myselfPlayerPos,
			flag:false
		},function(data){
			cc.log(data.msg);
		});
	},
	callback_setting(){
		var self = this;
		var size = cc.director.getVisibleSize();
		var pop_setting = cc.instantiate(g_assets["pop_setting_scene"]);
		var pop_setting_com = pop_setting.getComponent("pop_set_scene");
		
		pop_setting_com.set_callback(function(index){
			if(index == 0){
				if(g_music_key == BOOL.NO && self.current != null){
					cc.audioEngine.stop(self.current);
					self.current = null;
				}else if(self.current == null){
					self.current = cc.audioEngine.play(self.audio, true, 1);
				}
			}
		});
		
		var x = size.width/2;
		var y = size.height/2;
		this.node.addChild(pop_setting);
		pop_setting.setPosition(this.node.convertToNodeSpaceAR(cc.p(x,y)));
	},
	callback_gameback(){
		var self = this;
		pomelo.request(util.getGameRoute(),{
            process : 'quitRoom'
        },function(data){
            console.log("-----quit------"+JSON.stringify(data));
			self.onExit();
            cc.director.loadScene("MainScene");
        })
	},
	callback_uinfo(event,id){
		var player = this.players[id];
		var player_com = player.getComponent("tdk_player");
		pomelo.request(util.getGameRoute(),{
            process : 'get_user_info',
			"send_from":g_myselfPlayerPos,
			"location":player_com.position_server
        },function(data){
            console.log("-----quit------"+JSON.stringify(data));
        })
	},
	
	showRoomMessageUpdate(){
		this.zhuang_label.string = this.sumBet;
		this.huihe_label.string = this.count;
	},
	
	pomelo_on(){
    	pomelo.on('onReady',this.onReady_function.bind(this));
		pomelo.on('onGetZhuang',this.onGetZhuang_function.bind(this));
		pomelo.on('onQiang',this.onQiangzhuang_function.bind(this));
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
		pomelo.on('onActBroadcast',this.onUserBroadcast_function.bind(this));
    },
	
	onReady_function(data){
		cc.log("pomelo on Ready:" + data.location+" is ready");
		/*如果玩家进来时正在游戏中则准备后 放入g_players中*/
		for(var i = 0;i < g_players_noPower.length;i++){
			var player = g_players_noPower[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == data.location){
				g_players.push(player);
				g_players_noPower.splice(i,1);
				break;
			}
		}
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == data.location){
				player_com.is_power = 1;
				player_com.setSpriteStatus("yizhunbei");
				player_com.stop_timer();
				//准备状态表示
				break;
			}
		}
	},
	
	onQiangzhuang_function(data){
		cc.log("pomelo onQiangzhuang_function:" + data.location);
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == data.location){
				player_com.is_power = 1;
				player_com.setSpriteStatus("qiang");
				break;
			}
		}
	},
	
	onGetZhuang_function(data){
		cc.log("pomelo onGetzhuang_function:" + JSON.stringify(data));
		var size = cc.director.getWinSize();
		var num1 = data.nums[0];
		var num2 = data.nums[1];
		this.zhuang_serverPosition = data.zhuang_local;
		this.yao_shaizi = cc.instantiate(g_assets["yaoshaizi"]);
		var yao_shaizi_com = this.yao_shaizi.getComponent("shai_zhong_active");
		yao_shaizi_com.init_start(null,num1,num2);
		this.node.addChild(this.yao_shaizi);
		this.yao_shaizi.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
		var call_back_function = cc.callFunc(this.getzhuang_callback,this);
		this.node.runAction(cc.sequence(cc.delayTime(3),call_back_function));
	},
	
	onXiazhu_function(data){
		cc.log("onXiazhu_function:" + JSON.stringify(data));
		var location = data.location;
		var chips = data.chips;
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == data.location){
				player_com.set_chips(1,chips[0]);
				player_com.set_chips(2,chips[1]);
				break;
			}
		}
	},
	
	onFapai_function(data){
		cc.log("onFapai" + JSON.stringify(data));
		var size = cc.director.getWinSize();
		var cur_turn = data["cur_turn"];
		//如果是第一次发牌则清空已经用过的牌
		/*更新房间状态和玩家信息*/
		if(cur_turn == 0){
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

		/*初始化玩家手中的牌（背面），权限isPower,开牌checkCard弃牌abandon,失败提示精灵loserSprite*/
		for(var i=0;i < g_players.length;i++){
			var player_com = g_players[i].getComponent("tdk_player");
			player_com.hide_game_sprite();
		}
		/*摇色子动作 并显示发牌开始玩家*/
		var shaizi_1 = data["nums"][0];
		var shaizi_2 = data["nums"][1];
		this.yao_shaizi = cc.instantiate(g_assets["yaoshaizi"]);
		var yao_shaizi_com = this.yao_shaizi.getComponent("shai_zhong_active");
		yao_shaizi_com.init_start(null,shaizi_1,shaizi_2);
		this.node.addChild(this.yao_shaizi);
		this.yao_shaizi.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
	},
	
	onShoupai_function(data){
		cc.log("onShoupai:" + JSON.stringify(data));

		//初始化myselfCards数组
		this.myselfCards.splice(0,this.myselfCards.length);
		this.count = data["round"];
		var cardType = data["paixing"];
		for(var i = 0;i < cardType.length;i++){
			this.myselfCards.push(cardType[i]);
		}
		cc.log("myselfCards:" + JSON.stringify(this.myselfCards));
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
		cc.log("fapai_order:" + JSON.stringify(fapai_order));
		this.actionFaPai(this,fapai_order);
	},
	
	onPeiPai_function(data){
		cc.log("onPeipai_function:" + JSON.stringify(data));
		var player_position = data.location;
		var card_select_ids = data.select;

		for(var m = 0;m < g_players.length;m++){
			var player = g_players[m];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == player_position){
				//如果是自己则执行配牌动作
				var all_cards = player_com.my_cards;
				var unselect_cards = new Array();
				var select_cards = new Array();
				for(var j = 0;j < all_cards.length;j++){
					var flag = false;
					var card_item = all_cards[j];
					var card_item_com = card_item.getComponent("pj_card");
					cc.log("card_item_com id:" + card_item_com.id + " selected_cards:" + player_com.selected_cards.length);
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
				this.set_cards_w(player,select_cards);
				this.set_cards_h(player,unselect_cards)
				break;
			}
		}
	},
	
	onPeiPaiFinish_function(data){
		if(g_myselfPlayerPos == this.zhuang_serverPosition){
			this.get_one_button("kaipai",true);
		}
	},
	
	onEnd_function(data){
		cc.log("onEnd:" + JSON.stringify(data));
		//获胜者的牌型
		var scores = data["scores"];
		this.qieguo = data["isqie"];
		this.sumBet = this.sumBet + scores[this.zhuang_serverPosition - 1];
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
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
	},

	onQieguo_function(data){
		cc.log("onQieguo_function:" + JSON.stringify(data));
		var size = cc.director.getVisibleSize();
		var flag = data.flag;
		if(flag == false){
			if(g_myselfPlayerPos != this.zhuang_serverPosition){
				for(var i = 0;i < this.players.length;i++){
					var player = this.players[i];
					var player_com = player.getComponent("tdk_player");
					if(player_com.position_server == g_myselfPlayerPos){
						player_com.set_chips(1,0);
						player_com.set_chips(2,0);
					}
				}
				this.get_one_button("xiazhu",true);
			}
		}else{
			var scores = data.scores;
			var results = new Array();
			for(var i = 0;i < g_players_data.length;i++){
				var player_item = g_players_data[i];
				if(player_item != null && player_item != "null"){
					var item = new Array();
					item.push(player_item.nick_name);
					item.push(player_item.head_img_url);
					if(player_item.location == this.zhuang_serverPosition){
						item.push(100);
					}else{
						item.push(0);
					}
					item.push(scores[player_item.location - 1]);
					//如果是自己则执行更新游戏记录操作
					if(player_item.location == g_myselfPlayerPos){
						var param = {
							player_id:g_user["id"],
							renshu:g_room_data["real_num"],
							game_status:item[3] - item[2],
							status:item[3] - item[2],
							creat_time:g_room_data["creat_time"],
							room_num:g_room_data["room_num"],
							use_fangka:1
						};
						if(g_room_data["fangka_type"] == 2){
							if(g_myselfPlayerPos == this.zhuang_serverPosition){
								param["use_fangka"] = g_room_data["fangka_num"];
							}else{
								param["use_fangka"] = 0;
							}
						}
						Servers.gameInfoProcess("update_game",param,function(res){
							
						})
					}
					results.push(item);
				}
			}
			var self = this;
			var x = size.width/2;
			var y = size.height/2;
			var pop_game_finish = cc.instantiate(g_assets["pop_game_finish"]);
			var pop_game_finish_com = pop_game_finish.getComponent("pop_game_finish");
			this.node.addChild(pop_game_finish);
			pop_game_finish_com.init_info(results,function(){
				self.onExit();
			});
			pop_game_finish.setPosition(this.node.convertToNodeSpaceAR(cc.p(x,y)));
		}
	},
	
	onOpen_function(data){
		cc.log("onOpen_function:"+JSON.stringify(data));
		var paixing = data.all_pai;
		for(var i = 0; i < this.players.length; i++){
			var player = this.players[i];
			var player_com = player.getComponent("tdk_player");
			var cardString = paixing[player_com.position_server - 1];
			if(player_com.position_server != g_myselfPlayerPos){
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
		}
	},
	
	onUserBroadcast_function(data){
		console.log("onUserBroadcast:"+JSON.stringify(data));
		var msage_scroll_com = this.msage_scroll.getComponent("msage_scroll");
		msage_scroll_com.set_string(data);
	},

	onGetUinfo_function(data){
		console.log("onGetUinfo_function:"+JSON.stringify(data));
		var size = cc.director.getWinSize();
		//显示玩家信息
		if(data["send_from"] == g_myselfPlayerPos){
			this.uinfo = cc.instantiate(g_assets["pop_game_user"]);
			var uinfo_com = this.uinfo.getComponent("pop_game_user_info");
			
			uinfo_com.init_info(data,this.actionSendGift);
			this.node.addChild(this.uinfo);
			this.uinfo.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
		}
	},
	onSendGift_function(data){
		cc.log("actionSendGift",type,send_from,send_to);
		var s_player = null;
		var e_player = null;
		var type = data["type"];
		var send_from = data["send_from"];
		var send_to = data["send_to"];
		var all_players = g_players.concat(g_players_noPower);
		if(send_from == send_to){
			return false;
		}
		for(var i = 0;i < all_players.length;i++){
			var player_com = all_players[i].getComponent("tdk_player");
			if(player_com.position_server == send_from){
				s_player = all_players[i];
			}
			if(player_com.position_server == send_to){
				e_player = all_players[i];
			}
		}
		var active = null;
		var active_name = null;
		//送鸡蛋
		if(type == 1){
			active = cc.instantiate(g_assets["shoe_active"]);
			active_name = "shoe_active";
		}else if(type == 2){
			active = cc.instantiate(g_assets["egg_active"]);
			active_name = "egg_active";
		}else if(type == 3){
			active = cc.instantiate(g_assets["bomb_active"]);
			active_name = "bomb_active";
		}else if(type == 4){
			active = cc.instantiate(g_assets["kiss_active"]);
			active_name = "kiss_active";
		}else if(type == 5){
			active = cc.instantiate(g_assets["flower_active"]);
			active_name = "flower_active";
		}else if(type == 6){
			active = cc.instantiate(g_assets["cheers_active"]);
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
	
	actionSendGift(type,send_from,send_to){
		pomelo.request(util.getGameRoute(),{
            process : 'send_gift',
			"send_from":send_from,
			"send_to":send_to,
			"type":type
        },function(data){
            console.log("-----quit------"+JSON.stringify(data));
        })
	},
	
	actionFaPai(pthis,fapai_order){
		cc.log("actionFaPai:" + JSON.stringify(fapai_order));
    	var size = cc.director.getVisibleSize();
		var local = fapai_order.shift();
		for(var i = 0;i < this.players.length;i++){
			var player = this.players[i];
			var player_com = player.getComponent("tdk_player");
			var card_type = this.myselfCards[local - 1];
			cc.log("actionFaPai card_type:" + JSON.stringify(card_type) + " position_server:" + player_com.position_server + " local:" + local);
			if(player_com.position_server == local){
				for(var j = 0;j < 4;j++){
					var card = player_com.addPlayerCard();
					var card_com = card.getComponent("pj_card");
					if(player_com.position_server == g_myselfPlayerPos){
						card_com.installTouch();
						player_com.set_card_sprite(j,card_type[j]);
					}
					var position = this.calc_player_card_position(player,j);
					card.setPosition(position);
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
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == g_myselfPlayerPos){
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
                break;
            }
        }
		this.get_one_button("peipai",true);
	},

	switchRadio(event) {
		var card_com = event.target.getComponent("pj_card");
        var suit = event.target.getComponent("pj_card").suit;
		var rank = event.target.getComponent("pj_card").rank;
		cc.log("switchRadio : suit:" + suit + " rank:" + rank);
		var player_com = null;
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
			var player_com = player.getComponent("tdk_player");
    		if(player_com.position_server == g_myselfPlayerPos){
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
	calc_player_chip_position(player){
		var player_com = player.getComponent("tdk_player");
		var x = 0;
		var y = 0;
		if(player_com.player_position == 1){
			x = player.getPositionX() + player_com.mobile_sprite.node.getContentSize().width/2 + player_com.chips_label.getContentSize().width /2 + 10;
			y = player.getPositionY();
		}else if(player_com.player_position == 2){
			x = player.getPositionX();
			y = player.getPositionY() + player_com.mobile_sprite.node.height/2 + player_com.chips_label.getContentSize().height /2 + 10;
		}else if(player_com.player_position == 3){
			x = player.getPositionX() + player_com.mobile_sprite.node.getContentSize().width/2 + player_com.chips_label.getContentSize().width /2 + 10;
			y = player.getPositionY();
		}else if(player_com.player_position == 4){
			x = player.getPositionX();
			y = player.getPositionY() + player_com.mobile_sprite.node.height/2 + player_com.chips_label.getContentSize().height /2 + 10;
		}
		cc.log("calc x:" + x + " y:" + y);
		return cc.p(x,y);
	},
	calc_player_card_position(player,m){
		var player_com = player.getComponent("tdk_player");
		var x = 0;
		var y = 0;
		var extend = 0;
		if(player_com.position_server == this.zhuang_serverPosition){
			if(player_com.player_position == 2 || player_com.player_position == 4){
				extend = -this.pai_back_sprite.node.getContentSize().width/2;
			}else{
				extend = -this.pai_back_sprite.node.getContentSize().width;
			}
		}
		if(player_com.player_position == 1 || player_com.player_position == 3){
			x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width/2 +
				this.pai_back_sprite.node.getContentSize().width/2 + 80 + extend +
				(this.pai_back_sprite.node.getContentSize().width + 2) * m;
			y = player_com.chips_label.getPositionY();
		}else if(player_com.player_position == 2 || player_com.player_position == 4){
			x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width/2 +
				this.pai_back_sprite.node.getContentSize().width +
				(this.pai_back_sprite.node.getContentSize().width + 2) * m;
			y = player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + extend;
		}
		cc.log("calc player_com:" + player_com.player_position +"x:" + x + " y:" + y);
		return cc.p(x,y);
	},
	calc_hpeipai_position(player,m){
		var player_com = player.getComponent("tdk_player");
		var x = 0;
		var y = 0;
		var extend = 0;
		if(player_com.position_server == this.zhuang_serverPosition){
			if(player_com.player_position == 2 || player_com.player_position == 4){
				extend = -this.pai_back_sprite.node.getContentSize().width/2;
			}else{
				extend = -this.pai_back_sprite.node.getContentSize().width;
			}
		}
		if(player_com.player_position == 1 || player_com.player_position == 3){
			x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width/2 +
				this.pai_back_sprite.node.getContentSize().width/2 + 80 + extend +
				(this.pai_back_sprite.node.getContentSize().width + 2) * m;
			y = player_com.chips_label.getPositionY();
		}else if(player_com.player_position == 2){
			x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width/2 +
				this.pai_back_sprite.node.getContentSize().width +
				(this.pai_back_sprite.node.getContentSize().width + 2) * (m + 2);
			y = player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + extend;
		}else if(player_com.player_position == 4){
			x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width/2 +
				this.pai_back_sprite.node.getContentSize().width +
				(this.pai_back_sprite.node.getContentSize().width + 2) * m;
			y = player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + extend;
		}
		cc.log("calc player_com:" + player_com.player_position +"x:" + x + " y:" + y);
		return cc.p(x,y);
	},
	calc_wpeipai_position(player,m){
		var player_com = player.getComponent("tdk_player");
		var x = 0;
		var y = 0;
		var extend = 0;
		if(player_com.position_server == this.zhuang_serverPosition){
			if(player_com.player_position == 2 || player_com.player_position == 4){
				extend = -this.pai_back_sprite.node.getContentSize().width/2;
			}else{
				extend = -this.pai_back_sprite.node.getContentSize().width;
			}
		}
		if(player_com.player_position == 1 || player_com.player_position == 3){
			x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width/2 +
				this.pai_back_sprite.node.getContentSize().width + 80 + extend +
				(this.pai_back_sprite.node.getContentSize().width + 2) + this.pai_back_sprite.node.getContentSize().height/2 + 2;
			if(m == 0){
				y = player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width/2 + 2;
			}else{
				y = player_com.chips_label.getPositionY() - this.pai_back_sprite.node.getContentSize().width/2 - 2;
			}
		}else if(player_com.player_position == 4){
			x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width/2 +
				this.pai_back_sprite.node.getContentSize().width + this.pai_back_sprite.node.getContentSize().width/2 +
				this.pai_back_sprite.node.getContentSize().height/2 + 2 +
				(this.pai_back_sprite.node.getContentSize().width + 2) ;
			if(m == 0){
				y = player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + extend + this.pai_back_sprite.node.getContentSize().width/2 + 2;
			}else{
				y = player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + extend - this.pai_back_sprite.node.getContentSize().width/2 - 2;
			}
		}else if(player_com.player_position == 2){
			x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width/2 +
				this.pai_back_sprite.node.getContentSize().width /4 + this.pai_back_sprite.node.getContentSize().height/2 + 2;
			if(m == 0){
				y = player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + extend + this.pai_back_sprite.node.getContentSize().width/2 + 2;
			}else{
				y = player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + extend - this.pai_back_sprite.node.getContentSize().width/2 - 2;
			}
		}
		cc.log("calc x:" + x + " y:" + y);
		return cc.p(x,y);
	},

	actionWinnerGetBet(location_from,location_end,flag){
		if(flag == true){
			var player_from = null;
			var player_end = null;
			for(var i = 0;i < g_players.length;i++){
				var player = g_players[i];
				var player_com = player.getComponent("tdk_player");
				if(player_com.position_server == location_from){
					player_from = player;
				}else if(player_com.position_server == location_end){
					player_end = player;
				}
			}
			
			var chip = cc.instantiate(g_assets["chip"]);
			this.node.addChild(chip);
			this.betPhotoArray.push(chip);
			chip.setPosition(player_from.getPosition());
			var moveBet = cc.moveTo(0.5,player_end.getPosition());
			chip.runAction(cc.sequence(moveBet,cc.hide()));
		}
		var callback = cc.callFunc(this.ready_next_turn,this);
		this.node.runAction(cc.sequence(cc.delayTime(1),callback));
    },
	
	ready_next_turn(){
		if(this.left_cards.length == 0){
			for(var i = 0;i < this.myselfCards.length;i++){
				var item = this.myselfCards[i];
				for(var j = 0;j < item.length;j++){
					var card = cc.instantiate(g_assets["pj_card"]);
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
		}
		if(g_myselfPlayerPos == this.zhuang_serverPosition){
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
		if(g_myselfPlayerPos != this.zhuang_serverPosition){
			if(this.qieguo == 0){
				for(var i = 0;i < this.players.length;i++){
					var player = this.players[i];
					var player_com = player.getComponent("tdk_player");
					if(player_com.position_server == g_myselfPlayerPos){
						player_com.set_chips(1,0);
						player_com.set_chips(2,0);
					}
				}
				this.get_one_button("xiazhu",true);
			}
		}
	},
	set_cards_w(player,cards){
		cc.log("set_cards_w:" + cards.length);
		for(var i = 0;i < cards.length;i++){
			var card = cards[i];
			var pos = this.calc_wpeipai_position(player,i);
			var acMoveTo = cc.moveTo(0.45,pos);
			var acrotateBy = cc.rotateBy(0.45,90,90);
			var action_spawn = cc.spawn(acMoveTo,acrotateBy);
			card.runAction(action_spawn);
		}
	},
	set_cards_h(player,cards){
		cc.log("set_cards_h:" + cards.length);
		for(var i = 0;i < cards.length;i++){
			var card = cards[i];
			var pos = this.calc_hpeipai_position(player,i);
			var acMoveTo = cc.moveTo(0.45,pos);
			card.runAction(acMoveTo);
		}
	},
	getzhuang_callback(){
		cc.log("getzhuang_callback");
		var mens = ["zhuang","chumen","tianmen","momen"];
		for(var i = 0;i < this.players.length;i++){
			var player = this.players[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == this.zhuang_serverPosition){
				player_com.is_power = 1;
				player_com.setSpriteStatus(mens[0]);
				player_com.resetMoneyLabel(this.sumBet);
				player_com.install_chip_label(true);
				var pos = this.calc_player_chip_position(player);
				player_com.chips_label.setPosition(pos);
			}else{
				var men_idx = 0;
				cc.log("position_server:" + player_com.position_server + " zhuang_serverPosition:" + this.zhuang_serverPosition);
				if(player_com.position_server > this.zhuang_serverPosition){
					men_idx = player_com.position_server - this.zhuang_serverPosition;
				}else if(player_com.position_server < this.zhuang_serverPosition){
					men_idx = player_com.position_server - this.zhuang_serverPosition + 4;
				}
				player_com.is_power = 1;
				player_com.setSpriteStatus(mens[men_idx]);
				player_com.install_chip_label(false);
				var pos = this.calc_player_chip_position(player);
				player_com.chips_label.setPosition(pos);
			}
		}
		if(g_myselfPlayerPos != this.zhuang_serverPosition){
			for(var i = 0;i < this.players.length;i++){
				var player = this.players[i];
				var player_com = player.getComponent("tdk_player");
				if(player_com.position_server == g_myselfPlayerPos){
					player_com.set_chips(1,0);
					player_com.set_chips(2,0);
				}
			}
			this.get_one_button("xiazhu",true);
		}
	},
	silder_callback(pthis,idx,silder_progress){
		cc.log("pj_game_scene silder1:" + silder_progress);
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.position_server == g_myselfPlayerPos){
				player_com.set_chips(idx,silder_progress);
				break;
			}
		}
		pthis.get_one_button("queding",true);
	},
	
	pomelo_removeListener(){
		cc.log("remove listener");
        pomelo.removeListener('onReady');
		pomelo.removeListener('onGetUinfo');
        pomelo.removeListener('onOpen');
        pomelo.removeListener('onGetZhuang');
        pomelo.removeListener('onQiang');
		pomelo.removeListener('onXiazhu');
        pomelo.removeListener('onPeiPai');
        pomelo.removeListener('onPeiPaiFinish');
        pomelo.removeListener('onFapai');
        pomelo.removeListener('onShoupai');
        pomelo.removeListener('onQieguo');
        pomelo.removeListener('onEnd');
		pomelo.removeListener('onActBroadcast');
    },

	onExit(){
		g_music_key = cc.sys.localStorage.getItem(MUSIC_KEY);
		if(g_music_key == null || g_music_key == BOOL.YES){
			cc.audioEngine.stop(this.current);
		}
        g_players_data.splice(0,g_players_data.length);
		g_room_data = null;
		g_players.splice(0,g_players.length);
		console.log("exit from the room......");
        //释放资源
        //this.releaseMember();

        //注销监听接口
        this.pomelo_removeListener();
		this.destroy();
    },
});
