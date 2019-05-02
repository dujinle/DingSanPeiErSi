cc.Class({
    extends: cc.Component,

    properties: {
		shai_zhong:cc.Node,
		shaizi_layout:cc.Node,
		shaizi_1:cc.Sprite,
		shaizi_2:cc.Sprite,
		sz_num_1:0,
		sz_num_2:0,
		callback:null,
		anim:null,
		animStatus:null,
    },
    onLoad () {

	},
	init_start(callback,num1,num2,position){
		cc.log("load 筛盅 active class");
		this.callback = callback;
		this.sz_num_1 = num1;
		this.sz_num_2 = num2;
		this.position = position;
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
		this.audio = this.node.getComponent(cc.AudioSource);
		if(this.audio != null && GlobalData.AudioParams.MUSIC_KEY == 1){
			this.audio.loop = false;
			this.audioStatus = this.audio.play();
		}
	},
	onFinished(){
		var self = this;
		cc.log("shoe active finish",this.isValid);
		self.shaizi_layout.active = true;
		self.shaizi_1.spriteFrame = GlobalData.assets["shaizi_" + self.sz_num_1];
		self.shaizi_2.spriteFrame = GlobalData.assets["shaizi_" + self.sz_num_2];
		self.shai_zhong.runAction(cc.sequence(cc.fadeOut(1),cc.callFunc(function(){
			var moveAc = cc.moveTo(0.5,self.position);
			self.shaizi_layout.runAction(cc.sequence(moveAc,cc.fadeOut(2),cc.callFunc(function(){
				if(self.callback != null){
					self.callback();	
				}
				self.node.removeFromParent();
				self.node.destroy();
			})));
		})));
	},
});
