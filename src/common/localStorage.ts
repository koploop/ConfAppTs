import React, { FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TOKEN_KEY = '@TOKEN_KEY';
const PUBLIC_KEY = '@PUBLIC_KEY';
const ACCOUNT_KEY = '@ACCOUNT_KEY';
const PASSWORD_KEY = '@PASSWORD_KEY';
const CONFIG_INFO_KEY = '@CONFIG_INFO_KEY';


export class LocalStoreage {

  // 存储器版本,后续升级合并要比对
  public static version: string = "1.0";

  // 存储token
  public static async saveToken(token: string) {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (e) { }

    console.log('saveToken>>>', token);
  };

  // 获取token
  public static async getToken() {
    var value: string | null = '';
    try {
      value = await AsyncStorage.getItem(TOKEN_KEY);
    } catch (e) { }

    // console.log('getToken>>>', value)

    return value;
  };

  // 存储公钥
  public static async savePbkey(pbKey: string) {
    try {
      await AsyncStorage.setItem(PUBLIC_KEY, pbKey);
    } catch (e) { }
  }

  // 获取公钥
  public static async getPbkey() {
    var value: string | null = '';
    try {
      value = await AsyncStorage.getItem(PUBLIC_KEY);
    } catch (e) { }

    return value;
  }

  // 存储用户信息
  public static async storeUserInfo(account: string, password: string) {
    const accountPair = [ACCOUNT_KEY, account]
    const passwordPair = [PASSWORD_KEY, password]
    try {
      await AsyncStorage.multiSet([accountPair, passwordPair]);
    } catch (e) { }

    console.log('storeUserInfo>>>', account)
  };

  // 获取用户信息
  public static async getUserInfo() {
    var values: any[] = [];
    try {
      values = await AsyncStorage.multiGet([ACCOUNT_KEY, PASSWORD_KEY]);
    } catch (e) { }

    console.log('values>>>', values)
    const account = values[0][1];
    const pwd = values[1][1];

    console.log('account>>>', account)

    return {
      account: account,
      password: pwd
    };
  }

  // 存储配置信息
  static async saveConfigInfo(info: object) {
    try {
      await AsyncStorage.setItem(CONFIG_INFO_KEY, JSON.stringify(info));
    } catch (e) {
      console.error('>>>saveConfigInfo');
    }
  }

  // 获取登录配置信息
  static async getConfigInfo() {

    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(CONFIG_INFO_KEY).then(res => {
        let info = JSON.parse(res || '{}');
        let config = {
          account: info.account,
          accountId: info.accountId,
          cloudToken: info.cloudToken,
          cloudUrl: info.cloudUrl,
          mobilePhone: info.mobilePhone,
          nickname: info.nickname,
          mqInfo: info.mqInfo
        };
        resolve(config);

      }).catch(e => {
        reject(e);
      })
    });
  }

}

export interface ConfigInfo {
  account: string;
  accountId: string;
  cloudToken: string;
  cloudUrl: string;
  mobilePhone: string;
  nickname: string;
  mqInfo: MQInfo;
}

export interface MQInfo {
  address: [object];
  password: string;
  username: string;
}