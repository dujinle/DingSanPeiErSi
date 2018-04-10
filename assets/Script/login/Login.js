cc.Class({
    extends: cc.Component,

    properties: {
		version_label:cc.Node,
		login_type:null,
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
		this.testUser();
		this.login_type = "weixin";
		cc.director.loadScene("MainScene");
	},
    onLoad () {
		this.login_type = Storage.getLoginType();
		if(this.login_type == "weixin"){
			this.onLogin();
		}
	},
	testUser(){
		g_user = {
			'nickName':'dujinle',
			'fangka':10,
			'diamond':10,
			'gender':1
		};
	},
});