var ThirdAPI = require('ThirdAPI');
var wxapi = require('wxapi');
cc.Class({
    extends: cc.Component,

    properties: {
		versionLabel:cc.Node,
		autoLoginFlag:false,
		buttonFlag:false,
		buttonLogin:cc.Node,
		buttonXieYi:cc.Node,
		loadUpdate:cc.Node,
		loadSources:cc.Node,
		xieYiKuangNode:cc.Node,
    },
	wxLogin(){
		cc.log("wxLogin");
		var self = this;
		this.buttonLogin.getComponent(cc.Button).interactable = false;
		this.buttonFlag = true;
		if(GlobalData.RunTimeParams.RootNode != null){
			GlobalData.RunTimeParams.RootNode.getComponent('root_node').play(GlobalData.AudioIdx.ClickButton);
		}
		if(cc.sys.os == cc.sys.OS_WINDOWS){
			this.onLogin();
		}else{
			var refresh_token = GlobalData.WXLoginParams.refresh_token;
			var app_id = wxapi.get_appid();
			if(refresh_token == null){
				wxapi.wx_login();
			}else{
				this.autoLoginFlag = true;
				cc.log("refresh_token:" + refresh_token + "app_id"  + app_id);
				wxapi.get_wx_ruinfo(app_id,refresh_token,function(result){
					cc.log("get_wxuser_info:" + JSON.stringify(result));
					if(result.openid != null){
						GlobalData.MyUserInfo['nickname'] = result.nickname;
						GlobalData.MyUserInfo['fangka'] = 0;
						GlobalData.MyUserInfo['gender'] = result.sex;
						GlobalData.MyUserInfo['player_id'] = result.unionid;
						GlobalData.MyUserInfo['headimgurl'] = result.headimgurl;
						self.onLogin();
					}else{
						util.show_error_info(result.errmsg);
						self.buttonLogin.getComponent(cc.Button).interactable = true;
						self.buttonFlag = false;
						self.autoLoginFlag = false;
					}
				});
			}
			
		}
	},
	update(){
		var self = this;
		this.versionLabel.getComponent("cc.Label").string = GlobalData.RunTimeParams.VersionNum;
		if(this.autoLoginFlag == false && this.buttonFlag == true){
			//刷新获取wx_code 然后进行用户信息获取
			var wx_code = wxapi.get_wx_code();
			var app_id = wxapi.get_appid();
			var app_secret = wxapi.get_app_secret();
			if(wx_code != null && wx_code != "null"){
				cc.log("update:" + app_id + " " + app_secret + " " + wx_code);
				this.autoLoginFlag = true;
				this.buttonFlag = false;
				wxapi.get_wx_uinfo(app_id,app_secret,wx_code,function(result){
					cc.log("get_wxuser_info:" + JSON.stringify(result));
					if(result.openid != null){
						GlobalData.MyUserInfo['nickname'] = result.nickname;
						GlobalData.MyUserInfo['fangka'] = 0;
						GlobalData.MyUserInfo['gender'] = result.sex;
						GlobalData.MyUserInfo['player_id'] = result.unionid;
						GlobalData.MyUserInfo['headimgurl'] = result.headimgurl;
						self.onLogin();
					}else{
						util.show_error_info(result.errmsg);
						self.buttonLogin.getComponent(cc.Button).interactable = true;
						self.autoLoginFlag = false;
					}
				});
			}
		}
	},
    onLoad () {
		ThirdAPI.loadLocalData();
		GlobalData.RunTimeParams.CurrentScene = GlobalData.SCENE_TAG.LOAD;
		GlobalData.RunTimeParams.RootNode = cc.director.getScene().getChildByName('RootNode');

		this.buttonFlag = false;
		this.autoLoginFlag = false;
		this.loadUpdate.active = true;
		this.loadSources.active = true;
		this.buttonLogin.getComponent(cc.Button).interactable = false;
		this.xieYiKuangNode.getComponent(cc.Button).interactable = false;
		this.buttonXieYi.getComponent(cc.Button).interactable = false;
		var self = this;
		var loadUpdateCom = this.loadUpdate.getComponent("LoadUpdateGame");
		var loadSourcesCom = this.loadSources.getComponent("LoadSources");
		loadUpdateCom.init(function(){
			console.log("onload update finish callback");
			self.loadUpdate.active = false;
			loadSourcesCom.onStart(function(){
				console.log("load sources finish callback");
				self.loadSources.active = false;
				self.onInitLogin();
			});
		});
	},
	onInitLogin(){
		var self = this;
		this.buttonFlag = false;
		this.autoLoginFlag = false;
		this.buttonLogin.getComponent(cc.Button).interactable = true;
		this.xieYiKuangNode.getComponent(cc.Button).interactable = true;
		this.buttonXieYi.getComponent(cc.Button).interactable = true;
	},
	onLogin(){
		var self = this;
		cc.log("go into on login......" + JSON.stringify(GlobalData.MyUserInfo));
		Servers.getLogin(
			GlobalData.MyUserInfo['player_id'],
			GlobalData.MyUserInfo['nickname'],
			GlobalData.MyUserInfo['gender'],
			GlobalData.MyUserInfo['headimgurl'],
			function (data) {
				cc.log("get login info succ:" + JSON.stringify(data));
				if(data.code != 200){
					self.buttonLogin.getComponent(cc.Button).interactable = true;
					self.buttonFlag = false;
					self.autoLoginFlag = false;
					return;
				}
				var token = data.token;
				Servers.getEntry(token,function(data){
					if(data.code == 200){
						self.saveUserInfo(data.player);
					}else{
						self.buttonLogin.getComponent(cc.Button).interactable = true;
						self.buttonFlag = false;
						self.autoLoginFlag = false;
					}
				});
			}
		);
	},
	saveUserInfo(data){
		for(var key in data) {
			GlobalData.MyUserInfo[key] = data[key];
        }
		GlobalData.RunTimeParams.IsLogin = true;
		cc.director.loadScene("MainScene");
	},
	switchXieYi(event){
		var choice = this.xieYiKuangNode.getChildByName('choiced');
		if(choice.active == true){
			choice.active = false;
			this.buttonLogin.getComponent(cc.Button).interactable = false;
		}else{
			choice.active = true;
			this.buttonLogin.getComponent(cc.Button).interactable = true;
		}
	},
	pop_user_xieyi(){
		var size = cc.winSize;
		this.pop_xieyi = cc.instantiate(GlobalData.assets["PopXieyiScene"]);
		var x = size.width/2;
		var y = size.height/2;
		this.node.addChild(this.pop_xieyi);
		this.pop_xieyi.setPosition(this.node.convertToNodeSpaceAR(cc.v2(x,y)));
	},
});
