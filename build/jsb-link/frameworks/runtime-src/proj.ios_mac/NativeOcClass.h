//
//  NativeOcClass.h
//  hello_world-mobile
//
//  Created by jiaxu on 2018/5/28.
//

#import <Foundation/Foundation.h>

@interface NativeOcClass : NSObject

@property (nonatomic,copy)NSString *wxCode;


+ (instancetype)sharedManager;
//跳转微信登录
+ (void)iOSLoginWithWX;
//获取token
+ (NSString *)getWXCode;
//获取APPID
+ (NSString *)getAppId;
//获取AppSecret
+ (NSString *)getAppSecret;
@end
