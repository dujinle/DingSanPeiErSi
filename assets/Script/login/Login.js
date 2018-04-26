cc.Class({
    extends: cc.Component,

    properties: {
		version_label:cc.Node,
		login_flag:false,
		debug_label:cc.Label,
		callback:null,
    },
	wxLogin(){
		cc.log("wxLogin");
		this.debug_label.string = "wxLogin.......";
		jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "WxLogin", "()V");
		//cc.director.loadScene("MainScene");
		this.login_flag = true;
	},
	update(){
		if(this.login_flag == true){
			this.login_flag = false;
			var size = cc.director.getVisibleSize();
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
		//this.onLogin();
		
    	this.login_flag = false;
		var refresh_token = Storage.getData("refresh_token");
		var app_id = Storage.getData("app_id");
		if(refresh_token == null){
			return false;
		}else{
			this.callback = this.get_access_token;
			//刷新refresh_token 获取最新的access_token
			util.get("https://api.weixin.qq.com/sns/oauth2/refresh_token","appid=" + app_id + "&grant_type=refresh_token&refresh_token=" + refresh_token,this);
		}
		
	},
	onLogin(){
		var self = this;
		this.debug_label.string = "go into on login......";
		var size = cc.director.getVisibleSize();
		Servers.getLogin(g_user['player_id'],g_user['nickname'],g_user['gender'], function (data) {
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
});
