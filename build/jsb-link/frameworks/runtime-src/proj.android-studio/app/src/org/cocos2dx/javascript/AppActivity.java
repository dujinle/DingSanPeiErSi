/****************************************************************************
 Copyright (c) 2015 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
package org.cocos2dx.javascript;

import org.cocos2d.enjoypuke.R;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import org.cocos2dx.javascript.SDKWrapper;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

public class AppActivity extends Cocos2dxActivity {

    public static IWXAPI wxapi;
    private static final String APP_ID = "wx6c145967bc25e278";
    private static final String APP_SECRET = "58e5b95e019569937536d937d4f680f5";
    private static String WXCode = "null";
    //保存跳转过来的信息用于界面直接跳转
    private static int loginType = 0;
    private static String roomNum = "null";
    private static String scene = "null";
    private static String  rid = "null";

    private static int mTargetScene = SendMessageToWX.Req.WXSceneSession;
    private static final int THUMB_SIZE = 150;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 注册到微信
        Log.i("enjoypuke","start go into appactivity.................");
        if (!isTaskRoot()) {
            Log.i("enjoypuke","start go into appactivity. not root task................");
            return;
        }
        try {
           // SDKWrapper.getInstance().init(this);
            if (wxapi == null) {
                wxapi = WXAPIFactory.createWXAPI(this, APP_ID, true);
                wxapi.registerApp(APP_ID);
            }
            Uri data = getIntent().getData();
            if(data != null) {
                scene = data.getQueryParameter("scene");
                roomNum = data.getQueryParameter("room_num");
                rid = data.getQueryParameter("rid");
                Log.i("enjoypuke","get data: " + roomNum + " " + scene + " " + rid);
                if(scene != null && roomNum != null && rid != null) {
                    loginType = 1;
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }

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
    public static String getRoomNum(){
        return roomNum;
    }
    public static String getScene(){
        return scene;
    }
    public static String getRid(){
        return rid;
    }
    public static int getLoginType(){
        return loginType;
    }

    public static void WxShare(String rnum,String name,int rid){
        if(wxapi.getWXAppSupportAPI() >= 0x21020001){
            WXWebpageObject webpage = new WXWebpageObject();
            webpage.webpageUrl = "http://193.112.243.189:8000/open_app?room_num=" + rnum + "&name=" + name + "&rid=" + rid;
            WXMediaMessage msg = new WXMediaMessage(webpage);
            msg.title = "点击链接进入房间";
            msg.description = "房间号：" + rnum;
            Bitmap bmp = BitmapFactory.decodeResource(AppActivity.getContext().getResources(), R.drawable.send_music_thumb);
            Bitmap thumbBmp = Bitmap.createScaledBitmap(bmp, THUMB_SIZE, THUMB_SIZE, true);
            bmp.recycle();
            msg.thumbData = Util.bmpToByteArray(thumbBmp, true);

            SendMessageToWX.Req req = new SendMessageToWX.Req();
            req.transaction = buildTransaction("webpage");
            req.message = msg;
            req.scene = mTargetScene;
            wxapi.sendReq(req);
        }else{
            Toast.makeText(AppActivity.getContext(), "微信版本过低", Toast.LENGTH_SHORT).show();
        }
    }
    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);

    //    SDKWrapper.getInstance().setGLSurfaceView(glSurfaceView);

        return glSurfaceView;
    }

    @Override
    protected void onResume() {
        super.onResume();
     //   SDKWrapper.getInstance().onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
    //    SDKWrapper.getInstance().onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
       // SDKWrapper.getInstance().onDestroy();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
      //  SDKWrapper.getInstance().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        SDKWrapper.getInstance().onNewIntent(intent);
        setIntent(intent);
        //接受跳转过来的参数信息
        Uri data = getIntent().getData();
        if(data != null) {
            scene = data.getQueryParameter("scene");
            roomNum = data.getQueryParameter("room_num");
            rid = data.getQueryParameter("rid");
            Log.i("enjoypuke","get data: " + roomNum + " " + scene + " " + rid);
            if(scene != null && roomNum != null && rid != null) {
                callJavaScriptEnterRoom(roomNum,rid);
            }
        }
    }


    public void callJavaScriptEnterRoom(String room_num,String rid){
        final String jsCallStr = String.format("onGameEnterRoom(\"%s\",\"%s\");", room_num,rid);
        // call JS method, must be in GL thread
        AppActivity.this.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Log.d("runOnGLThread", "runOnGLThread: jsCallStr == " + jsCallStr);
                Cocos2dxJavascriptJavaBridge.evalString(jsCallStr);
            }
        });
    }

    @Override
    protected void onRestart() {
        super.onRestart();
       // SDKWrapper.getInstance().onRestart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        //SDKWrapper.getInstance().onStop();
    }

    @Override
    public void onBackPressed() {
       // SDKWrapper.getInstance().onBackPressed();
        super.onBackPressed();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
      //  SDKWrapper.getInstance().onConfigurationChanged(newConfig);
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
       // SDKWrapper.getInstance().onRestoreInstanceState(savedInstanceState);
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
       // SDKWrapper.getInstance().onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onStart() {
      //  SDKWrapper.getInstance().onStart();
        super.onStart();
    }
    private static String buildTransaction(final String type) {
        return (type == null) ? String.valueOf(System.currentTimeMillis())
                : type + System.currentTimeMillis();
    }
}
