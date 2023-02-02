import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStack, OnDemandStack} from './stacknavigation';
import {MyTabBar} from './MyTabBar';
import {RecordingScreen} from '../screens/root/recording';
import {translate} from '../I18n';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="homeScreen"
        component={HomeStack}
        options={{
          title: 'Home',
        }}
      />

      {/* <Tab.Screen
        name="genres"
        component={GenreStack}
        options={{
          title: 'Genre',
        }}
      /> */}
      <Tab.Screen
        name="ondemand"
        component={OnDemandStack}
        options={{
          title: translate('onDemand'),
        }}
      />
      <Tab.Screen
        name="recording"
        component={RecordingScreen}
        options={{
          title: 'Recording',
        }}
      />
    </Tab.Navigator>
  );
};
