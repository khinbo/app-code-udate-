/* eslint-disable react-native/no-inline-styles */
import {MotiText, MotiView} from 'moti';
import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

const width = SIZES.width / 1.5;

export const CinemaHeader = ({
  color,
  active,
  rotation = 'Vertical',
  onPressBrandNew,
  onPressUpcoming,
  onPressHorizontal,
  onPressVertical,
}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.lightGray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          width,
          flexDirection: 'row',
          padding: 5,
          borderRadius: 10,
        }}>
        <Pressable
          onPress={onPressBrandNew}
          style={{
            flex: 1,
            marginRight: 5,
          }}>
          <MotiView
            animate={{
              opacity: active === 'filmsNowShowing' ? 1 : 0.8,
            }}
            style={[
              styles.btn,
              {
                backgroundColor:
                  active === 'filmsNowShowing' ? color : COLORS.white,
              },
            ]}>
            <MotiText
              animate={{
                scale: active === 'filmsNowShowing' ? 1 : 0.9,
              }}
              style={{
                ...FONTS.h4,
                fontSize: 12,
                color:
                  active === 'filmsNowShowing' ? COLORS.white : COLORS.black,
              }}>
              Now Showing
            </MotiText>
          </MotiView>
        </Pressable>
        <Pressable
          onPress={onPressUpcoming}
          style={{
            flex: 1,
          }}>
          <MotiView
            animate={{
              opacity: active === 'filmsComingSoon' ? 1 : 0.8,
            }}
            style={[
              styles.btn,
              {
                backgroundColor:
                  active === 'filmsComingSoon' ? color : COLORS.white,
              },
            ]}>
            <MotiText
              animate={{
                scale: active === 'filmsComingSoon' ? 1 : 0.9,
              }}
              style={{
                ...FONTS.h4,
                fontSize: 12,
                color:
                  active === 'filmsComingSoon' ? COLORS.white : COLORS.black,
              }}>
              Coming Soon
            </MotiText>
          </MotiView>
        </Pressable>
      </View>
      {/* <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressHorizontal}
          style={styles.iconContainer}
        >
          <Appicon
            icon={icons.horizontal}
            color={rotation === "Horizontal" ? color : COLORS.black}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressVertical}
          style={styles.iconContainer}
        >
          <Appicon
            icon={icons.vertical}
            color={rotation === "Vertical" ? color : COLORS.black}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    paddingLeft: 15,
  },
  btn: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
