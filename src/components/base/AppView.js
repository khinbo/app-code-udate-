/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

export const AppView = ({children, style}) => {
  return (
    <View
      style={[
        {
          flex: 1,
        },
        style,
      ]}>
      {children}
    </View>
  );
};
