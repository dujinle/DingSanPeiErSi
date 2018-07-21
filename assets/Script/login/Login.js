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
						self.onLogin(res,null);
					}
				});
        	}
    	});
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
		var session_key = wx.getStorageSync("session_key");
		if(session_key != null && session_key.length > 0){
			this.button_login.getComponent("cc.Button").interactable = false;
			wx.getUserInfo({
				success: function (res) {
					//获取用户敏感数据密文和偏移向量
					self.onLogin(res,session_key);
				}
			});
		}
	},
	onLogin(wx_user,key){
		var self = this;
		cc.log("go into on login......" + JSON.stringify(g_user));
		var param = {
			"wx_code":self._wx_code,
			"raw_data":wx_user.rawData,
			"encrypted_data":wx_user.encryptedData,
			"iv":wx_user.iv,
			"signature":wx_user.signature,
			"session_key":key
		};
		Servers.getWxLogin(param, function (data) {
			console.log("get login info succ:" + JSON.stringify(data));
			if(data.code != 200){
				self.button_login.getComponent("cc.Button").interactable = true;
				return;
			}
			var token = data.token;
			var session_key = data.session_key;
			Servers.getEntry(token,function(data){
				if(data.code == 200){
					wx.setStorageSync("session_key",session_key);
					wx.setStorageSync("token",token);
					self.saveUserInfo(data.player);
				}
			});
		});
	},
	saveUserInfo(data){
		for(var key in data) {
			g_user[key] = data[key];
        }
		cc.log('saveUserInfo:' + JSON.stringify(g_user));
		g_is_login = true;
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
