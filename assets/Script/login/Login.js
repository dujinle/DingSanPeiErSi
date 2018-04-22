cc.Class({
    extends: cc.Component,

    properties: {
		version_label:cc.Node,
		login_flag:false,
		debug_label:cc.Label,
		callback:null,
    },
	onLogin(){
		var self = this;
		var size = cc.director.getVisibleSize();
		/*
		cc.log("onLogin",self.telephone,self.password);
		if(self.telephone == null || self.password == null){
			self.tip_label.string = "用户名密码不能为空";
			return ;
		}
		if(self.telephone == "" || self.password == ""){
			self.tip_label.string = "用户名密码不能为空";
			return ;
		}
		Servers.getLogin(self.telephone, self.password, function (data) {
			console.log("get login info succ:" + JSON.stringify(data));
			if(data.code != 200){
				self.tip_label.string = data.msg;
				return;
			}
			var token = data.token;
			Servers.getEntry(token,function(data){
				self.saveUserInfo(data);
			});
		});
		*/
	},
	saveUserInfo(data){
		g_user = data.initdata.player;
		Storage.setPhoneNumber(g_user.phone_num);
        Storage.setPassword(g_user.password);
		Storage.setLoginType(this.login_type);
		Storage.setAutoLoginFlag(this.auto_login);
		Storage.setPasswordFlag(this.retain_pwd);
        console.log("start saveUserInfo......"+ JSON.stringify(g_user));
		cc.director.loadScene("MainScene");
    },
	wxLogin(){
		cc.log("wxLogin");
		this.debug_label.string = "wxLogin.......";
		//util.get("https://www.baidu.com",null,this.get_access_token);
		jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "WxLogin", "()V");
		//cc.director.loadScene("MainScene");
		this.login_flag = true;
	},
	update(){
		cc.log("update" + this.login_flag);
		if(this.login_flag == true){
			this.login_flag = false;
			var size = cc.director.getVisibleSize();
			var app_id = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAppId", "()Ljava/lang/String;");
			var app_secret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAppSecret", "()Ljava/lang/String;");
			var wx_code = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getWXCode", "()Ljava/lang/String;");
			this.debug_label.string = "appid:" + app_id + " app_secret:" + app_secret + " wx_code:" + wx_code;

			if(wx_code != null && wx_code != "null"){
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
			this.callback = this.get_wxuser_info;
			util.get("https://api.weixin.qq.com/sns/userinfo","access_token=" + data.access_token + "&openid=" + data.openid,this);
		}
	},
	get_wxuser_info(data){
		cc.log("get_wxuser_info:" + JSON.stringify(data));
		this.debug_label.string = "get_wxuser_info:" + JSON.stringify(data);
	},
    onLoad () {
    	cc.log("onLoad" + this.login_flag);
    	this.login_flag = false;
    	/*
		this.login_type = Storage.getLoginType();
		if(this.login_type == "weixin"){
			this.onLogin();
		}
		*/
	},
});
