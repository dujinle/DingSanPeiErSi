cc.Class({
    extends: cc.Component,

    properties: {
		progress_bar_top:cc.ProgressBar,
		progress_bar_boom:cc.ProgressBar,
		top_precent:0,
		boom_precent:0,
		pid:0,
		sumTime:1,
    },

    onLoad(){
		cc.log("load counter time progress",this.sumTime);
		this.sumTime = 1;
		this.progress_bar_top.progress = 0;
		this.progress_bar_boom.progress = 0;
		this.top_precent = 0;
		this.boom_precent = 0;
		cc.log(this.progress_bar_top.progress,this.progress_bar_boom.progress);
		//this.start_timer();
    },

    start_timer(){
		this.progress_bar_top.progress = 0;
		this.progress_bar_boom.progress = 0;
		this.top_precent = 0;
		this.boom_precent = 0;
		this.schedule(this.progress_bar,0.1);
    },
	progress_bar(){
		if(this.progress_bar_boom.progress <= 1){
			this.boom_precent = this.boom_precent + 0.01;
			this.progress_bar_boom.progress = this.boom_precent / this.sumTime;
			return;
		}
		if(this.progress_bar_top.progress <= 1){
			this.top_precent = this.top_precent + 0.01;
			this.progress_bar_top.progress = this.top_precent / this.sumTime;
			return;
		}
		this.unschedule(this.progress_bar);
	},
    stop_timer:function(){
		this.unschedule(this.progress_bar);
		this.progress_bar_top.progress = 0;
		this.progress_bar_boom.progress = 0;
		this.top_precent = 0;
		this.boom_precent = 0;
    }
});
