cc.Class({
    extends: cc.Component,

    properties: {
		roomInfo:null,
		roomModel:cc.Node,
		playerNum:cc.Node,
		bgSprite:cc.Node,
		statusNode:cc.Node,
		idx:0,
    },
	onLoad(){
		this.bgSprite.active = false;
	},
	initData(id,data){
		this.roomInfo = data;
		this.idx = id;
		this.roomModel.getComponent(cc.Label).string = GlobalData.GameModel[data.game_type];
		this.playerNum.getComponent(cc.Label).string = data.real_num + '/' + data.player_num;
		if(data.is_gaming == 0){
			this.statusNode.getComponent(cc.Label).string = '空闲';
		}else{
			this.statusNode.getComponent(cc.Label).string = '占用中';
		}
	},
	buttonCb(event){
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		this.bgSprite.active = true;
		this.node.dispatchEvent(new cc.Event.EventCustom("scroll", true));
	}
});
