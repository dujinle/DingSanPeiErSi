cc.Class({
    extends: cc.Component,

    properties: {
		version_label:cc.Node,
		login_flag:false,
		button_login:cc.Node,
		load_update:cc.Node,
		callback:null,
		//微信小程序登录请求过程参数
		_wx_code:null,
    },
	wxLogin(){
		var self = this;
		this.button_login.getComponent("cc.Button").interactable = false;
		this.login_flag = false;
		console.log('logining..........');
    	//调用登录接口
    	wx.login({
        	success: function (e) {
            	console.log('wxlogin successd........');
            	self._wx_code = e.code;
				wx.getUserInfo({
					success: function (res) {
						//获取用户敏感数据密文和偏移向量
						self.onLogin(res);
					}
				});
        	}
    	});
	},
	update(){
		this.version_label.getComponent("cc.Label").string = g_version;
	},
	
	get_wxuser_info(data){
		var self = this;
		cc.log("get_wxuser_info:" + JSON.stringify(data));
		this.callback = function(res){
			if(res.openid != null){
				g_user['nickname'] = data.nickname;
				g_user['fangka'] = 0;
				g_user['gender'] = data.sex;
				g_user['player_id'] = res.unionid;
				g_user['headimgurl'] = data.headimgurl;
				self.onLogin();
			}else{
				self.error_code(data);
			}
		}
		util.get("https://api.weixin.qq.com/sns/jscode2session",
			"appid="+ this._app_id + "&secret=" + this._app_secret + "&js_code=" + this._wx_code + "&grant_type=authorization_code",this);
	},
    onLoad () {
		var self = this;
		this.xieyi_select = true;
		g_current_scene = SCENE_TAG.LOAD;
    	cc.log("onLoad" + this.login_flag);
		this.button_login.getComponent("cc.Button").interactable = false;
		this.version_label.getComponent("cc.Label").string = g_version;
		self.node.on("pressed", self.switchRadio, self);
		var load_update_com = this.load_update.getComponent("LoadUpdateGame");
		load_update_com.init(function(){
			self.onInitLogin();
		});
	},
	onInitLogin(){
		var self = this;
		this.button_login.getComponent("cc.Button").interactable = true;
		var session_key = Storage.getData("session_key");
		if(session_key != null){
			this.button_login.getComponent("cc.Button").interactable = false;
			wx.getUserInfo({
				success: function (res) {
					//获取用户敏感数据密文和偏移向量
					self.onLogin(res);
				}
			});
		}
		/*
		wx.getSetting({
		  success: function (res) {
			var authSetting = res.authSetting
			if (authSetting['scope.userInfo'] === true) {
				// 用户已授权，可以直接调用相关 API
				wx.getUserInfo({
					openIdList: ['selfOpenId'],
					lang: 'zh_CN',
					success: function(res){
						console.log('success', JSON.stringify(res));
						self.get_wxuser_info(res.rawData);
					},
					fail: function(res){
						console.log(res);
					}
				});
			} else if (authSetting['scope.userInfo'] === false){
				util.show_error_info(null,null,"授权页面的进入路径为：右上角菜单->关于（小程序名字）->右上角菜单->设置");
				// 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
			} else {
				// 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
				this.button_login.getComponent("cc.Button").interactable = true;
			}
		  }
		});
		*/
	},
	onLogin(wx_user){
		var self = this;
		cc.log("go into on login......" + JSON.stringify(g_user));
		var session_key = Storage.getData("session_key");
		var param = {
			"wx_code":self._wx_code,
			"raw_data":wx_user.rawData,
			"encrypted_data":wx_user.encryptedData,
			"iv":wx_user.iv,
			"signature":wx_user.signature,
			"session_key":session_key
		};
		Servers.getWxLogin(param, function (data) {
			console.log("get login info succ:" + JSON.stringify(data));
			if(data.code != 200){
				self.button_login.getComponent("cc.Button").interactable = true;
				return;
			}
			if(data.code != 200){
				return;
			}
			var token = data.token;
			var session_key = data.session_key;
			Servers.getEntry(token,function(data){
				if(data.code == 200){
					Storage.setData("session_key",session_key);
					self.saveUserInfo(data.player);
				}
			});
		});
	},
	saveUserInfo(data){
		for(var key in data) {
			g_user[key] = data[key];
        }
		cc.director.loadScene("MainScene");
	},
	error_code(data){
		var size = cc.director.getVisibleSize();
		if(data.errcode == 40029){
			util.show_error_info(this,size,"无效的code请重新登录");
		}else if(data.errcode == 40030){
			util.show_error_info(this,size,"无效的refresh_token请重新登录");
		}else if(data.errcode == 40003){
			util.show_error_info(this,size,"无效的openid请重新登录");
		}
	},
	switchRadio(event) {
        var item =event.target.getComponent("one_choice");
        if(this.xieyi_select == true){
			item.lifeUp();
			this.xieyi_select = false;
		}else{
            item.pitchOn();
			this.xieyi_select = true;
		}
    },
	pop_user_xieyi(){
		var size = cc.director.getVisibleSize();
		this.pop_xieyi = cc.instantiate(g_assets["PopXieyiScene"]);
		var x = size.width/2;
		var y = size.height/2;
		this.node.addChild(this.pop_xieyi);
		this.pop_xieyi.setPosition(this.node.convertToNodeSpaceAR(cc.p(x,y)));
	},
});
