cc.Class({
    extends: cc.Component,

    properties: {
		roomItemLeft:cc.Node,
		roomItemMiddle:cc.Node,
		rootItemRight:cc.Node,
    },
	onLoad(){
		this.roomItemLeft.active = false;
		this.roomItemMiddle.active = false;
		this.rootItemRight.active = false;
	},
	initData(lid,data){
		try{
			lid = lid * 3;
			var dataLeft = data[lid];
			var dataMid = data[lid + 1];
			var dataRight = data[lid + 2];
			if(dataLeft != null){
				this.roomItemLeft.active = true;
				this.roomItemLeft.getComponent('room_item').initData(lid,dataLeft);
			}
			if(dataMid != null){
				this.roomItemMiddle.active = true;
				this.roomItemMiddle.getComponent('room_item').initData(lid + 1,dataMid);
			}
			if(dataRight != null){
				this.rootItemRight.active = true;
				this.rootItemRight.getComponent('room_item').initData(lid + 2,dataRight);
			}
		}catch(err){
			console.log(err);
		}
	},
});