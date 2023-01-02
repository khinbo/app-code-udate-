import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Appicon} from './AppIcon';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import {MotiImage} from 'moti';
import helpers from '../../constants/helpers';

const WIDTH = [SIZES.width / 3] - 15;
export const AppMiniButton = ({
  title,
  icon,
  iconSize = 16,
  iconColor = COLORS.primary,
  otherStyles,
  textStyles,
  image,
  index,
  active = false,
  marginRight = 5,
  onPress,
  length = 3,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          width: length < 4 ? WIDTH : null,
          paddingVertical: 5,
          paddingHorizontal: length < 4 ? 5 : 15,
          borderRadius: 5,
          marginRight: marginRight,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1.5,
          borderColor: COLORS.primary_light,
          backgroundColor: active ? COLORS.primary : COLORS.white,
        },
        otherStyles,
      ]}
      activeOpacity={0.6}>
      {image ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            overflow: 'hidden',
            borderRadius: 5,
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: active ? 'rgba(0,0,0,0.4)' : null,
              zIndex: 10,
            }}
          />
          <MotiImage
            animate={{
              translateX: active ? 0 : index > 0 ? -400 : 400,
            }}
            transition={{
              type: 'timing',
              duration: 200,
            }}
            source={{uri: helpers.getImage(image)}}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      ) : null}
      {icon && (
        <Appicon
          icon={icon}
          size={iconSize}
          color={active ? COLORS.white : iconColor}
        />
      )}
      <Text
        style={[
          {
            ...FONTS.h4,
            color: active ? COLORS.white : COLORS.primary,
            fontSize: 12,
            marginHorizontal: 3,
          },
          textStyles,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
