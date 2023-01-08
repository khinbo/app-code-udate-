/* eslint-disable react-native/no-inline-styles */

import moment from 'moment';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import helpers from '../../constants/helpers';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

const CARD_WIDTH = SIZES.width / 2 - 20;

export const AppRecordingList = ({movie, onPress, onLongPress}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(movie)}
      onLongPress={onLongPress}
      activeOpacity={0.7}
      style={{
        margin: 10,
        width: CARD_WIDTH,
      }}>
      <View
        style={{
          height: CARD_WIDTH - 80,
          width: CARD_WIDTH,
          borderRadius: 5,
          overflow: 'hidden',
          backgroundColor: COLORS.gray,
          borderWidth: 0.1,
          borderColor: COLORS.white,
        }}>
        <Image
          source={{uri: helpers.getImage(movie?.cover)}}
          style={{
            height: CARD_WIDTH - 80,
            width: CARD_WIDTH,
          }}
          resizeMode="cover"
        />
      </View>

      <Text
        numberOfLines={1}
        style={{
          ...FONTS.h4,
          fontSize: 12,
          lineHeight: 16,
          color: COLORS.white,
          marginTop: 5,
        }}>
        {movie.title}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          ...FONTS.body4,
          fontSize: 10,
          lineHeight: 16,
          color: COLORS.gray,
        }}>
        {movie.artist}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          ...FONTS.body4,
          fontSize: 10,
          lineHeight: 16,
          color: COLORS.gray,
        }}>
        {moment(movie.date).fromNow()}
      </Text>
    </TouchableOpacity>
  );
};
