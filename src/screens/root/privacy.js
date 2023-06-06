/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {AppHeader} from '../../components';
import {COLORS} from '../../constants/theme';

export const PrivacyScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <AppHeader title={'Privacy'} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: COLORS.gray}}>Privacy screen</Text>
      </View>
    </View>
  );
};
