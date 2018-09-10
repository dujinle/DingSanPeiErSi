cc.Class({
    extends: cc.Component,

    properties: {
    },

	onClose(){
		this.node.active = false;
		this.node.destroy();
	},
    onLoad () {},

    start () {

    },

    // update (dt) {},
});
