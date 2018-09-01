cc.Class({
    extends: cc.Component,

    properties: {
		version_label:cc.Node,
		login_flag:false,
		button_login:cc.Node,
		load_update:cc.Node,
    },
	wxLogin(){
		cc.log("wxLogin");
		this.button_login.getComponent("cc.Button").interactable = false;
		wxapi.wx_login();
	},
	update(){
		var self = this;
		this.version_label.getComponent("cc.Label").string = g_version;
		if(g_login_auto == true){
			//这里就要自动进行登录操作
			this.wxLogin();
			g_login_auto = false;
		}
		//刷新获取wx_code 然后进行用户信息获取
		var wx_code = wxapi.get_wx_code();
		var app_id = wxapi.get_appid();
		var app_secret = wxapi.get_app_secret();
		if(this.login_flag == false){
			if(wx_code != null && wx_code != "null"){
				this.login_flag = true;
				wxapi.get_wx_uinfo(app_id,app_secret,wx_code,function(result){
					cc.log("get_wxuser_info:" + JSON.stringify(result));
					if(result.openid != null){
						g_user['nickname'] = result.nickname;
						g_user['fangka'] = 0;
						g_user['gender'] = result.sex;
						g_user['player_id'] = result.unionid;
						g_user['headimgurl'] = result.headimgurl;
						self.onLogin();
					}else{
						util.show_error_info(result.errmsg);
					}
				});
			}else{
				this.login_flag = false;
			}
		}
	},
    onLoad () {
		g_current_os = cc.sys.os;
		g_current_scene = SCENE_TAG.LOAD;
		var self = this;
		this.xieyi_select = true;
    	cc.log("onLoad" + this.login_flag);
		this.version_label.getComponent("cc.Label").string = g_version;
		self.node.on("pressed", self.switchRadio, self);
		var load_update_com = this.load_update.getComponent("LoadUpdateGame");
		load_update_com.init(function(){
			self.onInitLogin();
		});
	},
	onInitLogin(){
		var self = this;
		this.button_login.getComponent("cc.Button").interactable = false;
		if(cc.sys.os == cc.sys.OS_WINDOWS){
			this.button_login.getComponent("cc.Button").interactable = true;
		}else if(cc.sys.isNative){
			this.login_flag = false;
			var refresh_token = Storage.getData("refresh_token");
			var app_id = Storage.getData("app_id");
			if(refresh_token == null){
				this.button_login.getComponent("cc.Button").interactable = true;
				this.wxLogin();
			}else{
				wxapi.get_wx_uinfo(app_id,refresh_token,function(result){
					cc.log("get_wxuser_info:" + JSON.stringify(result));
					if(result.openid != null){
						g_user['nickname'] = result.nickname;
						g_user['fangka'] = 0;
						g_user['gender'] = result.sex;
						g_user['player_id'] = result.unionid;
						g_user['headimgurl'] = result.headimgurl;
						self.onLogin();
					}else{
						util.show_error_info(result.errmsg);
					}
				});
			}
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
		g_is_login = true;
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
		}else if(cc.sys.os == cc.sys.OS_IOS){
			login_type = jsb.reflection.callStaticMethod("NativeOcClass", "getLoginType");
			if(login_type == 1){
				var room_num = jsb.reflection.callStaticMethod("NativeOcClass", "getRoomNum");
				var scene = jsb.reflection.callStaticMethod("NativeOcClass", "getScene");
				var rid = jsb.reflection.callStaticMethod("NativeOcClass", "getRid");
				onGameEnterRoom(room_num,rid);
			}else{
				cc.director.loadScene("MainScene");
			}
		}else{
			cc.director.loadScene("MainScene");
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
