cc.Class({
    extends: cc.Component,

    properties: {
		gonghui_name_node:cc.Node,
		phone_node:cc.Node,
		phone_num:null,
		gonghui_name:null,
		level:1,
		choice_radios:{
			type:cc.Node,
			default:[]
		}
    },
	shenqing_cb(){
		
	},
    onLoad () {
		var self = this;
		self.node.on("pressed", self.switchRadio, self);
	},
	switchRadio(event) {
        var index = event.target.getComponent("one_choice").index;
		var type = event.target.getComponent("one_choice").type;
		cc.log("switchRadio : index:" + index + " type:" + type);
        for(let i = 0; i < this.choice_radios.length; i++){
			var item = this.choice_radios[i].getComponent("one_choice");
            if(item.type == type){
				this.level = index;
            	if(item.index == index){
            		item.pitchOn();
            	}else{
            		item.lifeUp();
            	}
            }
        }
		cc.log("select level" + this.level);
    },
    start () {

    },

    // update (dt) {},
});
