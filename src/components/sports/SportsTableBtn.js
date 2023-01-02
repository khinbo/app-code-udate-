/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable} from 'react-native';
import {MotiView, MotiText} from 'moti';
import {COLORS, FONTS} from '../../constants/theme';

export const SportsTableButton = ({title, color, active, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 1,
        marginHorizontal: 20,
      }}>
      <MotiText
        animate={{
          opacity: active ? 1 : 0.6,
        }}
        transition={{
          type: 'timing',
        }}
        style={{
          ...FONTS.body4,
          textAlign: 'center',
          fontSize: 12,
          color: active ? color : COLORS.black,
        }}>
        {title}
      </MotiText>
      <MotiView
        animate={{
          width: active ? '70%' : '0%',
        }}
        style={{
          alignSelf: 'center',
          height: 1,
          position: 'absolute',
          bottom: 0,
          backgroundColor: color,
        }}
      />
    </Pressable>
  );
};
