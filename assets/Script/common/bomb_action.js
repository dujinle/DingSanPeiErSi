cc.Class({
    extends: cc.Component,

    properties: {
       	anim:null,
		animStatus:null,
		audio:null,
		audioStatus:null,
    },
    onLoad(){
		
	},
	play(actin_name){
		this.anim = this.node.getComponent(cc.Animation);
		//this.anim.on('finished', cb,this);
		this.animStatus = this.anim.play(actin_name);
		// 设置循环模式为 Normal
		this.animStatus.wrapMode = cc.WrapMode.Normal;
		// 设置循环模式为 Loop
		this.animStatus.wrapMode = cc.WrapMode.Loop;
		// 设置动画循环次数为2次
		this.animStatus.repeatCount = 1;
		g_sound_key = cc.sys.localStorage.getItem(SOUND_KEY);
		this.audio = this.node.getComponent(cc.AudioSource);
		if(this.audio != null && g_sound_key == BOOL.YES){
			this.audio.loop = false;
			this.audioStatus = this.audio.play();
		}
	},
});
