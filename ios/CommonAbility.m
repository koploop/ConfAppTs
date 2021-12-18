//
//  CommonAbility.m
//  ConfAppTs
//
//  Created by lvhan on 2021/12/14.
//

#import "CommonAbility.h"
#import <React/RCTLog.h>

#import <HKCommonCmp/HKCommonCmp.h>

@implementation CommonAbility
RCT_EXPORT_MODULE();

// 导出静态常量(注意:仅在初始化时导出一次,运行期间改变不会影响JS侧的结果)
- (NSDictionary *)constantsToExport {
  NSString *deviceType = HK_IS_IPAD ? @"iPad" : @"iPhone";
  NSString *uid = [HKEncryption getUUIDByKeyChain];
  return @{
    @"deviceType": deviceType,
    @"uuid": uid,
  };
}

// 重写constantsToExport后需要实现该方法
+ (BOOL)requiresMainQueueSetup {
  return NO; // only do this if your module initialization relies on calling UIKit!
}

// 设备类型
RCT_EXPORT_METHOD(getRandomStrWithPbKey:(NSString *)pbKey
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *uuid = [HKEncryption getUUIDByKeyChain];
  NSString *randomStr = [HKEncryption encrypt:uuid PublicKey:pbKey];
  
  if (!isStringWithAnyText(randomStr)) {
    if (reject) { reject(@"400", @"getRandomStr faild!", nil); }
  } else {
    if (resolve) { resolve(randomStr); }
  }
}

@end
