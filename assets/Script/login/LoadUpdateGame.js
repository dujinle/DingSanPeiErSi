cc.Class({
    extends: cc.Component,

    properties: {
        load_bar:cc.ProgressBar,
        precent:cc.Label,
		process_type:0,
		storage_path: '',
		manifest_url: cc.RawAsset,
		callback:null,
    },
	init(callback){
		this.callback = callback;
		//开始检查更新
		this.init_update();
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
            }
         }, this.node);
    },
	init_update(){
		if (!cc.sys.isNative) {
			this.callback();
			return;
		}
		this.storage_path = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'blackjack-remote-asset');
		cc.log('Storage path for remote asset : ' + this.storage_path);
		
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
		cc.log('Local manifest URL : ' + this.manifest_url);
		this._am = new jsb.AssetsManager("", this.storage_path, this.versionCompareHandle);
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
	},
	checkCb: function (event) {
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
				this.load_bar.progress = 0;
				break;
			default:
				return;
		}
		cc.eventManager.removeListener(this._checkListener);
		this._checkListener = null;
		if(this.process_type == 1){
			this.hotUpdate();
		}else{
			this.callback();
		}
    },
	checkUpdate(){
		if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
			this._am.loadLocalManifest(this.manifest_url);
		}
		if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
			this.callback();
			return;
		}
		this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
		cc.eventManager.addListener(this._checkListener, 1);

		this._am.checkUpdate();
    },
	hotUpdate() {
        if (this._am) {
            this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
            cc.eventManager.addListener(this._updateListener, 1);

            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                this._am.loadLocalManifest(this.manifest_url);
            }

            this._failCount = 0;
            this._am.update();
        }else{
			this.callback();
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
                this.load_bar.progress = event.getPercent();
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
			this.callback();
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
        }else{
			this.callback();
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