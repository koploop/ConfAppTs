import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Dimensions,
  TouchableHighlight,
  View,
  StatusBar,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
  Alert
} from 'react-native';

import { Text, Image } from 'react-native-elements';

import {
  TabView,
  SceneMap,
  TabBar,
  TabBarIndicator
} from 'react-native-tab-view';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppColors, SafeAreaStyle } from '../common/AppColors';
import { pTx } from '../common/AppSize';
import { getConfig } from '../services/account';
import ConfListView from './confList';
import LiveListView from './liveList';
import ConfDetail, { IProps } from './confDetail';


const HomePage = ({navigation}) => {

  useEffect(() => {
    console.log('>>>>useEffect');
    _getConfig();

  }, []);

  function _getConfig() {
    getConfig().then(res => {

    }).catch();
  }

  const _renderTable = () => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'conf', title: '会议' },
      { key: 'live', title: '直播' }
    ]);

    const layout = useWindowDimensions();

    const renderScene = ({ route }) => {
      switch (route.key) {
        case 'conf':
          return <ConfListView toDetail={_onConfDetail} />;
        case 'live':
          return <LiveListView />;
      }
    }

    const _onConfDetail = (confId: string) => {
      navigation.navigate('ConfDetail', {
        param: {
          confId: confId,
          onCompleted: () => {}
        } as IProps
      });
    }

    const _onIndexChange = index => {
      setIndex(index);
    }

    const _onTabPress = route  => {
      if (route.key === 'conf') {
        console.log('switch to ConfList');
      } else if (route.key === 'live') {
        console.log('switch to LiveList');
      }
    };

    const _renderTabbar = props => {
      return (
        <TabBar
          scrollEnabled={true}
          {...props}
          labelStyle={{ fontSize: 20, fontWeight: 'normal' }}
          tabStyle={{ width: Dimensions.get('window').width / 2, backgroundColor: 'white' }}
          activeColor={'#333333'}
          inactiveColor={'#999999'}
          onTabPress={({ route, preventDefault }) => {
            _onTabPress(route);
          }}
          renderLabel={({ route, focused, color }) => (
            <View>
              <Text style={{ fontWeight: focused ? 'bold' : 'normal', color }}>
                {route.title}
              </Text>
            </View>
          )}
          renderIndicator={(props) => (
            <TabBarIndicator
              {...props}
              width={30}
              getTabWidth={(index: number) => {
                return 30;
              }}
              style={{ backgroundColor: AppColors.primary }}
            />
          )}
        />
      );
    };

    return (
      <View style={{ flex: 1, marginTop: 14 }}>
        <TabView
          navigationState={{ index, routes }}
          renderTabBar={(props) => _renderTabbar(props)}
          renderScene={renderScene}
          onIndexChange={_onIndexChange}
          initialLayout={{ width: layout.width }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView edges={['right', 'left']} style={SafeAreaStyle}>
      <StatusBar barStyle={'light-content'} />
      <HeaderBtnView />
      {_renderTable()}
    </SafeAreaView>
  );
};


const HeaderBtnView = () => {
  const btnList = [
    {
      img: require('../imgs/join_meet.png'),
      title: '加入会议'
    },
    {
      img: require('../imgs/create_meet.png'),
      title: '发起会议'
    }, {
      img: require('../imgs/order_meet.png'),
      title: '预约会议'
    }
  ];
  return (
    <View style={styles.headerView}>
      <ImageBackground
        source={require('../imgs/meeting_bg.png')}
        style={styles.bgImage}>
        <View style={styles.btnContainer}>
          {btnList.map((item, index) => {
            return (
              <View key={index}>
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor={'white'}
                  onPress={() => alert('Pressed!')}>
                  <Image source={item.img} style={styles.btnImg} />
                </TouchableHighlight>
                <Text style={styles.btnTitleStyle}>{item.title}</Text>
              </View>
            );
          })}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: 'contain'
    // justifyContent: 'center'
  },
  headerView: {
    width: Dimensions.get('window').width,
    height: pTx(218)
    // backgroundColor: 'gray',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    width: Dimensions.get('window').width - 40,
    height: 134,
    position: 'absolute',
    bottom: 0
  },
  btnViewStyle: {
    flexDirection: 'column',
    backgroundColor: 'blue'
  },
  btnImg: {
    width: 56,
    height: 56,
    borderRadius: 4
  },
  btnTitleStyle: {
    marginTop: 8,
    fontSize: 14,
    color: '#212121'
  }
});

export default HomePage;
