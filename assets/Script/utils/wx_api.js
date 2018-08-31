/**
 * Created by WTF Wei on 2016/4/21.
 * Function :
 */
var wxapi = wxapi || {};

wxapi.wx_login(){
	if(g_current_os == cc.sys.OS_ANDROID){
		jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "WxLogin", "()V");
	}else if(g_current_os == cc.sys.OS_IOS){
		jsb.reflection.callStaticMethod("NativeOcClass", "iOSLoginWithWX");
	}
};

wxapi.get_appid(){
	var app_id = null;
	if(g_current_os == cc.sys.OS_ANDROID){
		app_id = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAppId", "()Ljava/lang/String;");
	}else if(g_current_os == cc.sys.OS_IOS){
		app_id = jsb.reflection.callStaticMethod("NativeOcClass", "getAppId");
	}
	return app_id;
};

wxapi.get_app_secret(){
	var app_secret = null;
	if(g_current_os == cc.sys.OS_ANDROID){
		app_secret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAppSecret", "()Ljava/lang/String;");
	}else if(g_current_os == cc.sys.OS_IOS){
		app_secret = jsb.reflection.callStaticMethod("NativeOcClass", "getAppSecret");
	}
	return app_secret;
};

wxapi.get_wx_code(){
	var wx_code = null;
	if(g_current_os == cc.sys.OS_ANDROID){
		wx_code = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getWXCode", "()Ljava/lang/String;");
	}else if(g_current_os == cc.sys.OS_IOS){
		wx_code = jsb.reflection.callStaticMethod("NativeOcClass", "getWXCode");
	}
	return wx_code;
};