cc.Class({
    extends: cc.Component,

    properties: {
		gonghui_id:cc.Node,	
		gid:null,
    },
	onChangeEdit(){
		this.gid = this.gonghui_id.getComponent("cc.EditBox").string;
	},
	onEndEdit(){
		this.gid = this.gonghui_id.getComponent("cc.EditBox").string;
	},
	jiaru_cb(){
		
	},
    onLoad () {
		
	},

    start () {

    },

    // update (dt) {},
});
