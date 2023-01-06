/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../../constants/icons';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import {ContentLikeHandler} from '../../store/reducers/player';
import {Appicon} from '../base/AppIcon';

export const VideoDetails = ({
  onDownload,
  filePath,
  isDownloaded,
  progress,
}) => {
  const {hasLiked, likes, content_details} = useSelector(state => state.player);
  const dispatch = useDispatch();
  const slider = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h3,
            fontSize: 18,
            marginTop: 2,
            color: COLORS.black,
            width: SIZES.width * 0.5,
          }}>
          {content_details?.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {progress && filePath === content_details?.path ? (
            <View
              style={{
                marginHorizontal: 5,
                marginTop: 10,
              }}>
              <Text style={{...FONTS.h3, color: COLORS.black}}>
                {progress}%
              </Text>
            </View>
          ) : null}
          {content_details?.path ? (
            <TouchableOpacity
              disabled={filePath}
              activeOpacity={0.7}
              onPress={() => onDownload(content_details)}
              style={{
                marginHorizontal: 5,
                marginTop: 10,
              }}>
              {filePath && filePath === content_details?.path ? (
                <ActivityIndicator color={COLORS.black} size="small" />
              ) : (
                <Appicon
                  icon={icons[isDownloaded ? 'downloadDone' : 'download']}
                  color={filePath ? COLORS.gray : COLORS.black}
                  size={20}
                />
              )}
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              dispatch(ContentLikeHandler({id: content_details.id}))
            }
            style={{
              marginHorizontal: 5,
              marginTop: 10,
            }}>
            <Appicon
              icon={hasLiked ? icons.like : icons.unlike}
              color={COLORS.primary}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      {content_details?.video_limit === 1 ? (
        <View
          style={{
            backgroundColor: COLORS.black,
            alignSelf: 'baseline',
            paddingHorizontal: 5,
            borderRadius: 4,
          }}>
          <Text
            style={{
              ...FONTS.h1,
              fontSize: 12,
              lineHeight: 16,
              color: COLORS.white,
            }}>
            Resctricted
          </Text>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...FONTS.body5,
              fontSize: 12,
              lineHeight: 16,
              marginRight: 5,
              color: COLORS.black,
            }}>
            {likes} {likes > 1 ? ' likes' : 'like'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              ...FONTS.body5,
              fontSize: 12,
              lineHeight: 16,
              marginRight: 5,
              color: COLORS.black,
            }}>
            {content_details?.views_count}{' '}
            {content_details?.views_count > 1 ? ' views' : 'view'}
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              fontSize: 12,
              lineHeight: 16,
              marginRight: 5,
              color: COLORS.black,
            }}>
            {moment(content_details?.created_at).fromNow()}
          </Text>
        </View>
      </View>
    </View>
  );
};
