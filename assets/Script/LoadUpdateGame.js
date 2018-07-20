cc.Class({
    extends: cc.Component,

    properties: {
        loadBar:cc.ProgressBar,
        precent:cc.Label,
		process_type:0,
		rate:0,
		source_leng:0,
		callback:null,
    },
	init(callback){
		this.callback = callback;
	},
    onLoad () {
		var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchMoved: function (touch, event) {            // 触摸移动时触发
            },
            onTouchEnded: function (touch, event) {            // 点击事件结束处理
				var target=event.getCurrentTarget();
				var local=target.convertToNodeSpaceAR(touch.getLocation());
				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);
				if (cc.rectContainsPoint(rect, local)){
					cc.log("ok touch in the region......");
				}else{
					cc.log("touch remove from parent");
					//self.node.active = false;
				}
            }
         }, this.node);
		this.source_leng = 109;
		this.load_res();
        this.schedule(this.load_update,0.5);
    },
	load_update(){
		this.loadBar.progress = this.rate/this.source_leng * 100;
		cc.log("this.rate:" + this.rate);
		if(this.rate >= this.source_leng){
			this.precent.string = "加载完成......";
			this.unschedule(this.load_update);
			this.node.active = false;
			this.node.destroy();
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
});