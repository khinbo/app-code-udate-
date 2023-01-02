/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Pressable, Platform, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../constants/theme';

const active_colors = [COLORS.primarydarker, COLORS.primarylighter];
const disabled_colors = [COLORS.gray, COLORS.gray];
export const AppButton = ({title, onPress, radius = 5, loading, disable}) => {
  return (
    <LinearGradient
      colors={
        disable ? disabled_colors : loading ? disabled_colors : active_colors
      }
      style={{
        width: '100%',
        marginTop: 10,
        borderRadius: radius,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}>
      <Pressable
        android_ripple={{color: COLORS.lightGray}}
        onPress={onPress}
        disabled={disable ? disable : loading}
        style={({pressed}) => [
          {
            opacity: pressed ? (Platform.OS === 'ios' ? 0.7 : 1) : 1,
          },
          {
            width: '100%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: radius,
          },
        ]}>
        <Text style={{...FONTS.h2, color: 'white'}}>{title}</Text>
        {loading && (
          <View
            style={{
              position: 'absolute',
              right: 10,
            }}>
            <ActivityIndicator
              animating={loading}
              size="small"
              color={COLORS.white}
            />
          </View>
        )}
      </Pressable>
    </LinearGradient>
  );
};
