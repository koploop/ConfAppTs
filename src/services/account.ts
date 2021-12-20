import { AXPost, AXGet } from "../login/request";
import 'react-native-get-random-values';
import * as CryptoJS from 'crypto-js';
import UID from 'react-native-uuid';
import { NativeModules } from 'react-native';
import { LocalStoreage } from "../common/localStorage";

import { AppManager } from "../common/appManager";


const BASE_URL = '/vcas/token_api';

// 获取公钥
export async function getPublicKey() {
  return new Promise((resolve, reject) => {
    AXPost(`${BASE_URL}/account/v1/public_key/get`, false)
      .then(res => {
        console.log('>>>getPublicKey:', res.data);
        LocalStoreage.savePbkey(res.data.publicKey);
        AppManager.sharedInstance().publicKey = res.data.publicKey;
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      })
  })
}

// 登录
export async function login(account: string, password: string) {
  const pbKey = AppManager.sharedInstance().publicKey;
  console.log('>>>>>login pbKey: %s', pbKey);
  const Encrypt = NativeModules.EncryptAbility;
  const randomStr = await Encrypt.getRandomStrWithPbKey(pbKey);
  const pwd = await Encrypt.encryptPassword(password, NativeModules.CommonAbility.uuid);

  return new Promise((resolve, reject) => {
    AXPost(`${BASE_URL}/account/v2/login`, false, {
      loginAccount: account,
      password: pwd,
      randomString: randomStr
    }).then(res => {
      LocalStoreage.saveToken(res.data.token);
      resolve(res.data.token);
    }).catch(e => {
      console.log('>>>.catch')
      reject(e);
    })
  });
}

export async function getConfig() {
  return new Promise((resolve, reject) => {
    AXPost(`${BASE_URL}/account/v2/config_info/get`, true)
      .then(res => {
        console.log('>>>.then')
        LocalStoreage.saveConfigInfo(res.data);
        resolve(res);
      })
      .catch(e => {
        console.log('>>>.catch')
        reject(e);
      })
  });
}
