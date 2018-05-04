cc.Class({
    extends: cc.Component,

    properties: {
		version_label:cc.Node,
		login_flag:false,
		debug_label:cc.Label,
		button_login:cc.Node,
		callback:null,
    },
	wxLogin(){
		cc.log("wxLogin");
		this.button_login.getComponent("cc.Button").interactable = false;
		this.debug_label.string = "wxLogin.......";
		if(cc.sys.os == cc.sys.OS_ANDROID){
			jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "WxLogin", "()V");
			this.login_flag = true;
		}		
	},
	update(){
		if(g_login_auto == true){
			//这里就要自动进行登录操作
			this.wxLogin();
			g_login_auto = false;
		}
		if(this.login_flag == true){
			this.login_flag = false;
			if(cc.sys.os == cc.sys.OS_ANDROID){
				var app_id = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAppId", "()Ljava/lang/String;");
				var app_secret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAppSecret", "()Ljava/lang/String;");
				var wx_code = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getWXCode", "()Ljava/lang/String;");
				this.debug_label.string = "appid:" + app_id + " app_secret:" + app_secret + " wx_code:" + wx_code;

				if(wx_code != null && wx_code != "null"){
					Storage.setData("app_id",app_id);
					Storage.setData("app_secret",app_secret);
					this.callback = this.get_access_token;
					this.debug_label.string = "wx_code:" + wx_code;
					util.get("https://api.weixin.qq.com/sns/oauth2/access_token",
						"appid=" + app_id + "&secret=" + app_secret + "&code=" + wx_code + "&grant_type=authorization_code",this);
				}else{
					this.login_flag = true;
				}
			}
		}
	},
	get_access_token(data){
		cc.log("get_access_token:" + data);
		this.debug_label.string = "access_token:" + JSON.stringify(data);
		if(data.access_token != null && data.openid != null){
			/*保存信息下次直接登录不用授权*/
			Storage.setData("access_token",data.access_token);
			Storage.setData("openid",data.openid);
			Storage.setData("unionid",data.unionid);
			Storage.setData("refresh_token",data.refresh_token);
			this.callback = this.get_wxuser_info;
			util.get("https://api.weixin.qq.com/sns/userinfo","access_token=" + data.access_token + "&openid=" + data.openid,this);
		}else{
			this.error_code(data);
		}
	},
	get_wxuser_info(data){
		cc.log("get_wxuser_info:" + JSON.stringify(data));
		if(data.openid != null){
			this.debug_label.string = "get_wxuser_info:" + JSON.stringify(data);
			g_user['nickname'] = data.nickname;
			g_user['fangka'] = 0;
			g_user['gender'] = data.sex;
			g_user['player_id'] = data.unionid;
			g_user['headimgurl'] = data.headimgurl;
			this.debug_label.string = "start on login......";
			this.onLogin();
		}else{
			this.error_code(data);
		}
	},
    onLoad () {
    	cc.log("onLoad" + this.login_flag);
		this.button_login.getComponent("cc.Button").interactable = false;
		if(cc.sys.os == cc.sys.OS_WINDOWS){
			this.onLogin();
		}else if(cc.sys.os == cc.sys.OS_ANDROID){
			this.login_flag = false;
			var refresh_token = Storage.getData("refresh_token");
			var app_id = Storage.getData("app_id");
			if(refresh_token == null){
				//这里需要确定 是否是通过其他渠道打开的游戏如果是需要自动登录操作
				if(cc.sys.os == cc.sys.OS_ANDROID){
					var login_type = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getLoginType", "()I");
					if(login_type == 1){
						this.wxLogin();
					}
				}
				this.button_login.getComponent("cc.Button").interactable = true;
				return false;
			}else{
				this.callback = this.get_access_token;
				//刷新refresh_token 获取最新的access_token
				util.get("https://api.weixin.qq.com/sns/oauth2/refresh_token","appid=" + app_id + "&grant_type=refresh_token&refresh_token=" + refresh_token,this);
			}
		}else if(cc.sys.os == cc.sys.OS_IOS){
			cc.log("TODO");
		}
	},
	onLogin(){
		var self = this;
		this.debug_label.string = "go into on login......";
		var size = cc.director.getVisibleSize();
		Servers.getLogin(g_user['player_id'],g_user['nickname'],g_user['gender'],g_user['headimgurl'], function (data) {
			console.log("get login info succ:" + JSON.stringify(data));
			if(data.code != 200){
				self.debug_label.string = data.msg;
				return;
			}
			var token = data.token;
			Servers.getEntry(token,function(data){
				if(data.code == 200){
					self.saveUserInfo(data.player);
				}else{
					self.debug_label.string = data.msg;
				}
			});
		});
	},
	saveUserInfo(data){
		for(var key in data) {
			g_user[key] = data[key];
        }
		g_is_login = true;
		if(g_next_scene != null){
			onGameEnterRoom(g_next_data["room_num"],g_next_data["rid"]);
		}else{
			//这里确定通过其他渠道登录的游戏
			var login_type = 0;
			if(cc.sys.os == cc.sys.OS_ANDROID){
				login_type = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getLoginType", "()I");
				if(login_type == 1){
					var room_num = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getRoomNum", "()Ljava/lang/String;");
					var scene = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getScene", "()Ljava/lang/String;");
					var rid = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getRid", "()Ljava/lang/String;");
					onGameEnterRoom(room_num,rid);
				}else{
					cc.director.loadScene("MainScene");
				}
			}
			cc.director.loadScene("MainScene");
		}
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
});
