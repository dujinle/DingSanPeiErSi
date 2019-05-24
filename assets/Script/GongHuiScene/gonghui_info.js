cc.Class({
    extends: cc.Component,

    properties: {
		gonghui_id:cc.Node,
		gonghui_name:cc.Node,
		gonghui_zhang:cc.Node,
		gonghui_zhiwu:cc.Node,
		fangka_num:cc.Node,
		renshu:cc.Node,
		danjia:cc.Node,
		goldNum:cc.Node,
		goldDanJia:cc.Node,
		xuanyan:cc.Node,
		zhangXY:cc.Node,
		data:null,
		tuichuButton:cc.Node,
		xuanyan_str:null,
		xuanYanLayout:cc.Node,
		zhangXYLayout:cc.Node,
		zhangSumbit:cc.Node,
    },
	init(data){
		this.zhangSumbit.active = false;
		this.zhangXYLayout.active = false;
		this.data = data;
		if(this.data != null){
			//如果自己不是公会长
			if(this.data["player_id"] != GlobalData.MyUserInfo["id"]){
				this.gonghui_id.getComponent("cc.Label").string = this.data["gonghui_id"];
				this.gonghui_name.getComponent("cc.Label").string = this.data["gonghui_name"];
				this.gonghui_zhang.getComponent("cc.Label").string = this.data["player_name"];
				this.fangka_num.getComponent("cc.Label").string = this.data["fangka_num"];
				this.gonghui_zhiwu.getComponent("cc.Label").string = '会员';
				this.renshu.getComponent("cc.Label").string = '无限';
				this.danjia.getComponent("cc.Label").string = '2';
				this.goldNum.getComponent("cc.Label").string = '无限';
				this.goldDanJia.getComponent("cc.Label").string = '2';
				this.xuanyan.getComponent("cc.Label").string = this.data["xuanyan"];
			}else{
				this.gonghui_id.getComponent("cc.Label").string = this.data["gonghui_id"];
				this.gonghui_name.getComponent("cc.Label").string = this.data["gonghui_name"];
				this.gonghui_zhang.getComponent("cc.Label").string = this.data["player_name"];
				this.fangka_num.getComponent("cc.Label").string = this.data["fangka_num"];
				this.gonghui_zhiwu.getComponent("cc.Label").string = '会长';
				this.renshu.getComponent("cc.Label").string = '无限';
				this.danjia.getComponent("cc.Label").string = '2';
				this.goldNum.getComponent("cc.Label").string = '无限';
				this.goldDanJia.getComponent("cc.Label").string = '2';
				this.zhangXY.getComponent("cc.EditBox").string = this.data["xuanyan"];
				this.xuanyan_str = this.data["xuanyan"];
				this.zhangSumbit.active = true;
				this.zhangXYLayout.active = true;
				this.xuanYanLayout.active = false;
				this.tuichuButton.active = false;
			}
		}
	},
	tuichu_cb(){
		
	},
	onChangeXuanyan(){
		this.xuanyan_str = this.zhangXY.getComponent("cc.EditBox").string;
	},
	onEndXuanyan(){
		this.xuanyan_str = this.zhangXY.getComponent("cc.EditBox").string;
	},
	onTijiao(){
		var param = {
			'process':'update_gonghui',
			"id":this.data["id"],
			"danjia":'2',
			"xuanyan":this.xuanyan_str
		};
		Servers.request('gonghuiRouter',param,function(data){
			util.show_error_info(data.msg);
		});
	},
});
