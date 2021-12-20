
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Keyboard,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

// rn elements
import {
  Button,
  Icon,
  Header,
  Image,
  Input,
  CheckBox
} from 'react-native-elements'


import { AppColors, SafeAreaStyle } from '../common/AppColors'
import { LocalStoreage } from '../common/localStorage';
import { getPublicKey, login } from '../services/account';
import HUD from '../common/hud';

const LoginView = ({ navigation }) => {

  const [isSecurity, setisSecurity] = useState(true);
  const securityIcon = isSecurity ? 'eye-off' : 'eye';
  const [accountStr, setAccountStr] = useState('');
  const [pwdStr, setPwdStr] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    console.log('>>>>useEffect');
    _getUserInfo();
    _getPbKey();

    console.log('>>>>> useEffect called !');

  }, []);

  // 获取用户名密码
  const _getUserInfo = async () => {
    const res = await LocalStoreage.getUserInfo();
    console.log('res>>>>', res);
    setAccountStr(res.account);
    setPwdStr(res.password);
  }

  // 获取publicKey
  const _getPbKey = async () => {
    getPublicKey().then(data => {
      console.log('>>>获取pbKey:', data.publicKey);
    }).catch(e => {
      console.log(e);
    })

  }

  // 点击服务器设置
  const onServerSetting = () => {
    console.log('onServerSetting')
  }

  // 点击密码眼睛
  const onPasswordSecurity = () => {
    console.log('onPasswordSecurity')
    setisSecurity(!isSecurity)
  }

  // 同意隐私协议
  const onPressPrivacy = () => {
    console.log('onPressPrivacy')
    setIsChecked(!isChecked)
  }

  // 点击登录
  const onLogin = () => {
    if (!isChecked) {
      alert('请先同意隐私协议');
      return;
    }

    HUD.loading();
    LocalStoreage.storeUserInfo(accountStr, pwdStr);
    login(accountStr, pwdStr)
      .then(token => {
        HUD.toast('登录成功');
        navigation.navigate('Root')
      })
      .catch(e => {
        console.log('>>>login error', e);
        HUD.toast(e.msg);
      })
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => { Keyboard.dismiss(); }}
        activeOpacity={1} style={{ flex: 1 }}
      >
        <SafeAreaView style={SafeAreaStyle}>
          {/* 注意statusbar和内容是并列关系，非包含关系 */}
          <StatusBar barStyle={'dark-content'} />
          <View style={styles.settingView}>
            <Icon
              name='settings'
              color='black'
              size={32}
              onPress={onServerSetting}
            ></Icon>
          </View>

          <View style={{ alignItems: 'center', marginTop: 45 }}>
            <Image
              source={require('../imgs/logo.png')}
              style={{ width: 120, height: 120, alignItems: 'center' }}
            />
            <Text style={{ fontSize: 18 }}>云慧易</Text>
          </View>

          <View style={{ marginTop: 100, marginHorizontal: 32 }}>
            <Input
              value={accountStr}
              onChangeText={(value) => setAccountStr(value)}
              placeholder="请输入账号/手机号"
              leftIcon={{ type: 'antdesign', name: 'user', color: '#006EE2', size: 24 }}
              underlineColorAndroid='#fff'
            />
            <Input
              value={pwdStr}
              onChangeText={(value) => setPwdStr(value)}
              placeholder="请输入密码"
              secureTextEntry={isSecurity ? true : false}
              leftIcon={{ type: 'antdesign', name: 'lock', color: '#006EE2', size: 24 }}
              rightIcon={{
                type: 'ionicon', name: securityIcon, color: '#000', size: 24,
                onPress: onPasswordSecurity
              }}
              underlineColorAndroid='#fff'
            />
          </View>

          <View style={{ marginHorizontal: 30, marginTop: 80 }}>
            <Button
              title="登录"
              titleStyle={{ color: 'white' }}
              // disabled
              // disabledStyle={{backgroundColor:'#006EE2', color:'blue'}}
              onPress={onLogin}
            />
          </View>

          <View style={styles.registerView}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={"white"}
              onPress={() => alert('Pressed!')}
            >
              <Text style={{ color: '#333' }}>忘记密码</Text>
            </TouchableHighlight>

            <TouchableText
              onPress={() => alert('Pressed!')}>
              <Text style={{ color: '#006EE2' }}>{'新用户注册>'}</Text>
            </TouchableText>
          </View>

          <View style={{
            flex: 1,
            marginHorizontal: 30,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap',
            position: 'absolute',
            bottom: 40
          }}>
            <CheckBox
              // title='我已阅读并同意'
              // textStyle={{color:'#333'}}
              containerStyle={{
                // backgroundColor: 'white', 
                // borderColor: 'white', 
                // margin: 0, 
                paddingHorizontal: 0
              }}
              size={16}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={isChecked}
              onPress={onPressPrivacy}
            />
            <Text style={{ color: '#333' }}>我已阅读并同意</Text>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={"white"}
              onPress={() => alert('Pressed!')}
            >
              <Text style={{ color: '#006EE2' }}>《云慧易用户协议》</Text>
            </TouchableHighlight>
            <Text style={{ color: '#333' }}>和</Text>

            <TouchableText
              onPress={() => alert('Pressed!')}>
              <Text style={{ color: '#006EE2' }}>《隐私政策》</Text>
            </TouchableText>
            <Text style={{ color: '#333' }}>。</Text>
          </View>

        </SafeAreaView>
      </TouchableOpacity >
    </>
  );
}

// 带点击事件的文字
const TouchableText = (props) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor={"white"}
      onPress={props.onPress}
    >
      {props.children}
    </TouchableHighlight>
  );
}


const styles = StyleSheet.create({
  settingView: {
    backgroundColor: AppColors.white,
    alignItems: 'flex-end',
    marginTop: 15,
    marginRight: 15
  },
  registerView: {
    marginHorizontal: 30,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default LoginView;

