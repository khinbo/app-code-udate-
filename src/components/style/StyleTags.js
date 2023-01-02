/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, Pressable} from 'react-native';
import {MotiView} from '@motify/components';
import {Appicon} from '../base/AppIcon';
import {COLORS, FONTS} from '../../constants/theme';

export const StyleTags = ({tag, selectedTag, item, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{color: COLORS.lightGray}}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
        },
        {
          marginRight: 10,
          overflow: 'hidden',
          borderRadius: 5,
          backgroundColor:
            selectedTag === tag.id ? item.bg_active : item.bg_inactive,
        },
      ]}>
      <MotiView
        animate={{
          opacity: selectedTag === tag.id ? 1 : 0.9,
        }}
        style={{
          width: 100,
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Appicon
          animate={{
            rotate: selectedTag === tag.id ? '5deg' : '0deg',
          }}
          icon={tag.icon}
          url={true}
          size={30}
          color={
            selectedTag === tag.id ? item.active_color : item.inactive_color
          }
        />
        <Text
          style={{
            ...FONTS.body4,
            color:
              selectedTag === tag.id ? item.active_color : item.inactive_color,
          }}>
          {tag.title}
        </Text>
      </MotiView>
    </Pressable>
  );
};
