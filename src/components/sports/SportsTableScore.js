/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {FONTS, SIZES} from '../../constants/theme';

export const SportsTableScore = ({color, score}) => {
  return (
    <View
      style={{
        marginVertical: 5,
      }}>
      <Text
        style={{
          ...FONTS.body4,
          textAlign: 'center',
          fontSize: 12,
          marginVertical: 5,
        }}>
        {score?.title}
      </Text>
      <View
        style={{
          marginHorizontal: 20,
          paddingVertical: 20,
          borderBottomWidth: 2,
          borderBottomColor: color,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {/* <Appicon
              icon={score?.t1}
              url
              orgColor
              size={50}
              borderRadius={25}
            /> */}
            <Text
              style={{
                ...FONTS.body4,
                fontSize: 12,
                marginTop: 5,
              }}>
              {score?.t1_name}
            </Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{...FONTS.h2, fontSize: 30, letterSpacing: 1}}>
              <Text>{score?.t1_score}</Text>
              <Text>-</Text>
              <Text>{score?.t2_score}</Text>
            </Text>
            <Text
              style={{
                ...FONTS.h4,
                fontSize: 10,
              }}>
              Full-Time
            </Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {/* <Appicon
              icon={dummyData.images.clublogo2}
              orgColor
              size={50}
              borderRadius={25}
            /> */}
            <Text
              style={{
                ...FONTS.body4,
                fontSize: 12,
                marginTop: 5,
              }}>
              {score?.t2_name}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              ...FONTS.body4,
              fontSize: 11,
              lineHeight: 18,
              letterSpacing: 0.4,
              color: 'rgba(0,0,0,0.8)',
              width: SIZES.width / 2,
            }}>
            {score?.t1_status.split(',')?.map((item, i) => (
              <Text key={item + i}>{item}</Text>
            ))}
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              fontSize: 11,
              lineHeight: 18,
              letterSpacing: 0.4,
              color: 'rgba(0,0,0,0.8)',
            }}>
            {score?.t2_status.split(',')?.map((item, i) => (
              <Text key={item + i}>{item}</Text>
            ))}
          </Text>
        </View>
      </View>
    </View>
  );
};
