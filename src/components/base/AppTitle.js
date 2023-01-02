/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';

export const AppTitle = ({title}) => {
  return (
    <View
      style={{
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primarylighter,
        marginVertical: 10,
        paddingHorizontal: 8,
      }}>
      <Text
        style={{
          ...FONTS.h2,
          fontSize: 18,
          lineHeight: 24,
          color: COLORS.primarydarker,
        }}>
        {title}
      </Text>
    </View>
  );
};
