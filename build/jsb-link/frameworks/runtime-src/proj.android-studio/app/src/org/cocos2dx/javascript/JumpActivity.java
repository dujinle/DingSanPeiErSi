package org.cocos2dx.javascript;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import org.cocos2dx.lib.Cocos2dxActivity;

public class JumpActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // TODO Auto-generated method stub
        super.onCreate(savedInstanceState);
        Log.d("JumpActivity","go into cocos JumpActivity......");
        //Intent intent = getIntent();//在这个Activity里，我们可以通过getIntent()，来获取外部跳转传过来的信息。
       // String data = intent.getDataString();//接收到网页传过来的数据：sharetest://data/http://www.huxiu.com/
       // String[] split = data.split("data/");//以data/切割data字符串
        /*
        url = split[1]; //就得到：http://www.huxiu.com/(这就是我们需要网页传给我们的数据)
        。。。然后我们再通过网页打开app的同时就可以用获得的url数据做一些我们需要做的处理
        比如你在微信里浏览网页时打开自己的安卓app应用的同时，加载一个app内的网页
        */
        Intent go_intent = new Intent(this, AppActivity.class);
        startActivity(go_intent);
        finish();
    }

}