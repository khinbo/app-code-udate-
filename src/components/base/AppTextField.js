/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';

export const AppTextField = ({
  icon,
  extraStyles,
  title,
  inputRef,
  center = false,
  iconsize = 23,
  dark = false,
  iconcolor = COLORS.black,
  ...otherPorps
}) => {
  return (
    <View
      style={[
        {
          width: '100%',
          flexDirection: 'row',
          backgroundColor: dark ? 'rgba(0,0,0,0.9)' : 'white',
          height: 50,
          borderWidth: dark ? 0.5 : 1,
          borderColor: COLORS.gray,
          borderRadius: 5,
          marginTop: 15,
        },
        extraStyles,
      ]}>
      {title && (
        <View
          style={{
            backgroundColor: dark ? 'rgba(0,0,0,1)' : 'white',
            position: 'absolute',
            top: -8,
            left: center ? 10 : 65,
            zIndex: 99,
            paddingHorizontal: 5,
            paddingVertical: 0,
          }}>
          <Text
            numberOfLines={1}
            style={{
              ...FONTS.body4,
              color: dark ? COLORS.white : 'rgba(0,0,0,0.6)',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              paddingVertical: 0,
              paddingHorizontal: 0,
              fontSize: 11,
              lineHeight: 16,
            }}>
            {title}
          </Text>
        </View>
      )}
      <View
        style={{
          paddingHorizontal: center ? 8 : 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={icon}
          style={{
            height: center ? 15 : iconsize,
            width: center ? 15 : iconsize,
            tintColor: iconcolor,
          }}
        />
      </View>
      <TextInput
        style={{
          flex: 1,
          ...FONTS.body3,
          fontWeight: 'bold',
          color: 'rgba(0,0,0,0.9)',
        }}
        autoCapitalize={'none'}
        autoCorrect={false}
        ref={inputRef}
        {...otherPorps}
      />
    </View>
  );
};
