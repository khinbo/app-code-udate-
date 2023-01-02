/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image} from 'react-native';
import helpers from '../../constants/helpers';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

const size = SIZES.width / 3;
export const SportsTablePronostics = ({item, color = COLORS.primary}) => {
  return (
    <View
      style={{
        backgroundColor: color,
        width: size,
        height: size * 1.5,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginLeft: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <Text
        numberOfLines={1}
        style={{
          ...FONTS.h4,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          padding: 3,
          width: size - 15,
          fontSize: 10,
          color: COLORS.black,
          textAlign: 'center',
        }}>
        {item?.title}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: 10,
        }}>
        <Image
          source={{uri: helpers.getImage(item?.t1_img)}}
          style={{height: 40, width: 40, borderRadius: 20}}
        />
        <Image
          source={{uri: helpers.getImage(item?.t2_img)}}
          style={{height: 40, width: 40, borderRadius: 20}}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.h4,
            fontSize: 11,
            lineHeight: 14,
            color: COLORS.white,
          }}>
          {item?.t1_name}
        </Text>
        <Text
          style={{
            ...FONTS.h4,
            fontSize: 10,
            lineHeight: 14,
            color: COLORS.white,
          }}>
          VS
        </Text>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.h4,
            fontSize: 11,
            lineHeight: 14,
            color: COLORS.white,
          }}>
          {item?.t2_name}
        </Text>
      </View>
    </View>
  );
};
