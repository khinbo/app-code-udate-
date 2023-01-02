/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Pressable, Platform, Image} from 'react-native';
import icons from '../../constants/icons';
import {COLORS, FONTS} from '../../constants/theme';

export const SettingList = ({title, subtitle}) => {
  return (
    <Pressable
      android_ripple={{color: 'rgba(0,0,0,0.1)'}}
      style={({pressed}) => [
        {
          opacity: pressed ? (Platform.OS === 'ios' ? 0.7 : 1) : 1,
        },
        {
          marginTop: 5,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.lightGray,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
        },
      ]}>
      <View
        style={{
          flex: 1,
        }}>
        <Text
          style={{
            ...FONTS.h4,
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
      <Image
        source={icons.chevron}
        style={{
          height: 18,
          width: 18,
          tintColor: COLORS.gray,
          marginRight: 5,
        }}
      />
    </Pressable>
  );
};
