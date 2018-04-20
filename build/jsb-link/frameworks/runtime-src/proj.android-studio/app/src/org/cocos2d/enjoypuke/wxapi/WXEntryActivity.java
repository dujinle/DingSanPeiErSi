package org.cocos2d.enjoypuke.wxapi;


import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.javascript.Config;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import cz.msebera.android.httpclient.client.ClientProtocolException;

import static android.content.ContentValues.TAG;


public class WXEntryActivity extends Activity implements IWXAPIEventHandler {
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        AppActivity.wxApi.handleIntent(this.getIntent(),this);
    }
    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        AppActivity.wxApi.handleIntent(intent, this);
    }

    private Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case Config.RETURN_OPENID_ACCESSTOKEN:
                    Bundle bundle1 = (Bundle) msg.obj;
                    String accessToken = bundle1.getString("access_token");
                    String openId = bundle1.getString("open_id");

                    //getUID(openId, accessToken);
                    break;

                case Config.RETURN_NICKNAME_UID:
                    Bundle bundle2 = (Bundle) msg.obj;
                    String nickname = bundle2.getString("nickname");
                    String uid = bundle2.getString("unionid");
                    // textView.setText("uid:" + uid);
                    // loginBtn.setText("昵称：" + nickname);
                    break;
                default:
                    break;
            }
        };
    };

    private void getWeiXinAccessToken(final String code){
        /*
        new Thread() {// 开启工作线程进行网络请求
            public void run() {
                String path = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + Config.APP_ID +
                        "&secret=" + Config.APP_SECRET +
                        "&code=" + code +
                        "&grant_type=authorization_code";
                try {
                    JSONObject jsonObject = JsonUtils.initSSLWithHttpClinet(path);// 请求https连接并得到json结果
                    if (null != jsonObject) {
                        String openid = jsonObject.getString("openid").toString().trim();
                        String access_token = jsonObject.getString("access_token").toString().trim();
                        Log.i(TAG, "openid = " + openid);
                        Log.i(TAG, "access_token = " + access_token);
                        Message msg = handler.obtainMessage();
                        msg.what = Config.RETURN_OPENID_ACCESSTOKEN;
                        Bundle bundle = new Bundle();
                        bundle.putString("openid", openid);
                        bundle.putString("access_token", access_token);
                        msg.obj = bundle;
                        handler.sendMessage(msg);
                    }
                } catch (ClientProtocolException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                return;
            };
        }.start();
        */
    }
    @Override
    public void onReq(BaseReq req) {
        Log.v("WeiChatLogin", "onReq++++++++++++");
    }
    @Override
    public void onResp(BaseResp resp) {
        Log.v("WeiChatLogin", "onResp-------------");
        switch (resp.errCode) {
            case BaseResp.ErrCode.ERR_OK:
                if (resp.getType() == ConstantsAPI.COMMAND_SENDAUTH) {
                    //登陆回调
                    Log.v("", "this is WXLogin callBack .... ");
                    String code = ((SendAuth.Resp) resp).code; // 这里的code就是接入指南里要拿到的code
                    //这里写获取到code之后的事件
                } else if (resp.getType() == ConstantsAPI.COMMAND_SENDMESSAGE_TO_WX) {
                    //分享回调
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
        finish();
    }

    /*
    private void getResult(final String code) {
        new Thread() {// 开启工作线程进行网络请求
            public void run() {
                String path = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="
                        + APP_ID //这里替换成你的appid
                        + "&secret="
                        + APP_SECRET //这里替换成你的appsecret
                        + "&code="
                        + code
                        + "&grant_type=authorization_code";
                try {
                    JSONObject jsonObject = JsonUtils
                            .initSSLWithHttpClinet(path);// 请求https连接并得到json结果
                    if (null != jsonObject) {
                        String openid = jsonObject.getString("openid")
                                .toString().trim();
                        String access_token = jsonObject
                                .getString("access_token").toString().trim();
                        Log.i(TAG, "openid = " + openid);
                        Log.i(TAG, "access_token = " + access_token);

                        Message msg = handler.obtainMessage();
                        msg.what = RETURN_OPENID_ACCESSTOKEN;
                        Bundle bundle = new Bundle();
                        bundle.putString("openid", openid);
                        bundle.putString("access_token", access_token);
                        msg.obj = bundle;
                        handler.sendMessage(msg);
                    }
                } catch (ClientProtocolException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                return;
            };
        }.start();
    }
    */
}