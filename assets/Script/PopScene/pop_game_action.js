cc.Class({
    extends: cc.Component,

    properties: {
		is_start:false,
		shoe_active:cc.Node,
		egg_active:cc.Node,
		bomb_active:cc.Node,
		kiss_active:cc.Node,
		flower_active:cc.Node,
		cheers_active:cc.Node,
		show_type:0,
		is_finish:false,
		anim:null,
		animStatus:null,
		audio:null,
		audioStatus:null,
    },
    onLoad () {
		cc.log("load gift active class");
		this.shoe_active.active = false;
		this.egg_active.active = false;
		this.bomb_active.active = false;
		this.kiss_active.active = false;
		this.flower_active.active = false;
		this.cheers_active.active = false;
		//this.show_bomb();
		//this.show_shoe();
		this.show_egg();
	},
	onFinished(){
		cc.log("shoe active finish",this.isValid);
		if(this.show_type == 1){
			this.shoe_active.active = false;
		}else if(this.show_type == 2){
			this.egg_active.active = false;
		}else if(this.show_type == 3){
			this.bomb_active.active = false;
		}else if(this.show_type == 4){
			this.kiss_active.active = false;
		}else if(this.show_type == 5){
			this.flower_active.active = false;
		}else if(this.show_type == 6){
			this.cheers_active.active = false;
		}
		
		this.is_finish = true;
		this.is_start = false;
		this.node.parent = null;
		this.node.destroy();
	},
	
	show_shoe(){
		this.shoe_active.active = true;
		var action = this.shoe_active.getComponent("bomb_action");
		action.play("shoe_active");
	},
	show_egg(){
		this.egg_active.active = true;
		var action = this.egg_active.getComponent("bomb_action");
		action.play("egg_active");
	},
	show_bomb(){
		this.bomb_active.active = true;
		var action = this.bomb_active.getComponent("bomb_action");
		action.play("bomb_active");
	},
	show_kiss(){
		this.show_type = 4;
		this.kiss_active.active = true;
		this.anim = this.kiss_active.getComponent(cc.Animation);
		this.anim.on('finished',  this.onFinished,this);
		this.animStatus = this.anim.play("kiss_active");
		this.is_start = true;
		// 设置循环模式为 Normal
		this.animStatus.wrapMode = cc.WrapMode.Normal;
		// 设置循环模式为 Loop
		this.animStatus.wrapMode = cc.WrapMode.Loop;
		// 设置动画循环次数为2次
		this.animStatus.repeatCount = 1;
	},
	show_flower(){
		this.show_type = 5;
		this.flower_active.active = true;
		this.anim = this.flower_active.getComponent(cc.Animation);
		this.anim.on('finished',  this.onFinished,this);
		this.animStatus = this.anim.play("flower_active");
		this.is_start = true;
		// 设置循环模式为 Normal
		this.animStatus.wrapMode = cc.WrapMode.Normal;
		// 设置循环模式为 Loop
		this.animStatus.wrapMode = cc.WrapMode.Loop;
		// 设置动画循环次数为2次
		this.animStatus.repeatCount = 1;
	},
	show_cheers(){
		this.show_type = 6;
		this.cheers_active.active = true;
		this.anim = this.cheers_active.getComponent(cc.Animation);
		this.anim.on('finished',  this.onFinished,this);
		this.animStatus = this.anim.play("cheers_active");
		this.is_start = true;
		// 设置循环模式为 Normal
		this.animStatus.wrapMode = cc.WrapMode.Normal;
		// 设置循环模式为 Loop
		this.animStatus.wrapMode = cc.WrapMode.Loop;
		// 设置动画循环次数为2次
		this.animStatus.repeatCount = 1;
	},
});
