/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Switch} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';

export const AppSwitch = ({title, subtitle, value, onValueChange}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.black,
          }}>
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              ...FONTS.body4,
              fontSize: 9,
              lineHeight: 12,
              color: COLORS.gray,
            }}>
            {subtitle}
          </Text>
        )}
      </View>
      <View
        style={{
          width: 120,
          alignItems: 'flex-end',
        }}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={value ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onValueChange}
          value={value}
        />
      </View>
    </View>
  );
};
