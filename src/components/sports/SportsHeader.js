/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, Platform, StatusBar, TouchableOpacity} from 'react-native';
import AuthContext from '../../store/AuthContext';
import {Appicon} from '../base/AppIcon';
import icons from '../../constants/icons';
import {FONTS} from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';

export const SportsHeader = ({onPressProfile, color}) => {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
        paddingHorizontal: 15,
        paddingBottom: 10,
      }}>
      <Text style={{...FONTS.body4, fontSize: 11}}>Hello {user?.name}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{...FONTS.h3, marginTop: 5, color}}>Welcome Back!</Text>
        <View style={{flexDirection: 'row'}}>
          {/* <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressProfile}
            style={{
              paddingHorizontal: 5,
            }}
          >
            <Appicon icon={icons.user} color={color} />
          </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={{paddingHorizontal: 5}}>
            <Appicon icon={icons.logout} color={color} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
