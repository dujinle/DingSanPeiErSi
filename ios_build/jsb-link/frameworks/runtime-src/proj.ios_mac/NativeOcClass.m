//
//  NativeOcClass.m
//  hello_world-mobile
//
//  Created by jiaxu on 2018/5/28.
//

#import "NativeOcClass.h"
#import "WXApi.h"
static NSString const * kbaseShareUrl = @"http://www.enjoymygame.com/open_app";
@implementation NativeOcClass

+(instancetype)sharedManager {
    static dispatch_once_t onceToken;
    static NativeOcClass *instance;
    dispatch_once(&onceToken, ^{
        instance = [[NativeOcClass alloc] init];
        instance.LoginType = 0;
    });
    return instance;
}

+(void)iOSLoginWithWX{
	if ([WXApi isWXAppInstalled] && [WXApi isWXAppSupportApi]) {
		SendAuthReq *req = [[[SendAuthReq alloc]init] autorelease];
		req.scope = @"snsapi_userinfo";
		req.state = @"123";
    
		[WXApi sendReq:req];
	}
}

+(void)WxShare:(NSString*)roomNum masterName:(NSString*)name roomId:(NSString*)rid{
	if ([WXApi isWXAppInstalled] && [WXApi isWXAppSupportApi]) {
		WXMediaMessage * message = [WXMediaMessage message];
		//init title
		message.title = @"点击链接进入房间";
        NSString* roomLabel = @"房间号:";
        message.description = [NSString stringWithFormat:@"%@%@",roomLabel,roomNum];
		//init image
		[message setThumbImage:[UIImage imageNamed:@"send_music_thumb"]];
		//init url
		WXWebpageObject * webpageObject = [WXWebpageObject object];
        
        webpageObject.webpageUrl = [NSString stringWithFormat:@"%@?room_num=%@&name=%@&rid=%@",kbaseShareUrl,roomNum,name,rid];
		message.mediaObject = webpageObject;
        
		SendMessageToWXReq * req = [[SendMessageToWXReq alloc] init];
		req.bText = NO;
		req.message = message;
		req.scene = WXSceneSession;
		
		[WXApi sendReq:req];
	}
}

+(void)setLoadStatus:(int) LoadStatus{
	[NativeOcClass sharedManager].LoadStatus = LoadStatus;
}

+(NSString *)getWXCode{   
    return [NativeOcClass sharedManager].wxCode;
}
+(NSString *)getAppId{ 
    return @"wx6c145967bc25e278";
}
+(NSString *)getAppSecret{
    return @"58e5b95e019569937536d937d4f680f5";
}
+(int)getLoginType{
    return [NativeOcClass sharedManager].LoginType;
}
+(NSString *)getRoomNum{
    return [NativeOcClass sharedManager].roomNum;
}
+(NSString *)getScene{
    return [NativeOcClass sharedManager].scene;
}
+(NSString *)getRid{
    return [NativeOcClass sharedManager].rid;
}
+(int)getNetType{
    return [NativeOcClass sharedManager].NetType;
}
+(void)copy:(NSString *)str{
    UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
    pasteboard.string = str;
}
@end
