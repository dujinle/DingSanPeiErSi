cc.Class({
    extends: cc.Component,

    properties: {
		sumBet:100,
		count:0,
		fapai_count:0,
		roomNum:0,
		roomState:0,
		master_name:null,
		total_count:0,
		zhuang_serverPosition:0,
		currentGetPowerPlayerPosition:0,
		//head label info
		pai_back_sprite:cc.Sprite,
		master_label:cc.Label,
		room_num_label:cc.Label,
		zhuang_label:cc.Label,
		huihe_label:cc.Label,
		msage_scroll:cc.Node,
		chip_layout:cc.Node,
		//buttons for game
		button_layout:cc.Node,
		zhunbei_button:cc.Node,
		qiangzhang_button:cc.Node,
		xiazhu_button:cc.Node,
		queding_button:cc.Node,
		peipai_button:cc.Node,
		kaipai_button:cc.Node,
		
		players:{
			type:cc.Node,
			default:[],
		}
    },

    onLoad () {
		this.sumBet = 100;
		this.count = 0;
		this.roomNum = g_room_data["room_num"];
        this.roomState = g_room_data["is_gaming"];
		this.currentGetPowerPlayerPosition = 0;
		this.master_name = g_room_data["fangzhu_name"];
		this.total_count = g_totalCount;
		this.startDealCardPosition = 0;
		this.startDealCardPosition = 0;
		this.myselfCards = new Array();
		this.init_head_info();
		this.initButtonEnableAfterComeInRoom();
		this.initPlayersAndPlayer_noPower();
		this.schedule(this.showRoomMessageUpdate,1.0/60,cc.REPEAT_FOREVER,0);
		this.node.on("pressed", this.switchRadio, this);
	},
	start(){
		cc.log("go into pj game room scene start");
		this.audioSource = this.node.getComponent(cc.AudioSource);
		g_music_key = cc.sys.localStorage.getItem(MUSIC_KEY);
		if(g_music_key == BOOL.YES){
			this.audioSource.play();
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
		lhuihe.string = this.count + "/" + this.total_count;
	},
	initButtonEnableAfterComeInRoom(){
		if(g_room_data["fangka_type"] == 1){
			this.get_one_button("qiang",true);
			var call_back_function = cc.callFunc(this.auto_qiangzhuang,this);
			this.qiangzhang_button.runAction(cc.sequence(cc.fadeOut(20),call_back_function));
		}
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
				player.active = true;
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
	callback_setting(){
		var self = this;
		var size = cc.director.getVisibleSize();
		var pop_setting = cc.instantiate(g_assets["pop_setting_scene"]);
		var pop_setting_com = pop_setting.getComponent("pop_set_scene");
		pop_setting_com.set_callback(function(index){
			if(index == 0){
				if(g_music_key == BOOL.NO){
					self.audioSource.pause();
				}else{
					self.audioSource.play();
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
		var self = this;
		var player = this.players[id];
		var player_com = player.getComponent("tdk_player");
		pomelo.request(util.getGameRoute(),{
            process : 'get_uinfo',
			send_from:g_myselfPlayerPos,
			send_to:player_com.position_server
        },function(data){
            console.log("-----quit------"+JSON.stringify(data));
        })
	},
	showRoomMessageUpdate(){


		var sumBetString = this.sumBet;
		this.zhuang_label.string = sumBetString;

		var countFlowingString = this.count + "/" + this.total_count;
		this.huihe_label.string = countFlowingString;
	},
	pomelo_on(){
    	pomelo.on('onReady',this.onReady_function.bind(this));
		pomelo.on('onGetZhuang',this.onGetZhuang_function.bind(this));
		pomelo.on('onQiang',this.onQiangzhuang_function.bind(this));
		pomelo.on('onXiazhu',this.onXiazhu_function.bind(this));
		pomelo.on('onPeiPai',this.onPeiPai_function.bind(this));
		pomelo.on('onPeiPaiFinish',this.onPeiPaiFinish_function.bind(this));
		//pomelo.on('onNoRound',this.onNoRound_function.bind(this));
		pomelo.on('onFapai',this.onFapai_function.bind(this));
		//pomelo.on('onGetUinfo',this.onGetUinfo_function.bind(this));
		pomelo.on('onShoupai',this.onShoupai_function.bind(this));
		pomelo.on('onOpen',this.onOpen_function.bind(this));
		//pomelo.on('onThrow',this.onThrow_function.bind(this));
		//pomelo.on('onFollow',this.onFollow_function.bind(this));
		//pomelo.on('onLeave',this.onLeave_function.bind(this));
		//pomelo.on('onChangePlayer',this.onChangePlayer_function.bind(this));
		//pomelo.on('onBipai',this.onBipai_function.bind(this));
		//pomelo.on('onEnd',this.onEnd_function.bind(this));
		//pomelo.on('onEndPai',this.onEndPai_function.bind(this));
		//pomelo.on('onAddChip',this.onAddChip_function.bind(this));
		//pomelo.on('onActBroadcast',this.onUserBroadcast_function.bind(this));
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
		this.count = data["round"];
		/*更新房间状态和玩家信息*/
		//初始化发牌的位置
		this.startDealCardPosition = data["location"];
		this.fapai_count = 0;

		//更新玩家信息
		for(var i = 0;i < this.players.length;i++){
			//清除玩家手中上一局的牌，
			var player_com = this.players[i].getComponent("tdk_player");
			player_com.remove_cards();
		}
		this.sumBet = data["all_chip"];

		/*初始化玩家手中的牌（背面），权限isPower,开牌checkCard弃牌abandon,失败提示精灵loserSprite*/
		for(var i=0;i < g_players.length;i++){
			var player_com = g_players[i].getComponent("tdk_player");
			player_com.check_card = false;
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
	
	onLeave_function(data){
		cc.log("onLeave:" + JSON.stringify(data));
		var playerName = data["user"];
		var isFind = false;
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.id == playerName){
				cc.log("quit from zjh room g_players");
				player_com.remove_cards();
				player.active = false;
				g_players.splice(i,1);
				isFind = true;
				break;
			}
		}
		if(isFind==false){
			for(var i = 0;i < g_players_noPower.length;i++){
				var player = g_players_noPower[i];
				var player_com = player.getComponent("tdk_player");
				if(player_com.id == playerName){
					cc.log("quit from zjh room g_players_noPower");
					player_com.remove_cards();
					player.active = false;
					g_players_noPower.splice(i,1);
					isFind = true;
					break;
				}
			}
		}
		this.playerNum--;
	},
	onEnd_function(data){
		cc.log("onEnd:" + JSON.stringify(data));
		//获胜者的牌型
		var winners = data["winners"];
		var losers = data["losers"];
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
			var player_com = player.getComponent("tdk_player");
			for(var j = 0;j < winners.length;j++){
				if(player_com.position_server == winners[j]){
					player_com.setGameStatus("winner");
				}
			}
			for(var j = 0;j < losers.length;j++){
				if(player_com.position_server == losers[j]){
					player_com.setGameStatus("loser");
				}
			}
			//this.actionWinnerGetBet(this,player.getPosition());
			//player_com.resetMoneyLabel(player_com.my_gold + parseInt(data["all_chip"]));
		}
		/* 结束则把玩家放入noPower中
		for(var i = 0;i < g_players.length;i++){
			g_players_noPower.push(g_players[i]);
		}
		g_players.splice(0,g_players.length);
		*/
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
	onNoRound_function(data){
		console.log("onNoRound:"+JSON.stringify(data));
		var size = cc.director.getVisibleSize();
		var golds_info = data["golds"];
		var tplayers = new Array();
		for(var key in golds_info){
			tplayers.push(golds_info[key]);
		}
		var pop_game_finish = cc.instantiate(g_assets["pop_game_finish"]);
		var pop_game_finish_com = pop_game_finish.getComponent("pop_game_finish");
		pop_game_finish_com.init_info(tplayers);
		var x = size.width/2;
		var y = size.height/2;
		this.node.addChild(pop_game_finish);
		pop_game_finish.setPosition(this.node.convertToNodeSpaceAR(cc.p(x,y)));
	},
	onGetUinfo_function(data){
		console.log("onNoRound:"+JSON.stringify(data));
		var size = cc.director.getWinSize();
		//显示玩家信息
		if(data["send_from"] == g_myselfPlayerPos){
			this.uinfo = cc.instantiate(g_assets["pop_game_user"]);
			var uinfo_com = this.uinfo.getComponent("pop_game_user");
			
			uinfo_com.init_info(data,this.actionSendGift);
			this.node.addChild(this.uinfo);
			this.uinfo.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width/2,size.height/2)));
		}
	},
	actionSendGift(pnode,type,send_from,send_to){
		cc.log("actionSendGift",type,send_from,send_to);
		var s_player = null;
		var e_player = null;
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
		pnode.addChild(active);
		active.setPosition(s_player.getPosition());
		
		var move = cc.moveTo(0.5,e_player.getPosition());
		var rotation = cc.rotateBy(0.5,360);
		var spawn = cc.spawn(move,rotation);
		var self = this;
		var sendAction = cc.callFunc(function(){
			var anim = active.getComponent(cc.Animation);
			anim.on('finished',  function(){
				active.destroy();
			},null);
			var animStatus = anim.play(active_name);
			// 设置循环模式为 Normal
			animStatus.wrapMode = cc.WrapMode.Normal;
			// 设置循环模式为 Loop
			animStatus.wrapMode = cc.WrapMode.Loop;
			// 设置动画循环次数为2次
			animStatus.repeatCount = 1;
		});
		active.runAction(cc.sequence(spawn,sendAction));
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
	actionBottomBet(player_position){
       var size=cc.director.getVisibleSize();
       var countNumber=-1;
       for(var j=0;j < g_betArray.length;j++){
           if(this.bet == g_betArray[j]){
               j++;
               countNumber = j;
               break;
           }
       }
       if(countNumber==-1){
           cc.log("error........outside actionBottomBet:function");
           return;
       }
	   var chip = cc.instantiate(g_assets["chip_" + this.bet]);
       this.node.addChild(chip);
       this.betPhotoArray.push(chip);
	   chip.setPosition(player_position);
       var x=size.width/3+size.width/3*Math.random();
       var y=size.height/2 + 150 *Math.random();
	   var move_pos = this.node.convertToNodeSpaceAR(cc.p(x,y));
       var moveBet=cc.moveTo(0.3,move_pos);
       chip.runAction(moveBet);
	},
	actionFollowBet(player_position,isCheckCard){
		cc.log("go into actionFollowBet......" + isCheckCard);
        var size=cc.director.getWinSize();
        var countNumber=-1;
        for(var j=0;j<g_betArray.length;j++){
            if(this.bet==g_betArray[j]){
                j++;
                countNumber=j;
                break;
            }
        }
		var chipNum = 1;
		if(isCheckCard == true){
			chipNum = 2;
		}
		//如果等于-1 说明没有单独的筹码符合 需要组合筹码
        if(countNumber==-1){
			cc.log("error........outside actionFollowBet:function");
			return;
        }
        
        while(chipNum > 0){
			var chip = cc.instantiate(g_assets["chip_" + this.bet]);
			this.node.addChild(chip);
			this.betPhotoArray.push(chip);
			chip.setPosition(player_position);
			var x=size.width/3+size.width/3*Math.random();
			var y=size.height/2 + 150 *Math.random();
			var move_pos = this.node.convertToNodeSpaceAR(cc.p(x,y));
			var moveBet=cc.moveTo(0.3,move_pos);
			chip.runAction(moveBet);
            chipNum--;
        }
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

	startFirstRotationPosition:function (){
    	var rotationPlayerIndexOf=-1;
    	for(var i=0;i<g_players.length;i++){
			var player_com = g_players[i].getComponent("tdk_player");
    		if(player_com.position_server == this.currentGetPowerPlayerPosition){
				player_com.start_timer();
    			break;
    		}
    	}
    	if(this.currentGetPowerPlayerPosition == g_myselfPlayerPos){
			this.bipai_button.getComponent(cc.Button).interactable = true;
			this.genzhu_button.getComponent(cc.Button).interactable = true;
			this.jiazhu_button.getComponent(cc.Button).interactable = true;
    	}
		this.kaipai_button.getComponent(cc.Button).interactable = true;
		this.qipai_button.getComponent(cc.Button).interactable = true;
    },
	displayLoser(mythis,loserPositionServer){
    	var tmp_allplayers = g_players_noPower.concat(g_players);
        for(var i=0;i < g_players.length;i++){
			var player_com = g_players[i].getComponent("tdk_player");
            if(player_com.position_server == loserPositionServer){
            	player_com.setSpriteStatus("loser");
				g_players_noPower.push(g_players[i]);
				g_players.splice(i,1);
                break;
            }
        }
    },
	actionWinnerGetBet(my_this,playerPosition){
        for(var j in this.betPhotoArray){
            var getBetAction =  cc.moveTo(1.0, playerPosition);
            this.betPhotoArray[j].runAction(cc.sequence(getBetAction,cc.hide()));
        }
		//初始化房间状态为非游戏状态
        this.roomState=0;
        //置按钮为不可点击
		this.initButtonEnableAfterComeInRoom();

        //关闭定时器
        var tmp_allplayers = g_players_noPower.concat(g_players);
        for(var i=0;i < tmp_allplayers.length;i++){
			var player_com = tmp_allplayers[i].getComponent("tdk_player");
            if(player_com.position_server == this.currentGetPowerPlayerPosition){
            	player_com.stop_timer();
                break;
            }
        }
    },
	biPaiSelectCallBack(index){
		var localtion1 = g_myselfPlayerPos;
		var localtion2 = null;
		for(var i = 0;i < g_players.length;i++){
			var player = g_players[i];
			var player_com = player.getComponent("tdk_player");
			if(player_com.player_position == (index + 1)){
				localtion2 = player_com.position_server;
				break;
			}
		}
		if(localtion2 != null){
			pomelo.request(util.getGameRoute(), {
				process: "bipai",
				location1: g_myselfPlayerPos,
				location2: localtion2
			}, function (data) {
				cc.log(JSON.stringify(data));
			});
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
        pomelo.removeListener('onFollow');
        pomelo.removeListener('onAddChip');
        pomelo.removeListener('onAdd');
        pomelo.removeListener('onOpen');
        pomelo.removeListener('onThrow');
        pomelo.removeListener('onBipai');
		pomelo.removeListener('onNoRound');
        pomelo.removeListener('onLeave');
        pomelo.removeListener('onEnd');
        pomelo.removeListener('onFapai');
        pomelo.removeListener('onShoupai');
        pomelo.removeListener('onChangePlayer');
        pomelo.removeListener('onEndPai');
		pomelo.removeListener('onActBroadcast');
		
        //pomelo.removeListener('onChatInGame',onChatInGame_function);
        //pomelo.removeListener('onActBroadcast',onActBroadcast_function);
        //pomelo.removeListener('onUserBroadcast',onUserBroadcast_function);
    },

	onExit(){
        g_players_data.splice(0,g_players_data.length);
        g_roomData.splice(0,g_roomData.length);
		g_players.splice(0,g_players.length);
		g_players_noPower.splice(0,g_players_noPower.length);
		console.log("exit from the room......");
        //释放资源
        //this.releaseMember();

        //注销监听接口
        this.pomelo_removeListener();
		this.destroy();
    },
});
