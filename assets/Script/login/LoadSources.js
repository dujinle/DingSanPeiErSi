cc.Class({
    extends: cc.Component,

    properties: {
        load_bar:cc.ProgressBar,
        precent:cc.Label,
		rate:0,
		callback:null,
		source_leng:0,
    },
    // onLoad () {},
	
    onStart (callback) {
		this.load_bar.progress = 0;
		this.source_leng = 105;
		this.load_res();
		this.callback = callback;
        this.schedule(this.load_update,0.5);
    },
	load_update(){
		this.load_bar.progress = this.rate/this.source_leng * 100;
		cc.log("this.rate:" + this.rate);
		if(this.rate >= this.source_leng){
			this.precent.string = "加载完成......";
			this.unschedule(this.load_update);
			this.callback();
		}
	},
	load_res(){
		var self = this;
		cc.loader.loadResDir("",cc.SpriteFrame,function (err, assets) {
			for(var i = 0;i < assets.length;i++){
				g_assets[assets[i].name] = assets[i];
				self.rate = self.rate + 1;
				self.precent.string = "加载文件中......";
				cc.log("load res :" + assets[i].name);
			}
		});
		cc.loader.loadResDir("prefab",function (err, assets) {
			for(var i = 0;i < assets.length;i++){
				g_assets[assets[i].name] = assets[i];
				self.rate = self.rate + 1;
				self.precent.string = "加载文件中......";
				cc.log("load res :" + assets[i].name);
			}
		});
	}
    // update (dt) {},
});
