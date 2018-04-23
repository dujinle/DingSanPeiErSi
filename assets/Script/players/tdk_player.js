cc.Class({
    extends: cc.Component,

    properties: {
		id:0,
		nick_name:null,
		my_gold:0,
		start_gold:0,
		my_chip1:0,
		my_chip2:0,
		position_server:0,
		player_position:0,
		check_card:false,
		is_power:0,
		mobile_sprite:cc.Sprite,
		counter_timer:cc.Node,
		status_sprite:cc.Sprite,
		game_sprite:cc.Sprite,
		nick_name_label:cc.Label,
		chips_label:cc.Node,
		gold_label:cc.Label,
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
		this.id = params[0];
        this.position_server = params[1];
        this.is_power = params[2];
		this.nick_name = params[3];
		this.my_gold = params[4];
		this.nick_name_label.getComponent(cc.Label).string = this.nick_name;
		this.gold_label.getComponent(cc.Label).string = this.my_gold;
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
		this.status_sprite.spriteFrame = g_assets[status];
		this.status_sprite.node.active = true;
	},
	setGameStatus(status){
		console.log("zjh_player setSpriteStatus:" + status);
		this.game_sprite.spriteFrame = g_assets[status];
		this.game_sprite.node.active = true;
	},
	install_chip_label(flag){
		cc.log("install_chip_label");
		if(flag == true){
			cc.log("install chips_label zhuang");
			this.chips_label = cc.instantiate(g_assets["chip_bg_zhuang"]);
		}else if(this.player_position == 1){
			cc.log("install chips_label 1");
			this.chips_label = cc.instantiate(g_assets["chip_bg_1"]);
		}else if(this.player_position == 2){
			cc.log("install chips_label 2");
			this.chips_label = cc.instantiate(g_assets["chip_bg_2"]);
		}else if(this.player_position == 3){
			cc.log("install chips_label 3");
			this.chips_label = cc.instantiate(g_assets["chip_bg_3"]);
		}else if(this.player_position == 4){
			cc.log("install chips_label 4");
			this.chips_label = cc.instantiate(g_assets["chip_bg_4"]);
		}

		this.node.parent.addChild(this.chips_label);
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
	},
	resetSelectCard(){
		for(var i = 0;i < this.selected_cards.length;i++){
			var card_t = this.selected_cards[i];
			var card_com = card_t.getComponent("zhq_card");
			card_com.menuCallbackButton();
		}
		this.selected_cards.splice(0,this.selected_cards.length);
	},
	addPlayerCard(){
		var card = cc.instantiate(g_assets["pj_card"]);
		var card_com = card.getComponent("pj_card");
		card_com.id = this.my_cards.length;
		this.node.parent.addChild(card);
		this.my_cards.push(card);
		return card;
	},
	set_card_sprite(idx,suit,rank){
		cc.log("set_card_sprite: idx" + idx + " suit:" + suit + " rank:" + rank);
		var card = this.my_cards[idx].getComponent("pj_card");
		card.initCardSprite(suit,rank);
	},
	remove_cards(){
		for(var i = 0;i < this.my_cards.length;i++){
			var card = this.my_cards[i];
			card.destroy();
		}
		this.my_cards.splice(0,this.my_cards.length);
	},
	hide_status_sprite(){
		this.status_sprite.node.active = false;
	},
	hide_game_sprite(){
		this.game_sprite.node.active = false;
	},
	resetMoneyLabel(money){
		this.my_gold = money;
		this.gold_label.string = money;
	}
});
