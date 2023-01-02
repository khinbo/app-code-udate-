/* eslint-disable react-native/no-inline-styles */
import {MotiView} from 'moti';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

export const LiteratureTags = ({
  tag,
  length,
  active = false,
  item,
  width = SIZES.width / 3 - 20,
  index,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{color: COLORS.lightGray}}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
        },
        {
          borderRadius: 5,
          marginRight: index === length - 1 ? 0 : 10,
          overflow: 'hidden',
          backgroundColor: item.bg_inactive,
        },
      ]}>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 5,
          paddingHorizontal: 10,
          width: length > 3 ? null : width,
        }}>
        {active && (
          <MotiView
            from={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            transition={{type: 'timing'}}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              backgroundColor: item.bg_active,
              borderRadius: 5,
            }}
          />
        )}
        <Text style={{...FONTS.body4, fontSize: 13, color: COLORS.white}}>
          {tag.title}
        </Text>
      </View>
    </Pressable>
  );
};
