# hello-world
Hello world new project template.

构建原生应用
android端 修改如下：
	1，用android studio 打开 build\jsb-link\frameworks\runtime-src\proj.android-studio项目。
	2，在build.gradle 的dependencies  中加入 compile 'com.tencent.mm.opensdk:wechat-sdk-android-without-mta:+'
	3，在 AppActivity.java 中修改如下：
	    public static IWXAPI wxapi;
		private static final String APP_ID = "wx6c145967bc25e278";
		private static final String APP_SECRET = "58e5b95e019569937536d937d4f680f5";
		private static String WXCode = "null";
		@Override
		protected void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			// Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
			if (!isTaskRoot()) {
				// Android launched another instance of the root activity into an existing task
				//  so just quietly finish and go away, dropping the user back into the activity
				//  at the top of the stack (ie: the last state of this task)
				// Don't need to finish it again since it's finished in super.onCreate .
				return;
			}
			// DO OTHER INITIALIZATION BELOW
			// 注册到微信
			wxapi = WXAPIFactory.createWXAPI(this, APP_ID, true);
			wxapi.registerApp(APP_ID);
			SDKWrapper.getInstance().init(this);
		}

		// 登陆到微信
		public static void WxLogin() {
			Log.v("WeiChatLogin", "login-------------");
			final SendAuth.Req req = new SendAuth.Req();
			req.scope = "snsapi_userinfo";
			req.state = "weichat_sdk_demo";
			wxapi.sendReq(req);
		}
		public static String getAppId(){
			return APP_ID;
		}
		public static String getAppSecret(){
			return APP_SECRET;
		}
		public static String getWXCode(){
			return AppActivity.WXCode;
		}
		public static void setWXCode(String wxCode){
			AppActivity.WXCode = wxCode;
		}
	4，添加 org\cocos2d\enjoypuke\wxapi目录并创建WXEntryActivity.java 类。
	5，WXEntryActivity.java 内容如下：
	package org.cocos2d.enjoypuke.wxapi;
		import android.app.Activity;
		import android.content.Intent;
		import android.os.Bundle;
		import android.util.Log;
		import android.widget.Toast;

		import com.tencent.mm.opensdk.constants.ConstantsAPI;
		import com.tencent.mm.opensdk.modelbase.BaseReq;
		import com.tencent.mm.opensdk.modelbase.BaseResp;
		import com.tencent.mm.opensdk.modelmsg.SendAuth;
		import com.tencent.mm.opensdk.openapi.IWXAPI;
		import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
		import com.tencent.mm.opensdk.openapi.WXAPIFactory;

		import org.cocos2dx.javascript.AppActivity;


		public class WXEntryActivity extends Activity implements IWXAPIEventHandler {

			private IWXAPI api;
			@Override
			public void onCreate(Bundle savedInstanceState) {
				super.onCreate(savedInstanceState);
				//通过WXAPIFactory工厂获取IWXApI的示例
				api = WXAPIFactory.createWXAPI(this, AppActivity.getAppId(),true);
				//将应用的appid注册到微信
				api.registerApp(AppActivity.getAppId());

				//注意：
				//第三方开发者如果使用透明界面来实现WXEntryActivity，需要判断handleIntent的返回值，如果返回值为false，则说明入参不合法未被SDK处理，应finish当前透明界面，避免外部通过传递非法参数的Intent导致停留在透明界面，引起用户的疑惑
				try {
					boolean result =  api.handleIntent(getIntent(), this);
					if(!result){
						finish();
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				Log.v("WeiChatLogin","WXEntryActivity  onCreate ---------");
			}

			@Override
			public void onReq(BaseReq req) {
				// TODO Auto-generated method stub
				Log.v("WeiChatLogin", "onReq++++++++++++");
			}

			@Override
			public void onResp(BaseResp resp) {
				Log.v("WeiChatLogin", "onResp-------------");
				//Bundle bundle = new Bundle();
				switch (resp.errCode) {
					case BaseResp.ErrCode.ERR_OK:
						if (resp.getType() == ConstantsAPI.COMMAND_SENDAUTH)//登陆回调
						{
							Log.v("", "this is WXLogin callBack .... ");
							String code = ((SendAuth.Resp) resp).code; // 这里的code就是接入指南里要拿到的code
							AppActivity.setWXCode(code);
							//这里写获取到code之后的事件
						} else if (resp.getType() == ConstantsAPI.COMMAND_SENDMESSAGE_TO_WX)//分享回调
						{
							Log.v("", "this is share callBack .... ");
						}
						finish();//必须要有，用于点击返回游戏的时候不会留在微信
						break;
					case BaseResp.ErrCode.ERR_USER_CANCEL:
						Log.v("WeiChatLogin", "login----ERR_USER_CANCEL-");
						break;
					case BaseResp.ErrCode.ERR_AUTH_DENIED:
						Log.v("WeiChatLogin", "login----ERR_AUTH_DENIED-");
						break;
					default:
						Log.v("WeiChatLogin", "login--unknown---");
						break;

				}
			}

			@Override
			protected void onActivityResult(int requestCode, int resultCode, Intent data) {
				super.onActivityResult(requestCode, resultCode, data);
				api.handleIntent(data,this);
			}

			@Override
			protected void onNewIntent(Intent intent) {
				super.onNewIntent(intent);
				setIntent(intent);
				api.handleIntent(intent, this);
				finish();
			}

		}
	6，在AndroidManifest的application下添加上一步创建的activity
		<activity
				android:name=".wxapi.WXEntryActivity"
				android:exported="true"
				android:label="@string/app_name"/>
	7，添加签名文件。