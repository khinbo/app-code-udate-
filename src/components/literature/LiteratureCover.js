/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {Appicon} from '../base/AppIcon';
import icons from '../../constants/icons';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import helpers from '../../constants/helpers';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {onContentViewHandler} from '../../store/reducers/player';

const size = SIZES.width;
export const LiteratureCover = ({featured}) => {
  const dispatch = useDispatch();
  const navigaiton = useNavigation();
  if (!featured) return null;
  return (
    <TouchableOpacity
      onPress={() =>
        featured?.video_url
          ? dispatch(onContentViewHandler({item: featured, type: 'demands'}))
          : navigaiton.navigate('artDetails', {
              art: featured,
              color: COLORS.primary,
            })
      }
      activeOpacity={0.9}
      style={{
        height: size / 2,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: COLORS.lightGray,
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.2)',
          zIndex: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* RIGT SIDE VERTCAL BOX  */}
        {featured?.video_url ? (
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              height: 50,
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
            }}>
            <Appicon icon={icons.play} color={COLORS.white} size={18} />
          </View>
        ) : null}

        {/* LITERATURE TITLE  */}
        <View style={{position: 'absolute', bottom: 10, left: 10}}>
          <Text style={{...FONTS.h3, lineHeight: 18, color: COLORS.white}}>
            {featured?.title}
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              fontSize: 11,
              lineHeight: 15,
              color: COLORS.lightGray,
            }}>
            {featured?.artist}
          </Text>
        </View>
      </View>
      <Image
        source={{uri: helpers.getImage(featured?.cover)}}
        style={{width: '100%', height: '100%'}}
      />
    </TouchableOpacity>
  );
};
