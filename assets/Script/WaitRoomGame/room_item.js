cc.Class({
    extends: cc.Component,

    properties: {
		roomInfo:null,
		ridLabel:cc.Label,
		roomLabel:cc.Label,
		numLabel:cc.Label,
		tipLabel:cc.Node,
		maxLabel:cc.Label,
		idx:0,
    },
	onLoad(){
	},
	initData(id,data){
		this.roomInfo = data;
		this.idx = id;
		this.ridLabel.string = this.idx;
		this.roomLabel.string = GlobalData.GameModel[data.game_type];
		this.numLabel.string = data.real_num + '/' + data.player_num;
		this.tipLabel.string = '适度游戏益脑，过度游戏伤身';
		this.maxLabel.string = GlobalData.GameMaxType[data.max_type];
	},
	buttonCb(event){
		if(GlobalData.RunTimeParams.RootNode != null){
			if(event.type == null || event.type != false){
				GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
			}
		}
		this.node.dispatchEvent(new cc.Event.EventCustom("scroll", true));
	}
});
