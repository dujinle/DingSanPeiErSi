cc.Class({
    extends: cc.Component,

    properties: {
		roomItemLeft:cc.Node,
		rootItemRight:cc.Node,
    },
	onLoad(){
		this.roomItemLeft.active = false;
		this.rootItemRight.active = false;
	},
	initData(lid,data){
		try{
			lid = lid * 2;
			var dataLeft = data[lid];
			var dataRight = data[lid + 1];
			if(dataLeft != null){
				this.roomItemLeft.active = true;
				this.roomItemLeft.getComponent('room_item').initData(lid,data[lid]);
			}
			if(dataRight != null){
				this.rootItemRight.active = true;
				this.rootItemRight.getComponent('room_item').initData(lid + 1,dataRight);
			}
		}catch(err){
			console.log(err);
		}
	},
});