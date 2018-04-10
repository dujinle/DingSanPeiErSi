cc.Class({
    extends: cc.Component,

    properties: {
		shai_zhong:cc.Node,
		shaizi_layout:cc.Node,
		shaizi_1:cc.Node,
		shaizi_2:cc.Node,
		callback:null,
		anim:null,
		animStatus:null,
    },
    onLoad () {
		this.init_start();
	},
	init_start(){
		cc.log("load 筛盅 active class");
		this.shaizi_layout.active = false;
		this.anim = this.shai_zhong.getComponent(cc.Animation);
		this.anim.on('finished',  this.onFinished,this);
		this.animStatus = this.anim.play("shai_zhong_active");
		// 设置循环模式为 Normal
		this.animStatus.wrapMode = cc.WrapMode.Normal;
		// 设置循环模式为 Loop
		this.animStatus.wrapMode = cc.WrapMode.Loop;
		// 设置动画循环次数为2次
		this.animStatus.repeatCount = 3;
	},
	onFinished(){
		var self = this;
		cc.log("shoe active finish",this.isValid);
		self.shaizi_layout.active = true;
		self.node.runAction(cc.sequence(cc.delayTime(2),cc.fadeOut(1),cc.callFunc(function(){
			if(self.callback != null){
				self.callback();
			}
			self.node.parent = null;
			self.node.destroy();
		})));
	},
});
