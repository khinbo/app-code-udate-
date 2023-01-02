import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import helpers from '../../constants/helpers';
import moment from 'moment';
import {Appicon} from '../base/AppIcon';
import icons from '../../constants/icons';

const RenderTags = ({title, height}) => {
  return (
    <View
      style={{
        paddingHorizontal: 5,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
        marginRight: 5,
      }}>
      <Text style={{...FONTS.body4, fontSize: 11, color: COLORS.white}}>
        {title}
      </Text>
    </View>
  );
};
export const LiteratureCard = ({
  height,
  content,
  readMode,
  onPressItem,
  onPressCover,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPressItem}
      style={{
        height: readMode ? null : height,
        backgroundColor: COLORS.white,
        overflow: 'hidden',
        flexDirection: readMode ? 'column' : 'row',
        // padding: 10,
      }}>
      <TouchableOpacity
        onPress={onPressCover}
        activeOpacity={0.9}
        style={{
          width: readMode ? SIZES.width : SIZES.width / 2.5,
          height: height - 5,
          // alignItems: "center",
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

      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          padding: readMode ? 10 : null,
        }}>
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
          <Text style={{fontWeight: 'bold', color: COLORS.black}}>
            Reference :{' '}
          </Text>
          <Text>{content?.artist}</Text>
        </Text>

        {/* CONTENT TAGS  */}
        <View style={{flexDirection: 'row'}}>
          {content?.tags?.split(',').map((item, index) => (
            <RenderTags title={item} key={index} />
          ))}
        </View>
        {/* CONTENT PUBLISHED  */}
        <Text
          numberOfLines={2}
          style={{
            ...FONTS.body4,
            fontSize: 11,
            lineHeight: 15,
            color: COLORS.gray,
          }}>
          <Text>Publish : </Text>
          <Text>{moment(content?.publish_at).fromNow()}</Text>
        </Text>
        <Text
          numberOfLines={2}
          style={{
            ...FONTS.body4,
            fontSize: 11,
            lineHeight: 15,
            color: COLORS.gray,
          }}>
          <Text>Views : </Text>
          <Text>{content?.views_count}</Text>
        </Text>
        {/* CONTENT INFO */}
        <View style={{marginTop: 5}}>
          <Text
            numberOfLines={readMode ? 400 : 5}
            style={{...FONTS.body4, fontSize: 11, lineHeight: 16}}>
            {content?.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
