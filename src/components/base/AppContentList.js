/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Appicon} from '../base/AppIcon';
import icons from '../../constants/icons';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import {MotiView} from 'moti';
import helpers from '../../constants/helpers';
import moment from 'moment';

const SIZE = SIZES.width / 3;
export const AppContentList = ({
  height,
  content,
  color = COLORS.black,
  onPressItem,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPressItem}>
      <MotiView
        from={{opacity: 0, translateY: -10}}
        animate={{opacity: 1, translateY: 0}}
        transition={{type: 'timing'}}
        style={{
          flexDirection: 'row',
          marginBottom: 5,
          alignItems: 'center',
          height: height,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
          elevation: 1,
        }}>
        <View
          style={{
            width: SIZE,
            height: height,
            backgroundColor: COLORS.lightGray,
            borderRadius: 10,
            overflow: 'hidden',
            marginRight: 10,
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              zIndex: 11,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Appicon
              icon={icons.play_new}
              size={SIZE / 3}
              color={COLORS.white}
            />
          </View>
          <Image
            source={{uri: helpers.getImage(content?.cover)}}
            style={{
              width: SIZE,
              height: SIZE - 20,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingRight: 5,
          }}>
          <Text
            numberOfLines={1}
            style={{
              ...FONTS.h4,
              color: color,
            }}>
            {content?.title}
          </Text>
          <Text
            numberOfLines={3}
            style={{
              ...FONTS.body4,
              fontSize: 12,
              marginTop: 5,
              lineHeight: 18,
              color: COLORS.gray,
              letterSpacing: 0.3,
            }}>
            {content?.media_type === 'news' ? content?.news : content?.artist}
          </Text>
          <Text
            numberOfLines={3}
            style={{
              ...FONTS.body4,
              fontSize: 12,
              marginTop: 5,
              lineHeight: 18,
              color: COLORS.gray,
              letterSpacing: 0.3,
            }}>
            {moment(content?.created_at).calendar()}
          </Text>
        </View>
      </MotiView>
    </TouchableOpacity>
  );
};
