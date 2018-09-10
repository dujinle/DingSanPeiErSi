cc.Class({
    extends: cc.Component,

    properties: {
		sprite:cc.Node,
		sprite_back:cc.Sprite,
		touch_tag:false,
		num:0,
		id:0,
		suit:0,
		rank:0
    },

	initCardSprite(rank){
		//this.sprite.active = false;
		this.num = rank;
        this.suit = g_paixing[rank][1];
        this.rank = g_paixing[rank][0];
		this.sprite.getComponent("cc.Sprite").spriteFrame = g_assets[rank.toString()];
		this.sprite.runAction(cc.hide());
    },
    onLoad () {
		cc.log("zjh_card  onload......");
	},
	installTouch(){
		this.node.on("touchstart", this.touch_call, this);
	},
	uninstallTouch(){
		this.node.off("touchstart",this.touch_call,this);
	},
	touch_call(event){
		this.menuCallbackButton();
		this.node.dispatchEvent(new cc.Event.EventCustom("pressed", true));
	},
	menuCallbackButton(){
		console.log("start move the card......");
		if(this.touch_tag == false){
			var x = this.node.getPositionX();
			var y = this.node.getPositionY() + 10;
			console.log("start move the card up......x:" + x + " y:" + y);
			var acToUp = cc.moveTo(0.1,cc.p(x,y));
			console.log("start move the card up......");
			this.node.runAction(acToUp);
			this.touch_tag = true;
		}else{
			var x = this.node.getPositionX();
			var y = this.node.getPositionY() - 10;
			var acToDown = cc.moveTo(0.1,cc.p(x,y));
			console.log("start move the card down......x:" + x + " y:" + y);
			this.node.runAction(acToDown);
			this.touch_tag = false;
		}
		return this.touch_tag;
	}
});
