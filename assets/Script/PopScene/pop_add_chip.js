cc.Class({
    extends: cc.Component,

    properties: {
		silder_num1:0,
		silder_num2:0,
		callback:null,
		pthis:null,
		total:0,
    },
    onLoad () {
		cc.log("start go into pop add chip js");
	},
	init_callback(pthis,total,callback){
		this.pthis = pthis;
		this.callback = callback;
		this.total = total;
	},
	silder1_callback(slider, customEventData){
		this.silder_num1 = Math.floor(slider.progress * (this.total - this.silder_num2));
		cc.log("silder1:" + this.silder_num1);
		this.callback(this.pthis,1,this.silder_num1);
	},
	silder2_callback(slider, customEventData){
		this.silder_num2 = Math.floor(slider.progress * (this.total - this.silder_num1));
		cc.log("silder1:" + this.silder_num2);
		this.callback(this.pthis,2,this.silder_num2);
	},
});
