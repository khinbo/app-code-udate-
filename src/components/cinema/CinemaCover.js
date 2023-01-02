/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image} from 'react-native';
import {Appicon} from '../base/AppIcon';
import dummyData from '../../../dummy/dummyData';
import icons from '../../constants/icons';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

const height = SIZES.width / 2;

export const CinemaCover = ({color}) => {
  return (
    <View style={{marginVertical: 10}}>
      <Text
        numberOfLines={1}
        style={{
          ...FONTS.h2,
          color,
          paddingVertical: 10,
          letterSpacing: 0.5,
        }}>
        Featured today
      </Text>
      <View
        style={{
          height: height,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 11,
            overflow: 'hidden',
            borderRadius: 10,
          }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              height: 50,
              width: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 10,
              borderColor: 'rgba(0,0,0,0.2)',
            }}>
            <Appicon icon={icons.play} size={14} color={color} />
          </View>
        </View>
        <Image
          source={dummyData.images.spider_man_cover}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};
