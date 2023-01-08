/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, SIZES} from '../../constants/theme';

export const AppNoDataFound = ({
  title = 'No Data Found...',
  color = COLORS.gray,
}) => (
  <View
    style={{
      width: SIZES.width,
      alignItems: 'center',
    }}>
    <Text
      style={{
        textAlign: 'center',
        marginTop: 20,
        color,
      }}>
      {title}
    </Text>
  </View>
);
