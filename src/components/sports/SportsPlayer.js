/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Appicon} from '../base/AppIcon';
import dummyData from '../../../dummy/dummyData';
import icons from '../../constants/icons';
import {COLORS, FONTS} from '../../constants/theme';

export const SportsPlayer = () => {
  return (
    <View
      style={{
        height: 200,
        backgroundColor: COLORS.lightGray,
        borderRadius: 15,
        overflow: 'hidden',
      }}>
      {/* overlay  */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.2)',
          zIndex: 11,
          padding: 10,
          justifyContent: 'space-between',
        }}>
        {/* top buttons  */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity>
            <Appicon icon={icons.subtitle} color={COLORS.white} size={16} />
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Appicon icon={icons.more} color={COLORS.white} size={16} />
          </TouchableOpacity>
        </View>
        {/* end top buttons  */}

        {/* play icon  */}

        <TouchableOpacity
          style={{
            position: 'absolute',
            top: '46%',
            alignSelf: 'center',
          }}>
          <Appicon icon={icons.play} size={22} color={COLORS.white} />
        </TouchableOpacity>
        {/* end play icon  */}

        {/* bottom side  */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 70,
              width: 55,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: COLORS.white,
              overflow: 'hidden',
            }}>
            <Image
              source={dummyData.images.fifa}
              style={{height: 70, width: 55}}
            />
          </View>

          <View style={{marginLeft: 10}}>
            <Text
              numberOfLines={1}
              style={{...FONTS.h4, color: COLORS.white, letterSpacing: 0.4}}>
              FIFA World Cup
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...FONTS.body4,
                color: COLORS.white,
                textTransform: 'capitalize',
                fontSize: 11,
                lineHeight: 15,
              }}>
              jon doe , alin , walker{' '}
            </Text>
          </View>
        </View>

        {/* bottom right buttons  */}

        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={{marginRight: 10}}>
            <Appicon icon={icons.unlike} color={COLORS.gray} size={14} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight: 10,}}>
            <Appicon icon={icons.download} color={COLORS.gray} size={14} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Appicon icon={icons.full} color={COLORS.gray} size={14} />
          </TouchableOpacity>
        </View>

        {/* end bottom right buttons  */}
      </View>

      {/* cover for player  */}

      <Image
        source={dummyData.images.highlights}
        style={{
          height: '100%',
          width: '100%',
        }}
      />

      {/* end cover for player  */}
    </View>
  );
};
