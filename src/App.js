import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Loading } from './common/loading';

import LoginPage from './login/LoginPage';
import RootTabs from './home/RootTabbar';
import ConfDetail from './home/confDetail';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <Loading />
      <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login"
            component={LoginPage} // 附带两个props: route  navigation
            options={{ title: '登录', headerShown: false }}
          />
          <Stack.Screen name="Root"
            component={RootTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ConfDetail"
            component={ConfDetail}
            options={{ title: '会议详情', headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
}
