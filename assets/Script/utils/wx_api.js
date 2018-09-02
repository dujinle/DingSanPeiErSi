/**
 * Created by WTF Wei on 2016/4/21.
 * Function :
 */
var wxapi = wxapi || {};

wxapi.wx_login = function(){
	if(g_current_os == cc.sys.OS_ANDROID){
		jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "WxLogin", "()V");
	}else if(g_current_os == cc.sys.OS_IOS){
		jsb.reflection.callStaticMethod("NativeOcClass", "iOSLoginWithWX");
	}
}

wxapi.get_appid = function(){
	var app_id = null;
	if(g_current_os == cc.sys.OS_ANDROID){
		app_id = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAppId", "()Ljava/lang/String;");
	}else if(g_current_os == cc.sys.OS_IOS){
		app_id = jsb.reflection.callStaticMethod("NativeOcClass", "getAppId");
	}
	return app_id;
}

wxapi.get_app_secret = function(){
	var app_secret = null;
	if(g_current_os == cc.sys.OS_ANDROID){
		app_secret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAppSecret", "()Ljava/lang/String;");
	}else if(g_current_os == cc.sys.OS_IOS){
		app_secret = jsb.reflection.callStaticMethod("NativeOcClass", "getAppSecret");
	}
	return app_secret;
}

wxapi.get_wx_code = function(){
	var wx_code = null;
	if(g_current_os == cc.sys.OS_ANDROID){
		wx_code = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getWXCode", "()Ljava/lang/String;");
	}else if(g_current_os == cc.sys.OS_IOS){
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
			Storage.setData("access_token",result.access_token);
			Storage.setData("openid",result.openid);
			Storage.setData("unionid",result.unionid);
			Storage.setData("refresh_token",result.refresh_token);
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
			Storage.setData("access_token",result.access_token);
			Storage.setData("openid",result.openid);
			Storage.setData("unionid",result.unionid);
			Storage.setData("refresh_token",result.refresh_token);
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