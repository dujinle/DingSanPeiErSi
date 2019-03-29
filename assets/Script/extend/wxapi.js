/**
 * Created by WTF Wei on 2016/4/21.
 * Function :
 */
var ThirdAPI = require('ThirdAPI');
var wxapi = wxapi || {};

wxapi.wx_login = function(){
	if(cc.sys.os == cc.sys.OS_ANDROID){
		jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "WxLogin", "()V");
	}else if(cc.sys.os == cc.sys.OS_IOS){
		jsb.reflection.callStaticMethod("NativeOcClass", "iOSLoginWithWX");
	}
}

wxapi.get_appid = function(){
	var app_id = null;
	if(cc.sys.os == cc.sys.OS_ANDROID){
		app_id = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAppId", "()Ljava/lang/String;");
	}else if(cc.sys.os == cc.sys.OS_IOS){
		app_id = jsb.reflection.callStaticMethod("NativeOcClass", "getAppId");
	}
	return app_id;
}

wxapi.get_app_secret = function(){
	var app_secret = null;
	if(cc.sys.os == cc.sys.OS_ANDROID){
		app_secret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAppSecret", "()Ljava/lang/String;");
	}else if(cc.sys.os == cc.sys.OS_IOS){
		app_secret = jsb.reflection.callStaticMethod("NativeOcClass", "getAppSecret");
	}
	return app_secret;
}

wxapi.get_wx_code = function(){
	var wx_code = null;
	if(cc.sys.os == cc.sys.OS_ANDROID){
		wx_code = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getWXCode", "()Ljava/lang/String;");
	}else if(cc.sys.os == cc.sys.OS_IOS){
		wx_code = jsb.reflection.callStaticMethod("NativeOcClass", "getWXCode");
	}
	return wx_code;
}

wxapi.get_wx_uinfo = function(app_id,app_secret,wx_code,cb){
	var url = "https://api.weixin.qq.com/sns/oauth2/access_token";
	var param = "appid=" + app_id + "&secret=" + app_secret + "&code=" + wx_code + "&grant_type=authorization_code";
	util.http_get(url,param,function(err,result){
		if(err != null){
			cb({"errcode":-1,"errmsg":"未知的登陆错误"});
		}else if(result.errcode != null){
			cb(result);
		}else{
			/*保存信息下次直接登录不用授权*/
			GlobalData.WXLoginParams["access_token"] = result.access_token;
			GlobalData.WXLoginParams["openid"] = result.openid;
			GlobalData.WXLoginParams["unionid"] = result.unionid;
			GlobalData.WXLoginParams["refresh_token"] = result.refresh_token;
			ThirdAPI.updateLocalData();
			url = "https://api.weixin.qq.com/sns/userinfo";
			param = "access_token=" + result.access_token + "&openid=" + result.openid;
			util.http_get(url,param,function(err,result){
				if(err != null){
					cb({"errcode":-1,"errmsg":"未知的登陆错误"});
				}else if(result.errcode != null){
					cb(result);
				}else{
					cb(result);
				}
			});
		}
	});
}
//刷新token 继续微信登录获取信息
wxapi.get_wx_ruinfo = function(app_id,refresh_token,cb){
	var url = "https://api.weixin.qq.com/sns/oauth2/refresh_token";
	var param = "appid=" + app_id + "&grant_type=refresh_token&refresh_token=" + refresh_token;
	util.http_get(url,param,function(err,result){
		if(err != null){
			cb({"errcode":-1,"errmsg":"未知的登陆错误"});
		}else if(result.errcode != null){
			cb(result);
		}else{
			/*保存信息下次直接登录不用授权*/
			GlobalData.WXLoginParams["access_token"] = result.access_token;
			GlobalData.WXLoginParams["openid"] = result.openid;
			GlobalData.WXLoginParams["unionid"] = result.unionid;
			GlobalData.WXLoginParams["refresh_token"] = result.refresh_token;
			ThirdAPI.updateLocalData();
			url = "https://api.weixin.qq.com/sns/userinfo";
			param = "access_token=" + result.access_token + "&openid=" + result.openid;
			util.http_get(url,param,function(err,result){
				if(err != null){
					cb({"errcode":-1,"errmsg":"未知的登陆错误"});
				}else if(result.errcode != null){
					cb(result);
				}else{
					cb(result);
				}
			});
		}
	});
}

wxapi.get_jsb_login_type = function(){
	var login_type = 0;
	if(cc.sys.os == cc.sys.OS_ANDROID){
		login_type = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getLoginType", "()I");
	}else if(cc.sys.os == cc.sys.OS_IOS){
		login_type = jsb.reflection.callStaticMethod("NativeOcClass", "getLoginType");
	}
	return login_type;
}

wxapi.get_jsb_room_num = function(){
	var room_num = null;
	if(cc.sys.os == cc.sys.OS_ANDROID){
		room_num = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getRoomNum", "()Ljava/lang/String;");
	}else if(cc.sys.os == cc.sys.OS_IOS){
		room_num = jsb.reflection.callStaticMethod("NativeOcClass", "getRoomNum");
	}
	return room_num;
}

wxapi.get_jsb_scene = function(){
	var scene = null;
	if(cc.sys.os == cc.sys.OS_ANDROID){
		scene = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getScene", "()Ljava/lang/String;");
	}else if(cc.sys.os == cc.sys.OS_IOS){
		scene = jsb.reflection.callStaticMethod("NativeOcClass", "getScene");
	}
	return scene;
}

wxapi.get_jsb_rid = function(){
	var rid = null;
	if(cc.sys.os == cc.sys.OS_ANDROID){
		rid = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getRid", "()Ljava/lang/String;");
	}else if(cc.sys.os == cc.sys.OS_IOS){
		rid = jsb.reflection.callStaticMethod("NativeOcClass", "getRid");
	}
	return rid;
}

wxapi.set_load_status = function(status){
	if (cc.sys.os == cc.sys.OS_ANDROID) {
		jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "setLoadStatus", "(I)V",status);
	}else if(cc.sys.os == cc.sys.OS_IOS){
		jsb.reflection.callStaticMethod("NativeOcClass", "setLoadStatus:",status);
	}
}
module.exports = wxapi;