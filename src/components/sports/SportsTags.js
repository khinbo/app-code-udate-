/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, Pressable, Platform} from 'react-native';
import {MotiView, MotiImage} from 'moti';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import helpers from '../../constants/helpers';

const width = SIZES.width / 3.8 - 20;
export const SportsTags = ({
  color,
  item,
  active = false,
  onPress,
  background = false,
  marginRight = 5,
  otherStyles,
}) => {
  return (
    <Pressable
      android_ripple={{color: COLORS.lightGray}}
      onPress={onPress}
      style={({pressed}) => [
        {
          opacity: pressed ? (Platform.OS === 'ios' ? 0.7 : 1) : 1,
        },
        {backgroundColor: 'red', borderRadius: 15, marginRight: marginRight},
      ]}>
      <MotiView
        animate={{
          borderWidth: active ? 3 : 1,
        }}
        transition={{
          type: 'timing',
        }}
        style={[
          {
            width,
            height: width,
            backgroundColor: active ? color : COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            borderWidth: 2,
            borderColor: COLORS.white,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          },
          otherStyles,
        ]}>
        {background ? (
          <MotiImage
            animate={{
              borderWidth: active ? 3 : 1,
            }}
            transition={{
              type: 'timing',
            }}
            source={{uri: helpers.getImage(background)}}
            style={[
              {
                width,
                height: width,
                borderRadius: 15,
                borderColor: active ? color : COLORS.white,
              },
              otherStyles,
            ]}
          />
        ) : (
          <>
            <MotiImage
              transition={{
                type: 'timing',
              }}
              source={{uri: helpers.getImage(item.icon)}}
              style={[
                {
                  width: width / 3,
                  height: width / 3,
                  borderRadius: width / 1.5,
                  // tintColor: orgColor ? null : active ? COLORS.white : color,
                },
                otherStyles,
              ]}
            />
            {/* <Appicon icon={item.icon} size={width / 3} orgColor={true} /> */}
            <Text
              style={{
                ...FONTS.body3,
                marginTop: 5,
                fontSize: 12,
                color: active ? COLORS.white : COLORS.black,
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 1,
              }}>
              {item.title}
            </Text>
          </>
        )}
      </MotiView>
    </Pressable>
  );
};
