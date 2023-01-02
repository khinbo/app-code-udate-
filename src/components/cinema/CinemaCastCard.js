/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {MotiView} from 'moti';
import {COLORS, FONTS} from '../../constants/theme';

const RenderCast = ({image, name, subtitle}) => {
  return (
    <View
      style={{
        width: 80,
        backgroundColor: COLORS.white,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
      }}>
      {image ? (
        <View
          style={{
            width: 70,
            height: 70,
            backgroundColor: COLORS.lightGray,
            borderRadius: 40,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: COLORS.lightGray,
          }}>
          <Image
            source={image}
            style={{
              width: 70,
              height: 70,
              borderRadius: 40,
            }}
          />
        </View>
      ) : null}
      <Text
        style={{
          ...FONTS.h4,
          fontSize: 11,
          lineHeight: 14,
          color: COLORS.black,
          textAlign: 'center',
        }}>
        {name}
      </Text>
      <Text
        style={{
          ...FONTS.h4,
          fontSize: 10,
          lineHeight: 14,
          color: COLORS.gray,
          textAlign: 'center',
        }}>
        {subtitle}
      </Text>
    </View>
  );
};

export const CinemaCastCard = ({cast = []}) => {
  return (
    <MotiView
      style={{
        backgroundColor: COLORS.white,
      }}
      from={{opacity: 0, translateY: -10, zIndex: -10}}
      animate={{opacity: 1, translateY: 0, zIndex: 1}}
      transition={{
        type: 'timing',
      }}>
      <ScrollView
        horizontal
        contentContainerStyle={{
          padding: 5,
        }}>
        {cast.map((item, i) => (
          <RenderCast
            key={i}
            // image={dummyData.images.cast1}
            name={item?.cast_name}
            subtitle="Cast"
          />
        ))}
      </ScrollView>
    </MotiView>
  );
};
