import axios, { AxiosRequestConfig } from "axios";
import { LocalStoreage } from "../common/localStorage";
import { NativeModules } from 'react-native';
import { AppManager } from "../common/appManager";
import { getVersion } from 'react-native-device-info';


/**
 * 自定义返回错误信息
 */
export interface FailRes {
  code?: number | string; // 错误码
  msg: string; // 错误描述
  data?: any; // 返回数据
};


const BASEURL = 'http://10.117.70.247:80'
const TIMEOUT_MSG = '请求超时'

// 配置headers头等通用请求配置
const httpConfig: AxiosRequestConfig = {
  baseURL: BASEURL,
  timeout: 10000,
  timeoutErrorMessage: TIMEOUT_MSG,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
};

// 创建axios对象
const http = axios.create(httpConfig);

// 请求拦截器(插入一些请求配置信息)
http.interceptors.request.use(async config => {

  // 添加基础参数(只写了POST)
  const params = config.data || {};
  const headers = config.headers || {};

  const pbKey = AppManager.sharedInstance().publicKey;
  if (pbKey) {
    const Encrypt = NativeModules.EncryptAbility;
    const randomStr = await Encrypt.getRandomStrWithPbKey(pbKey);
    params['randomString'] = randomStr;
    params['version'] = getVersion();
    params['terminalType'] = NativeModules.CommonAbility.deviceType;
    params['deviceUniqueCode'] = NativeModules.CommonAbility.uuid;
    config.data = params;
  }

  if (config.withCredentials == true) {
    const token = await LocalStoreage.getToken() || '';
    headers['token'] = token;
    config.headers = headers;
    // console.log('>>>请求拦截：params:%s, headers:%s', params, headers);
  }

  console.log('>>>[Axios Request] Url:%s, Param:%s', config.url, config.data);
  return config;

  // let tokenPromise = new Promise(async function (resolve, reject) {

  //   LocalStoreage.getToken().then(token => {
  //     config.headers['token'] = token;
  //     console.log('>>>请求拦截：需要token');
  //     resolve(config);
  //   }).catch(e => {
  //     reject(e);
  //   });
  // });
  // return tokenPromise;

}, function (error) {
  // 请求错误
  console.log('>>>>>请求拦截：error', error);
  return Promise.reject(error);
}
)

// 响应拦截器(可以做一些通用的响应处理和错误处理)
http.interceptors.response.use(
  (response) => {
    if (
      response.data.msg === 'success' ||
      response.data.code === '0'
    ) {
      console.log('request response:', response.data);
      return response.data;
    } else {
      // switch (response.data.code) {
      // case 1402: // 接口token失效
      // case '1402': // 接口token失效
      //     return authRefresh.refreshToken(request, response);
      // // break;
      // case 1401: // 没有权限
      // case '1401':
      //     message.error('该账号没有权限访问，请联系系统管理员！');
      //     break;
      // case '8203': // token刷新失败,直接跳转登录页
      //     store.dispatch({ type: 'login/logoutAction' });
      //     break;
      // default: {
      //     // 不做报错提示
      //     if (response.config.headers.noMessage) return response;
      //     const errMessage =
      //         util.dataProp(response, 'response.data.message', '') ||
      //         '服务器错误!';
      //     message.error(errMessage);
      //     break;
      // }
      // }
      // return response;
      console.log('>>>业务错误！');
      let resp: FailRes = {
        code: response.data.code,
        msg: response.data.msg,
        data: response.data.data
      }
      return Promise.reject(resp);
    }
  },
  (error) => {
    console.log('>>>[Axios Resp] Error', error);
    // if (error.response) {
    //   // The request was made and the server responded with a status code
    //   // that falls out of the range of 2xx
    //   console.log('>>>>>1111',error.response.status);
    // } else if (error.request) {
    //   // The request was made but no response was received
    //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //   // http.ClientRequest in node.js
    //   console.log('>>>>>2222',error.request);
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   console.log('>>>>>33333 Error', error.message);
    // }

    let eResp: FailRes = {
      msg: error.message
    }
    // console.log('>>>>>Error Message', error.message);
    return Promise.reject(eResp);
  }
);

// POST 的入参 data，是放到到body中
// 可选参数(可不传。不传即undefined)：withToken?:boolean  必须放在非可选参数之后
// 带默认值参数(可不传。不传即用默认值)：withToken?:boolean=true 
const AXPost = async (url: string, withToken: boolean = true, data?: any,): Promise<any> => {
  return http.post(url, data, {
    withCredentials: withToken
  }); // 不属于解构(对象才能解构{})，就是按顺序给入参。
}

// GET 的入参 params, 在 AxiosRequestConfig 中设置，最终拼接到Url
const AXGet = async (url: string, params?: any) => {
  return http.get(url, {
    params // 解构
  });
}

export { AXGet, AXPost };

