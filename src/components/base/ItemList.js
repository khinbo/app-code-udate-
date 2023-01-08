/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import {MotiView} from 'moti';
import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import helpers from '../../constants/helpers';
import icons from '../../constants/icons';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

export const ItemList = ({item, height, onPressItem, active}) => (
  <MotiView
    from={{opacity: 0, translateY: -10}}
    animate={{opacity: 1, translateY: 0}}
    transition={{type: 'timing'}}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gray,
      backgroundColor: active ? COLORS.lightGray : COLORS.white,
      borderRadius: 5,
      height: height,
    }}>
    <TouchableOpacity
      onPress={() => onPressItem(item)}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        flex: 1,
      }}>
      <Image
        source={{uri: helpers.getImage(item?.cover)}}
        style={{
          height: 65,
          width: 80,
          borderRadius: 10,
        }}
      />
      <View
        style={{
          marginLeft: 7,
          width: SIZES.width * 0.5,
        }}>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.h3,
            color: COLORS.primary_light,
          }}>
          {item?.title}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.body4,
            fontSize: 12,
            lineHeight: 15,
          }}>
          {item?.artist}
        </Text>
        <Text
          style={{
            ...FONTS.body5,
            fontSize: 10,
            lineHeight: 13,
          }}>
          {item.duration > '3600'
            ? moment
                .utc(moment.duration(item.duration, 'seconds').asMilliseconds())
                .format('HH:mm:ss')
            : moment
                .utc(moment.duration(item.duration, 'seconds').asMilliseconds())
                .format('mm:ss')}
        </Text>
      </View>
    </TouchableOpacity>
    <View
      style={{
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        disabled={true}
        style={{
          padding: 5,
        }}>
        <Image
          source={icons[item.hasLiked ? 'like' : 'unlike']}
          style={{height: 18, width: 18, tintColor: COLORS.primary}}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{
          padding: 5,
        }}
      >
        <Image
          source={icons.more}
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            marginLeft: 4,
          }}
        />
      </TouchableOpacity> */}
    </View>
  </MotiView>
);
