cc.Class({
    extends: cc.Component,

    properties: {
		tip_label:cc.Label,	
		no_g:"您还没有公会信息，只有加入公会才可以购买房卡。",
		has_g:"您已经拥有公会或者加入了其他公会，无法再进行公会申请",
		join_g:"您已经拥有公会或者加入了其他公会，无法再申请加入公会",
		adding_g:"申请正在审核中，工作人员会在3-5个工作日与您取得联系，并确认信息。\n有任何疑问请拨打电话 0317-5071648",
    },
	set_text(tid){
		if(tid == "no_g"){
			this.tip_label.string = this.no_g;
		}else if(tid == "has_g"){
			this.tip_label.string = this.has_g;
		}if(tid == "join_g"){
			this.tip_label.string = this.join_g;
		}if(tid == "adding_g"){
			this.tip_label.string = this.adding_g;
		}
	}
});
