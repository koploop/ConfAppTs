import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Icon
} from 'react-native-elements'

import { AppColors } from '../common/AppColors';

import HomePage from './HomePage';
import ContactPage from '../Contacts/ContactPage';
import ProfilePage from '../Profile/ProfilePage';



const Tab = createBottomTabNavigator();

function RootTabs() {
  return (
      <Tab.Navigator screenOptions={BarStyle}>
        <Tab.Screen name="HomePage" component={HomePage} options={{headerShown: false }}/>
        <Tab.Screen name="ContactPage" component={ContactPage} />
        <Tab.Screen name="ProfilePage" component={ProfilePage} />
      </Tab.Navigator>
  );
}

const BarStyle = ({route}) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName, iconType;

    if (route.name === 'HomePage') {
      iconName = focused
        ? 'ios-list'
        : 'ios-list';
        iconType = 'ionicon';
    } else if (route.name === 'ContactPage') {
      iconName = 'contacts';
      ionicon = 'antdesign';
    } else if (route.name == 'ProfilePage') {
      iconName = 'user';
      iconType = 'antdesign';
    }

    // You can return any component that you like here!
    return <Icon name={iconName} type={iconType} size={size} color={color} />;
  },
  tabBarActiveTintColor: AppColors.primary,
  tabBarInactiveTintColor: 'gray',
});

export default RootTabs;