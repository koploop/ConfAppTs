//
//  EncryptAbility.m
//  ConfAppTs
//
//  Created by lvhan on 2021/12/8.
//

#import "EncryptAbility.h"
#import <React/RCTLog.h>

#import <HKCommonCmp/HKCommonCmp.h>

@implementation EncryptAbility

/* 导出模块
 * 也可以用这个宏重命名JS中访问的模块名字:
 * RCT_EXPORT_MODULE(EncryptManager);
 * 如果类名以 RCT 开头，则 JavaScript 端引入的模块名会自动移除这个前缀。
 */
RCT_EXPORT_MODULE();

/* 导出方法
 * React Native 的桥接操作是异步的
 * 桥接到 JavaScript 的方法返回值类型必须是void
 * 导出到 JavaScript 的方法名是 Objective-C 的方法名的第一个部分。
 * 可以使用 RCT_REMAP_METHOD 重命名 JS 端导入的方法,避免JS端引入时的冲突
 */
RCT_EXPORT_METHOD(setupCppSDK)
{
  RCTLogInfo(@"Call setupCppSDK !");
}

// 使用RCT_REMAP_METHOD避免和上一个导出的方法重复
RCT_REMAP_METHOD(setupCppSDK2, setupCppSDK:(NSString *)props)
{
  RCTLogInfo(@"Call setupCppSDK2 !");
}

//// 获取UUID
//RCT_EXPORT_METHOD(getDeviceUIDWithResolver:(RCTPromiseResolveBlock)resolve
//                  rejecter:(RCTPromiseRejectBlock)reject)
//{
//  NSString *uuid = [HKEncryption getUUIDByKeyChain];
//
//  if (!isStringWithAnyText(uuid)) {
//    if (reject) { reject(@"400", @"getUid faild!", nil); }
//  } else {
//    if (resolve) { resolve(uuid); }
//  }
//}

// 对UUID加密获取randomString
RCT_EXPORT_METHOD(getRandomStrWithPbKey:(NSString *)pbKey
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSLog(@"getRandomStrWithPbKey:%@", pbKey);
  NSString *uuid = [HKEncryption getUUIDByKeyChain];
  NSString *randomStr = [HKEncryption encrypt:uuid PublicKey:pbKey];
  
  if (!isStringWithAnyText(randomStr)) {
    if (reject) { reject(@"400", @"getRandomStr faild!", nil); }
  } else {
    if (resolve) { resolve(randomStr); }
  }
}

// 加密密码
RCT_EXPORT_METHOD(encryptPassword:(NSString *)password
                  withUUID:(NSString *)uuidStr
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSLog(@">>>>>encryptPassword: %@, %@", password, uuidStr);
  // 1. 对密码进行sha256加密
  password = [HKEncryption sha256HashWithString:password];
  // 2. 对uuid进行SHA256得到key
//  NSString *uid = [HKEncryption getUUIDByKeyChain];
  NSString *key = [HKEncryption sha256HashWithString:uuidStr];
  NSData *keyData = [HKEncryption sha256HashDataWithString:uuidStr];
  // 2. md5得到iv
//    NSString *iv = [HKEncryption md5String:key];
  NSData *ivData = [HKEncryption md5DataWithString:key];
  // 4. 加密密文(base64密码, key, iv)
  NSString *base64Pas = [HKEncryption base64WithString:password];
  // 5. AES256得到密文
  NSString *encryptContent = [HKEncryption AES256CBC:base64Pas Key:keyData IVEC:ivData];
  
  if (!isStringWithAnyText(encryptContent)) {
    if (reject) {
      reject(@"400", @"加密密文失败", nil);
    }
  } else {
    if (resolve) {
      resolve(encryptContent);
    }
  }
}




@end
