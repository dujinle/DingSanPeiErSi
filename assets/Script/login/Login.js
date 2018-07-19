cc.Class({
    extends: cc.Component,

    properties: {
		version_label:cc.Node,
		login_flag:false,
		button_login:cc.Node,
		load_update:cc.Node,
		callback:null,
		wx_code:null,
		app_id:"wx6c145967bc25e278",
		app_secret:"58e5b95e019569937536d937d4f680f5",
    },
	wxLogin(){
		cc.log("wxLogin");
		var self = this;
		this.button_login.getComponent("cc.Button").interactable = false;
		wx.login({
      		success: function(res) {
        		if (res.code) {
        			self.wx_code = res.code;
        			this.login_flag == true;
          		}
          	}
    	});
	},
	update(){
		this.version_label.getComponent("cc.Label").string = g_version;
		if(this.login_flag == true){
			this.login_flag = false;
			var app_id = this.app_id;
			var app_secret = this.app_secret;
			var wx_code = this.wx_code;

			if(wx_code != null && wx_code != "null"){
				Storage.setData("app_id",app_id);
				Storage.setData("app_secret",app_secret);
				this.callback = this.get_access_token;
				util.get("https://api.weixin.qq.com/sns/oauth2/access_token",
					"appid=" + app_id + "&secret=" + app_secret + "&code=" + wx_code + "&grant_type=authorization_code",this);
			}else{
				this.login_flag = true;
			}
		}
	},
	get_access_token(data){
		cc.log("get_access_token:" + data);
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
			g_user['nickname'] = data.nickname;
			g_user['fangka'] = 0;
			g_user['gender'] = data.sex;
			g_user['player_id'] = data.unionid;
			g_user['headimgurl'] = data.headimgurl;
			this.onLogin();
		}else{
			this.error_code(data);
		}
	},
    onLoad () {
		var self = this;
		this.xieyi_select = true;
		g_current_scene = SCENE_TAG.LOAD;
    	cc.log("onLoad" + this.login_flag);
		this.version_label.getComponent("cc.Label").string = g_version;
		self.node.on("pressed", self.switchRadio, self);
		var load_update_com = this.load_update.getComponent("LoadUpdateGame");
		load_update_com.init(function(){
			self.onInitLogin();
		});
	},
	onInitLogin(){
		this.button_login.getComponent("cc.Button").interactable = false;
		this.login_flag = false;
		var refresh_token = Storage.getData("refresh_token");
		var app_id = Storage.getData("app_id");
		if(refresh_token == null){
			this.button_login.getComponent("cc.Button").interactable = true;
			return false;
		}else{
			this.callback = this.get_access_token;
			//刷新refresh_token 获取最新的access_token
			util.get("https://api.weixin.qq.com/sns/oauth2/refresh_token","appid=" + app_id + "&grant_type=refresh_token&refresh_token=" + refresh_token,this);
		}
	},
	onLogin(){
		var self = this;
		cc.log("go into on login......" + JSON.stringify(g_user));
		Servers.getLogin(g_user['player_id'],g_user['nickname'],g_user['gender'],g_user['headimgurl'], function (data) {
			console.log("get login info succ:" + JSON.stringify(data));
			if(data.code != 200){
				return;
			}
			var token = data.token;
			Servers.getEntry(token,function(data){
				if(data.code == 200){
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
