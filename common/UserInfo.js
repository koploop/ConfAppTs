import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserInfo = {
  account:null,
  password: null,
  phoneNum: null
};

export async function storeUserInfo(userInfo:UserInfo) {
  const account = ["account", userInfo.account]
  const password = ["password", userInfo.password]
  try {
    await AsyncStorage.multiSet([account, password]);
  } catch (e) {}
  
  console.log('storeUserInfo>>>', account)
  return true;
}

export async function getUserInfo() {
  var values = [];
  try {
    values = await AsyncStorage.multiGet(["account", "password"]);
  } catch (e) {}

  console.log('values>>>', values)
  const account = values[0][1];
  const pwd = values[1][1];

  console.log('account>>>', account)

  return {
    account: account,
    password: pwd
  };
}

// export default UserInfo;