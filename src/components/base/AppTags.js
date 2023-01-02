/* eslint-disable react-native/no-inline-styles */
import {MotiImage} from 'moti';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import helpers from '../../constants/helpers';
import {FONTS, SIZES} from '../../constants/theme';

const WIDTH = SIZES.width / 2 - 17;
export const AppTags = ({
  tag,
  selectedTag,
  item,
  onPress,
  marginRight = 10,
  length,
  active,
  index,
  image,
  otherStyles,
  textStyles,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          width: length < 4 ? WIDTH : null,
          height: 70,
          backgroundColor:
            selectedTag === tag.id ? item.bg_active : item.bg_inactive,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: marginRight,
          paddingHorizontal: length < 4 ? 5 : 40,
        },
        otherStyles,
      ]}>
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
            style={{
              width: '100%',
              height: '100%',
            }}
            source={{uri: helpers.getImage(image)}}
          />
        </View>
      ) : null}
      <Text
        numberOfLines={1}
        style={[
          {
            ...FONTS.h3,
            color:
              selectedTag === tag.id ? item.active_color : item.inactive_color,
          },
          textStyles,
        ]}>
        {tag.title}
      </Text>
    </Pressable>
  );
};
