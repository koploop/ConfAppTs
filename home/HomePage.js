import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Dimensions,
  TouchableHighlight,
  View,
  StatusBar,
  StyleSheet,
  ImageBackground,
  useWindowDimensions
} from 'react-native';

import { Text, Image } from 'react-native-elements';

import {
  TabView,
  SceneMap,
  TabBar,
  TabBarIndicator
} from 'react-native-tab-view';

import { AppColors, SafeAreaStyle } from '../common/AppColors';
import { pTx } from '../common/AppSize';

const HomePage = () => {
  const _renderHeader = () => {
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
                <View>
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

  const _renderTable = () => {
    const ConfPage = () => (
      <View style={{flex: 1, backgroundColor: '#feffe6'}}>
        <Text>'dddd'</Text>
      </View>
    );

    const LivePage = () => (
      <View style={{flex: 1, backgroundColor: '#fff7e6'}}>
        <Text>'dddd'</Text>
      </View>
    );

    const [index, setIndex] = useState(0);
    const [routes] = useState([
      {key: 'conf', title: '会议'},
      {key: 'live', title: '直播'}
    ]);

    const layout = useWindowDimensions();
    const renderScene = SceneMap({
      conf: ConfPage,
      live: LivePage
    });

    const _handleIndexChange = index => setIndex(index);

    const _handleTabPress = route => {
      if (route.key === 'conf') {
        setIndex(0);
      } else if (route.key === 'live') {
        setIndex(1);
      }
    };

    const _bottomLine = () => {
      // props中传入的每个item宽度
      const {itemWidth} = this.props;
      return {
        height: 2,
        width: itemWidth * 0.6,
        borderRadius: 30,
        marginLeft: itemWidth * 0.2,
        marginBottom: 18,
        backgroundColor: 'red',
        elevation: 10,
      };
    };

    const _renderTabbar = props => {
      // const inputRange = props.navigationState.routes.map((x, i) => i);

      return (
        <TabBar 
          scrollEnabled={true}
          {...props}
          style={{backgroundColor: 'white'}}
          labelStyle={{fontSize: 15, fontWeight: 'normal'}}
          activeColor={'#333333'}
          inactiveColor={'#999999'}
          // indicatorStyle={_bottomLine}
          // tabStyle={{ width: 'auto' }}
          onTabPress={({route, preventDefault}) => {
            _handleTabPress(route);
          }}
          renderLabel={({route, focused, color}) => (
            <View>
              <Text style={{fontWeight: focused ? 'bold' : 'normal', color}}>
                {route.title}
              </Text>
            </View>
          )}
          renderIndicator={(props) => (
            <TabBarIndicator
              {...props}
              style={{backgroundColor: AppColors.primary}}
            />
          )}
        />
      );
    };

    return (
      <View style={{flex: 1, marginTop: 14}}>
        <TabView
          navigationState={{index, routes}}
          renderTabBar={_renderTabbar}
          renderScene={renderScene}
          onIndexChange={_handleIndexChange}
          initialLayout={{width: layout.width }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView edges={['right', 'left']} style={SafeAreaStyle}>
      <StatusBar barStyle={'light-content'} />
      {_renderHeader()}
      {_renderTable()}
    </SafeAreaView>
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
    shadowOffset: {width: 0, height: 4},
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
