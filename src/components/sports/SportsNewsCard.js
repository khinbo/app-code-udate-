/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image} from 'react-native';
import helpers from '../../constants/helpers';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

export const SportsNewsCard = ({item}) => {
  return (
    <View style={{flexDirection: 'row', marginRight: 10}}>
      <View
        style={{
          width: 110,
          height: 100,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: COLORS.gray,
        }}>
        <Image
          source={{uri: helpers.getImage(item.img)}}
          style={{
            width: 110,
            height: 100,
          }}
        />
      </View>
      <View style={{marginLeft: 5, width: SIZES.width / 2.5}}>
        <Text numberOfLines={2} style={{...FONTS.h3}}>
          {item?.title}
        </Text>
        <Text
          numberOfLines={3}
          style={{
            ...FONTS.body4,
            marginTop: 3,
            fontSize: 12,
            lineHeight: 17,
          }}>
          {item?.body}
        </Text>
      </View>
    </View>
  );
};
