/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {MotiView} from 'moti';
import {Appicon} from '../base/AppIcon';
import icons from '../../constants/icons';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

const width = SIZES.width / 2 - 30;

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
export const CinemaShowTime = () => {
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
        justifyContent: 'space-evenly',
        paddingVertical: 10,
      }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          width,
          padding: 10,
          borderRadius: 10,
        }}>
        <Text style={{...FONTS.h4, marginBottom: 5}}>Arena Cinemas</Text>
        <RenderInfo
          icon={icons.location}
          title="Zurich , switzerlan in the sihilcity"
        />
        <RenderInfo icon={icons.clock} title="11:30 AM" />
        <RenderInfo icon={icons.calender} title="Today" />
      </View>
      <View
        style={{
          backgroundColor: COLORS.white,
          width,
          padding: 10,
          borderRadius: 10,
        }}>
        <Text style={{...FONTS.h4, marginBottom: 5}}>Arena Cinemas</Text>
        <RenderInfo
          icon={icons.location}
          title="Zurich , switzerlan in the sihilcity"
        />
        <RenderInfo icon={icons.clock} title="11:30 AM" />
        <RenderInfo icon={icons.calender} title="Today" />
      </View>
    </MotiView>
  );
};
