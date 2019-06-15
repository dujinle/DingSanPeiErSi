cc.Class({
    extends: cc.Component,

    properties: {
		id:0,
		nick_name:null,
		my_gold:0,
		my_chip1:0,
		my_chip2:0,
		pei_pai_flag:0,
		position_server:0,
		player_position:0,
		is_power:0,
		mobile_sprite:cc.Sprite,
		head_sprite:cc.Sprite,
		counter_timer:cc.Node,
		status_sprite:cc.Sprite,
		game_sprite:cc.Sprite,
		nick_name_label:cc.Label,
		chips_label:cc.Node,
		gold_label:cc.Label,
		isvalid:false,
		my_cards:{
			type:cc.Node,
			default:[]
		},
		selected_cards:{
			type:cc.Node,
			default:[]
		},
    },
	init(params){
		cc.log("tdk_player init: " + JSON.stringify(params));
		var self = this;
		this.id = params.id;
        this.position_server = params.location;
        this.is_power = params.is_power;
		this.nick_name = params.nick_name;
		this.my_gold = params.my_gold;
		this.nick_name_label.getComponent(cc.Label).string = this.nick_name;
		this.gold_label.getComponent(cc.Label).string = this.my_gold;
		if(params.head_img_url != null && params.head_img_url.length > 0){
			cc.loader.load({url:params.head_img_url,type:'png'},function (err, texture) {
				var frame = new cc.SpriteFrame(texture);
				self.head_sprite.spriteFrame = frame;
			});
		}else{
			self.head_sprite.spriteFrame = GlobalData.assets["man"];
		}
		if(this.is_power == 1){
			this.setSpriteStatus("yizhunbei");
		}
		this.pei_pai_flag = 0;
		this.isvalid = false;
	},
	start_timer(){
		var count_timer = this.counter_timer.getComponent("count_timer");
		count_timer.start_timer();
	},
	stop_timer(){
		var count_timer = this.counter_timer.getComponent("count_timer");
		count_timer.stop_timer();
	},
    setSpriteStatus(status){
		console.log("zjh_player setSpriteStatus:" + status);
		this.status_sprite.spriteFrame = GlobalData.assets[status];
		this.status_sprite.node.active = true;
	},
	setGameStatus(status){
		console.log("zjh_player setSpriteStatus:" + status);
		this.game_sprite.spriteFrame = GlobalData.assets[status];
		this.game_sprite.node.active = true;
	},
	
	install_chip_label(flag){
		cc.log("install_chip_label");
		if(this.chips_label != null){
			this.chips_label.removeFromParent();
			this.chips_label.destroy();
		}
		if(flag == true){
			cc.log("install chips_label zhuang");
			this.chips_label = cc.instantiate(GlobalData.assets["chip_bg_zhuang"]);
		}else if(this.player_position == 1){
			cc.log("install chips_label 1");
			this.chips_label = cc.instantiate(GlobalData.assets["chip_bg_1"]);
		}else if(this.player_position == 2){
			cc.log("install chips_label 2");
			this.chips_label = cc.instantiate(GlobalData.assets["chip_bg_2"]);
		}else if(this.player_position == 3){
			cc.log("install chips_label 3");
			this.chips_label = cc.instantiate(GlobalData.assets["chip_bg_3"]);
		}else if(this.player_position == 4){
			cc.log("install chips_label 4");
			this.chips_label = cc.instantiate(GlobalData.assets["chip_bg_4"]);
		}

		this.node.addChild(this.chips_label);
		this.set_chip_position();
		if(flag == false){
			var label_1 = this.chips_label.getChildByName("chip_up");
			label_1.getComponent(cc.Label).string = 0;
			var label_2 = this.chips_label.getChildByName("chip_down");
			label_2.getComponent(cc.Label).string = 0;
		}
	},
	
	set_chips(idx,chip){
		cc.log("set_chips idx:" + idx + " chip:" + chip);
		if(idx == 1){
			var label_1 = this.chips_label.getChildByName("chip_up");
			label_1.getComponent(cc.Label).string = chip;
			this.my_chip1 = chip;
		}else if(idx == 2){
			var label_2 = this.chips_label.getChildByName("chip_down");
			label_2.getComponent(cc.Label).string = chip;
			this.my_chip2 = chip;
		}
	},
	
	remove_select_cards(){
		for(var i = 0;i < this.selected_cards.length;i++){
			var selectCard = this.selected_cards[i];
			for(var j = 0;j < this.my_cards.length;j++){
				if(selectCard == this.my_cards[j]){
					this.my_cards.splice(j,1);
					break;
				}
			}
		}
		this.selected_cards.splice(0,this.selected_cards.length);
		this.pei_pai_flag = 0;
	},

	addPlayerCard(){
		var card = cc.instantiate(GlobalData.assets["pj_card"]);
		var card_com = card.getComponent("pj_card");
		card_com.id = this.my_cards.length;
		this.chips_label.addChild(card);
		this.my_cards.push(card);
		return card;
	},
	
	set_card_sprite(idx,rank){
		cc.log("set_card_sprite: idx" + idx + " rank:" + rank);
		var card = this.my_cards[idx].getComponent("pj_card");
		card.initCardSprite(rank);
	},
	
	remove_cards(){
		for(var i = 0;i < this.my_cards.length;i++){
			var card = this.my_cards[i];
			card.destroy();
		}
		this.my_cards.splice(0,this.my_cards.length);
		this.pei_pai_flag = 0;
	},
	hide_status_sprite(){
		this.status_sprite.node.active = false;
	},
	hide_game_sprite(){
		this.game_sprite.node.active = false;
	},
	resetMoneyLabel(money){
		console.log('resetMoneyLabel',money);
		this.my_gold = money;
		this.gold_label.string = money;
	},
	set_chip_position(){
		var x = 0;
		var y = 0;
		var mobileSize = this.mobile_sprite.node.getContentSize();
		var mobilePos = this.mobile_sprite.node.getPosition();
		if(this.player_position == 1){
			x = mobileSize.width/2 + this.chips_label.getContentSize().width /2 + 10;
			y = mobilePos.y;
		}else if(this.player_position == 2){
			x = mobilePos.x;
			y = mobileSize.height/2 + this.chips_label.getContentSize().height /2 + 10;
		}else if(this.player_position == 3){
			x = mobileSize.width/2 + this.chips_label.getContentSize().width /2 + 10;
			y = mobilePos.y;
		}else if(this.player_position == 4){
			x = mobilePos.x;
			y = mobileSize.height/2 + this.chips_label.getContentSize().height /2 + 10;
		}
		cc.log("calc x:" + x + " y:" + y);
		this.chips_label.setPosition(cc.v2(x,y));
		//return cc.v2(x,y);
	},
	set_card_position(card,zhuang_serverPosition,m,pai_back_size){
		if(this.position_server == zhuang_serverPosition){
			var pos = GlobalData.CardPosInfo.FaPaiPos.ZH[m];
			card.setPosition(cc.v2(pos[0],pos[1]));
		}else{
			var pos = GlobalData.CardPosInfo.FaPaiPos[this.player_position][m];
			card.setPosition(cc.v2(pos[0],pos[1]));
		}
	},
	set_card_head(cards,zhuang_serverPosition){
		if(this.pei_pai_flag >= 1){
			return;
		}
		for(var i = 0;i < cards.length;i++){
			var card = cards[i];
			if(this.position_server == zhuang_serverPosition){
				var headPos = GlobalData.CardPosInfo.PeiPaiPos['ZH' + this.player_position]['Head'];
				var pos = cc.v2(headPos[i][0],headPos[i][1]);
				var acMoveTo = cc.moveTo(0.45,pos);
				var acrotateBy = cc.rotateBy(0.45,90,90);
				var action_spawn = cc.spawn(acMoveTo,acrotateBy);
				card.runAction(action_spawn);
			}else{
				var headPos = GlobalData.CardPosInfo.PeiPaiPos[this.player_position]['Head'];
				var pos = cc.v2(headPos[i][0],headPos[i][1]);
				var acMoveTo = cc.moveTo(0.45,pos);
				var acrotateBy = cc.rotateBy(0.45,90,90);
				var action_spawn = cc.spawn(acMoveTo,acrotateBy);
				card.runAction(action_spawn);
			}
		}
		this.pei_pai_flag += 1;
	},
	set_card_tail(cards,zhuang_serverPosition){
		if(this.pei_pai_flag >= 2){
			return;
		}
		for(var i = 0;i < cards.length;i++){
			var card = cards[i];
			if(this.position_server == zhuang_serverPosition){
				var tailPos = GlobalData.CardPosInfo.PeiPaiPos['ZH' + this.player_position]['Tail'];
				var pos = cc.v2(tailPos[i][0],tailPos[i][1]);
				var acMoveTo = cc.moveTo(0.45,pos);
				card.runAction(acMoveTo);
			}else{
				var tailPos = GlobalData.CardPosInfo.PeiPaiPos[this.player_position]['Tail'];
				var pos = cc.v2(tailPos[i][0],tailPos[i][1]);
				var acMoveTo = cc.moveTo(0.45,pos);
				card.runAction(acMoveTo);
			}
		}
		this.pei_pai_flag += 1;
	},
	setInvalid(){
		this.counter_timer.active = false;
		this.mobile_sprite.node.active = false;
		this.isvalid = true;
	}
});
