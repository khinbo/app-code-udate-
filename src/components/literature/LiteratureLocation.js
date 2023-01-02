/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {MotiView} from 'moti';
import {Appicon} from '../base/AppIcon';
import icons from '../../constants/icons';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

const width = SIZES.width / 2 - 25;

const RenderInfo = ({icon, title}) => {
  return (
    <View style={{flexDirection: 'row', marginTop: 10}}>
      <Appicon icon={icon} size={12} color={COLORS.gray} />
      <Text
        style={{
          ...FONTS.body4,
          fontSize: 10,
          lineHeight: 12,
          marginLeft: 5,
        }}>
        {title}
      </Text>
    </View>
  );
};

export const LiteratureLocation = ({color, items = []}) => {
  return (
    <MotiView
      from={{opacity: 0, translateY: -10, zIndex: -10}}
      animate={{opacity: 1, translateY: 0, zIndex: 1}}
      transition={{
        type: 'timing',
      }}
      style={{
        backgroundColor: COLORS.lightGray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        flexWrap: 'wrap',
      }}>
      {items.map(item => (
        <View
          key={item?.id}
          style={{
            backgroundColor: COLORS.white,
            width,
            padding: 15,
            borderRadius: 10,
            marginBottom: 5,
          }}>
          <Text
            style={{
              ...FONTS.h4,
              fontSize: 12,
              color,
              marginBottom: 5,
              lineHeight: 16,
            }}>
            {item?.title}
          </Text>
          <RenderInfo icon={icons.location} title={item?.address} />
        </View>
      ))}
    </MotiView>
  );
};
