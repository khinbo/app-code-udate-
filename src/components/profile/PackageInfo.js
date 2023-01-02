/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Pressable, Platform} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';

function renderEditButton(title, fill) {
  return (
    <Pressable
      android_ripple={{color: `rgba(${COLORS.primary_rgba},1)`}}
      style={({pressed}) => [
        {
          backgroundColor: pressed
            ? Platform.OS === 'ios'
              ? 'rgba(0,0,0,0.1)'
              : null
            : fill
            ? COLORS.primary
            : COLORS.white,
          marginTop: fill ? 0 : 20,
          height: 35,
          borderWidth: 3,
          borderColor: COLORS.primary,
          width: 140,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        },
      ]}>
      <Text
        style={{
          ...FONTS.body4,
          color: fill ? COLORS.white : COLORS.black,
        }}>
        {title}
      </Text>
    </Pressable>
  );
}

export const PackageInfo = () => (
  <View
    style={{
      marginHorizontal: 15,
      marginTop: 10,
      marginBottom: Platform.OS === 'ios' ? 30 : 10,
      borderWidth: 3,
      borderColor: `rgba(${COLORS.primary_rgba},0.6)`,
      borderRadius: 3,
      overflow: 'hidden',
    }}>
    <View
      style={{
        backgroundColor: `rgba(${COLORS.primary_rgba},0.6)`,
        padding: 10,
      }}>
      <Text
        style={{
          marginBottom: 10,
        }}>
        <Text
          style={{
            ...FONTS.body5,
          }}>
          Your current plan is :{' '}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
          }}>
          {' '}
          Khinbo Basic{' '}
        </Text>
      </Text>
      <Text
        style={{
          marginBottom: 10,
        }}>
        <Text
          style={{
            ...FONTS.body5,
          }}>
          Fees:{' '}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
          }}>
          {' '}
          3.99¢{' '}
        </Text>
      </Text>
      <Text
        style={{
          ...FONTS.body5,
          letterSpacing: 1,
        }}>
        ( Description of the plan )
      </Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
      }}>
      <Text
        style={{
          ...FONTS.h4,
          color: COLORS.primary,
        }}>
        More about plan
      </Text>
      {renderEditButton('Change my plan', true)}
    </View>
  </View>
);
