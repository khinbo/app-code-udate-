/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';

export const InfoRow = ({title, value}) => (
  <View
    style={{
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderColor: COLORS.lightGray,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
    <Text
      style={{
        ...FONTS.h4,
        color: COLORS.black,
      }}>
      {title}
    </Text>
    <Text
      style={{
        ...FONTS.body4,
        color: COLORS.black,
      }}>
      {value}
    </Text>
  </View>
);
