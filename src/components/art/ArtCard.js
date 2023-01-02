/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import helpers from '../../constants/helpers';
import {Appicon} from '../base/AppIcon';
import icons from '../../constants/icons';

export const ArtCard = ({
  height,
  content,
  onPressItem,
  onPressCover,
  readMode,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressItem}
      style={{
        height: readMode ? null : height,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
        flexDirection: readMode ? 'column' : 'row',
      }}>
      <TouchableOpacity
        onPress={onPressCover}
        activeOpacity={0.9}
        style={{
          width: readMode ? SIZES.width : SIZES.width / 2.5,
          height: height - 5,
        }}>
        <View
          style={{
            borderRadius: 5,
            backgroundColor: COLORS.lightGray,
            width: '90%',
            height: '100%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}>
          {content.video_url ? (
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,0.4)',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                zIndex: 99,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Appicon
                icon={icons.play_new}
                color={COLORS.white}
                size={readMode ? 60 : 40}
              />
            </View>
          ) : null}
          <Image
            source={{
              uri: helpers.getImage(content[readMode ? 'cover' : 'poster']),
            }}
            style={{width: '100%', height: '100%', borderRadius: 5}}
          />
        </View>
      </TouchableOpacity>

      {/* CONTENT DETAILS  */}

      <View style={{flex: 1, padding: readMode ? 10 : null}}>
        {/* CONTENT TITLE  */}
        <Text
          numberOfLines={2}
          style={{
            ...FONTS.h4,
            lineHeight: 19,
          }}>
          {content?.title}
        </Text>
        {/* CONTENT SUBTITLE  */}
        <Text
          numberOfLines={2}
          style={{
            ...FONTS.body4,
            fontSize: 11,
            lineHeight: 15,
            color: COLORS.gray,
          }}>
          <Text>Author : </Text>
          <Text>{content?.artist}</Text>
        </Text>

        {/* CONTENT INFO */}
        <View style={{marginTop: 10}}>
          <Text
            numberOfLines={7}
            style={{...FONTS.body4, fontSize: 11, lineHeight: 16}}>
            {content?.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
