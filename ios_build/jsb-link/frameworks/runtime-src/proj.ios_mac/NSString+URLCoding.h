//
//  NSString+URLCoding.h
//  hello_world-mobile
//
//  Created by jiaxu on 2018/5/29.
//

#import <Foundation/Foundation.h>

@interface NSString (URLCoding)
// urlencode
- (NSString *)urlEncodedString;
// urldecode
- (NSString *)urlDecodeString;
// 截取字符串方法封装
- (NSString *)subStringFrom:(NSString *)startString to:(NSString *)endString;
/**
 *  截取URL中的参数
 *
 *  @return NSMutableDictionary parameters
 */
- (NSMutableDictionary *)getURLParameters;
@end
