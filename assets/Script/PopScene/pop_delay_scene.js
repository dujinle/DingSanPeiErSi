cc.Class({
    extends: cc.Component,

    properties: {
        delayTime:0,
		delayLabel:cc.Node,
		tipsLabel:cc.Node,
		callback:null,
    },
	onLoad(){
		this.node.on(cc.Node.EventType.TOUCH_START,function(e){
			e.stopPropagation();
		})
	},
	setMsg(tips){
		var label = this.tipsLabel.getComponent(cc.Label);
		label.string = tips;
	},
	onStart(time,cb){
		this.delayTime = time;
		this.callback = cb;
		this.delayLabel.getComponent(cc.Label).string = "(" + this.delayTime + "s)";
		this.schedule(this.delayFunc,1);
	},
	delayFunc(){
		this.delayTime -= 1;
		this.delayLabel.getComponent(cc.Label).string = "(" + this.delayTime + "s)";
		if(this.delayTime <= 0){
			this.unschedule(this.delayFunc);
			this.callback();
		}
	}
});