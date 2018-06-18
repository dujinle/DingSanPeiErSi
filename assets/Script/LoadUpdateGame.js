cc.Class({
    extends: cc.Component,

    properties: {
        loadBar:cc.ProgressBar,
        precent:cc.Label,
		process_type:0,
		rate:0,
		_update_flag:false,
		source_leng:0,
		_storagePath: '',
		manifestUrl: cc.RawAsset,
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
		this.updateInterval = 0.2;
		this.source_leng = 109;
		this.load_res();
        this.schedule(this.load_update,0.5);
    },
	load_update(){
		var self = this;
		this.loadBar.progress = this.rate/this.source_leng * 100;
		cc.log("this.rate:" + this.rate);
		if(this.rate >= this.source_leng){
			this.precent.string = "加载完成......";
			this.unschedule(this.load_update);
			if (cc.sys.os == cc.sys.OS_ANDROID){
				var login_type = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getNetType", "()I");
				if(login_type != -1){
					this.init_update();
				}else{
					util.show_net_error("当前网络不可用，请检查自己的网络状态",function(){
						self.init_update();
					});
				}
			}else{
				this.init_update();
			}
		}
	},
	update(dt){
		this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) {
            return; // we don't need to do the math every frame
        }
        this.updateTimer = 0;
		if(this._update_flag == true){
			this._update_flag == false;
			this.node.active = false;
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
	},
	init_update(){
		try{
			if (!cc.sys.isNative) {
				this._update_flag = true;
				return;
			}
			this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'blackjack-remote-asset');
			cc.log('Storage path for remote asset : ' + this._storagePath);

			// Setup your own version compare handler, versionA and B is versions in string
			// if the return value greater than 0, versionA is greater than B,
			// if the return value equals 0, versionA equals to B,
			// if the return value smaller than 0, versionA is smaller than B.
			this.versionCompareHandle = function (versionA, versionB) {
				cc.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
				g_version = versionA;
				var vA = versionA.split('.');
				var vB = versionB.split('.');
				for (var i = 0; i < vA.length; ++i) {
					var a = parseInt(vA[i]);
					var b = parseInt(vB[i] || 0);
					if (a === b) {
						continue;
					}
					else {
						return a - b;
					}
				}
				if (vB.length > vA.length) {
					return -1;
				}
				else {
					return 0;
				}
			};

			// Init with empty manifest url for testing custom manifest
			cc.log('Local manifest URL : ' + this.manifestUrl);
			this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle);
			if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
				this._am.retain();
			}
			// Setup the verification callback, but we don't have md5 check function yet, so only print some message
			// Return true if the verification passed, otherwise return false
			this._am.setVerifyCallback(function (path, asset) {
				// When asset is compressed, we don't need to check its md5, because zip file have been deleted.
				var compressed = asset.compressed;
				// Retrieve the correct md5 value.
				var expectedMD5 = asset.md5;
				// asset.path is relative path and path is absolute.
				var relativePath = asset.path;
				// The size of asset file, but this value could be absent.
				var size = asset.size;
				if (compressed) {
					cc.log("Verification passed : " + relativePath);
					return true;
				}
				else {
					cc.log("Verification passed : " + relativePath + ' (' + expectedMD5 + ')');
					return true;
				}
			});

			if (cc.sys.os === cc.sys.OS_ANDROID) {
				// Some Android device may slow down the download process when concurrent tasks is too much.
				// The value may not be accurate, please do more test and find what's most suitable for your game.
				this._am.setMaxConcurrentTask(2);
				cc.log("Max concurrent tasks count have been limited to 2");
			}
			this.checkUpdate();
		}catch(err){
			this._update_flag = true;
			cc.log("ERROR:" + err.message);
		}
	},
	checkCb: function (event) {
		try{
			cc.log('Code: ' + event.getEventCode());
			switch (event.getEventCode()){
				case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
					this.precent.string = "跳过更新......";
					break;
				case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
				case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
					this.precent.string = "跳过更新......";
					break;
				case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
					this.precent.string = "跳过更新......";
					break;
				case jsb.EventAssetsManager.NEW_VERSION_FOUND:
					this.precent.string = "开始更新......";
					this.process_type = 1;
					this.loadBar.progress = 0;
					break;
				default:
					return;
			}
			cc.eventManager.removeListener(this._checkListener);
			this._checkListener = null;
			if(this.process_type == 0){
				this._update_flag = true;
			}else{
				this.hotUpdate();
			}
		}catch(err){
			this._update_flag = true;
			cc.log("ERROR:" + err.message);
		}
    },
	checkUpdate(){
		try{
			if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
				this._am.loadLocalManifest(this.manifestUrl);
			}
			if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
				this.precent.string = '加载配置文件失败 ...';
				this._update_flag = true;
				return;
			}
			this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
			cc.eventManager.addListener(this._checkListener, 1);
	
			this._am.checkUpdate();
		}catch(err){
			this._update_flag = true;
			cc.log("ERROR:" + err.message);
		}
    },
	hotUpdate() {
        if (this._am) {
            this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
            cc.eventManager.addListener(this._updateListener, 1);

            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                this._am.loadLocalManifest(this.manifestUrl);
            }

            this._failCount = 0;
            this._am.update();
        }
    },
	updateCb(event){
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode())
        {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.precent.string = "跳过更新......";
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this.loadBar.progress = event.getPercent();
                var msg = event.getMessage();
                if (msg) {
                    this.precent.string = '更新文件中.....';
                    cc.log(event.getPercent()/100 + '% : ' + msg);
                }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.precent.string = "跳过更新......";
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.precent.string = "跳过更新......";
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.precent.string = "跟新完成......";
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.precent.string = "跳过更新......";
				failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
				this.precent.string = "跳过更新......";
                cc.log('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
				failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                cc.log(event.getMessage());
				failed = true;
                break;
            default:
                break;
        }

        if (failed) {
            cc.eventManager.removeListener(this._updateListener);
            this._update_flag = true;
        }
        if (needRestart) {
			this.precent.string = "准备重新启动......";
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(newPaths));
            Array.prototype.unshift(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);

            cc.audioEngine.stopAll();
            cc.game.restart();
        }
    },
	onDestroy: function () {
        if (this._updateListener) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
        }
        if (this._am && !cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            this._am.release();
        }
    }
});